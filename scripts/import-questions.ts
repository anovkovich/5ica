/**
 * Importuje source data (subjects, classes, chapters, questions) u MongoDB.
 * Idempotent — može se pokretati više puta.
 *
 * Pokreni: yarn db:import
 */

import { config } from "dotenv";
import { resolve } from "path";
import { readFileSync } from "fs";

config({ path: resolve(process.cwd(), ".env.local") });

import { ObjectId } from "mongodb";
import { getDb } from "../lib/mongodb";

type RawSubject = {
  id: string;
  name: string;
  slug: string;
  questionCount: number;
  gradeRange: string;
  category: string;
  malaMatura?: boolean;
};

type RawClass = {
  id: string;
  subjectId: string;
  subjectName: string;
  questionCount: number;
  gradeGuess: number | null;
  confidence: string;
  rationale: string;
};

type RawChapter = {
  id: string;
  subjectId: string;
  subjectName: string;
  classId: string;
  grade: number | null;
  name: string | null;
  questionCount: number;
  sampleQuestions: string[];
};

type RawQuestion = {
  _id: { $oid: string };
  title: string;
  title_lat: string;
  correctAnswer: string;
  correctAnswer_lat: string;
  wrongAnswerNumberOne: string;
  wrongAnswerNumberOne_lat: string;
  wrongAnswerNumberTwo: string;
  wrongAnswerNumberTwo_lat: string;
  level: "E" | "M" | "H";
  subjectId: { $oid: string };
  subjectClassId: { $oid: string };
  subjectClassChapterId: { $oid: string };
  oldIdFromMigration?: string;
};

function readJson<T>(filename: string): T {
  const path = resolve(process.cwd(), "data", filename);
  return JSON.parse(readFileSync(path, "utf8")) as T;
}

async function importSubjects() {
  const db = await getDb();
  const collection = db.collection("subjects");
  const subjects = readJson<RawSubject[]>("subjects.json");

  const ops = subjects.map((s) => ({
    replaceOne: {
      filter: { _id: new ObjectId(s.id) },
      replacement: {
        _id: new ObjectId(s.id),
        name: s.name,
        slug: s.slug,
        questionCount: s.questionCount,
        gradeRange: s.gradeRange,
        category: s.category,
        malaMatura: s.malaMatura ?? false,
        updatedAt: new Date(),
      },
      upsert: true,
    },
  }));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result = await collection.bulkWrite(ops as any);
  console.log(
    `  ✓ subjects: upserted ${result.upsertedCount}, modified ${result.modifiedCount} (${subjects.length} total)`
  );
}

async function importClasses() {
  const db = await getDb();
  const collection = db.collection("classes");
  const classes = readJson<RawClass[]>("classes.json");

  const ops = classes.map((c) => ({
    replaceOne: {
      filter: { _id: new ObjectId(c.id) },
      replacement: {
        _id: new ObjectId(c.id),
        subjectId: new ObjectId(c.subjectId),
        questionCount: c.questionCount,
        grade: c.gradeGuess,
        gradeConfidence: c.confidence,
        rationale: c.rationale,
        updatedAt: new Date(),
      },
      upsert: true,
    },
  }));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result = await collection.bulkWrite(ops as any);
  console.log(
    `  ✓ classes: upserted ${result.upsertedCount}, modified ${result.modifiedCount} (${classes.length} total)`
  );
}

async function importChapters() {
  const db = await getDb();
  const collection = db.collection("chapters");
  const chapters = readJson<RawChapter[]>("chapters.json");

  const ops = chapters.map((c, i) => ({
    replaceOne: {
      filter: { _id: new ObjectId(c.id) },
      replacement: {
        _id: new ObjectId(c.id),
        subjectId: new ObjectId(c.subjectId),
        classId: new ObjectId(c.classId),
        name: c.name ?? "Neimenovano",
        grade: c.grade,
        questionCount: c.questionCount,
        sampleQuestions: c.sampleQuestions,
        order: i,
        updatedAt: new Date(),
      },
      upsert: true,
    },
  }));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result = await collection.bulkWrite(ops as any);
  console.log(
    `  ✓ chapters: upserted ${result.upsertedCount}, modified ${result.modifiedCount} (${chapters.length} total)`
  );
}

async function importQuestions() {
  const db = await getDb();
  const collection = db.collection("questions");
  const questions = readJson<RawQuestion[]>("my_questions.json");

  console.log(`  ▶ questions: processing ${questions.length} u batch-evima...`);

  const BATCH_SIZE = 500;
  let upserted = 0;
  let modified = 0;

  for (let i = 0; i < questions.length; i += BATCH_SIZE) {
    const batch = questions.slice(i, i + BATCH_SIZE);

    const ops = batch.map((q) => ({
      replaceOne: {
        filter: { _id: new ObjectId(q._id.$oid) },
        replacement: {
          _id: new ObjectId(q._id.$oid),
          title: q.title,
          titleLat: q.title_lat,
          correctAnswer: q.correctAnswer,
          correctAnswerLat: q.correctAnswer_lat,
          wrongAnswers: [
            {
              text: q.wrongAnswerNumberOne,
              textLat: q.wrongAnswerNumberOne_lat,
            },
            {
              text: q.wrongAnswerNumberTwo,
              textLat: q.wrongAnswerNumberTwo_lat,
            },
          ],
          level: q.level,
          subjectId: new ObjectId(q.subjectId.$oid),
          classId: new ObjectId(q.subjectClassId.$oid),
          chapterId: new ObjectId(q.subjectClassChapterId.$oid),
          legacyId: q.oldIdFromMigration ?? null,
          active: true,
          flagged: false,
          timesShown: 0,
          timesAnswered: 0,
          timesCorrect: 0,
          source: "import-2026-05",
          updatedAt: new Date(),
        },
        upsert: true,
      },
    }));

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await collection.bulkWrite(ops as any, { ordered: false });
    upserted += result.upsertedCount;
    modified += result.modifiedCount;
    process.stdout.write(`    ${Math.min(i + BATCH_SIZE, questions.length)}/${questions.length}\r`);
  }

  console.log(
    `\n  ✓ questions: upserted ${upserted}, modified ${modified} (${questions.length} total)`
  );
}

async function ensureContentIndexes() {
  const db = await getDb();

  // Subjects
  await db.collection("subjects").createIndex({ slug: 1 }, { unique: true });
  await db.collection("subjects").createIndex({ malaMatura: 1, name: 1 });

  // Classes
  await db.collection("classes").createIndex({ subjectId: 1, grade: 1 });

  // Chapters
  await db
    .collection("chapters")
    .createIndex({ subjectId: 1, grade: 1, order: 1 });
  await db.collection("chapters").createIndex({ classId: 1 });

  // Questions — primary query patterns
  await db
    .collection("questions")
    .createIndex({ chapterId: 1, active: 1 });
  await db
    .collection("questions")
    .createIndex({ subjectId: 1, level: 1, active: 1 });
  await db
    .collection("questions")
    .createIndex({ classId: 1, active: 1 });
  await db.collection("questions").createIndex({ flagged: 1 });

  console.log("  ✓ content indeksi kreirani");
}

async function main() {
  console.log("📦 Importujem sadržaj u MongoDB...\n");

  console.log("  ▶ subjects");
  await importSubjects();

  console.log("  ▶ classes");
  await importClasses();

  console.log("  ▶ chapters");
  await importChapters();

  await importQuestions();

  console.log("\n  ▶ content indeksi");
  await ensureContentIndexes();

  console.log("\n✅ Import završen!\n");
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Greška:", err);
  process.exit(1);
});

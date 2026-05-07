---
name: 5ica data corpus
description: Lokacija i struktura source data — pitanja, predmeti, klase, poglavlja
type: reference
---

## Lokacija

Sva source data u `C:\Users\Aleksa\Documents\5ica\data\`:

- `my_questions.json` — 8.428 pitanja (Mongo dump format, ćirilica + latinica)
- `subjects.json` — 14 predmeta sa metadata (slug, gradeRange, malaMatura flag)
- `classes.json` — 58 klasa = (predmet × razred), sa gradeGuess + confidence
- `chapters.json` — 298 imenovanih poglavlja sa sample pitanja

**Original** `my_questions.json` ima i kopija u `C:\Users\Aleksa\Downloads\` kao backup.

## Struktura pitanja

Svako pitanje ima:
- `_id` (Mongo $oid)
- `title` + `title_lat` (ćirilica + latinica)
- `correctAnswer` + `correctAnswer_lat`
- `wrongAnswerNumberOne/Two` + `_lat` verzije (uvek 2 pogrešna odgovora = 3 ukupno)
- `level`: "E" | "M" | "H" (Easy/Medium/Hard, ravnomerno raspoređeno ~2.800 svaki)
- `subjectId`, `subjectClassId`, `subjectClassChapterId` (Mongo refs)
- `tags: []` (prazno svuda — chapter-i ovde služe umesto)

## 14 predmeta (sa malaMatura flag-om)

Mala matura korpus (4.360 pitanja, 7 predmeta):
- Matematika (1.165) ✅
- Srpski jezik i književnost (606) ✅
- Biologija (639) ✅
- Istorija (600) ✅
- Geografija (600) ✅
- Fizika (450) ✅
- Hemija (300) ✅

Bonus predmeti za niže razrede / opštu vežbu:
- Muzička kultura (1.173)
- Likovna kultura (980)
- Informatika i računarstvo (601)
- Srpski jezik (niži razredi) (625)
- Svet oko nas (301)
- Priroda i društvo (240)
- Digitalni svet (148)

## Razred mapping (classes.json)

35% klasa ima visoku sigurnost za razred (npr. svi razredi istorije i geografije razdvojeni hronološki, hemija 7/8, srpski 5-8). 42% srednju, 23% nisku ili null.

## Poglavlja (chapters.json)

298 poglavlja sa profesionalnim imenima koja prate srpski osnovnoškolski program (npr. "Pitagorina teorema", "Kosovski boj u književnosti", "Doseljavanje Slovena na Balkan").

- Medijana 21 pitanje po poglavlju (min 1, max 143)
- Medijana 5 poglavlja po klasi
- 296 jedinstvenih imena, 0 duplikata u istom (predmet, razred)

**Imena su izvedena ručno od strane Opus modela (ne Haiku) zbog domain knowledge potrebnog za srpski osnovnoškolski program.**

## Ekonomika storage-a

Y1 procena (50k free + 1k plaćenih):
- `users` ~100 MB
- `answers` ~75 GB (najveći trošak — razmislite arhiviranje posle 30 dana)
- `quizSessions` ~15 GB
- `aiExplanations` ~40 MB

Pre prve sezone: M30 cluster ($120/mes) ili M40 ($240/mes) zavisno od answers volume.

## Pravna napomena

Pitanja su iz "nepoznatih izvora" ali korisnik (Aleksa) tvrdi da ih je njegov prijatelj sam generisao. Pre prvog plaćenog dinara: **potpisani ugovor o ustupanju autorskih prava** sa prijateljem (vidi `legal_critical.md`).

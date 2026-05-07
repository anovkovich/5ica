import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CreateChildForm } from "@/components/parent/CreateChildForm";

export default function NoviDetetoPage() {
  return (
    <div className="px-4 py-5">
      <Link
        href="/roditelj"
        className="inline-flex items-center gap-1.5 text-sm text-base-content/70 hover:text-primary mb-4"
      >
        <ArrowLeft size={16} />
        Nazad
      </Link>

      <h1 className="text-2xl font-extrabold mb-1 tracking-tight">
        Dodaj dete
      </h1>
      <p className="text-sm text-base-content/70 mb-6">
        Kreiraj nalog za svoje dete. Bez email-a — koristi nadimak.
      </p>

      <CreateChildForm />
    </div>
  );
}

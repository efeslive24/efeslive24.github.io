import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <p className="text-7xl font-extrabold text-brand-600">404</p>
      <h1 className="mt-4 text-xl font-bold text-slate-900">Sayfa Bulunamadı</h1>
      <p className="mt-2 max-w-md text-sm text-slate-600">
        Aradığınız sayfa taşınmış, yeniden adlandırılmış veya hiç var olmamış olabilir.
        Ana sayfadan araçları keşfetmeye devam edebilirsiniz.
      </p>
      <div className="mt-6 flex gap-3">
        <Link href="/">
          <Button>Ana Sayfaya Dön</Button>
        </Link>
      </div>
    </div>
  );
}

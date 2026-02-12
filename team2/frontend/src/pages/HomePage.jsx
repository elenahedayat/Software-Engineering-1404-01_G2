import { FileText, ArrowRight } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col">
      <section className="flex-1 flex flex-col items-center justify-center px-4 py-20">
        <div className="text-center max-w-2xl mx-auto">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-forest/10 mb-6">
              <FileText className="w-10 h-10 text-forest" />
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-dark mb-4 leading-tight">
            دانشنامه (ویکی)
          </h1>
          <p className="text-gray-600 text-lg">
            به دانشنامه گروه ۲ خوش آمدید. از منوی بالا برای جستجو، ایجاد و مدیریت مقالات استفاده کنید.
          </p>
        </div>
      </section>

      <footer className="border-t border-gray-300 py-6 text-center">
        <a
          href="http://localhost:8000"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-forest transition-colors text-sm"
        >
          <ArrowRight className="w-4 h-4" />
          بازگشت به داشبورد اصلی
        </a>
      </footer>
    </div>
  )
}

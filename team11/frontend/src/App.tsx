import React from 'react';
import Navbar from '@/components/ui/Navbar';
import Hero from '@/components/ui/Hero';
import BackgroundPattern from '@/components/ui/BackgroundPattern';
import ServiceCard from '@/components/ui/ServiceCard';


// 1. Data structure for our services to keep the JSX clean
const servicesData = [
  {
    icon: "fa-solid fa-map-location-dot",
    title: "سرویس نقشه",
    description: "نقشه تعاملی و جغرافیای ایران",
    teams: [{ label: "گروه ۱", url: "/team1" }, { label: "گروه ۹", url: "/team9" }]
  },
  {
    icon: "fa-solid fa-camera-retro",
    title: "رسانه و نظرات",
    description: "اشتراک‌گذاری عکس و دیدگاه‌ها",
    teams: [{ label: "گروه ۷", url: "/team7" }, { label: "گروه ۸", url: "/team8" }]
  },
  {
    icon: "fa-solid fa-book-atlas",
    title: "دانشنامه (ویکی)",
    description: "اطلاعات جامع فرهنگ و تاریخ",
    teams: [{ label: "گروه ۲", url: "/team2" }, { label: "گروه ۶", url: "/team6" }]
  },
  {
    icon: "fa-solid fa-star",
    title: "پیشنهاد هوشمند",
    description: "پیشنهاد مقاصد بر اساس علایق",
    teams: [
      { label: "گروه ۳", url: "/team3" }, 
      { label: "گروه ۵", url: "/team5" },
      { label: "گروه ۱۲", url: "/team12" }
    ]
  },
  {
    icon: "fa-solid fa-hotel",
    title: "امکانات رفاهی",
    description: "هتل‌ها، رستوران‌ها و حمل‌ونقل",
    teams: [{ label: "گروه ۴", url: "/team4" }, { label: "گروه ۱۳", url: "/team13" }]
  },
  {
    icon: "fa-solid fa-route",
    title: "برنامه‌ریزی سفر",
    description: "ساخت هوشمند برنامه سفر",
    teams: [{ label: "گروه ۱۰", url: "/team10" }, { label: "گروه ۱۱", url: "/team11" }]
  }
];

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col font-vazir">
      {/* Background Pattern - Fixed in the back */}
      <BackgroundPattern />

      {/* Navigation Header */}
      <Navbar isAuthenticated={false} />

      {/* Hero Section */}
      <Hero />

      {/* Main Content Area */}
      <main className="container mx-auto px-5 mb-20">
        
        {/* Section Header */}
        <div className="text-center mt-24 mb-12 relative">
          <h3 className="relative inline-block text-3xl font-black text-forest-green pb-4">
            خدمات سامانه
            {/* Custom Underline Gradient */}
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-persian-gold to-forest-green rounded-full shadow-sm"></span>
          </h3>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <ServiceCard 
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              teams={service.teams}
            />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto py-10 bg-mountain-grey text-white/60 text-center text-sm border-t border-white/5">
        <p dir="rtl">
          &copy; ۱۴۰۴ - پروژه مهندسی نرم‌افزار ۱ | دانشگاه صنعتی امیرکبیر
        </p>
      </footer>
    </div>
  );
};

export default App;
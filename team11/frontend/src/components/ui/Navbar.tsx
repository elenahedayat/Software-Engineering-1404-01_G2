import React from 'react';

const Navbar: React.FC<{ isAuthenticated?: boolean }> = ({ isAuthenticated }) => {
  return (
    <header className="sticky top-0 z-[100] w-full bg-gradient-to-r from-forest-green to-persian-blue py-4 shadow-xl backdrop-blur-md">
      <div className="container mx-auto px-5 flex justify-between items-center">
        <div className="flex items-center gap-4 text-white">
          <i className="fa-solid fa-leaf text-3xl text-persian-gold drop-shadow-md"></i>
          <div className="flex flex-col">
            <h1 className="text-xl font-extrabold font-vazir leading-none">ایران‌نما</h1>
            <span className="text-xs opacity-90 font-light">سامانه هوشمند گردشگری</span>
          </div>
        </div>

        <div className="flex gap-3">
          {isAuthenticated ? (
            <button className="px-6 py-2 bg-[#FFE082] text-[#3e2723] rounded-full font-bold hover:bg-[#f7ba05] transition-transform hover:-translate-y-0.5 shadow-md">
              خروج
            </button>
          ) : (
            <>
              <a href="/auth" className="px-6 py-2 bg-[#FFE082] text-[#3e2723] rounded-full font-bold hover:bg-[#f7ba05] transition-transform hover:-translate-y-0.5 shadow-sm">
                ورود
              </a>
              <a href="/auth/signup" className="px-6 py-2 bg-persian-gold text-[#3e2723] rounded-full font-bold hover:bg-[#FFCA28] transition-all hover:-translate-y-0.5 shadow-[0_4px_12px_rgba(255,179,0,0.4)]">
                ثبت‌نام
              </a>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
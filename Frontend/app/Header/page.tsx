import Image from "next/image";
import Logo from "@/app/Images/logo.png";

export default function Header() {
  return (
    <header className="w-full bg-[#123985] text-white flex items-center px-6 py-4 shadow-md">
      
      {/* LEFT: Logo */}
      <div className="flex items-center">
        <div className="relative w-12 h-12">
          <Image
            src={Logo}
            alt="Logo"
            fill
            className="object-contain"
          />
        </div>
      </div>


      <div className="flex-1 text-center">
        <h1 className="text-xl md:text-2xl font-semibold tracking-wide">
          ENVIRONMENTAL RISK AND RESOURCE MANAGEMENT AI SYSTEM
        </h1>
        <p className="text-sm opacity-80 mt-1">
          Towards Smart Environment
        </p>
      </div>

      {/* RIGHT: Empty for symmetry */}
      <div className="w-12"></div>
    </header>
  );
}

import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Leaf } from "lucide-react";

export function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1B5E20] via-[#2E7D32] to-[#43A047] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-white/20 blur-3xl"></div>
        <div className="absolute bottom-32 right-20 w-80 h-80 rounded-full bg-white/20 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-48 h-48 rounded-full bg-white/10 blur-2xl"></div>
      </div>

      {/* Subtle leaf illustration */}
      <div className="absolute top-20 right-20 opacity-20">
        <Leaf className="w-48 h-48 text-white transform rotate-12" />
      </div>
      <div className="absolute bottom-32 left-20 opacity-15">
        <Leaf className="w-56 h-56 text-white transform -rotate-45" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center">
        <div className="flex items-center justify-center mb-8">
          <div className="bg-white/20 backdrop-blur-sm p-8 rounded-3xl">
            <Leaf className="w-32 h-32 text-white" />
          </div>
        </div>
        
        <h1 className="text-7xl font-bold text-white mb-6">
          EcoAudit AI
        </h1>
        
        <p className="text-3xl text-white/90 mb-3 font-medium">
          Smart Carbon Reporting for SMEs
        </p>
        
        <p className="text-xl text-white/80">
          Automated. Affordable. ESG-Ready.
        </p>

        {/* Loading indicator */}
        <div className="mt-16 flex justify-center">
          <div className="flex gap-3">
            <div className="w-3 h-3 bg-white/80 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
            <div className="w-3 h-3 bg-white/80 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
            <div className="w-3 h-3 bg-white/80 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

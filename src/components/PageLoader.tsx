import { useEffect, useState } from "react";
import { Zap } from "lucide-react";

export const PageLoader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white">
      <div className="text-center">
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-20 w-20 rounded-full border-4 border-electric-blue/20 animate-ping"></div>
          </div>
          <div className="relative flex items-center justify-center">
            <Zap className="h-16 w-16 text-electric-blue animate-electric-pulse" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-dark-gray animate-pulse">
          Voltify <span className="text-electric-blue">Innovation</span>
        </h2>
        <p className="text-sm text-muted-foreground mt-2">Loading...</p>
      </div>
    </div>
  );
};


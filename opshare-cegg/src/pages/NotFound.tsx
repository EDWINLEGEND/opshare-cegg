import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

// Add keyframes animations
const keyframesStyle = `
  @keyframes wiggle {
    0%, 100% { transform: translateX(-50%) rotate(-3deg); }
    50% { transform: translateX(-50%) rotate(3deg); }
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }
  
  @keyframes orbit {
    0% { transform: rotate(0deg) translateX(70px) rotate(0deg); }
    100% { transform: rotate(360deg) translateX(70px) rotate(-360deg); }
  }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  @keyframes meteor {
    0% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
    100% { transform: translate(-200px, 200px) rotate(-45deg); opacity: 0; }
  }
`;

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    // Log the 404 error
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );

    // Add keyframes animation dynamically
    const styleEl = document.createElement("style");
    styleEl.textContent = keyframesStyle;
    document.head.appendChild(styleEl);

    // Cleanup function to remove the style element when component unmounts
    return () => {
      document.head.removeChild(styleEl);
    };
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800 px-4 overflow-hidden">
      <div className="w-full max-w-3xl text-center relative z-10">
        {/* Interactive 404 Space Scene */}
        <div className="relative w-full h-80 sm:h-96 mb-8">
          {/* Main planet */}
          <div 
            className="absolute w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-gradient-to-br from-green-400 to-blue-600 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ 
              boxShadow: "inset -20px -20px 50px rgba(0,0,0,0.4), 0 0 20px rgba(0, 255, 200, 0.4)",
              animation: "float 6s ease-in-out infinite"
            }}
          >
            {/* Planet craters */}
            <div className="absolute w-8 h-8 rounded-full bg-opacity-20 bg-white top-6 left-6"></div>
            <div className="absolute w-12 h-12 rounded-full bg-opacity-10 bg-white bottom-10 right-8"></div>
            <div className="absolute w-6 h-6 rounded-full bg-opacity-15 bg-white top-1/2 right-4"></div>
            
            {/* Planet ring */}
            <div className="absolute w-72 h-16 rounded-full border-4 border-purple-300/30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{ transform: "rotateX(75deg)", boxShadow: "0 0 10px rgba(200, 150, 255, 0.5)" }}>
            </div>
          </div>
          
          {/* Orbiting satellite */}
          <div 
            className="absolute w-6 h-6 bg-white rounded-sm top-1/2 left-1/2"
            style={{ animation: "orbit 10s linear infinite" }}
          >
            <div className="w-10 h-1 bg-blue-400 absolute top-1/2 left-full -translate-y-1/2"></div>
          </div>
          
          {/* Floating astronaut */}
          <div 
            className="absolute w-12 h-16 right-1/3 top-1/4"
            style={{ animation: "float 5s ease-in-out infinite", animationDelay: "1s" }}
          >
            {/* Helmet */}
            <div className="w-8 h-8 rounded-full bg-white absolute top-0 left-1/2 -translate-x-1/2"></div>
            {/* Body */}
            <div className="w-10 h-12 rounded-lg bg-gray-200 absolute top-6 left-1/2 -translate-x-1/2"></div>
            {/* Backpack */}
            <div className="w-6 h-8 rounded-md bg-gray-300 absolute top-7 left-0 -translate-x-4"></div>
            {/* Arms */}
            <div className="w-8 h-2 bg-gray-200 absolute top-8 left-full -translate-x-1"></div>
            <div className="w-8 h-2 bg-gray-200 absolute top-12 left-0 -translate-x-4" 
              style={{ transform: "rotate(-20deg)" }}></div>
          </div>
          
          {/* Flying saucer */}
          <div 
            className="absolute left-1/4 bottom-1/4 w-20 h-5"
            style={{ animation: "float 4s ease-in-out infinite" }}
          >
            {/* Saucer top */}
            <div className="absolute w-10 h-5 bg-gray-400 rounded-full left-1/2 -translate-x-1/2 -top-2"></div>
            {/* Saucer body */}
            <div className="absolute w-20 h-5 bg-gradient-to-r from-gray-500 to-gray-400 rounded-full left-1/2 -translate-x-1/2"></div>
            {/* Saucer lights */}
            <div className="flex justify-around absolute w-16 left-1/2 -translate-x-1/2 bottom-0">
              <div className="w-2 h-2 bg-yellow-300 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-blue-300 rounded-full animate-pulse" style={{ animationDelay: "0.3s" }}></div>
              <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse" style={{ animationDelay: "0.6s" }}></div>
              <div className="w-2 h-2 bg-red-300 rounded-full animate-pulse" style={{ animationDelay: "0.9s" }}></div>
            </div>
            {/* Beam */}
            <div className="absolute w-4 bottom-0 left-1/2 -translate-x-1/2 h-8 bg-gradient-to-b from-green-300/60 to-transparent" style={{ clipPath: "polygon(0 0, 100% 0, 80% 100%, 20% 100%)" }}></div>
          </div>
          
          {/* 404 numbers with more dynamic animations */}
          <div className="absolute text-8xl sm:text-9xl font-black text-green-400/20 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ textShadow: "0 0 10px rgba(0, 200, 150, 0.3)", animation: "float 8s ease-in-out infinite" }}>
            404
          </div>
          
          {/* Shooting stars/meteors */}
          {Array.from({ length: 3 }).map((_, i) => (
            <div 
              key={`meteor-${i}`}
              className="absolute w-20 h-1 bg-gradient-to-r from-white to-transparent right-0 top-0"
              style={{ 
                animation: "meteor 2s linear infinite",
                animationDelay: `${i * 1.5}s`, 
                top: `${10 + i * 25}%`,
                right: `${10 + i * 10}%`
              }}
            ></div>
          ))}
          
          {/* Spinning stars */}
          {Array.from({ length: 5 }).map((_, i) => (
            <div 
              key={`spinning-star-${i}`}
              className="absolute"
              style={{ 
                top: `${Math.random() * 80}%`, 
                left: `${Math.random() * 80}%`,
                animation: `spin ${3 + Math.random() * 5}s linear infinite`
              }}
            >
              <div className="text-xl text-yellow-300">★</div>
            </div>
          ))}
        </div>
        
        <h1 className="text-7xl sm:text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-6 animate-pulse" style={{ animationDuration: "3s" }}>
          404
        </h1>
        
        <div className="space-y-4 max-w-lg mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Houston, we have a problem
          </h2>
          <p className="text-lg text-gray-300">
            The page you're looking for has drifted into deep space or doesn't exist in this galaxy.
          </p>
        </div>
        
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            variant="outline"
            className="group bg-transparent border-green-500 text-green-400 hover:bg-green-950/30"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Go Back
          </Button>
          
          <Button asChild className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600">
            <Link to="/" className="group">
              <Home className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
              Return Home
            </Link>
          </Button>
        </div>
        
        <div className="mt-8 text-gray-400 text-sm">
          Error ID: {Math.random().toString(36).substr(2, 9)}
        </div>
      </div>
      
      {/* Stars in the background with more variety */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 100 }).map((_, i) => (
          <div 
            key={i}
            className={`absolute rounded-full ${i % 5 === 0 ? 'w-1.5 h-1.5 bg-blue-300' : i % 3 === 0 ? 'w-1 h-1 bg-yellow-200' : 'w-px h-px bg-white'}`}
            style={{ 
              top: `${Math.random() * 100}%`, 
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.8 + 0.2,
              animationDuration: `${2 + Math.random() * 3}s`,
              animation: i % 7 === 0 ? 'ping 4s cubic-bezier(0, 0, 0.2, 1) infinite' : 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default NotFound;

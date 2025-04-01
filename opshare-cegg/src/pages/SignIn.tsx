import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { getApiUrl } from '@/config/api';
import { ArrowRight, LogIn, AlertCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const response = await fetch(getApiUrl('api/auth/login'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }
      
      // Call the login function from context with the real user data
      login({
        id: data.user.id || data.user._id,
        name: `${data.user.firstName} ${data.user.lastName}`,
        email: data.user.email,
        token: data.token,
        isAdmin: email.endsWith('@opshare.com'),
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.user.firstName + ' ' + data.user.lastName)}&background=0D8ABC&color=fff`
      });
      
      console.log('Login successful:', {
        id: data.user.id || data.user._id,
        firstName: data.user.firstName,
        lastName: data.user.lastName,
        email: data.user.email
      });
      
      // Redirect to dashboard
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Illustration Side */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-b from-green-600 to-green-800 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-green-400 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob"></div>
          <div className="absolute top-40 -right-20 w-80 h-80 bg-emerald-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-40 left-20 w-80 h-80 bg-teal-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="relative z-10 flex flex-col items-center justify-center p-12 w-full">
          <div className="w-full max-w-md">
            <h1 className="text-4xl font-bold mb-6">Welcome Back!</h1>
            <p className="text-lg text-green-100 mb-8">Sign in to access your account and continue your journey with sustainable sharing.</p>
            
            {/* Illustration */}
            <div className="relative h-64 sm:h-80 mb-8">
              {/* Enhanced Eco-Sharing Illustration */}
              <div className="absolute inset-0 w-full h-full">
                {/* Glowing background circle */}
                <div className="absolute w-48 h-48 bg-green-500/10 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-md animate-pulse" style={{ animationDuration: '4s' }}></div>
                
                {/* Animated Earth with 3D effect */}
                <div className="absolute w-36 h-36 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden animate-spin-slow shadow-[inset_0_0_15px_rgba(0,0,0,0.3)]" style={{ animationDuration: '30s' }}>
                  {/* Ocean shine */}
                  <div className="absolute w-full h-full bg-gradient-to-t from-transparent to-white/10"></div>
                  
                  {/* Continents */}
                  <div className="absolute w-14 h-12 bg-green-500 rounded-full top-4 left-6 shadow-sm"></div>
                  <div className="absolute w-16 h-8 bg-green-500 rounded-full top-20 left-18"></div>
                  <div className="absolute w-10 h-7 bg-green-500 rounded-full top-8 left-24"></div>
                  <div className="absolute w-8 h-8 bg-green-500 rounded-full bottom-6 right-8"></div>
                  <div className="absolute w-10 h-4 bg-green-500 rounded-full bottom-14 right-4"></div>
                  
                  {/* Cloud layers - subtle white swirls */}
                  <div className="absolute w-24 h-8 bg-white/20 rounded-full top-2 left-0 rotate-12 blur-sm"></div>
                  <div className="absolute w-20 h-6 bg-white/20 rounded-full bottom-8 right-0 -rotate-12 blur-sm"></div>
                </div>
                
                {/* Orbiting elements */}
                <div className="absolute w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin-slow" style={{ animationDuration: '15s' }}>
                  <div className="absolute w-10 h-10 bg-gradient-to-br from-blue-300 to-blue-500 rounded-full left-0 top-1/2 -translate-y-1/2 -translate-x-16 shadow-md flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full bg-blue-200/50 animate-pulse"></div>
                  </div>
                </div>
                
                <div className="absolute w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin-slow" style={{ animationDuration: '20s', animationDirection: 'reverse' }}>
                  <div className="absolute w-8 h-8 bg-gradient-to-br from-purple-300 to-purple-500 rounded-full right-4 top-1/2 -translate-y-1/2 translate-x-16 shadow-md"></div>
                </div>
                
                {/* People sharing items - more detailed */}
                <div className="absolute left-1/4 top-1/2 -translate-y-1/2 flex">
                  {/* Person with gradient and shadow */}
                  <div className="w-10 h-10 rounded-full bg-gradient-to-b from-amber-100 to-amber-200 flex items-center justify-center animate-float shadow-md z-10" style={{ animationDuration: '3s' }}>
                    <div className="w-6 h-6 rounded-full bg-gradient-to-b from-indigo-500 to-indigo-700 flex items-center justify-center text-white font-bold text-xs">P</div>
                  </div>
                  
                  {/* Connecting line */}
                  <div className="w-10 h-1 bg-green-300 ml-1 mr-1 self-center animate-pulse z-0"></div>
                  
                  {/* Shared item - more detailed object */}
                  <div className="w-8 h-8 bg-gradient-to-br from-yellow-300 to-amber-400 rounded-md flex items-center justify-center animate-float shadow-lg" style={{ animationDuration: '2s', animationDelay: '0.5s' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8" />
                    </svg>
                  </div>
                </div>
                
                {/* Another person */}
                <div className="absolute right-1/4 top-1/2 -translate-y-1/2 flex">
                  {/* Shared item - tool */}
                  <div className="w-9 h-9 bg-gradient-to-br from-green-300 to-green-500 rounded-md flex items-center justify-center animate-float shadow-lg" style={{ animationDuration: '3s', animationDelay: '0.3s' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                    </svg>
                  </div>
                  
                  {/* Connecting line */}
                  <div className="w-10 h-1 bg-green-300 ml-1 mr-1 self-center animate-pulse z-0"></div>
                  
                  {/* Person with gradient and shadow */}
                  <div className="w-10 h-10 rounded-full bg-gradient-to-b from-amber-100 to-amber-200 flex items-center justify-center animate-float shadow-md z-10" style={{ animationDuration: '4s', animationDelay: '1s' }}>
                    <div className="w-6 h-6 rounded-full bg-gradient-to-b from-pink-500 to-pink-700 flex items-center justify-center text-white font-bold text-xs">S</div>
                  </div>
                </div>
                
                {/* Enhanced floating eco icons with effects */}
                <div className="absolute left-1/4 top-1/4 animate-float-rotate" style={{ animationDuration: '7s' }}>
                  <div className="w-10 h-10 rounded-full bg-green-500/20 backdrop-blur-sm flex items-center justify-center">
                    <span className="text-2xl">♻️</span>
                  </div>
                </div>
                
                <div className="absolute right-1/3 bottom-1/4 animate-float-rotate" style={{ animationDuration: '8s', animationDelay: '1s' }}>
                  <div className="w-9 h-9 rounded-full bg-green-500/20 backdrop-blur-sm flex items-center justify-center">
                    <span className="text-xl">🌱</span>
                  </div>
                </div>
                
                <div className="absolute right-1/4 top-1/4 animate-float-rotate" style={{ animationDuration: '9s', animationDelay: '2s' }}>
                  <div className="w-11 h-11 rounded-full bg-blue-500/20 backdrop-blur-sm flex items-center justify-center">
                    <span className="text-2xl">🌍</span>
                  </div>
                </div>
                
                {/* Additional floating sustainability elements */}
                <div className="absolute left-1/3 bottom-1/4 animate-float" style={{ animationDuration: '5s', animationDelay: '1.5s' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-300" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                
                {/* Light particles */}
                <div className="particles absolute inset-0">
                  {Array.from({ length: 12 }).map((_, index) => (
                    <div
                      key={index}
                      className="absolute w-1 h-1 bg-white rounded-full animate-ping-slow"
                      style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        animationDuration: `${2 + Math.random() * 3}s`,
                        animationDelay: `${Math.random() * 2}s`,
                        opacity: 0.6
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-green-700/30 p-6 rounded-xl backdrop-blur-sm border border-white/10">
              <h3 className="font-semibold text-xl mb-3 flex items-center">
                <div className="w-8 h-8 bg-green-500/30 rounded-full flex items-center justify-center mr-2">
                  <LogIn className="h-4 w-4" />
                </div>
                Join our community
              </h3>
              <p className="text-green-100">Share resources, reduce waste, and build a more sustainable future together.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Sign In Form Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-16 bg-white">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
              Sign in to your account
            </h2>
            <p className="mt-2 text-gray-600">
              Enter your details below to access your account
            </p>
          </div>
          
          {error && (
            <Alert variant="destructive" className="bg-red-50 border-red-200">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700">Email address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="name@example.com"
                  className="w-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder="••••••••"
                  className="w-full"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember" className="text-sm text-gray-600">
                  Remember me
                </Label>
              </div>

              <div className="text-sm">
                <Link to="/forgot-password" className="font-medium text-green-600 hover:text-green-800">
                  Forgot your password?
                </Link>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-green-600 hover:bg-green-700 text-white"
              disabled={isLoading}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            
            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                Don't have an account yet?{' '}
                <Link to="/signup" className="font-medium text-green-600 hover:text-green-800">
                  Create account
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      
      {/* Custom animation classes */}
      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -20px) scale(1.1); }
          50% { transform: translate(0, 20px) scale(1); }
          75% { transform: translate(-20px, -20px) scale(0.9); }
        }
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float-rotate {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(10deg); }
        }
        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.5); opacity: 0.3; }
          100% { transform: scale(1); opacity: 0.6; }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
        .animate-float-rotate {
          animation: float-rotate 7s ease-in-out infinite;
        }
        .animate-ping-slow {
          animation: ping-slow 3s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-3000 {
          animation-delay: 3s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
};

export default SignIn;

import React, { useState } from 'react';
import { ArrowRight, UserPlus, AlertCircle, Leaf, Heart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { getApiUrl } from '@/config/api';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(getApiUrl('api/auth/register'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Sign up failed');

      navigate('/signin');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
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
            <h1 className="text-4xl font-bold mb-6">Join Our Community</h1>
            <p className="text-lg text-green-100 mb-8">Create an account to start sharing resources, reduce waste, and make a positive impact on the environment.</p>
            
            {/* Illustration */}
            <div className="relative h-64 sm:h-80 mb-8">
              {/* Enhanced Community Illustration */}
              <div className="absolute inset-0 w-full h-full">
                {/* Glowing background effects */}
                <div className="absolute w-48 h-48 bg-gradient-to-br from-green-400/20 to-emerald-300/20 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-xl"></div>
                <div className="absolute w-32 h-32 bg-gradient-to-tl from-amber-300/20 to-yellow-200/20 rounded-full top-1/3 left-1/3 blur-xl animate-pulse" style={{ animationDuration: '5s' }}></div>
                
                {/* Digital ground/landscape */}
                <div className="absolute w-full h-16 bg-gradient-to-r from-green-800 via-green-700 to-green-800 bottom-0 rounded-t-3xl shadow-inner overflow-hidden">
                  {/* Grass texture */}
                  <div className="absolute inset-0 flex items-end">
                    {Array.from({ length: 24 }).map((_, index) => (
                      <div 
                        key={index}
                        className="relative h-3 w-2 bg-green-500 mx-0.5 rounded-t-full"
                        style={{ height: `${6 + Math.random() * 7}px` }}  
                      ></div>
                    ))}
                  </div>
                </div>
                
                {/* Enhanced tree with depth and detail */}
                <div className="absolute left-1/2 bottom-0 -translate-x-1/2 flex flex-col items-center">
                  {/* Tree trunk with texture */}
                  <div className="relative w-7 h-28 bg-gradient-to-r from-amber-800 to-amber-700 rounded-md overflow-hidden">
                    {/* Trunk texture */}
                    <div className="absolute inset-0">
                      <div className="absolute left-1 top-6 w-5 h-1 bg-amber-900/30 rounded-full"></div>
                      <div className="absolute left-2 top-12 w-3 h-1 bg-amber-900/30 rounded-full"></div>
                      <div className="absolute left-1 top-18 w-4 h-1 bg-amber-900/30 rounded-full"></div>
                      <div className="absolute left-2 top-24 w-3 h-1 bg-amber-900/30 rounded-full"></div>
                    </div>
                  </div>
                  
                  {/* Tree leaves/foliage with layers for depth */}
                  <div className="w-36 h-36 bg-gradient-to-b from-green-400 to-green-600 rounded-full -mt-20 shadow-lg">
                    <div className="w-full h-full rounded-full relative overflow-hidden animate-pulse" style={{ animationDuration: '7s' }}>
                      {/* Leaf texture */}
                      <div className="absolute top-1/2 left-1/2 w-24 h-24 -translate-x-1/2 -translate-y-1/2 bg-green-300/20 rounded-full blur-sm"></div>
                      <div className="absolute top-6 left-7 w-5 h-5 bg-green-300/20 rounded-full blur-sm"></div>
                      <div className="absolute bottom-8 right-9 w-6 h-6 bg-green-300/20 rounded-full blur-sm"></div>
                    </div>
                  </div>
                  
                  <div className="w-28 h-28 bg-gradient-to-b from-green-500 to-green-700 rounded-full -mt-42 ml-12 shadow-lg">
                    <div className="w-full h-full rounded-full relative overflow-hidden animate-pulse" style={{ animationDuration: '5s', animationDelay: '0.5s' }}>
                      {/* Leaf texture */}
                      <div className="absolute top-1/2 left-1/2 w-16 h-16 -translate-x-1/2 -translate-y-1/2 bg-green-400/20 rounded-full blur-sm"></div>
                    </div>
                  </div>
                  
                  <div className="w-24 h-24 bg-gradient-to-b from-green-600 to-green-800 rounded-full -mt-16 -ml-14 shadow-lg">
                    <div className="w-full h-full rounded-full relative overflow-hidden animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }}>
                      {/* Leaf texture */}
                      <div className="absolute top-1/2 left-1/2 w-14 h-14 -translate-x-1/2 -translate-y-1/2 bg-green-500/20 rounded-full blur-sm"></div>
                    </div>
                  </div>
                  
                  {/* Tree-top effects - sun rays and particles */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-16 h-16 bg-yellow-300/30 rounded-full blur-md animate-pulse"></div>
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div 
                        key={i} 
                        className="absolute w-1 h-1 bg-yellow-200 rounded-full animate-ping-slow"
                        style={{
                          top: `${Math.random() * 30}px`,
                          left: `${Math.random() * 30 - 15}px`,
                          animationDuration: `${1 + Math.random() * 2}s`,
                          animationDelay: `${Math.random() * 1}s`
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
                
                {/* Enhanced community members around the tree */}
                <div className="absolute w-full" style={{ bottom: '20px' }}>
                  {/* Person 1 - more detailed with shadow and effects */}
                  <div className="absolute -left-4 bottom-6 flex flex-col items-center animate-float-person" style={{ animationDuration: '4s' }}>
                    <div className="relative">
                      {/* Head with shadow */}
                      <div className="w-10 h-10 bg-gradient-to-b from-orange-100 to-orange-200 rounded-full flex items-center justify-center shadow-md">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-xs">A</div>
                      </div>
                      
                      {/* Simple body */}
                      <div className="absolute w-6 h-6 bg-blue-500 -bottom-4 left-1/2 -translate-x-1/2 rounded-lg z-[-1]"></div>
                    </div>
                    
                    {/* Held object with glow effect */}
                    <div className="mt-2 relative">
                      <div className="absolute inset-0 bg-green-400/30 rounded-full blur-md animate-pulse"></div>
                      <Leaf className="h-5 w-5 text-green-400 relative z-10 animate-float-rotate" style={{ animationDuration: '3s' }} />
                    </div>
                  </div>
                  
                  {/* Person 2 - with heart */}
                  <div className="absolute left-16 bottom-12 flex flex-col items-center animate-float-person" style={{ animationDuration: '3.5s', animationDelay: '0.5s' }}>
                    <div className="relative">
                      <div className="w-10 h-10 bg-gradient-to-b from-orange-100 to-orange-200 rounded-full flex items-center justify-center shadow-md">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-pink-500 to-pink-700 flex items-center justify-center text-white font-bold text-xs">B</div>
                      </div>
                      <div className="absolute w-6 h-6 bg-pink-500 -bottom-4 left-1/2 -translate-x-1/2 rounded-lg z-[-1]"></div>
                    </div>
                    <div className="mt-2 relative">
                      <div className="absolute inset-0 bg-red-400/30 rounded-full blur-md animate-pulse" style={{ animationDuration: '2s' }}></div>
                      <Heart className="h-5 w-5 text-red-400 relative z-10 animate-beat" />
                    </div>
                  </div>
                  
                  {/* Person 3 - with box */}
                  <div className="absolute right-16 bottom-10 flex flex-col items-center animate-float-person" style={{ animationDuration: '4.5s', animationDelay: '0.7s' }}>
                    <div className="relative">
                      <div className="w-10 h-10 bg-gradient-to-b from-orange-100 to-orange-200 rounded-full flex items-center justify-center shadow-md">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-white font-bold text-xs">C</div>
                      </div>
                      <div className="absolute w-6 h-6 bg-amber-500 -bottom-4 left-1/2 -translate-x-1/2 rounded-lg z-[-1]"></div>
                    </div>
                    <div className="mt-2 relative">
                      <div className="absolute inset-0 bg-yellow-400/30 rounded-full blur-md animate-pulse" style={{ animationDuration: '2.5s' }}></div>
                      <div className="w-6 h-6 bg-gradient-to-br from-yellow-300 to-amber-400 rounded relative z-10 flex items-center justify-center text-amber-800 animate-float-rotate" style={{ animationDuration: '3s' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="4" y="4" width="16" height="16" rx="2" />
                          <path d="M4 12h16" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  {/* Person 4 - with eco icon */}
                  <div className="absolute -right-2 bottom-4 flex flex-col items-center animate-float-person" style={{ animationDuration: '3.2s', animationDelay: '1s' }}>
                    <div className="relative">
                      <div className="w-10 h-10 bg-gradient-to-b from-orange-100 to-orange-200 rounded-full flex items-center justify-center shadow-md">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center text-white font-bold text-xs">D</div>
                      </div>
                      <div className="absolute w-6 h-6 bg-green-500 -bottom-4 left-1/2 -translate-x-1/2 rounded-lg z-[-1]"></div>
                    </div>
                    <div className="mt-2 relative">
                      <div className="absolute inset-0 bg-green-400/30 rounded-full blur-md animate-pulse" style={{ animationDuration: '2.2s' }}></div>
                      <div className="text-xl relative z-10 animate-float-rotate" style={{ animationDuration: '4s' }}>♻️</div>
                    </div>
                  </div>
                </div>
                
                {/* Enhanced floating elements with glow effects */}
                <div className="absolute left-1/4 top-1/4 animate-float-rotate" style={{ animationDuration: '7s' }}>
                  <div className="relative">
                    <div className="absolute inset-0 bg-green-400/20 rounded-full blur-md"></div>
                    <div className="text-2xl relative z-10">🌱</div>
                  </div>
                </div>
                
                <div className="absolute right-1/3 top-1/5 animate-float-rotate" style={{ animationDuration: '8.5s' }}>
                  <div className="relative">
                    <div className="absolute inset-0 bg-green-400/20 rounded-full blur-md"></div>
                    <div className="text-2xl relative z-10">🌿</div>
                  </div>
                </div>
                
                <div className="absolute right-1/4 top-1/3 animate-float-rotate" style={{ animationDuration: '9s', animationDelay: '1s' }}>
                  <div className="relative">
                    <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-md"></div>
                    <div className="text-2xl relative z-10">🌎</div>
                  </div>
                </div>
                
                <div className="absolute left-1/3 top-2/3 animate-float-rotate" style={{ animationDuration: '8s', animationDelay: '0.5s' }}>
                  <div className="relative">
                    <div className="absolute inset-0 bg-green-400/20 rounded-full blur-md"></div>
                    <div className="text-2xl relative z-10">♻️</div>
                  </div>
                </div>
                
                {/* Additional decorative elements */}
                <div className="absolute top-1/4 right-1/4 animate-float" style={{ animationDuration: '6s' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                    <path d="M2 12h20" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </div>
                
                {/* Light particles */}
                <div className="particles absolute inset-0">
                  {Array.from({ length: 15 }).map((_, index) => (
                    <div
                      key={index}
                      className="absolute w-1 h-1 bg-white rounded-full animate-ping-slow"
                      style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        animationDuration: `${2 + Math.random() * 3}s`,
                        animationDelay: `${Math.random() * 2}s`,
                        opacity: 0.5
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-green-700/30 p-6 rounded-xl backdrop-blur-sm border border-white/10">
              <h3 className="font-semibold text-xl mb-3 flex items-center">
                <div className="w-8 h-8 bg-green-500/30 rounded-full flex items-center justify-center mr-2">
                  <UserPlus className="h-4 w-4" />
                </div>
                Why join OpShare?
              </h3>
              <ul className="text-green-100 space-y-2">
                <li className="flex items-start">
                  <div className="h-5 w-5 mr-2 flex-shrink-0 text-green-300">•</div>
                  <span>Reduce environmental impact through sharing</span>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 mr-2 flex-shrink-0 text-green-300">•</div>
                  <span>Save money by borrowing instead of buying</span>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 mr-2 flex-shrink-0 text-green-300">•</div>
                  <span>Connect with like-minded people in your community</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Sign Up Form Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-16 bg-white">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
              Create an account
            </h2>
            <p className="mt-2 text-gray-600">
              Join our community and start sharing resources
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
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <div className="space-y-2 w-full">
                  <Label htmlFor="firstName" className="text-gray-700">First Name</Label>
                  <Input 
                    id="firstName"
                name="firstName" 
                type="text" 
                required 
                    placeholder="John"
                    className="w-full"
                onChange={handleChange} 
              />
                </div>
                <div className="space-y-2 w-full">
                  <Label htmlFor="lastName" className="text-gray-700">Last Name</Label>
                  <Input 
                    id="lastName"
                name="lastName" 
                type="text" 
                required 
                    placeholder="Doe"
                    className="w-full"
                onChange={handleChange} 
              />
            </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700">Email address</Label>
                <Input 
                  id="email"
              name="email" 
              type="email" 
              required 
                  placeholder="name@example.com"
                  className="w-full"
              onChange={handleChange} 
            />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700">Password</Label>
                <Input 
                  id="password"
              name="password" 
              type="password" 
              required 
                  placeholder="••••••••"
                  className="w-full"
              onChange={handleChange} 
            />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-gray-700">Confirm Password</Label>
                <Input 
                  id="confirmPassword"
              name="confirmPassword" 
              type="password" 
              required 
                  placeholder="••••••••"
                  className="w-full"
              onChange={handleChange} 
            />
              </div>
          </div>

            <Button 
            type="submit" 
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            disabled={loading}
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Account...
              </>
            ) : (
              <>Create Account <ArrowRight className="ml-2 h-4 w-4" /></>
            )}
            </Button>

            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                Already have an account? <Link to="/signin" className="font-medium text-green-600 hover:text-green-800">Sign in</Link>
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
        @keyframes float-person {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes beat {
          0%, 100% { transform: scale(1); }
          25% { transform: scale(1.2); }
          40% { transform: scale(0.9); }
          60% { transform: scale(1.1); }
        }
        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.5); opacity: 0.3; }
          100% { transform: scale(1); opacity: 0.5; }
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
        .animate-float-person {
          animation: float-person 4s ease-in-out infinite;
        }
        .animate-beat {
          animation: beat 2s ease-in-out infinite;
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
        .-mt-42 {
          margin-top: -10.5rem;
        }
      `}</style>
    </div>
  );
};

export default SignUp;

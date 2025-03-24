import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

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
      const response = await fetch('http://localhost:5000/api/auth/signup', {
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Create an account</h2>
          <p className="mt-2 text-sm text-gray-600">Join our community and start sharing resources</p>
        </div>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div className="flex gap-4">
              <input name="firstName" type="text" required placeholder="First Name"
                className="appearance-none rounded-lg block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500"
                onChange={handleChange} />
              <input name="lastName" type="text" required placeholder="Last Name"
                className="appearance-none rounded-lg block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500"
                onChange={handleChange} />
            </div>
            <input name="email" type="email" required placeholder="Email address"
              className="appearance-none rounded-lg block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500"
              onChange={handleChange} />
            <input name="password" type="password" required placeholder="Password"
              className="appearance-none rounded-lg block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500"
              onChange={handleChange} />
            <input name="confirmPassword" type="password" required placeholder="Confirm Password"
              className="appearance-none rounded-lg block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500"
              onChange={handleChange} />
          </div>

          <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700"
            disabled={loading}>
            {loading ? 'Signing Up...' : 'Create Account'} <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </form>

        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account? <Link to="/signin" className="font-medium text-green-600 hover:text-green-500">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Lock, Mail, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import toast from 'react-hot-toast';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional(),
});

type LoginForm = z.infer<typeof loginSchema>;

export const LoginPage: React.FC = () => {
  const { login, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      await login(data.email, data.password);
      toast.success('Welcome back!');
    } catch (error) {
      toast.error('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-12 w-12 bg-primary-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">BW</span>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            BronxWorks Program Closure System
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <Input
              {...register('email')}
              type="email"
              label="Email address"
              placeholder="Enter your email"
              leftIcon={<Mail />}
              error={errors.email?.message}
              autoComplete="email"
              required
            />

            <Input
              {...register('password')}
              type={showPassword ? 'text' : 'password'}
              label="Password"
              placeholder="Enter your password"
              leftIcon={<Lock />}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              }
              error={errors.password?.message}
              autoComplete="current-password"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                {...register('rememberMe')}
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-primary-600 hover:text-primary-500"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            loading={isLoading}
            disabled={isLoading}
          >
            Sign in
          </Button>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-50 text-gray-500">Demo Accounts</span>
              </div>
            </div>

            <div className="mt-4 space-y-2 text-sm text-gray-600">
              <div className="bg-blue-50 p-3 rounded-md">
                <p className="font-medium">Program Director:</p>
                <p>Email: director@bronxworks.org</p>
                <p>Password: password123</p>
              </div>
              <div className="bg-green-50 p-3 rounded-md">
                <p className="font-medium">IT Operations:</p>
                <p>Email: it.admin@bronxworks.org</p>
                <p>Password: password123</p>
              </div>
              <div className="bg-purple-50 p-3 rounded-md">
                <p className="font-medium">Administrator:</p>
                <p>Email: admin@bronxworks.org</p>
                <p>Password: password123</p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
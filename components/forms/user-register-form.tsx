'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { InputPassword } from '@/components/ui/input-password';
import { FetchClient } from '@/service/fetch-client';

export default function UserRegisterForm({
  isAdmin = false
}: {
  isAdmin?: boolean;
}) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const router = useRouter();

  const validateForm = () => {
    const { fullName, email, password } = formData;

    if (!fullName) {
      toast({
        title: 'Error',
        description: 'Full name is required.',
        variant: 'destructive'
      });
      return false;
    }

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      toast({
        title: 'Error',
        description: 'Invalid email address.',
        variant: 'destructive'
      });
      return false;
    }

    if (!password || password.length < 6) {
      toast({
        title: 'Error',
        description: 'Password must be at least 6 characters long.',
        variant: 'destructive'
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      await FetchClient('auth/register', {
        method: 'POST',
        body: JSON.stringify(formData)
      });

      toast({
        title: 'Registration successful!',
        description: 'You can now sign in.',
        variant: 'success'
      });
      router.push(isAdmin ? '/dashboard/accounts/' : '/auth/sign-in');
    } catch (error: any) {
      toast({
        title: 'Registration failed',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-2">
      {/* Full Name Field */}
      <div>
        <label htmlFor="fullName" className="sr-only">
          Full Name
        </label>
        <Input
          id="fullName"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          disabled={loading}
        />
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="sr-only">
          Email
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          disabled={loading}
        />
      </div>

      {/* Password Field */}
      <div>
        <label htmlFor="password" className="sr-only">
          Password
        </label>
        <InputPassword
          id="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          disabled={loading}
        />
      </div>

      {!isAdmin && (
        <div className="flex flex-row justify-end">
          <Link href="/auth/sign-in" className="text-sm italic underline">
            Already have an account?
          </Link>
        </div>
      )}

      <Button disabled={loading} className="ml-auto w-full" type="submit">
        Register
      </Button>
    </form>
  );
}

'use client';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { InputPassword } from '@/components/ui/input-password';

export default function UserAuthForm() {
  const [formValues, setFormValues] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { email, password } = formValues;
    if (!email) {
      toast({
        title: 'Error',
        description: 'Email is required',
        variant: 'destructive'
      });
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast({
        title: 'Error',
        description: 'Invalid email format',
        variant: 'destructive'
      });
      return false;
    }
    if (!password) {
      toast({
        title: 'Error',
        description: 'Password is required',
        variant: 'destructive'
      });
      return false;
    }
    if (password.length < 6) {
      toast({
        title: 'Error',
        description: 'Password must be at least 6 characters long',
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
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formValues)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || 'An error occurred while logging in'
        );
      }

      const { data } = await response.json();
      localStorage.setItem(
        'user',
        JSON.stringify({
          ...data,
          token: null
        })
      );
      localStorage.setItem('token', data.token);

      toast({ title: 'Success', description: 'Login successful!' });

      if (data.role === 'admin')
        return router.push('/dashboard', { scroll: false });
      router.push('/dashboard', { scroll: false });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-2">
      <div>
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={formValues.email}
          onChange={handleChange}
          disabled={loading}
        />
      </div>
      <div>
        <InputPassword
          name="password"
          placeholder="Password"
          value={formValues.password}
          onChange={handleChange}
          disabled={loading}
        />
      </div>
      <div className="flex flex-row justify-end">
        <Link href="/auth/register" className="text-sm italic underline">
          Don't have an account?
        </Link>
      </div>
      <Button disabled={loading} className="ml-auto w-full" type="submit">
        Login
      </Button>
    </form>
  );
}

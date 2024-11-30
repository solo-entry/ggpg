'use client';
import { useState } from 'react';
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { email, password } = formValues;
    if (!email) {
      toast({
        title: 'Lỗi',
        description: 'Email không được để trống',
        variant: 'destructive'
      });
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast({
        title: 'Lỗi',
        description: 'Email không hợp lệ',
        variant: 'destructive'
      });
      return false;
    }
    if (!password) {
      toast({
        title: 'Lỗi',
        description: 'Mật khẩu không được để trống',
        variant: 'destructive'
      });
      return false;
    }
    if (password.length < 6) {
      toast({
        title: 'Lỗi',
        description: 'Mật khẩu cần ít nhất 6 ký tự',
        variant: 'destructive'
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
        throw new Error(errorData.message || 'Có lỗi xảy ra khi đăng nhập');
      }

      const { data } = await response.json();
      localStorage.setItem(
        'user',
        JSON.stringify({
          email: data.email,
          fullName: data.fullName,
          role: data.role
        })
      );
      localStorage.setItem('token', data.token);

      toast({ title: 'Thành công', description: 'Đăng nhập thành công!' });

      router.push('/dashboard', { scroll: false });
    } catch (error: any) {
      toast({
        title: 'Có lỗi xảy ra',
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
          placeholder="Mật khẩu"
          value={formValues.password}
          onChange={handleChange}
          disabled={loading}
        />
      </div>
      <div className="flex flex-row justify-end">
        <Link href="/auth/register" className="text-sm italic underline">
          Bạn chưa có tài khoản?
        </Link>
      </div>
      <Button disabled={loading} className="ml-auto w-full" type="submit">
        Đăng nhập
      </Button>
    </form>
  );
}

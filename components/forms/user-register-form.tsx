'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { fetchClient } from '@/service/fetch-client';
import { useRouter } from 'next/navigation';
import { InputPassword } from '@/components/ui/input-password';

export default function UserRegisterForm() {
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
        title: 'Lỗi',
        description: 'Cần nhập họ và tên.',
        variant: 'destructive'
      });
      return false;
    }

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      toast({
        title: 'Lỗi',
        description: 'Email không hợp lệ.',
        variant: 'destructive'
      });
      return false;
    }

    if (!password || password.length < 6) {
      toast({
        title: 'Lỗi',
        description: 'Mật khẩu cần ít nhất 6 kí tự.',
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
      await fetchClient('auth/register', {
        method: 'POST',
        body: JSON.stringify(formData)
      });

      toast({
        title: 'Đăng ký thành công!',
        description: 'Bạn có thể đăng nhập ngay bây giờ.',
        variant: 'success'
      });
      router.push('/auth/sign-in');
    } catch (error: any) {
      toast({
        title: 'Đăng ký thất bại',
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
        <label htmlFor="fullName" className="sr-only">
          Họ và tên
        </label>
        <Input
          id="fullName"
          name="fullName"
          placeholder="Họ và tên"
          value={formData.fullName}
          onChange={handleChange}
          disabled={loading}
        />
      </div>

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
          Mật khẩu
        </label>
        <InputPassword
          id="password"
          name="password"
          placeholder="Mật khẩu"
          value={formData.password}
          onChange={handleChange}
          disabled={loading}
        />
      </div>

      {/* Footer */}
      <div className="flex flex-row justify-end">
        <Link href="/auth/sign-in" className="text-sm italic underline">
          Bạn đã có tài khoản?
        </Link>
      </div>

      <Button disabled={loading} className="ml-auto w-full" type="submit">
        Đăng ký
      </Button>
    </form>
  );
}

import { Metadata } from 'next';
import UserAuthForm from '@/components/forms/user-auth-form';
import Image from 'next/image';
import Logo from '@/app/assets/logo.png';

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Authentication forms built using the components.'
};

export default function AuthenticationPage() {
  return (
    <div className="relative flex h-screen items-center justify-center">
      <div className="container flex h-fit max-w-[350px] -translate-y-20 flex-col items-center justify-center space-y-6 px-0">
        <Image src={Logo} width={196} height={80} alt="logo" />
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-2xl font-semibold">Đăng nhập</h2>
          <p className="text-sm font-normal text-muted-foreground">
            Vui lòng nhập thông tin
          </p>
        </div>
        <UserAuthForm />
        <div className="text-center text-sm font-normal text-muted-foreground">
          Bạn đang đăng nhập vào trang quản lý <br />
          cơ sở dịch vụ kinh doanh Internet
        </div>
      </div>
    </div>
  );
}
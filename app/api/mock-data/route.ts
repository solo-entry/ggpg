import { NextResponse } from 'next/server';
import { faker } from '@faker-js/faker';

// Interface cho dữ liệu của cơ sở
interface Agency {
  ID: string;
  tenDangKy: string;
  chuCoSo: string;
  soDienThoai: string;
  diaChi: string;
  mst: string;
  trangThai: string;
}

// Hàm tạo dữ liệu giả
const generateMockData = (page: number, limit: number): Agency[] => {
  const data: Agency[] = [];
  const startId = (page - 1) * limit + 1;

  for (let i = 0; i < limit; i++) {
    data.push({
      ID: `NET-${startId + i}`,
      tenDangKy: faker.company.name(),
      chuCoSo: faker.person.fullName(),
      soDienThoai: faker.phone.number({ style: 'national' }),
      diaChi:
        faker.location.streetAddress() +
        ', ' +
        faker.location.city() +
        ', ' +
        faker.location.state(),
      mst: faker.finance.accountNumber(10),
      trangThai: faker.helpers.arrayElement(['Hoạt động', 'Ngừng hoạt động'])
    });
  }

  return data;
};

// Xử lý GET request cho API
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get('page')) || 1;
  const limit = Number(searchParams.get('limit')) || 10;

  // Tạo dữ liệu mock
  const data = generateMockData(page, limit);
  const total_rows = 500;
  return NextResponse.json({
    total: total_rows,
    data: data,
    page,
    limit
  });
}

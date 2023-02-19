import Link from 'next/link';
import { ShoppingOutlined, SkinOutlined } from '@ant-design/icons';

export const MENUS = [
  {
    key: 1,
    url: '/products',
    label: <Link href="/products">Products</Link>,
    icon: <Link href="/products"><ShoppingOutlined /></Link>,
  },
  {
    key: 2,
    url: '/carts',
    label: <Link href="/carts">Carts</Link>,
    icon: <Link href="/carts"><SkinOutlined /></Link>,
  },
];
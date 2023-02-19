import Link from 'next/link';
import { Button } from 'antd';

import type { Product } from './interface';

const getTitleProducts = (products: Product) => {
  return (
    <ul>
      {products.length > 0 && products.map(({id, title}) => (
        <li key={id}>
          {title}
        </li>
      ))}
    </ul>
  )
}

export const COLUMN_LIST = [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: 'Products',
    dataIndex: 'products',
    render: (products) => getTitleProducts(products),
  },
  {
    title: 'User ID',
    dataIndex: 'userId',
  },
  {
    title: 'Quantity',
    dataIndex: 'totalQuantity',
  },
  {
    title: 'Discounted Total',
    dataIndex: 'discountedTotal',
  },
  {
    title: 'Action',
    dataIndex: 'id',
    render: (id) => (
      <Link href={`/carts/${id}`}>
        <Button>
          Detail
        </Button>
      </Link>
    )
  },
];
export const COLUMN_PRODUCTS = [
  {
    title: 'Product ID',
    dataIndex: 'id',
  },
  {
    title: 'Product Name',
    dataIndex: 'title',
  },
  {
    title: 'Price',
    dataIndex: 'price',
    render: (price) => `$${price}`,
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
  },
  {
    title: 'Discount /item',
    dataIndex: 'discountPercentage',
    render: (discountPercentage) => `${discountPercentage}%`,
  },
  {
    title: 'Total',
    dataIndex: 'discountedPrice',
    render: (discountedPrice) => `$${discountedPrice}`,
  },
];
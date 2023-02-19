import dynamic from 'next/dynamic';

const Component = dynamic(() => import('@/routes/Carts/Detail'), {
  ssr: false
});

export default Component;
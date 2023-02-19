import dynamic from 'next/dynamic';

const Component = dynamic(() => import('@/routes/Carts'), {
  ssr: false
});

export default Component;
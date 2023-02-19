import dynamic from 'next/dynamic';

const Component = dynamic(() => import('@/routes/Products'), {
  ssr: false
});

export default Component;
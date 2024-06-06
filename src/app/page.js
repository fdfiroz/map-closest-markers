import PageHome from '@/components/PageHome';
import dynamic from 'next/dynamic'

const DynamicComponentWithNoSSR = dynamic(
  () => import('@/components/PageHome'),
  { ssr: false }
)
export default function Home() {
  
  return (
    <>
    <DynamicComponentWithNoSSR/>
    </>
    
  );
}
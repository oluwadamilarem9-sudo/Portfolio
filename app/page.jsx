import HomeView from '@/views/HomeView'
import { pageMetadata } from '@/lib/site'

export const metadata = pageMetadata(
  'Home',
  'Full-stack developer building scalable digital systems that drive real business growth for startups and growing brands.'
)

export default function HomePage() {
  return <HomeView />
}

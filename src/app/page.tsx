import Hero from "@/components/hero";
import Letter from "@/components/letter";
import { Analytics } from '@vercel/analytics/next';

export default function Home() {
  return (
    <>
      <main >
        <Hero />
        <Letter />
        <Analytics />
      </main>
    </>
  );
}

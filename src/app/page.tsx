import Hero from "@/components/hero";
import Features from "@/components/features";
import Footer from "@/components/footer";
import ScrollUpButton from "@/components/scrollUpButton";

export default function Home() {
  return (
    <>
      <main className="">
        <Hero />
        <Features />
        <ScrollUpButton />
        <Footer />
      </main>
    </>
  );
}

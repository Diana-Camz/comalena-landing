import Features from "@/components/Features";
import { Hero } from "@/components/Hero";
import Layout from "@/components/Layout";
import Reveal from "@/components/Reveal";
export default function Home() {
  return (
      <Layout>
        <Reveal>
          <Hero />
        </Reveal>

        <section>
          <Features />
        </section>
      </Layout>
  );
}

import Features from "@/components/Features";
import { Hero } from "@/components/Hero";
import Layout from "@/components/Layout";
export default function Home() {
  return (
      <Layout>
        <section>
          <Hero />
        </section>

        <section className="py-8">
          <Features />
        </section>
      </Layout>
  );
}

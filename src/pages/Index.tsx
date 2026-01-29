import Navbar from "@/components/cafe/Navbar";
import Hero from "@/components/cafe/Hero";
import About from "@/components/cafe/About";
import Menu from "@/components/cafe/Menu";
import Promotions from "@/components/cafe/Promotions";
import Testimonials from "@/components/cafe/Testimonials";
import Gallery from "@/components/cafe/Gallery";
import Reservation from "@/components/cafe/Reservation";
import Contact from "@/components/cafe/Contact";
import Footer from "@/components/cafe/Footer";
import WhatsAppButton from "@/components/cafe/WhatsAppButton";

const Index = () => {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Menu />
      <Promotions />
      <Testimonials />
      <section id="gallery">
        <Gallery />
      </section>
      <Reservation />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;

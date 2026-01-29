import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import pastriesImage from "@/assets/pastries.jpg";
import roastingImage from "@/assets/roasting.jpg";
import heroImage from "@/assets/hero-cafe.jpg";
import coffeeArtImage from "@/assets/coffee-art.jpg";

const galleryItems = [
  { image: heroImage, title: "Cozy Ambiance", span: "col-span-2 row-span-2" },
  { image: coffeeArtImage, title: "Latte Art", span: "col-span-1 row-span-1" },
  { image: roastingImage, title: "Fresh Roasted", span: "col-span-1 row-span-1" },
  { image: pastriesImage, title: "Fresh Pastries", span: "col-span-2 row-span-1" },
];

const Gallery = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="bg-primary py-16 lg:py-20">
      <div className="container mx-auto px-4" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block font-sans text-sm uppercase tracking-[0.2em] text-accent">
            Experience
          </span>
          <h2 className="mb-4 font-serif text-4xl font-bold text-primary-foreground lg:text-5xl">
            Our Atmosphere
          </h2>
          <div className="section-divider mb-6" />
          <p className="mx-auto max-w-2xl font-sans text-primary-foreground/70">
            Step into our world of warmth, aroma, and artistry. Every corner of 
            Cafe Chapter One is designed to make you feel at home.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:grid-rows-2">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`img-zoom group relative overflow-hidden rounded-lg ${item.span}`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-full min-h-[200px] w-full object-cover md:min-h-[250px]"
              />
              {/* Overlay */}
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-primary/80 via-transparent to-transparent p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <h3 className="font-serif text-xl font-semibold text-primary-foreground">
                  {item.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;

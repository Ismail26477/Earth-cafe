import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import coffeeArtImage from "@/assets/coffee-art.jpg";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="bg-warm-gradient py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Image */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="img-zoom relative overflow-hidden rounded-lg"
          >
            <img
              src={coffeeArtImage}
              alt="Artisan latte art"
              className="h-[500px] w-full object-cover shadow-lg"
            />
            {/* Decorative Frame */}
            <div className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-lg border-2 border-accent/30" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="mb-4 inline-block font-sans text-sm uppercase tracking-[0.2em] text-accent">
              Our Story
            </span>
            <h2 className="mb-6 font-serif text-4xl font-bold text-foreground lg:text-5xl">
              Crafted with <span className="text-accent">Passion</span>
            </h2>
            <div className="section-divider mb-8 ml-0" />

            <div className="space-y-4 font-sans text-muted-foreground">
              <p className="text-lg leading-relaxed">
                At Cafe Chapter One, we believe that great coffee is more than just a beverage—it's 
                an experience. Our journey began with a simple dream: to create a space where 
                quality meets comfort.
              </p>
              <p className="leading-relaxed">
                Every bean is carefully selected from sustainable farms, roasted to perfection 
                in small batches, and brewed with precision by our skilled baristas. We're not 
                just serving coffee; we're crafting moments.
              </p>
              <p className="leading-relaxed">
                Whether you're starting your morning, meeting a friend, or finding a quiet 
                corner to work, we welcome you to write your own chapter with us.
              </p>
            </div>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-3 gap-8">
              {[
                { number: "10+", label: "Coffee Origins" },
                { number: "5K+", label: "Happy Customers" },
                { number: "100%", label: "Arabica Beans" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  className="text-center"
                >
                  <div className="font-serif text-3xl font-bold text-accent">
                    {stat.number}
                  </div>
                  <div className="mt-1 font-sans text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;

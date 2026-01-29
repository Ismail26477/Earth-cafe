import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import heroImage1 from "@/assets/hero-cafe.jpg";
import heroImage2 from "@/assets/hero-slide-2.jpg";
import heroImage3 from "@/assets/hero-slide-3.jpg";

const slides = [
  {
    image: heroImage1,
    title: "Cafe Chapter One",
    subtitle: "Est. 2024 • Artisan Coffee",
    description: "Where every cup tells a story. Experience artisan coffee crafted with passion in a warm, welcoming atmosphere.",
  },
  {
    image: heroImage2,
    title: "Premium Ambiance",
    subtitle: "Comfort Meets Style",
    description: "Relax in our beautifully designed space, perfect for work, meetings, or quality time with loved ones.",
  },
  {
    image: heroImage3,
    title: "Crafted with Love",
    subtitle: "Expert Baristas",
    description: "Our skilled baristas pour passion into every cup, creating the perfect blend of art and flavor.",
  },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Slider */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.5 },
          }}
          className="absolute inset-0"
        >
          <img
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            className="h-full w-full object-cover"
          />
          <div className="hero-overlay absolute inset-0" />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-secondary/20 p-3 backdrop-blur-sm transition-all hover:bg-secondary/40 md:left-8"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6 text-secondary" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-secondary/20 p-3 backdrop-blur-sm transition-all hover:bg-secondary/40 md:right-8"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6 text-secondary" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-24 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentSlide ? 1 : -1);
              setCurrentSlide(index);
            }}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "w-8 bg-accent"
                : "w-2 bg-secondary/50 hover:bg-secondary/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-4"
            >
              <span className="font-sans text-sm uppercase tracking-[0.3em] text-secondary/80">
                {slides[currentSlide].subtitle}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-shadow mb-6 font-serif text-5xl font-bold text-secondary md:text-7xl lg:text-8xl"
            >
              {slides[currentSlide].title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mb-10 max-w-xl font-sans text-lg text-secondary/90 md:text-xl"
            >
              {slides[currentSlide].description}
            </motion.p>
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col gap-4 sm:flex-row"
        >
          <Button
            variant="hero"
            size="xl"
            onClick={() => scrollToSection("menu")}
          >
            Explore Our Menu
          </Button>
          <Button
            variant="heroOutline"
            size="xl"
            onClick={() => scrollToSection("reservation")}
          >
            Reserve a Table
          </Button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
          onClick={() => scrollToSection("about")}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center text-secondary/70"
          >
            <span className="mb-2 font-sans text-xs uppercase tracking-widest">
              Scroll
            </span>
            <ChevronDown className="h-5 w-5" />
          </motion.div>
        </motion.div>
      </div>

      {/* Steam Animation */}
      <div className="pointer-events-none absolute bottom-[30%] left-1/2 -translate-x-1/2">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-20 w-1 rounded-full bg-secondary/20"
            style={{ left: `${i * 15 - 15}px` }}
            animate={{
              y: [-20, -60],
              opacity: [0, 0.5, 0],
              scaleX: [1, 1.5, 2],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeOut",
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star, Quote } from "lucide-react";

interface Testimonial {
  name: string;
  location: string;
  rating: number;
  quote: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Priya Sharma",
    location: "Mumbai",
    rating: 5,
    quote: "The best coffee I've ever had in India! The ambiance is perfect for work meetings or casual hangouts. The Chapter One Espresso is absolutely divine.",
    avatar: "PS",
  },
  {
    name: "Rahul Mehta",
    location: "Delhi",
    rating: 5,
    quote: "As a coffee enthusiast, I can say this place takes their craft seriously. The baristas here are true artists. The Velvet Latte is a must-try!",
    avatar: "RM",
  },
  {
    name: "Anjali Patel",
    location: "Bangalore",
    rating: 5,
    quote: "Finally a cafe that understands quality! The pastries are freshly baked and pair perfectly with their signature drinks. My new favorite spot!",
    avatar: "AP",
  },
  {
    name: "Vikram Singh",
    location: "Hyderabad",
    rating: 5,
    quote: "The atmosphere here is unmatched. Great for remote work with reliable WiFi. The Rose Cardamom Latte is a unique Indian twist that I absolutely love.",
    avatar: "VS",
  },
  {
    name: "Neha Gupta",
    location: "Pune",
    rating: 5,
    quote: "Every visit feels special. The staff remembers my order and always greets me with a smile. The Matcha Oat Latte has become my daily essential!",
    avatar: "NG",
  },
  {
    name: "Arjun Reddy",
    location: "Chennai",
    rating: 5,
    quote: "This cafe has set a new standard for specialty coffee in India. The cold brew is incredibly smooth and the chocolate truffle cake is heavenly!",
    avatar: "AR",
  },
];

const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="testimonials" className="bg-warm-gradient py-16 lg:py-20">
      <div className="container mx-auto px-4" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center"
        >
          <span className="mb-4 inline-block font-sans text-sm uppercase tracking-[0.2em] text-accent">
            Testimonials
          </span>
          <h2 className="mb-4 font-serif text-4xl font-bold text-foreground lg:text-5xl">
            What Our Guests Say
          </h2>
          <div className="section-divider mb-6" />
          <p className="mx-auto max-w-2xl font-sans text-muted-foreground">
            Don't just take our word for it. Here's what our valued customers have to say about their experience at Cafe Chapter One.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card-hover group relative rounded-xl bg-card p-6"
            >
              {/* Quote Icon */}
              <Quote className="absolute right-4 top-4 h-8 w-8 text-accent/20" />
              
              {/* Stars */}
              <div className="mb-4 flex gap-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                ))}
              </div>

              {/* Quote */}
              <p className="mb-6 font-sans text-muted-foreground leading-relaxed">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-lg font-bold text-accent-foreground">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-serif text-lg font-semibold text-foreground">
                    {testimonial.name}
                  </h4>
                  <p className="font-sans text-sm text-muted-foreground">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-4"
        >
          {[
            { value: "4.9", label: "Average Rating" },
            { value: "2000+", label: "Happy Customers" },
            { value: "500+", label: "5-Star Reviews" },
            { value: "98%", label: "Would Recommend" },
          ].map((stat, index) => (
            <div key={stat.label} className="text-center">
              <div className="font-serif text-3xl font-bold text-accent md:text-4xl">
                {stat.value}
              </div>
              <div className="mt-1 font-sans text-sm text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;

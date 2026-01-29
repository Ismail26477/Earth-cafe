import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Phone, MapPin, Clock, Mail, Instagram, Facebook } from "lucide-react";

const contactInfo = [
  {
    icon: Phone,
    title: "Call Us",
    details: ["(731) 487-9893"],
    action: { label: "Call Now", href: "tel:7314879893" },
  },
  {
    icon: MapPin,
    title: "Visit Us",
    details: ["123 Coffee Lane", "Downtown District"],
    action: { label: "Get Directions", href: "#" },
  },
  {
    icon: Clock,
    title: "Opening Hours",
    details: ["Mon - Fri: 7AM - 8PM", "Sat - Sun: 8AM - 9PM"],
    action: null,
  },
  {
    icon: Mail,
    title: "Email Us",
    details: ["hello@cafechapterone.com"],
    action: { label: "Send Email", href: "mailto:hello@cafechapterone.com" },
  },
];

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="bg-warm-gradient py-16 lg:py-20">
      <div className="container mx-auto px-4" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block font-sans text-sm uppercase tracking-[0.2em] text-accent">
            Get in Touch
          </span>
          <h2 className="mb-4 font-serif text-4xl font-bold text-foreground lg:text-5xl">
            Visit Us Today
          </h2>
          <div className="section-divider mb-6" />
          <p className="mx-auto max-w-2xl font-sans text-muted-foreground">
            We'd love to welcome you to Cafe Chapter One. Drop by for your daily 
            dose of comfort or reach out to us anytime.
          </p>
        </motion.div>

        {/* Contact Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {contactInfo.map((info, index) => (
            <motion.div
              key={info.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card-hover group rounded-xl bg-card p-8 text-center"
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 transition-colors group-hover:bg-accent">
                <info.icon className="h-7 w-7 text-accent transition-colors group-hover:text-card" />
              </div>
              <h3 className="mb-3 font-serif text-xl font-semibold text-foreground">
                {info.title}
              </h3>
              <div className="mb-4 space-y-1">
                {info.details.map((detail) => (
                  <p key={detail} className="font-sans text-muted-foreground">
                    {detail}
                  </p>
                ))}
              </div>
              {info.action && (
                <Button variant="elegant" size="sm" asChild>
                  <a href={info.action.href}>{info.action.label}</a>
                </Button>
              )}
            </motion.div>
          ))}
        </div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="mb-4 font-sans text-sm uppercase tracking-widest text-muted-foreground">
            Follow Our Journey
          </p>
          <div className="flex justify-center gap-4">
            {[
              { icon: Instagram, href: "#", label: "Instagram" },
              { icon: Facebook, href: "#", label: "Facebook" },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground transition-all hover:scale-110 hover:bg-accent hover:text-accent-foreground"
                aria-label={social.label}
              >
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;

import { Coffee } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-6 text-center">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Coffee className="h-6 w-6 text-accent" />
            <span className="font-serif text-xl font-bold text-primary-foreground">
              Cafe Chapter One
            </span>
          </div>

          {/* Tagline */}
          <p className="max-w-md font-sans text-sm text-primary-foreground/60">
            Where every cup tells a story. Experience the art of coffee in our 
            warm, welcoming space.
          </p>

          {/* Divider */}
          <div className="h-px w-24 bg-accent/30" />

          {/* Copyright */}
          <p className="font-sans text-xs text-primary-foreground/40">
            © {new Date().getFullYear()} Cafe Chapter One. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Clock, Users, User, Phone, Mail, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const timeSlots = [
  "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM",
  "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM"
];

const guestOptions = [1, 2, 3, 4, 5, 6, 7, 8];

const Reservation = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    time: "",
    guests: "2",
    specialRequests: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.phone || !formData.date || !formData.time) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Show success
    setIsSubmitted(true);
    toast({
      title: "Reservation Confirmed! 🎉",
      description: `Thank you ${formData.name}! We've reserved a table for ${formData.guests} on ${formData.date} at ${formData.time}.`,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (isSubmitted) {
    return (
      <section id="reservation" className="bg-card py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mx-auto max-w-md text-center"
          >
            <div className="mb-6 flex justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-accent/20">
                <CheckCircle className="h-10 w-10 text-accent" />
              </div>
            </div>
            <h2 className="mb-4 font-serif text-3xl font-bold text-foreground">
              Reservation Confirmed!
            </h2>
            <p className="mb-6 font-sans text-muted-foreground">
              Thank you, {formData.name}! We've reserved a table for {formData.guests} guest{parseInt(formData.guests) > 1 ? 's' : ''} on {formData.date} at {formData.time}.
            </p>
            <p className="mb-8 font-sans text-sm text-muted-foreground">
              A confirmation has been sent to {formData.phone}
            </p>
            <Button variant="hero" onClick={() => setIsSubmitted(false)}>
              Make Another Reservation
            </Button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="reservation" className="bg-card py-16 lg:py-20">
      <div className="container mx-auto px-4" ref={ref}>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="mb-4 inline-block font-sans text-sm uppercase tracking-[0.2em] text-accent">
              Reserve
            </span>
            <h2 className="mb-4 font-serif text-4xl font-bold text-foreground lg:text-5xl">
              Book Your Table
            </h2>
            <div className="section-divider mb-6 ml-0" />
            <p className="mb-8 font-sans text-muted-foreground">
              Secure your spot at Cafe Chapter One. Whether it's a casual coffee date, 
              a business meeting, or a celebration, we're ready to welcome you.
            </p>

            <div className="space-y-4">
              {[
                { icon: Clock, text: "Opening Hours: 10 AM - 10 PM" },
                { icon: Users, text: "Tables for 1-8 guests" },
                { icon: Phone, text: "Call us: +91 731 487 9893" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10">
                    <item.icon className="h-5 w-5 text-accent" />
                  </div>
                  <span className="font-sans text-foreground">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="rounded-xl bg-background p-6 shadow-lg md:p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2 text-foreground">
                  <User className="h-4 w-4" />
                  Full Name *
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-card"
                />
              </div>

              {/* Phone & Email Row */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2 text-foreground">
                    <Phone className="h-4 w-4" />
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="bg-card"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2 text-foreground">
                    <Mail className="h-4 w-4" />
                    Email (Optional)
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-card"
                  />
                </div>
              </div>

              {/* Date & Time Row */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="date" className="flex items-center gap-2 text-foreground">
                    <Calendar className="h-4 w-4" />
                    Date *
                  </Label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="bg-card"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time" className="flex items-center gap-2 text-foreground">
                    <Clock className="h-4 w-4" />
                    Time *
                  </Label>
                  <select
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    className="flex h-10 w-full rounded-md border border-input bg-card px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="">Select time</option>
                    {timeSlots.map(slot => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Guests */}
              <div className="space-y-2">
                <Label htmlFor="guests" className="flex items-center gap-2 text-foreground">
                  <Users className="h-4 w-4" />
                  Number of Guests *
                </Label>
                <select
                  id="guests"
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  className="flex h-10 w-full rounded-md border border-input bg-card px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  {guestOptions.map(num => (
                    <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                  ))}
                </select>
              </div>

              {/* Special Requests */}
              <div className="space-y-2">
                <Label htmlFor="specialRequests" className="text-foreground">
                  Special Requests (Optional)
                </Label>
                <textarea
                  id="specialRequests"
                  name="specialRequests"
                  placeholder="Any special requirements or celebration details..."
                  value={formData.specialRequests}
                  onChange={handleChange}
                  rows={3}
                  className="flex w-full rounded-md border border-input bg-card px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </div>

              <Button type="submit" variant="hero" size="lg" className="w-full">
                Confirm Reservation
              </Button>

              <p className="text-center font-sans text-xs text-muted-foreground">
                By booking, you agree to our reservation policy. 
                Please arrive on time or notify us of delays.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Reservation;

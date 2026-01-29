import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Clock, Percent, Coffee } from "lucide-react";

interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
}

const getHappyHourTimeLeft = (): TimeLeft => {
  const now = new Date();
  const currentHour = now.getHours();
  
  // Happy Hour: 4 PM to 7 PM (16:00 - 19:00)
  let targetHour: number;
  
  if (currentHour >= 19) {
    // After happy hour, show countdown to next day's happy hour
    targetHour = 16 + 24; // 4 PM next day
  } else if (currentHour >= 16) {
    // During happy hour, show time remaining
    targetHour = 19;
  } else {
    // Before happy hour, show countdown to start
    targetHour = 16;
  }
  
  const target = new Date(now);
  if (targetHour >= 24) {
    target.setDate(target.getDate() + 1);
    target.setHours(targetHour - 24, 0, 0, 0);
  } else {
    target.setHours(targetHour, 0, 0, 0);
  }
  
  const diff = target.getTime() - now.getTime();
  
  return {
    hours: Math.floor(diff / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  };
};

const isHappyHourActive = (): boolean => {
  const hour = new Date().getHours();
  return hour >= 16 && hour < 19;
};

const promotions = [
  {
    title: "Buy 2 Get 1 Free",
    description: "On all signature lattes",
    icon: Coffee,
    badge: "Weekends Only",
  },
  {
    title: "20% Off Pastries",
    description: "With any coffee purchase",
    icon: Percent,
    badge: "Daily Offer",
  },
];

const Promotions = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getHappyHourTimeLeft());
  const [isActive, setIsActive] = useState(isHappyHourActive());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getHappyHourTimeLeft());
      setIsActive(isHappyHourActive());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (num: number): string => num.toString().padStart(2, "0");

  return (
    <section id="promotions" className="bg-primary py-16 lg:py-20">
      <div className="container mx-auto px-4" ref={ref}>
        {/* Happy Hour Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12 overflow-hidden rounded-2xl bg-gradient-to-r from-accent via-accent/90 to-accent p-8 text-center shadow-xl md:p-12"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/20 px-4 py-2"
          >
            <Clock className="h-5 w-5 text-primary" />
            <span className="font-sans text-sm font-semibold uppercase tracking-wider text-primary">
              {isActive ? "Happy Hour Live!" : "Happy Hour 4PM - 7PM"}
            </span>
          </motion.div>

          <h2 className="mb-4 font-serif text-3xl font-bold text-primary md:text-5xl">
            {isActive ? "30% Off Everything!" : "Get 30% Off"}
          </h2>
          <p className="mx-auto mb-8 max-w-lg font-sans text-primary/80">
            Join us during Happy Hour for exclusive discounts on all beverages and pastries.
          </p>

          {/* Countdown Timer */}
          <div className="mb-6 flex justify-center gap-4">
            {[
              { label: "Hours", value: timeLeft.hours },
              { label: "Minutes", value: timeLeft.minutes },
              { label: "Seconds", value: timeLeft.seconds },
            ].map((unit) => (
              <motion.div
                key={unit.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-col items-center"
              >
                <div className="relative flex h-16 w-16 items-center justify-center rounded-xl bg-primary shadow-lg md:h-20 md:w-20">
                  <motion.span
                    key={unit.value}
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="font-serif text-2xl font-bold text-primary-foreground md:text-3xl"
                  >
                    {formatTime(unit.value)}
                  </motion.span>
                </div>
                <span className="mt-2 font-sans text-xs uppercase tracking-wider text-primary/70">
                  {unit.label}
                </span>
              </motion.div>
            ))}
          </div>

          <p className="font-sans text-sm text-primary/70">
            {isActive ? "Hurry! Offer ends soon." : "Countdown to next Happy Hour"}
          </p>
        </motion.div>

        {/* Promotion Cards */}
        <div className="grid gap-6 md:grid-cols-2">
          {promotions.map((promo, index) => (
            <motion.div
              key={promo.title}
              initial={{ opacity: 0, x: index === 0 ? -30 : 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              className="card-hover group relative overflow-hidden rounded-xl bg-card p-6 md:p-8"
            >
              <div className="absolute right-4 top-4 rounded-full bg-accent/10 px-3 py-1">
                <span className="font-sans text-xs font-medium text-accent">
                  {promo.badge}
                </span>
              </div>
              
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 transition-colors group-hover:bg-accent">
                <promo.icon className="h-7 w-7 text-accent transition-colors group-hover:text-accent-foreground" />
              </div>
              
              <h3 className="mb-2 font-serif text-2xl font-bold text-foreground">
                {promo.title}
              </h3>
              <p className="font-sans text-muted-foreground">{promo.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Promotions;

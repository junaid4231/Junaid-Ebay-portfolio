import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { HeroBackground } from './HeroBackground';
import { ArrowDown, Sparkles } from 'lucide-react';

export function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <HeroBackground />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass-strong rounded-2xl p-12 md:p-16 max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center justify-center gap-2 mb-6"
          >
            <Sparkles className="w-6 h-6 text-chart-2" />
            <span className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
              Elite eBay Virtual Assistant
            </span>
            <Sparkles className="w-6 h-6 text-chart-2" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
          >
            Muhammad <span className="text-gradient-primary">Junaid</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed max-w-2xl mx-auto"
          >
            Transform your eBay store with expert management services.
            From listing optimization to sales analytics, I deliver results that drive growth.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              size="lg"
              onClick={() => scrollToSection('#contact')}
              className="glow-primary-lg text-lg px-8"
              data-testid="button-hire-hero"
            >
              Hire Me Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection('#portfolio')}
              className="text-lg px-8 glass"
              data-testid="button-view-work"
            >
              View My Work
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <button
            onClick={() => scrollToSection('#services')}
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            data-testid="button-scroll-indicator"
          >
            <span className="text-sm uppercase tracking-wider">Scroll to explore</span>
            <ArrowDown className="w-5 h-5 animate-bounce" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}

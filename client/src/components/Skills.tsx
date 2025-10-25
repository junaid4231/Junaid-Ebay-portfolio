import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useEffect, useState, useRef } from 'react';

const skillCategories = [
  {
    category: 'eCommerce Platforms',
    skills: ['eBay', 'Amazon', 'Shopify', 'Etsy', 'WooCommerce'],
  },
  {
    category: 'Tools & Software',
    skills: ['Terapeak', 'Listing Software', 'Analytics Tools', 'CRM Systems', 'Email Marketing'],
  },
  {
    category: 'Core Competencies',
    skills: ['SEO Optimization', 'Product Research', 'Price Strategy', 'Market Analysis', 'Competitor Research'],
  },
];

const metrics = [
  { label: 'Years Experience', value: 5, suffix: '+' },
  { label: 'Stores Managed', value: 50, suffix: '+' },
  { label: 'Revenue Generated', value: 2, suffix: 'M+', prefix: '$' },
  { label: 'Client Satisfaction', value: 98, suffix: '%' },
];

function AnimatedCounter({ end, duration = 2000, prefix = '', suffix = '' }: { end: number; duration?: number; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isVisible, end, duration]);

  return (
    <div ref={ref} className="font-mono text-5xl md:text-6xl font-bold text-gradient-accent">
      {prefix}{count.toLocaleString()}{suffix}
    </div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="py-32 relative bg-card/30">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Expertise & <span className="text-gradient-primary">Achievements</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Proven track record delivering exceptional results for eBay sellers
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="glass text-center" data-testid={`card-metric-${index}`}>
                <CardContent className="p-8">
                  <AnimatedCounter 
                    end={metric.value} 
                    prefix={metric.prefix} 
                    suffix={metric.suffix}
                  />
                  <p className="text-sm text-muted-foreground mt-4 uppercase tracking-wider">
                    {metric.label}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="glass h-full" data-testid={`card-skill-category-${index}`}>
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-6">{category.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="glass-strong text-sm"
                        data-testid={`badge-skill-${skill.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

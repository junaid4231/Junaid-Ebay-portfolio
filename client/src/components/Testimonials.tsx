import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'CEO, TechGear Pro',
    content: 'Working with Junaid transformed our eBay business. His expertise in listing optimization and customer service is unmatched. Our sales tripled within 6 months!',
    rating: 5,
    initials: 'SJ',
  },
  {
    name: 'Michael Chen',
    role: 'Owner, StyleHub Boutique',
    content: 'The most professional and dedicated VA I have ever worked with. Junaid handles everything from inventory to analytics with precision and care.',
    rating: 5,
    initials: 'MC',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Director, Decor Dreams',
    content: 'Exceptional service and results! Junaid helped us scale from a small store to a multi-category powerhouse. Highly recommend for serious sellers.',
    rating: 5,
    initials: 'ER',
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-32 relative bg-card/30">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Client <span className="text-gradient-primary">Testimonials</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Hear from satisfied clients who have grown their eBay businesses
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="glass hover-elevate h-full" data-testid={`card-testimonial-${index}`}>
                <CardContent className="p-8">
                  <Quote className="w-10 h-10 text-chart-2 mb-6 opacity-50" />
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed italic">
                    "{testimonial.content}"
                  </p>

                  <div className="flex gap-1 mb-6">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  <div className="flex items-center gap-4">
                    <Avatar className="w-12 h-12 border-2 border-primary/20">
                      <AvatarFallback className="gradient-primary text-primary-foreground font-semibold">
                        {testimonial.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
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

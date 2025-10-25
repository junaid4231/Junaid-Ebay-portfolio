import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { ShoppingCart, Users, BarChart3, Package } from 'lucide-react';

const services = [
  {
    icon: ShoppingCart,
    title: 'Listing Optimization',
    description: 'Professional product listing creation with SEO-optimized titles, compelling descriptions, and high-converting images that drive sales.',
  },
  {
    icon: Users,
    title: 'Customer Service',
    description: 'Expert customer support handling inquiries, resolving issues, and maintaining 5-star seller ratings with professional communication.',
  },
  {
    icon: Package,
    title: 'Inventory Management',
    description: 'Efficient stock tracking, order processing, and inventory updates to ensure smooth operations and prevent stockouts.',
  },
  {
    icon: BarChart3,
    title: 'Sales Analytics',
    description: 'Data-driven insights and performance reports to identify trends, optimize pricing, and maximize your eBay store revenue.',
  },
];

export function Services() {
  return (
    <section id="services" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Professional <span className="text-gradient-primary">Services</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive eBay store management solutions tailored to scale your business
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="glass hover:glow-primary transition-all duration-300 hover-elevate h-full" data-testid={`card-service-${index}`}>
                <CardContent className="p-8 flex flex-col items-center text-center h-full">
                  <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mb-6 glow-primary">
                    <service.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

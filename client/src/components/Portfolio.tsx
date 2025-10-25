import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Star } from 'lucide-react';

const caseStudies = [
  {
    title: 'Electronics Store Transformation',
    client: 'TechGear Pro',
    challenge: 'Low conversion rates and poor product visibility',
    solution: 'Complete listing overhaul with SEO optimization and professional photography',
    results: [
      { metric: 'Sales Increase', value: '+247%' },
      { metric: 'Conversion Rate', value: '+180%' },
      { metric: 'Average Order Value', value: '+65%' },
    ],
    rating: 5,
  },
  {
    title: 'Fashion Boutique Growth',
    client: 'StyleHub Boutique',
    challenge: 'Inconsistent inventory and customer service issues',
    solution: 'Implemented automated inventory system and 24/7 customer support',
    results: [
      { metric: 'Revenue Growth', value: '+312%' },
      { metric: 'Customer Satisfaction', value: '99%' },
      { metric: 'Response Time', value: '-85%' },
    ],
    rating: 5,
  },
  {
    title: 'Home Decor Expansion',
    client: 'Decor Dreams',
    challenge: 'Scaling challenges and market positioning',
    solution: 'Strategic pricing analysis and multi-channel expansion',
    results: [
      { metric: 'Market Share', value: '+156%' },
      { metric: 'Product Range', value: '3x' },
      { metric: 'Profit Margin', value: '+42%' },
    ],
    rating: 5,
  },
];

export function Portfolio() {
  return (
    <section id="portfolio" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Success <span className="text-gradient-primary">Stories</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real results from real clients across diverse eBay niches
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="glass hover:glow-primary transition-all duration-300 hover-elevate h-full" data-testid={`card-case-study-${index}`}>
                <CardContent className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{study.title}</h3>
                      <p className="text-muted-foreground">{study.client}</p>
                    </div>
                    <div className="flex gap-1">
                      {Array.from({ length: study.rating }).map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div>
                      <Badge variant="secondary" className="mb-2">Challenge</Badge>
                      <p className="text-sm text-muted-foreground">{study.challenge}</p>
                    </div>
                    <div>
                      <Badge variant="secondary" className="mb-2">Solution</Badge>
                      <p className="text-sm text-muted-foreground">{study.solution}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    {study.results.map((result, resultIndex) => (
                      <div
                        key={resultIndex}
                        className="glass-strong rounded-xl p-4 text-center"
                        data-testid={`metric-${index}-${resultIndex}`}
                      >
                        <div className="flex items-center justify-center gap-1 mb-2">
                          <TrendingUp className="w-4 h-4 text-chart-2" />
                          <span className="text-2xl font-bold font-mono text-gradient-accent">
                            {result.value}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">{result.metric}</p>
                      </div>
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

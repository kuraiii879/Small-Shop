import { Truck, CreditCard, HeadphonesIcon, Shield } from 'lucide-react';
import { Card, CardContent } from '../ui/card';

const features = [
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Free shipping on orders over $50. Express delivery available.',
  },
  {
    icon: CreditCard,
    title: 'Cash on Delivery',
    description: 'Pay when you receive. Secure payment options available.',
  },
  {
    icon: HeadphonesIcon,
    title: '24/7 Support',
    description: 'Our customer service team is always here to help you.',
  },
  {
    icon: Shield,
    title: 'Secure Shopping',
    description: 'Your data is protected with industry-standard security.',
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="border-0 shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;


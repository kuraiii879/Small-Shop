import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';

const HeroBanner = () => {
  return (
    <section className="relative w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Discover Your Style
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Shop the latest fashion trends and elevate your wardrobe with our
            curated collection of premium clothing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/">
              <Button size="lg" className="group">
                Shop Now
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-gray-900">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;


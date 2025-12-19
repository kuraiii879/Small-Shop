import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel';
import { ArrowRight } from 'lucide-react';

// Add your own images here - you can use local images or URLs
const heroImages = [
  {
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&q=80',
    title: 'Discover Your Style',
    description: 'Shop the latest fashion trends and elevate your wardrobe with our curated collection of premium clothing.',
  },
  {
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1920&q=80',
    title: 'Premium Quality',
    description: 'Experience the finest materials and craftsmanship in every piece we offer.',
  },
  {
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920&q=80',
    title: 'New Arrivals',
    description: 'Stay ahead of the curve with our latest collection of stylish apparel.',
  },
];

const HeroBanner = () => {
  return (
    <section className="relative w-full h-[600px] md:h-[700px] overflow-hidden">
      <Carousel autoPlay={true} interval={5000} showDots={true} showArrows={true}>
        <CarouselContent>
          {heroImages.map((slide, index) => (
            <CarouselItem key={index}>
              <div
                className="relative w-full h-[600px] md:h-[700px] flex items-center justify-center"
                style={{
                  backgroundImage: `url(${slide.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40" />
                
                {/* Content */}
                <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                  <div className="max-w-3xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 animate-fade-in">
                      {slide.title}
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-200 mb-8 animate-fade-in-delay">
                      {slide.description}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-delay-2">
                      <Link to="/">
                        <Button size="lg" className="group">
                          Shop Now
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </Link>
                      <Button 
                        size="lg" 
                        variant="outline" 
                        className="bg-transparent border-white text-white hover:bg-white hover:text-gray-900"
                      >
                        Learn More
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        .animate-fade-in-delay {
          animation: fade-in 0.8s ease-out 0.2s both;
        }
        .animate-fade-in-delay-2 {
          animation: fade-in 0.8s ease-out 0.4s both;
        }
      `}</style>
    </section>
  );
};

export default HeroBanner;


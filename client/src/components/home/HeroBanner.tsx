import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel';

// Add your own images here - you can use local images or URLs
const heroImages = [
  {
    image: '/images/image1.jpg',
   
  },
  {
    image: '/images/image2.jpg',
   
  },
  {
    image: '/images/image3.jpg',
   
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


import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';

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
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  )

  return (
    <section className="relative w-full overflow-hidden max-w-full">
      <Carousel
        plugins={[plugin.current]}
        className="w-full max-w-full"
        opts={{
          align: 'start',
          loop: true,
          dragFree: false,
          containScroll: 'trimSnaps',
          skipSnaps: false,
        }}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent className="-ml-0 rtl:-mr-0 w-full">
          {heroImages.map((slide, index) => (
            <CarouselItem key={index} className="pl-0 rtl:pr-0 basis-full min-w-full flex-shrink-0 flex-grow-0">
              <div
                className="relative w-full h-full"
                style={{
                  aspectRatio: '1897 / 475',
                  minHeight: '200px',
                  width: '100%',
                  flexShrink: 0,
                }}
              >
                <img
                  src={slide.image}
                  alt={`Hero slide ${index + 1}`}
                  className="w-full h-full object-cover block"
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'center',
                    width: '100%',
                    height: '100%',
                    display: 'block',
                  }}
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 rtl:right-4 rtl:left-auto bg-background/80 backdrop-blur-sm border-white/20" />
        <CarouselNext className="right-4 rtl:left-4 rtl:right-auto bg-background/80 backdrop-blur-sm border-white/20" />
      </Carousel>
    </section>
  );
};

export default HeroBanner;


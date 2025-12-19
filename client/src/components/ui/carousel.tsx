import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "../../lib/utils"
import { Button } from "./button"

interface CarouselProps {
  children: React.ReactNode
  className?: string
  autoPlay?: boolean
  interval?: number
  showDots?: boolean
  showArrows?: boolean
}

const CarouselContext = React.createContext<{
  currentIndex: number
  setCurrentIndex: (index: number) => void
  totalSlides: number
}>({
  currentIndex: 0,
  setCurrentIndex: () => {},
  totalSlides: 0,
})

const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  ({ children, className, autoPlay = true, interval = 5000, showDots = true, showArrows = true, ...props }, ref) => {
    const [currentIndex, setCurrentIndex] = React.useState(0)
    const [isPaused, setIsPaused] = React.useState(false)
    const childrenArray = React.Children.toArray(children)
    const totalSlides = childrenArray.length

    React.useEffect(() => {
      if (!autoPlay || totalSlides <= 1 || isPaused) return

      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % totalSlides)
      }, interval)

      return () => clearInterval(timer)
    }, [autoPlay, interval, totalSlides, isPaused])

    const goToSlide = (index: number) => {
      setCurrentIndex(index)
    }

    const goToPrevious = () => {
      setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides)
    }

    const goToNext = () => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides)
    }

    return (
      <CarouselContext.Provider value={{ currentIndex, setCurrentIndex: goToSlide, totalSlides }}>
        <div 
          ref={ref} 
          className={cn("relative w-full", className)} 
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          {...props}
        >
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {children}
            </div>
          </div>

          {showArrows && totalSlides > 1 && (
            <>
              <Button
                variant="outline"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
                onClick={goToPrevious}
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous slide</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
                onClick={goToNext}
              >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next slide</span>
              </Button>
            </>
          )}

          {showDots && totalSlides > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
              {childrenArray.map((_, index) => (
                <button
                  key={index}
                  className={cn(
                    "h-2 rounded-full transition-all",
                    currentIndex === index ? "w-8 bg-primary" : "w-2 bg-primary/50"
                  )}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </CarouselContext.Provider>
    )
  }
)
Carousel.displayName = "Carousel"

const CarouselContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex w-full", className)}
      {...props}
    />
  )
)
CarouselContent.displayName = "CarouselContent"

const CarouselItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("min-w-0 shrink-0 grow-0 basis-full", className)}
      {...props}
    />
  )
)
CarouselItem.displayName = "CarouselItem"

export { Carousel, CarouselContent, CarouselItem }


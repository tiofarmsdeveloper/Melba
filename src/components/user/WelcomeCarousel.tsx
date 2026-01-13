import React, { useEffect, useState, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

interface WelcomeCarouselProps {
  onComplete: () => void;
}

const slides = [
  {
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1000&auto=format&fit=crop&grayscale=1",
    title: "The Inner Circle",
    description: "Welcome to a curated experience where culinary art meets exclusive community."
  },
  {
    image: "https://images.unsplash.com/photo-1574126154517-d1e0d89ef734?q=80&w=1000&auto=format&fit=crop&grayscale=1",
    title: "Artisanal Excellence",
    description: "Every slice tells a story of tradition, precision, and passion."
  },
  {
    image: "https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?q=80&w=1000&auto=format&fit=crop&grayscale=1",
    title: "Your Sanctuary",
    description: "Beyond a restaurant, this is your private lounge in the heart of the city."
  }
];

const WelcomeCarousel: React.FC<WelcomeCarouselProps> = ({ onComplete }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 3000, stopOnInteraction: false })]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="fixed inset-0 z-[100] bg-brand-charcoal flex flex-col animate-in fade-in duration-700">
      <div className="flex-grow overflow-hidden" ref={emblaRef}>
        <div className="flex h-full">
          {slides.map((slide, index) => (
            <div key={index} className="relative flex-[0_0_100%] h-full">
              <img 
                src={slide.image} 
                alt={slide.title} 
                className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-luminosity"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-charcoal/20 to-brand-charcoal" />
              <div className="absolute inset-0 flex flex-col justify-end p-8 pb-32">
                <h2 className="text-4xl font-cursive text-brand-white mb-4 drop-shadow-lg">{slide.title}</h2>
                <p className="text-brand-silver text-sm font-light leading-relaxed max-w-xs">{slide.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-8 pb-12 flex items-center justify-between">
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <div 
              key={i} 
              className={`h-1 rounded-full transition-all duration-500 ${i === selectedIndex ? 'w-8 bg-brand-white' : 'w-2 bg-brand-silver/30'}`} 
            />
          ))}
        </div>
        
        <Button 
          onClick={onComplete}
          variant="ghost"
          className="text-brand-silver hover:text-brand-white flex items-center gap-2 group p-0 hover:bg-transparent"
        >
          Skip <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
};

export default WelcomeCarousel;
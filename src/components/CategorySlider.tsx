import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { EventCategory } from "@/data/mockData";

interface CategorySliderProps {
  categories: EventCategory[];
}

const CategorySlider = ({ categories }: CategorySliderProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  
  // Duplicate the categories to ensure enough content to loop without jumping visually
  const displayCategories = [...categories, ...categories, ...categories, ...categories, ...categories];

  useEffect(() => {
    let animationId: number;
    // Set speed to be pleasant, not too fast, not too slow
    const pixelsPerFrame = 0.8;

    const autoScroll = () => {
      if (scrollContainerRef.current && !isHovered && !isInteracting) {
        // Calculate the halfway point where we should seamlessly loop back
        // Scroll width divided by the number of duplicated sets (5)
        const singleSetWidth = scrollContainerRef.current.scrollWidth / 5;
        
        // If we crossed the 2-set mark, smoothly reset to the 1-set mark
        if (scrollContainerRef.current.scrollLeft >= singleSetWidth * 2) {
          scrollContainerRef.current.scrollLeft -= singleSetWidth;
        } else {
          scrollContainerRef.current.scrollLeft += pixelsPerFrame;
        }
      }
      animationId = window.requestAnimationFrame(autoScroll);
    };

    animationId = window.requestAnimationFrame(autoScroll);

    return () => window.cancelAnimationFrame(animationId);
  }, [isHovered, isInteracting]);

  const handleManualScroll = (direction: 'left' | 'right') => {
    setIsInteracting(true);
    if (scrollContainerRef.current) {
      const scrollAmount = 300; // Card width + gap
      const currentScroll = scrollContainerRef.current.scrollLeft;
      
      scrollContainerRef.current.scrollTo({
        left: direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount,
        behavior: 'smooth'
      });
      
      // Give the user time to view/interact before auto-scroll resumes
      setTimeout(() => setIsInteracting(false), 2500);
    }
  };

  return (
    <div 
      className="relative w-full py-12 px-2 sm:px-6 rounded-[2rem] bg-gradient-to-br from-primary/5 via-primary/10 to-transparent dark:from-primary/10 dark:via-gray-900 border border-primary/20 dark:border-gray-800 overflow-hidden group shadow-[inset_0_4px_20px_rgba(0,0,0,0.02)]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsInteracting(true)}
      onTouchEnd={() => setTimeout(() => setIsInteracting(false), 2500)}
    >
      {/* Background decorations for extra optimism/vibrancy */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

      {/* Manual Navigation Arrows */}
      <button 
        onClick={() => handleManualScroll('left')}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/95 dark:bg-gray-800/95 shadow-[0_4px_15px_rgba(0,0,0,0.1)] text-primary hover:scale-110 hover:bg-primary hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100 disabled:opacity-0"
        aria-label="Previous categories"
      >
        <ChevronLeft size={28} />
      </button>

      <button 
        onClick={() => handleManualScroll('right')}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/95 dark:bg-gray-800/95 shadow-[0_4px_15px_rgba(0,0,0,0.1)] text-primary hover:scale-110 hover:bg-primary hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100 disabled:opacity-0"
        aria-label="Next categories"
      >
        <ChevronRight size={28} />
      </button>

      {/* Slider track using the user's requested mask-image effect */}
      <div 
        ref={scrollContainerRef}
        className="w-full overflow-x-auto flex gap-6 pb-6 pt-4 px-4 sm:px-12 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        style={{
          maskImage: 'linear-gradient(to right, transparent, #000 7%, #000 93%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, #000 7%, #000 93%, transparent)',
        }}
      >
        {displayCategories.map((cat, idx) => (
          <Link 
            key={`${cat.id}-${idx}`} 
            to={`/category/${cat.slug}`} 
            className="shrink-0 w-[260px] bg-card dark:bg-gray-900 rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgba(220,38,38,0.15)] transition-all duration-300 hover:-translate-y-2 group/card border border-border/50 block"
          >
            <div className="relative h-44 overflow-hidden">
               <img 
                  src={cat.image} 
                  alt={cat.title} 
                  className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-700 ease-out" 
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-40 group-hover/card:opacity-60 transition-opacity duration-300" />
            </div>
            
            <div className="p-5 relative bg-card dark:bg-gray-900 border-t-2 border-transparent group-hover/card:border-primary transition-colors text-center">
              <h3 className="font-display font-bold text-lg text-foreground mb-1 line-clamp-1 group-hover/card:text-primary transition-colors">{cat.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategorySlider;

import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, MapPin, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { EventItem } from "@/data/mockData";

interface UpcomingEventsSliderProps {
  events: EventItem[];
}

const UpcomingEventsSlider = ({ events }: UpcomingEventsSliderProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  
  // We duplicate the events heavily to ensure enough content to loop without jumping visually
  const displayEvents = [...events, ...events, ...events, ...events, ...events];

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
      const scrollAmount = 340; // Card width + gap
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
        aria-label="Previous events"
      >
        <ChevronLeft size={28} />
      </button>

      <button 
        onClick={() => handleManualScroll('right')}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/95 dark:bg-gray-800/95 shadow-[0_4px_15px_rgba(0,0,0,0.1)] text-primary hover:scale-110 hover:bg-primary hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100 disabled:opacity-0"
        aria-label="Next events"
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
        {displayEvents.map((event, idx) => (
          <div 
            key={`${event.id}-${idx}`} 
            className="shrink-0 w-[300px] bg-card dark:bg-gray-900 rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgba(220,38,38,0.15)] transition-all duration-300 hover:-translate-y-2 group/card border border-border/50"
          >
            <div className="relative h-48 overflow-hidden">
               <img 
                  src={event.image} 
                  alt={event.name} 
                  className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-700 ease-out" 
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover/card:opacity-80 transition-opacity duration-300" />
               <span className="absolute top-4 left-4 px-3 py-1 bg-primary/90 text-white text-xs font-bold rounded-lg shadow-md backdrop-blur-sm border border-white/10 uppercase tracking-wide">
                 {event.status === "ongoing" ? "ONGOING" : "UPCOMING"}
               </span>
            </div>
            
            <div className="p-6 relative bg-card dark:bg-gray-900 border-t-2 border-transparent group-hover/card:border-primary transition-colors">
              <h3 className="font-display font-bold text-xl text-foreground mb-3 line-clamp-1 group-hover/card:text-primary transition-colors">{event.name}</h3>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Calendar size={16} className="text-primary/70 shrink-0" /> 
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground line-clamp-1">
                  <MapPin size={16} className="text-primary/70 shrink-0" /> 
                  <span className="truncate">{event.location}</span>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-border/60">
                <Link 
                  to={`/category/${event.category}`} 
                  className="inline-flex items-center gap-2 text-primary font-bold text-sm tracking-wide group-hover/card:gap-3 transition-all"
                >
                  Learn More <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEventsSlider;

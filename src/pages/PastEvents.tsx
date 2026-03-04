import { Calendar, MapPin } from "lucide-react";
import { pastEvents } from "@/data/mockData";

const PastEvents = () => (
  <div className="container mx-auto px-4 py-10">
    <h1 className="text-3xl font-display font-bold text-foreground mb-2">Past Events</h1>
    <p className="text-muted-foreground mb-10">Relive the memorable events from previous sessions</p>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {pastEvents.map((event) => (
        <div key={event.id} className="bg-card rounded-lg overflow-hidden shadow-card">
          <div className="relative h-44 overflow-hidden">
            <img src={event.image} alt={event.name} className="w-full h-full object-cover grayscale-[30%]" />
            <span className="absolute top-3 left-3 px-2 py-0.5 bg-muted-foreground text-primary-foreground text-xs font-semibold rounded">COMPLETED</span>
          </div>
          <div className="p-4">
            <h3 className="font-display font-bold text-foreground mb-1">{event.name}</h3>
            <p className="text-xs text-muted-foreground mb-2">{event.description}</p>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
              <Calendar size={12} /> {event.date}
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
              <MapPin size={12} /> {event.location}
            </div>
            {event.highlights && (
              <div className="bg-maroon-light rounded-md p-3">
                <p className="text-xs font-semibold text-primary mb-1">Highlights</p>
                <p className="text-xs text-muted-foreground">{event.highlights}</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default PastEvents;

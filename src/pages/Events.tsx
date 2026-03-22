import { Link } from "react-router-dom";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { events } from "@/data/mockData";

const Events = () => {
  const ongoing = events.filter((e) => e.status === "ongoing");
  const upcoming = events.filter((e) => e.status === "upcoming");

  const EventCard = ({ event }: { event: typeof events[0] }) => (
    <div className="bg-card rounded-lg overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
      <div className="relative h-44 overflow-hidden">
        <img src={event.image} alt={event.name} className="w-full h-full object-cover" />
        <span className={`absolute top-3 left-3 px-2 py-0.5 text-xs font-semibold rounded ${event.status === "ongoing" ? "bg-green-600 text-primary-foreground" : "bg-primary text-primary-foreground"}`}>
          {event.status.toUpperCase()}
        </span>
      </div>
      <div className="p-4">
        <h3 className="font-display font-bold text-foreground mb-1">{event.name}</h3>
        <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{event.description}</p>
        <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
          <Calendar size={12} /> {event.date} • {event.time}
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
          <MapPin size={12} /> {event.location}
        </div>
        <p className="text-xs font-semibold text-primary mb-3">Fee: ₹{event.fee}</p>
        <Link to={`/category/${event.category}`} className="inline-flex items-center gap-1 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:bg-accent transition-colors">
          View Details <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-4xl md:text-5xl font-display font-extrabold text-foreground mb-3">All Events</h1>
        <p className="text-lg text-muted-foreground">Browse all ongoing and upcoming events</p>
      </div>

      {ongoing.length > 0 && (
        <>
          <h2 className="text-2xl font-display font-bold text-foreground mb-4">🔴 Ongoing Events</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {ongoing.map((e) => <EventCard key={e.id} event={e} />)}
          </div>
        </>
      )}

      <h2 className="text-2xl font-display font-bold text-foreground mb-4">📅 Upcoming Events</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {upcoming.map((e) => <EventCard key={e.id} event={e} />)}
      </div>
    </div>
  );
};

export default Events;

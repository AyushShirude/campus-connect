import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, MapPin, Loader2 } from "lucide-react";
import { apiClient } from "@/lib/api";
import { events as mockEvents } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface EventItem {
  id: string;
  name: string;
  category: string;
  description: string;
  date: string;
  time: string;
  location: string;
  fee: number;
  image: string;
  status: string;
  highlights: string[];
}

const CurrentEvents = () => {
  const { user, registerForEvent, isRegisteredForEvent } = useAuth();
  const navigate = useNavigate();
  const [eventsList, setEventsList] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await apiClient("/events");
        const mapped = data
          .filter((e: any) => e.status !== "past")
          .map((e: any) => ({
            id: String(e.id),
            name: e.name,
            category: e.category?.slug || "",
            description: e.description,
            date: new Date(e.date).toLocaleDateString('en-CA'),
            time: e.time,
            location: e.location,
            fee: e.fee,
            image: e.imageUrl || e.category?.imageUrl || "https://images.unsplash.com/photo-1542224566-6e85f2e6772f?auto=format&fit=crop&q=80",
            status: e.status,
            highlights: e.highlights || []
          }));
        setEventsList(mapped);
      } catch (err) {
        console.error("Failed to load events, falling back to mock data:", err);
        setEventsList(mockEvents.filter((e) => e.status !== "past"));
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const handleRegister = async (event: EventItem) => {
    if (!user) {
      navigate("/auth?mode=login");
      return;
    }
    if (isRegisteredForEvent(event.id)) {
      toast.info("Already registered for this event");
      return;
    }
    // Simulate payment
    const confirmed = window.confirm(`Confirm payment of ₹${event.fee} for "${event.name}"?`);
    if (confirmed) {
      const success = await registerForEvent({
        eventId: event.id,
        eventName: event.name,
        category: event.category || "Events",
        date: event.date,
        time: event.time || "10:00 AM",
        fee: event.fee,
      });
      if (success) {
        toast.success(`Successfully registered for ${event.name}! Payment of ₹${event.fee} confirmed.`);
      } else {
        toast.error("Registration failed");
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" strokeWidth={3} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-4xl md:text-5xl font-display font-extrabold text-foreground mb-3">Current Events</h1>
        <p className="text-lg text-muted-foreground">Explore and register for active events in current sessions</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {eventsList.map((event) => {
          const registered = isRegisteredForEvent(event.id);
          return (
            <div key={event.id} className="group relative bg-card rounded-2xl p-5 border border-border overflow-hidden transition-all duration-500 hover:-translate-y-2.5 hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.04)] hover:border-primary/30 flex flex-col h-full font-body">

              {/* Shine Element overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_40%,rgba(255,255,255,0.7)_50%,transparent_60%)] bg-[length:300%_100%] opacity-0 group-hover:opacity-100 group-hover:animate-shine pointer-events-none z-10 transition-opacity duration-300 mix-blend-overlay" />

              {/* Glow Element */}
              <div className="absolute inset-[-10px] bg-[radial-gradient(circle_at_50%_0%,theme(colors.primary.DEFAULT/0.15)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0" />

              <div className="relative z-20 flex flex-col h-full">
                {/* Floating Badge */}
                <div className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-[0.65em] font-extrabold shadow-md transform scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 z-30 flex items-center gap-1 uppercase tracking-wide text-white ${event.status === "ongoing" ? "bg-green-600" : "bg-primary"}`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping mr-0.5" />
                  {event.status}
                </div>

                {/* Image */}
                <div className="w-full h-40 rounded-xl overflow-hidden mb-5 relative transition-all duration-500 group-hover:shadow-md group-hover:-translate-y-1 group-hover:scale-[1.03]">
                  <img src={event.image} alt={event.name} className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-500" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.15)_0%,transparent_30%),repeating-linear-gradient(45deg,rgba(0,0,0,0.05)_0px,rgba(0,0,0,0.05)_2px,transparent_2px,transparent_4px)] opacity-50" />
                </div>

                {/* Text Stack */}
                <div className="flex flex-col gap-1 mb-5 flex-1">
                  <h3 className="text-[1.15em] font-display font-bold text-foreground m-0 transition-all duration-300 group-hover:text-primary group-hover:translate-x-1">{event.name}</h3>
                  <p className="text-[0.8rem] text-muted-foreground m-0 opacity-70 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1 line-clamp-2 leading-relaxed mb-3">{event.description}</p>

                  <div className="space-y-1.5 transition-all duration-300 group-hover:translate-x-1">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar size={13} className="text-primary/70" />
                      <span>{event.date} • {event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <MapPin size={13} className="text-primary/70" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>

                {/* Registration & Fee Section */}
                <div className="mt-auto pt-4 border-t border-border/50 flex items-center justify-between gap-4">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[0.7em] text-muted-foreground font-semibold uppercase tracking-wide">Fee</span>
                    <span className="text-base font-extrabold text-foreground group-hover:text-primary transition-colors">₹{event.fee}</span>
                  </div>
                  <button
                    onClick={() => handleRegister(event)}
                    disabled={registered}
                    className={`px-5 py-2 text-xs font-bold rounded-full transition-all duration-300 ${registered
                        ? "bg-muted text-muted-foreground cursor-not-allowed border border-border"
                        : "bg-primary text-white border border-primary/20 hover:bg-primary/90 hover:shadow-[0_4px_12px_rgba(220,38,38,0.3)] hover:-translate-y-0.5 active:translate-y-0"
                      }`}
                  >
                    {registered ? "✓ Registered" : "Register Now"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CurrentEvents;

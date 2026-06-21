import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Calendar, MapPin, Clock, Loader2 } from "lucide-react";
import { apiClient } from "@/lib/api";
import { categories as mockCategories, events as mockEvents } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface CategoryItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
}

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
}

const CategoryPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { user, registerForEvent, isRegisteredForEvent } = useAuth();

  const [category, setCategory] = useState<CategoryItem | null>(null);
  const [categoryEvents, setCategoryEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        setLoading(true);
        setNotFound(false);
        const data = await apiClient(`/category/${slug}`);
        setCategory({
          id: String(data.id),
          title: data.title,
          slug: data.slug,
          description: data.description,
          image: data.imageUrl || "https://images.unsplash.com/photo-1542224566-6e85f2e6772f?auto=format&fit=crop&q=80"
        });
        const mappedEvents = (data.events || []).map((e: any) => ({
          id: String(e.id),
          name: e.name,
          category: slug || "",
          description: e.description,
          date: new Date(e.date).toLocaleDateString('en-CA'),
          time: e.time,
          location: e.location,
          fee: e.fee,
          image: e.imageUrl || data.imageUrl || "https://images.unsplash.com/photo-1542224566-6e85f2e6772f?auto=format&fit=crop&q=80",
          status: e.status
        }));
        setCategoryEvents(mappedEvents);
      } catch (err) {
        console.error("Failed to load category from API, falling back to mock data:", err);
        const mockCat = mockCategories.find((c) => c.slug === slug);
        if (mockCat) {
          setCategory({
            id: mockCat.id,
            title: mockCat.title,
            slug: mockCat.slug,
            description: mockCat.description,
            image: mockCat.image
          });
          const filteredEvents = mockEvents.filter((e) => e.category === slug);
          setCategoryEvents(filteredEvents);
        } else {
          setNotFound(true);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchCategoryData();
  }, [slug]);

  const ongoing = categoryEvents.filter((e) => e.status === "ongoing");
  const upcoming = categoryEvents.filter((e) => e.status === "upcoming");

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" strokeWidth={3} />
      </div>
    );
  }

  if (notFound || !category) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-display font-bold text-foreground">Category not found</h1>
        <Link to="/categories" className="text-primary mt-4 inline-block">Back to Categories</Link>
      </div>
    );
  }

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
        category: category.title,
        date: event.date,
        time: event.time,
        fee: event.fee,
      });
      if (success) {
        toast.success(`Successfully registered for ${event.name}! Payment of ₹${event.fee} confirmed.`);
      } else {
        toast.error("Registration failed");
      }
    }
  };

  const EventCard = ({ event }: { event: EventItem }) => {
    const registered = isRegisteredForEvent(event.id);
    return (
      <div className="bg-card rounded-lg overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300">
        <div className="relative h-44 overflow-hidden">
          <img src={event.image} alt={event.name} className="w-full h-full object-cover" />
          <span className={`absolute top-3 left-3 px-2 py-0.5 text-xs font-semibold rounded ${event.status === "ongoing" ? "bg-green-600 text-primary-foreground" : "bg-primary text-primary-foreground"}`}>
            {event.status.toUpperCase()}
          </span>
        </div>
        <div className="p-4">
          <h3 className="font-display font-bold text-foreground mb-1">{event.name}</h3>
          <p className="text-xs text-muted-foreground mb-3">{event.description}</p>
          <div className="space-y-1 mb-3">
            <div className="flex items-center gap-1 text-xs text-muted-foreground"><Calendar size={12} /> {event.date}</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground"><Clock size={12} /> {event.time}</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground"><MapPin size={12} /> {event.location}</div>
          </div>
          <p className="text-sm font-semibold text-primary mb-3">Participation Fee: ₹{event.fee}</p>
          <button
            onClick={() => handleRegister(event)}
            disabled={registered}
            className={`w-full py-2 text-sm font-medium rounded-md transition-colors ${registered ? "bg-muted text-muted-foreground cursor-not-allowed" : "bg-primary text-primary-foreground hover:bg-accent"}`}
          >
            {registered ? "✓ Registered" : "Register Now"}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-8">
        <Link to="/categories" className="text-sm text-primary hover:underline mb-2 inline-block">← Back to Categories</Link>
        <h1 className="text-3xl font-display font-bold text-foreground">{category.title}</h1>
        <p className="text-muted-foreground">{category.description}</p>
      </div>

      {ongoing.length > 0 && (
        <>
          <h2 className="text-2xl font-display font-bold text-foreground mb-4">🔴 Ongoing Events</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {ongoing.map((e) => <EventCard key={e.id} event={e} />)}
          </div>
        </>
      )}

      {upcoming.length > 0 && (
        <>
          <h2 className="text-2xl font-display font-bold text-foreground mb-4">📅 Upcoming Events</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcoming.map((e) => <EventCard key={e.id} event={e} />)}
          </div>
        </>
      )}

      {categoryEvents.length === 0 && (
        <p className="text-center text-muted-foreground py-10">No events in this category yet.</p>
      )}

    </div>
  );
};

export default CategoryPage;

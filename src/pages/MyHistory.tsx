import { useAuth } from "@/contexts/AuthContext";
import { Calendar, Clock, IndianRupee, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import AuthModal from "@/components/AuthModal";

const MyHistory = () => {
  const { user, registeredEvents } = useAuth();
  const [authModal, setAuthModal] = useState<"login" | "register" | null>(null);

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-display font-bold text-foreground mb-4">My Event History</h1>
        <p className="text-muted-foreground mb-6">Please login to view your event history.</p>
        <button onClick={() => setAuthModal("login")} className="px-6 py-3 bg-primary text-primary-foreground font-medium rounded-md hover:bg-accent transition-colors">
          Login
        </button>
        {authModal && <AuthModal mode={authModal} onClose={() => setAuthModal(null)} onSwitch={(m) => setAuthModal(m)} />}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-display font-bold text-foreground mb-2">My Event History</h1>
      <p className="text-muted-foreground mb-10">Events you have registered for</p>

      {registeredEvents.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-muted-foreground mb-4">You haven't registered for any events yet.</p>
          <Link to="/events" className="px-6 py-3 bg-primary text-primary-foreground font-medium rounded-md hover:bg-accent transition-colors inline-block">
            Browse Events
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {registeredEvents.map((event, i) => (
            <div key={i} className="bg-card rounded-lg shadow-card p-5">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-display font-bold text-foreground">{event.eventName}</h3>
                <span className="flex items-center gap-1 text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">
                  <CheckCircle size={12} /> {event.status}
                </span>
              </div>
              <p className="text-sm text-primary font-medium mb-3">{event.category}</p>
              <div className="space-y-1 text-sm text-muted-foreground">
                <div className="flex items-center gap-2"><Calendar size={14} /> {event.date}</div>
                <div className="flex items-center gap-2"><Clock size={14} /> {event.time}</div>
                <div className="flex items-center gap-2"><IndianRupee size={14} /> ₹{event.fee} Paid</div>
              </div>
              <p className="text-xs text-muted-foreground mt-3">Registered: {new Date(event.registeredAt).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyHistory;

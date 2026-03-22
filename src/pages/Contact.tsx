import { useState } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent successfully! We'll get back to you soon.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-4xl md:text-5xl font-display font-extrabold text-foreground mb-3">Contact Us</h1>
        <p className="text-lg text-muted-foreground">Get in touch with the PCU Events team</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div>
          <div className="bg-card rounded-lg shadow-card p-6 mb-6">
            <h2 className="text-xl font-display font-bold text-foreground mb-4">Contact Information</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-maroon-light text-primary"><MapPin size={18} /></div>
                <div>
                  <p className="font-medium text-foreground">Address</p>
                  <p className="text-sm text-muted-foreground">Pimpri Chinchwad University, Sector 26, Pradhikaran, Nigdi, Pune - 411044, Maharashtra, India</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-maroon-light text-primary"><Phone size={18} /></div>
                <div>
                  <p className="font-medium text-foreground">Phone</p>
                  <p className="text-sm text-muted-foreground">+91 20 2098 69845</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-maroon-light text-primary"><Mail size={18} /></div>
                <div>
                  <p className="font-medium text-foreground">Email</p>
                  <p className="text-sm text-muted-foreground">info@pcuevents.edu.in</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg overflow-hidden shadow-card h-64">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3781.5!2d73.76!3d18.65!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDM5JzAwLjAiTiA3M8KwNDUnMzYuMCJF!5e0!3m2!1sen!2sin!4v1"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="PCU Location"
            />
          </div>
        </div>

        <div className="bg-card rounded-lg shadow-card p-6">
          <h2 className="text-xl font-display font-bold text-foreground mb-4">Send us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Name</label>
              <input
                type="text"
                required
                maxLength={100}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:ring-2 focus:ring-ring focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Email</label>
              <input
                type="email"
                required
                maxLength={255}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:ring-2 focus:ring-ring focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Message</label>
              <textarea
                required
                maxLength={1000}
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:ring-2 focus:ring-ring focus:outline-none resize-none"
              />
            </div>
            <button type="submit" className="w-full py-2.5 bg-primary text-primary-foreground font-medium rounded-md hover:bg-accent transition-colors">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;

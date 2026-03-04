import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  username: string;
  email: string;
}

interface RegisteredEvent {
  eventId: string;
  eventName: string;
  category: string;
  date: string;
  time: string;
  fee: number;
  registeredAt: string;
  status: "Confirmed";
}

interface AuthContextType {
  user: User | null;
  registeredEvents: RegisteredEvent[];
  login: (email: string, password: string) => boolean;
  register: (username: string, email: string, password: string) => boolean;
  logout: () => void;
  registerForEvent: (event: { eventId: string; eventName: string; category: string; date: string; time: string; fee: number }) => boolean;
  isRegisteredForEvent: (eventId: string) => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("pcu_user");
    return saved ? JSON.parse(saved) : null;
  });

  const [registeredEvents, setRegisteredEvents] = useState<RegisteredEvent[]>(() => {
    const saved = localStorage.getItem("pcu_events");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    if (user) localStorage.setItem("pcu_user", JSON.stringify(user));
    else localStorage.removeItem("pcu_user");
  }, [user]);

  useEffect(() => {
    localStorage.setItem("pcu_events", JSON.stringify(registeredEvents));
  }, [registeredEvents]);

  const login = (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem("pcu_users") || "[]");
    const found = users.find((u: any) => u.email === email && u.password === password);
    if (found) {
      setUser({ username: found.username, email: found.email });
      return true;
    }
    return false;
  };

  const register = (username: string, email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem("pcu_users") || "[]");
    if (users.find((u: any) => u.email === email)) return false;
    users.push({ username, email, password });
    localStorage.setItem("pcu_users", JSON.stringify(users));
    setUser({ username, email });
    return true;
  };

  const logout = () => setUser(null);

  const registerForEvent = (event: { eventId: string; eventName: string; category: string; date: string; time: string; fee: number }) => {
    if (registeredEvents.find((e) => e.eventId === event.eventId)) return false;
    setRegisteredEvents((prev) => [...prev, { ...event, registeredAt: new Date().toISOString(), status: "Confirmed" }]);
    return true;
  };

  const isRegisteredForEvent = (eventId: string) => registeredEvents.some((e) => e.eventId === eventId);

  return (
    <AuthContext.Provider value={{ user, registeredEvents, login, register, logout, registerForEvent, isRegisteredForEvent }}>
      {children}
    </AuthContext.Provider>
  );
};

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { apiClient } from "@/lib/api";

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
  login: (email: string, password: string) => Promise<boolean>;
  register: (firstName: string, lastName: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  registerForEvent: (event: { eventId: string; eventName: string; category: string; date: string; time: string; fee: number }) => Promise<boolean>;
  isRegisteredForEvent: (eventId: string) => boolean;
  clearHistory: () => Promise<void>;
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

  const [registeredEvents, setRegisteredEvents] = useState<RegisteredEvent[]>([]);

  const fetchRegistrations = async () => {
    const token = localStorage.getItem("pcu_token");
    if (!token) {
      setRegisteredEvents([]);
      return;
    }
    try {
      const data = await apiClient("/registrations");
      const mapped = data.map((reg: any) => ({
        eventId: String(reg.event.id),
        eventName: reg.event.name,
        category: reg.event.category?.title || "Events",
        date: new Date(reg.event.date).toLocaleDateString('en-CA'),
        time: reg.event.time,
        fee: reg.event.fee,
        registeredAt: reg.registeredAt,
        status: "Confirmed" as const
      }));
      setRegisteredEvents(mapped);
    } catch (err) {
      console.error("Failed to fetch registrations:", err);
      if (String(err).includes("Unauthorized") || String(err).includes("401")) {
        logout();
      }
    }
  };

  useEffect(() => {
    if (user) {
      fetchRegistrations();
    } else {
      setRegisteredEvents([]);
    }
  }, [user]);

  const login = async (email: string, password: string) => {
    try {
      const data = await apiClient("/auth/login", {
        method: "POST",
        bodyData: { email, password }
      });
      localStorage.setItem("pcu_token", data.token);
      const loggedUser = {
        username: `${data.user.firstName} ${data.user.lastName}`.trim(),
        email: data.user.email
      };
      localStorage.setItem("pcu_user", JSON.stringify(loggedUser));
      setUser(loggedUser);
      return true;
    } catch (err) {
      console.error("Login failed:", err);
      return false;
    }
  };

  const register = async (firstName: string, lastName: string, email: string, password: string) => {
    try {
      const data = await apiClient("/auth/signup", {
        method: "POST",
        bodyData: { firstName, lastName, email, password }
      });
      localStorage.setItem("pcu_token", data.token);
      const loggedUser = {
        username: `${data.user.firstName} ${data.user.lastName}`.trim(),
        email: data.user.email
      };
      localStorage.setItem("pcu_user", JSON.stringify(loggedUser));
      setUser(loggedUser);
      return true;
    } catch (err) {
      console.error("Registration failed:", err);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("pcu_token");
    localStorage.removeItem("pcu_user");
    setUser(null);
    setRegisteredEvents([]);
  };

  const registerForEvent = async (event: { eventId: string; eventName: string; category: string; date: string; time: string; fee: number }) => {
    try {
      await apiClient("/registrations", {
        method: "POST",
        bodyData: { eventId: Number(event.eventId) }
      });
      await fetchRegistrations();
      return true;
    } catch (err) {
      console.error("Registration for event failed:", err);
      return false;
    }
  };

  const isRegisteredForEvent = (eventId: string) => {
    return registeredEvents.some((e) => e.eventId === eventId);
  };

  const clearHistory = async () => {
    try {
      await apiClient("/registrations/clear", {
        method: "POST"
      });
      setRegisteredEvents([]);
    } catch (err) {
      console.error("Failed to clear registrations:", err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, registeredEvents, login, register, logout, registerForEvent, isRegisteredForEvent, clearHistory }}>
      {children}
    </AuthContext.Provider>
  );
};

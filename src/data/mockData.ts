import techImg from "@/assets/tech-events.jpg";
import musicImg from "@/assets/music-events.jpg";
import sportsImg from "@/assets/sports-events.jpg";
import hackathonImg from "@/assets/hackathon-events.jpg";
import intercollegeImg from "@/assets/intercollege-events.jpg";

import cricketImg from "@/assets/cricket-tournament.png";
import aiMlImg from "@/assets/ai-ml-workshop.png";
import bandsImg from "@/assets/battle-bands.png";
import codeSprintImg from "@/assets/code-sprint-48.png";
import debateImg from "@/assets/intercollege-debate.png";
import webDevImg from "@/assets/web-dev-bootcamp.png";
import roboticsImg from "@/assets/robotics-challenge.png";
import marathonImg from "@/assets/marathon-2026.png";
import basketballImg from "@/assets/basketball-championship.png";
import culturalImg from "@/assets/cultural-fest-2026.png";
import ttImg from "@/assets/table-tennis-open.png";

export interface EventCategory {
  id: string;
  title: string;
  slug: string;
  image: string;
  description: string;
}

export interface EventItem {
  id: string;
  name: string;
  category: string;
  description: string;
  date: string;
  time: string;
  location: string;
  fee: number;
  image: string;
  status: "ongoing" | "upcoming" | "past";
  highlights?: string;
}

export interface NewsItem {
  id: string;
  title: string;
  description: string;
  date: string;
  image: string;
  type: string;
}

export const categories: EventCategory[] = [
  { id: "1", title: "Tech Events", slug: "tech-events", image: techImg, description: "Explore technology-driven events, coding competitions, and innovation showcases." },
  { id: "2", title: "Music Events", slug: "music-events", image: musicImg, description: "Enjoy musical performances, band competitions, and cultural shows." },
  { id: "3", title: "Sports Events", slug: "sports-events", image: sportsImg, description: "Compete in various sports tournaments and athletic challenges." },
  { id: "4", title: "Hackathons", slug: "hackathons", image: hackathonImg, description: "Build innovative solutions in time-bound coding marathons." },
  { id: "5", title: "Intercollege Events", slug: "intercollege-events", image: intercollegeImg, description: "Represent your college in prestigious inter-college competitions." },
];

export const events: EventItem[] = [
  { id: "e1", name: "AI & ML Workshop", category: "tech-events", description: "Hands-on workshop on artificial intelligence and machine learning fundamentals.", date: "2026-03-15", time: "10:00 AM", location: "Main Auditorium", fee: 50, image: aiMlImg, status: "ongoing" },
  { id: "e2", name: "Web Dev Bootcamp", category: "tech-events", description: "Intensive full-stack web development bootcamp with React and Node.js.", date: "2026-03-20", time: "9:00 AM", location: "Computer Lab 1", fee: 50, image: webDevImg, status: "upcoming" },
  { id: "e3", name: "Robotics Challenge", category: "tech-events", description: "Design and program robots to complete challenging obstacle courses.", date: "2026-04-05", time: "11:00 AM", location: "Innovation Center", fee: 50, image: roboticsImg, status: "upcoming" },
  { id: "e4", name: "Battle of Bands", category: "music-events", description: "Showcase your band's talent in this electrifying music competition.", date: "2026-03-18", time: "5:00 PM", location: "Open Air Theater", fee: 50, image: bandsImg, status: "ongoing" },
  { id: "e5", name: "Classical Music Night", category: "music-events", description: "An evening of soulful classical music performances by renowned artists.", date: "2026-04-01", time: "6:30 PM", location: "Auditorium B", fee: 50, image: musicImg, status: "upcoming" },
  { id: "e6", name: "Cricket Tournament", category: "sports-events", description: "Inter-department cricket tournament with exciting prizes.", date: "2026-03-12", time: "8:00 AM", location: "Sports Ground", fee: 50, image: cricketImg, status: "ongoing" },
  { id: "e7", name: "Marathon 2026", category: "sports-events", description: "Annual university marathon open to all students and faculty.", date: "2026-04-10", time: "6:00 AM", location: "Campus Circuit", fee: 50, image: marathonImg, status: "upcoming" },
  { id: "e8", name: "Code Sprint 48", category: "hackathons", description: "48-hour hackathon to build solutions for real-world problems.", date: "2026-03-22", time: "9:00 AM", location: "Innovation Hub", fee: 50, image: codeSprintImg, status: "ongoing" },
  { id: "e9", name: "Green Tech Hack", category: "hackathons", description: "Hackathon focused on sustainable technology and green innovation.", date: "2026-04-15", time: "10:00 AM", location: "Lab Complex", fee: 50, image: hackathonImg, status: "upcoming" },
  { id: "e10", name: "Inter-College Debate", category: "intercollege-events", description: "Prestigious debate competition with colleges from across the state.", date: "2026-03-25", time: "2:00 PM", location: "Conference Hall", fee: 50, image: debateImg, status: "ongoing" },
  { id: "e11", name: "Cultural Fest 2026", category: "intercollege-events", description: "Grand inter-college cultural extravaganza with performances and exhibitions.", date: "2026-04-20", time: "10:00 AM", location: "Campus Wide", fee: 50, image: culturalImg, status: "upcoming" },
  { id: "e12", name: "Basketball Championship", category: "sports-events", description: "State-level inter-college basketball tournament.", date: "2026-04-18", time: "9:00 AM", location: "Indoor Stadium", fee: 100, image: basketballImg, status: "upcoming" },
  { id: "e13", name: "Table Tennis Open", category: "sports-events", description: "Campus-wide table tennis tournament for singles and doubles.", date: "2026-04-22", time: "10:00 AM", location: "Student Center Hub", fee: 30, image: ttImg, status: "upcoming" },
];

export const pastEvents: EventItem[] = [
  { id: "p1", name: "Tech Conference 2025", category: "tech-events", description: "Annual technology conference featuring keynotes from industry leaders.", date: "2025-11-15", time: "9:00 AM", location: "Main Auditorium", fee: 50, image: techImg, status: "past", highlights: "Over 500 participants, 15 speakers, 3 workshops conducted." },
  { id: "p2", name: "Annual Sports Day 2025", category: "sports-events", description: "University-wide sports day with multiple athletic events.", date: "2025-12-10", time: "7:00 AM", location: "Sports Complex", fee: 50, image: sportsImg, status: "past", highlights: "New records set in 4 events. 1200+ participants." },
  { id: "p3", name: "Hackathon 2025", category: "hackathons", description: "24-hour hackathon with industry mentors and exciting prizes.", date: "2025-10-20", time: "9:00 AM", location: "Innovation Hub", fee: 50, image: hackathonImg, status: "past", highlights: "50 teams participated. Winning solution deployed by sponsor company." },
  { id: "p4", name: "Music Fest 2025", category: "music-events", description: "Three-day music festival with performances from student bands.", date: "2025-09-05", time: "4:00 PM", location: "Open Air Theater", fee: 50, image: musicImg, status: "past", highlights: "Featured 20 bands. Attended by 2000+ students." },
];

export const newsItems: NewsItem[] = [
  { id: "n1", title: "Guest Lecture by Dr. Raviraj Patil on AI", description: "Renowned AI expert Dr. Raviraj Patil delivered an insightful lecture on the future of artificial intelligence.", date: "2026-02-28", image: techImg, type: "Guest Lecture" },
  { id: "n2", title: "PCU Students Win National Robotics Competition", description: "Our students secured first place at the National Robotics Championship held in Delhi.", date: "2026-02-20", image: hackathonImg, type: "Competition" },
  { id: "n3", title: "Entrepreneurship Workshop Success", description: "Over 300 students attended the week-long entrepreneurship workshop with industry mentors.", date: "2026-02-15", image: intercollegeImg, type: "Workshop" },
  { id: "n4", title: "New Innovation Lab Inaugurated", description: "State-of-the-art innovation lab inaugurated to foster student research and development.", date: "2026-02-10", image: techImg, type: "Announcement" },
];

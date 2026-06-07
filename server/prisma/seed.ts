import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const categories = [
  { title: "Tech Events", slug: "tech-events", description: "Explore technology-driven events, coding competitions, and innovation showcases." },
  { title: "Music Events", slug: "music-events", description: "Enjoy musical performances, band competitions, and cultural shows." },
  { title: "Sports Events", slug: "sports-events", description: "Compete in various sports tournaments and athletic challenges." },
  { title: "Hackathons", slug: "hackathons", description: "Build innovative solutions in time-bound coding marathons." },
  { title: "Intercollege Events", slug: "intercollege-events", description: "Represent your college in prestigious inter-college competitions." },
];

const events = [
  { name: "AI & ML Workshop", categorySlug: "tech-events", description: "Hands-on workshop on artificial intelligence and machine learning fundamentals.", date: "2026-03-15", time: "10:00 AM", location: "Main Auditorium", fee: 50, status: "ongoing" },
  { name: "Web Dev Bootcamp", categorySlug: "tech-events", description: "Intensive full-stack web development bootcamp with React and Node.js.", date: "2026-03-20", time: "9:00 AM", location: "Computer Lab 1", fee: 50, status: "upcoming" },
  { name: "Robotics Challenge", categorySlug: "tech-events", description: "Design and program robots to complete challenging obstacle courses.", date: "2026-04-05", time: "11:00 AM", location: "Innovation Center", fee: 50, status: "upcoming" },
  { name: "Battle of Bands", categorySlug: "music-events", description: "Showcase your band's talent in this electrifying music competition.", date: "2026-03-18", time: "5:00 PM", location: "Open Air Theater", fee: 50, status: "ongoing" },
  { name: "Classical Music Night", categorySlug: "music-events", description: "An evening of soulful classical music performances by renowned artists.", date: "2026-04-01", time: "6:30 PM", location: "Auditorium B", fee: 50, status: "upcoming" },
  { name: "Cricket Tournament", categorySlug: "sports-events", description: "Inter-department cricket tournament with exciting prizes.", date: "2026-03-12", time: "8:00 AM", location: "Sports Ground", fee: 50, status: "ongoing" },
  { name: "Marathon 2026", categorySlug: "sports-events", description: "Annual university marathon open to all students and faculty.", date: "2026-04-10", time: "6:00 AM", location: "Campus Circuit", fee: 50, status: "upcoming" },
  { name: "Code Sprint 48", categorySlug: "hackathons", description: "48-hour hackathon to build solutions for real-world problems.", date: "2026-03-22", time: "9:00 AM", location: "Innovation Hub", fee: 50, status: "ongoing" },
  { name: "Green Tech Hack", categorySlug: "hackathons", description: "Hackathon focused on sustainable technology and green innovation.", date: "2026-04-15", time: "10:00 AM", location: "Lab Complex", fee: 50, status: "upcoming" },
  { name: "Inter-College Debate", categorySlug: "intercollege-events", description: "Prestigious debate competition with colleges from across the state.", date: "2026-03-25", time: "2:00 PM", location: "Conference Hall", fee: 50, status: "ongoing" },
  { name: "Cultural Fest 2026", categorySlug: "intercollege-events", description: "Grand inter-college cultural extravaganza with performances and exhibitions.", date: "2026-04-20", time: "10:00 AM", location: "Campus Wide", fee: 50, status: "upcoming" },
  { name: "Basketball Championship", categorySlug: "sports-events", description: "State-level inter-college basketball tournament.", date: "2026-04-18", time: "9:00 AM", location: "Indoor Stadium", fee: 100, status: "upcoming" },
  { name: "Table Tennis Open", categorySlug: "sports-events", description: "Campus-wide table tennis tournament for singles and doubles.", date: "2026-04-22", time: "10:00 AM", location: "Student Center Hub", fee: 30, status: "upcoming" },
];

const pastEvents = [
  { name: "Tech Conference 2025", categorySlug: "tech-events", description: "Annual technology conference featuring keynotes from industry leaders.", date: "2025-11-15", time: "9:00 AM", location: "Main Auditorium", fee: 50, status: "past", highlights: ["Over 500 participants", "15 speakers", "3 workshops conducted"] },
  { name: "Annual Sports Day", categorySlug: "sports-events", description: "University-wide sports day with multiple athletic events.", date: "2025-12-10", time: "7:00 AM", location: "Sports Complex", fee: 50, status: "past", highlights: ["New records set in 4 events", "1200+ participants"] },
  { name: "Hackathon 2025", categorySlug: "hackathons", description: "24-hour hackathon with industry mentors and exciting prizes.", date: "2025-10-20", time: "9:00 AM", location: "Innovation Hub", fee: 50, status: "past", highlights: ["50 teams participated", "Winning solution deployed by sponsor company"] },
  { name: "Music Fest 2025", categorySlug: "music-events", description: "Three-day music festival with performances from student bands.", date: "2025-09-05", time: "4:00 PM", location: "Open Air Theater", fee: 50, status: "past", highlights: ["Featured 20 bands", "Attended by 2000+ students"] },
];

async function main() {
  console.log('Seeding categories...');
  const categoryMap: any = {};
  
  for (const cat of categories) {
    const createdCat = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: {
        title: cat.title,
        slug: cat.slug,
        description: cat.description,
        imageUrl: `https://images.unsplash.com/photo-1542224566-6e85f2e6772f?auto=format&fit=crop&q=80` // standard fallback image path
      }
    });
    categoryMap[cat.slug] = createdCat.id;
  }

  console.log('Seeding active events...');
  for (const ev of events) {
    await prisma.event.create({
      data: {
        name: ev.name,
        categoryId: categoryMap[ev.categorySlug],
        description: ev.description,
        date: new Date(ev.date),
        time: ev.time,
        location: ev.location,
        fee: ev.fee,
        status: ev.status,
        imageUrl: `https://images.unsplash.com/photo-1542224566-6e85f2e6772f?auto=format&fit=crop&q=80`,
        highlights: []
      }
    });
  }

  console.log('Seeding past events...');
  for (const ev of pastEvents) {
    await prisma.event.create({
      data: {
        name: ev.name,
        categoryId: categoryMap[ev.categorySlug],
        description: ev.description,
        date: new Date(ev.date),
        time: ev.time,
        location: ev.location,
        fee: ev.fee,
        status: ev.status,
        imageUrl: `https://images.unsplash.com/photo-1542224566-6e85f2e6772f?auto=format&fit=crop&q=80`,
        highlights: ev.highlights
      }
    });
  }

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { categories } from "@/data/mockData";

const Categories = () => (
  <div className="container mx-auto px-4 py-10">
    <div className="text-center max-w-2xl mx-auto mb-12">
      <h1 className="text-4xl md:text-5xl font-display font-extrabold text-foreground mb-3">Event Categories</h1>
      <p className="text-lg text-muted-foreground">Select a category to explore events</p>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {categories.map((cat) => (
        <div key={cat.id} className="bg-card rounded-lg overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 group">
          <div className="h-48 overflow-hidden">
            <img src={cat.image} alt={cat.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          </div>
          <div className="p-5">
            <h3 className="font-display font-bold text-xl text-foreground mb-2">{cat.title}</h3>
            <p className="text-sm text-muted-foreground mb-4">{cat.description}</p>
            <Link to={`/category/${cat.slug}`} className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:bg-accent transition-colors">
              View Events <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Categories;

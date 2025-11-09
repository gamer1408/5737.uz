import { Link } from "react-router-dom";
import { Zap, Snowflake, Percent, Shirt, Home, Gem, Palette } from "lucide-react";
import categories from "@/db/categories.json";

const CategoryNav = () => {
  const getIcon = (categoryId: number) => {
    const iconMap = {
      1: Zap,        // Flash Sale
      2: Snowflake,  // Qishki kiyimlar
      3: Percent,    // Chegirmalar
      4: Shirt,      // An'anaviy kiyim
      5: Home,       // Uy
      6: Gem,        // Aksessuarlar
      7: Palette     // Zargarlik
    };
    return iconMap[categoryId as keyof typeof iconMap] || Home;
  };

  return (
    <div className="sticky top-20 z-40 bg-secondary/50 border-b border-border backdrop-blur-sm">
      <div className="container-premium">
        <div className="flex items-center gap-3 py-2 overflow-x-auto">
          {categories.map((category) => {
            const Icon = getIcon(category.id);
            return (
              <Link
                key={category.id}
                to={`/category/${category.id}`}
                className={`flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-all hover:scale-105 ${
                  category.isSpecial
                    ? `${category.color} text-white hover:opacity-90`
                    : "bg-background text-foreground hover:bg-primary hover:text-primary-foreground border"
                }`}
              >
                <Icon className="h-4 w-4" />
                {category.name}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryNav;
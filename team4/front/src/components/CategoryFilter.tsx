import {
  MapPin,
  Utensils,
  Building,
  Coffee,
  Trees,
  Landmark,
  Theater,
  Dumbbell,
  ShoppingBag,
} from 'lucide-react';
import { categories } from '../data/mockPlaces';

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const iconMap: { [key: string]: any } = {
  MapPin,
  Utensils,
  Building,
  Coffee,
  Trees,
  Landmark,
  Theater,
  Dumbbell,
  ShoppingBag,
};

export default function CategoryFilter({
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Categories</h3>
      <div className="grid grid-cols-2 gap-3">
        {categories.map((category) => {
          const Icon = iconMap[category.icon];
          const isSelected = selectedCategory === category.id;

          return (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`flex items-center p-3 rounded-lg border-2 transition-all ${
                isSelected
                  ? 'border-blue-600 bg-blue-50 text-blue-700'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-5 h-5 mr-2 flex-shrink-0" />
              <span className="text-sm font-medium truncate">{category.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

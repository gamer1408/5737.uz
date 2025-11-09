import { Package, Ruler, Palette, MapPin } from "lucide-react";

interface ProductSpec {
  icon: React.ReactNode;
  label: string;
  value: string;
}

interface ProductSpecsGridProps {
  specs: {
    dimensions: string;
    material: string;
    technique: string;
    origin: string;
  };
}

const ProductSpecsGrid = ({ specs }: ProductSpecsGridProps) => {
  const specItems: ProductSpec[] = [
    {
      icon: <Ruler className="h-5 w-5 text-blue-600" />,
      label: "Size",
      value: specs.dimensions
    },
    {
      icon: <Package className="h-5 w-5 text-green-600" />,
      label: "Material", 
      value: specs.material
    },
    {
      icon: <Palette className="h-5 w-5 text-purple-600" />,
      label: "Technique",
      value: specs.technique
    },
    {
      icon: <MapPin className="h-5 w-5 text-red-600" />,
      label: "Origin",
      value: specs.origin
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h3 className="text-lg font-semibold mb-4">Product Specifications</h3>
      <div className="grid grid-cols-2 gap-4">
        {specItems.map((spec, index) => (
          <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            {spec.icon}
            <div>
              <div className="text-sm text-gray-600">{spec.label}</div>
              <div className="font-medium">{spec.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSpecsGrid;
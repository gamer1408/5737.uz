import { useState } from "react";
import { ArrowRight } from "lucide-react";
import ViewMoreDetailsModal from "./ViewMoreDetailsModal";

interface ViewMoreDetailsButtonProps {
  productId: string;
  className?: string;
}

const ViewMoreDetailsButton = ({ productId, className = "" }: ViewMoreDetailsButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className={`flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors ${className}`}
      >
        <span>View More Details</span>
        <ArrowRight className="h-4 w-4" />
      </button>
      
      <ViewMoreDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productId={productId}
      />
    </>
  );
};

export default ViewMoreDetailsButton;
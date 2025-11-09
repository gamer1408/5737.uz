import { X } from "lucide-react";
import ProductDetailPage from "./ProductDetailPage";

interface ViewMoreDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId: string;
}

const ViewMoreDetailsModal = ({ isOpen, onClose, productId }: ViewMoreDetailsModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-7xl max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
        >
          <X className="h-5 w-5" />
        </button>
        <ProductDetailPage productId={productId} />
      </div>
    </div>
  );
};

export default ViewMoreDetailsModal;
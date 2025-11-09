import { useState } from "react";
import { Star, Truck, Shield, RotateCcw } from "lucide-react";
import ProductImageGallery from "./ProductImageGallery";
import ProductSpecsGrid from "./ProductSpecsGrid";
import PurchaseControls from "./PurchaseControls";

interface ProductDetailPageProps {
  productId?: string;
}

const ProductDetailPage = ({ productId }: ProductDetailPageProps) => {

  // Mock product data - replace with actual API call
  const product = {
    id: "suzani-001",
    name: "Hand-Embroidered Bukhara Suzani, Silk on Cotton, Vibrant Floral Patterns",
    rating: 5.0,
    reviewCount: 48,
    soldCount: 12,
    stockCount: 3,
    originalPrice: 250.00,
    currentPrice: 200.00,
    discount: 20,
    images: [
      "/api/placeholder/600/600",
      "/api/placeholder/600/600", 
      "/api/placeholder/600/600",
      "/api/placeholder/600/600"
    ],
    videoUrl: "/api/placeholder/video",
    specs: {
      dimensions: "200x150cm",
      material: "Silk/Cotton",
      technique: "Hand-stitched",
      origin: "Bukhara, UZ"
    },
    category: "Textiles & Embroidery"
  };

  const reviews = [
    { name: "Sarah K.", rating: 5, comment: "Absolutely stunning! The colors are vibrant and the craftsmanship is incredible." },
    { name: "Alex R.", rating: 5, comment: "You can feel the history and tradition in every stitch. Worth every penny!" }
  ];

  const relatedProducts = [
    { id: "1", name: "Ikat Fabric", price: 90.00, image: "/api/placeholder/200/200" },
    { id: "2", name: "Suzani Pillow", price: 60.00, image: "/api/placeholder/200/200" },
    { id: "3", name: "Silk Scarf", price: 45.00, image: "/api/placeholder/200/200" }
  ];



  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Navigation */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="text-xl font-bold text-blue-900">Uzbek Craft Engine</div>
              <nav className="text-sm text-gray-600">
                <span>Home</span> <span className="mx-2">›</span>
                <span>Textiles & Embroidery</span> <span className="mx-2">›</span>
                <span className="text-gray-900">Suzani</span>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="pl-8 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="absolute left-2 top-2.5 text-gray-400">🔍</div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="cursor-pointer">👤</div>
                <div className="relative cursor-pointer">
                  🛒 <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">2</span>
                </div>
                <select className="border rounded px-2 py-1 text-sm">
                  <option>EN</option>
                  <option>UZ</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Product Identity Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
          <div className="flex items-center space-x-4 mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="ml-2 text-lg font-semibold">{product.rating}</span>
              <span className="ml-1 text-gray-600">({product.reviewCount} reviews)</span>
            </div>
            <span className="text-gray-600">• {product.soldCount} sold</span>
            <span className="text-green-600 font-medium">({product.stockCount} available)</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🏺</span>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              Authenticity Guaranteed - Handmade in Uzbekistan
            </span>
          </div>
        </div>

        {/* Two-Column Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Left Column - Visual Media */}
          <ProductImageGallery 
            images={product.images}
            productName={product.name}
            hasVideo={true}
            onVideoPlay={() => console.log('Play video')}
          />

          {/* Right Column - Purchase Info */}
          <div className="space-y-6">
            <ProductSpecsGrid specs={product.specs} />
            <PurchaseControls 
              price={product.currentPrice}
              originalPrice={product.originalPrice}
              discount={product.discount}
              stockCount={product.stockCount}
              onAddToCart={(qty) => console.log('Add to cart:', qty)}
              onBuyNow={(qty) => console.log('Buy now:', qty)}
            />
          </div>
        </div>

        {/* Customer Reviews */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 mr-2" />
            {product.rating} ({product.reviewCount} reviews)
          </h3>
          <div className="space-y-4">
            {reviews.map((review, index) => (
              <div key={index} className="border-b pb-4 last:border-b-0">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="font-medium">{review.name}</span>
                  <div className="flex">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery & Trust Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
            <Truck className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <h4 className="font-semibold mb-1">Free Shipping</h4>
            <p className="text-sm text-gray-600">Orders over $150</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
            <Shield className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <h4 className="font-semibold mb-1">Authentic</h4>
            <p className="text-sm text-gray-600">Guaranteed handmade</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
            <RotateCcw className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <h4 className="font-semibold mb-1">Returns</h4>
            <p className="text-sm text-gray-600">30 day policy</p>
          </div>
        </div>

        {/* Related Products */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-xl font-semibold mb-6">🔗 You May Also Like (From Textiles Category)</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProducts.map((item) => (
              <div key={item.id} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h4 className="font-medium mb-2">{item.name}</h4>
                  <p className="text-lg font-bold text-red-600">${item.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
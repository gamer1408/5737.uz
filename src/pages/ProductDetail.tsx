import { useState, useRef } from "react";
import { ArrowLeft, Star, ShoppingCart, Heart, Play, Truck, Shield, RotateCcw, Check, Minus, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { useCart } from "@/hooks/useCart";
import { useLikedProducts } from "@/hooks/useLikedProducts";
import { cn } from "@/lib/utils";
import { products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ProductDetail = () => {
  const { id } = useParams();
  const baseProduct = products.find(p => p.id === Number(id));
  
  // Product variants data with different images and stock
  const variants = {
    colors: [
      { 
        name: 'Traditional Red', 
        value: '#C0392B', 
        price: baseProduct?.price || 0, 
        images: [baseProduct?.image || '', '/placeholder.svg', '/placeholder.svg'],
        stock: 5
      },
      { 
        name: 'Royal Blue', 
        value: '#2E86AB', 
        price: (baseProduct?.price || 0) + 20000, 
        images: [baseProduct?.image || '', '/placeholder.svg'],
        stock: 3
      },
      { 
        name: 'Golden Yellow', 
        value: '#F39C12', 
        price: (baseProduct?.price || 0) + 15000, 
        images: [baseProduct?.image || '', '/placeholder.svg', '/placeholder.svg'],
        stock: 7
      }
    ],
    sizes: [
      { name: 'Small', value: '150x100cm', priceModifier: -30000, stockModifier: 0 },
      { name: 'Medium', value: '200x150cm', priceModifier: 0, stockModifier: 0 },
      { name: 'Large', value: '250x200cm', priceModifier: 50000, stockModifier: -2 }
    ],
    brands: [
      { 
        name: 'Bukhara Masters', 
        region: 'Bukhara', 
        priceModifier: 0, 
        rating: 4.8, 
        reviews: 48,
        images: [baseProduct?.image || '', '/placeholder.svg'],
        stockModifier: 0
      },
      { 
        name: 'Samarkand Artisans', 
        region: 'Samarkand', 
        priceModifier: 25000, 
        rating: 4.9, 
        reviews: 62,
        images: [baseProduct?.image || '', '/placeholder.svg', '/placeholder.svg'],
        stockModifier: -1
      },
      { 
        name: 'Tashkent Crafters', 
        region: 'Tashkent', 
        priceModifier: -15000, 
        rating: 4.6, 
        reviews: 34,
        images: [baseProduct?.image || '', '/placeholder.svg'],
        stockModifier: 1
      }
    ]
  };
  
  const [selectedColor, setSelectedColor] = useState(variants.colors[0]);
  const [selectedSize, setSelectedSize] = useState(variants.sizes[1]);
  const [selectedBrand, setSelectedBrand] = useState(variants.brands[0]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [buttonState, setButtonState] = useState<'default' | 'adding' | 'success'>('default');
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [selectedDiscount, setSelectedDiscount] = useState<{id: string, name: string, percent: number, code: string} | null>(null);
  
  // Available discounts
  const availableDiscounts = [
    { id: '1', name: 'Yangi mijoz', percent: 10, code: 'NEW10' },
    { id: '2', name: 'Katta xarid', percent: 15, code: 'BIG15' },
    { id: '3', name: 'Maxsus chegirma', percent: 20, code: 'SPECIAL20' }
  ];
  
  // Dynamic product based on selections
  const basePrice = selectedColor.price + selectedSize.priceModifier + selectedBrand.priceModifier;
  const discountAmount = selectedDiscount ? Math.round(basePrice * selectedDiscount.percent / 100) : 0;
  const finalPrice = basePrice - discountAmount;
  
  const currentProduct = {
    ...baseProduct,
    price: finalPrice,
    originalPrice: selectedDiscount ? basePrice : baseProduct.originalPrice,
    rating: selectedBrand.rating,
    reviewCount: selectedBrand.reviews,
    appliedDiscount: selectedDiscount
  };
  
  // Calculate available stock
  const availableStock = Math.max(0, selectedColor.stock + selectedSize.stockModifier + selectedBrand.stockModifier);
  
  // Get images based on selections
  const allImages = selectedBrand.images.length > 1 ? selectedBrand.images : selectedColor.images;
  const selectedImage = allImages[selectedImageIndex] || baseProduct?.image || '';
  
  const resetImageIndex = () => setSelectedImageIndex(0);
  
  const { addItem } = useCart();
  const { addProduct, removeProduct, isLiked } = useLikedProducts();
  
  if (!baseProduct) return <div>Product not found</div>;
  
  const liked = isLiked(baseProduct.id);
  const relatedProducts = products.filter(p => p.category === baseProduct.category && p.id !== baseProduct.id).slice(0, 3);
  const fallbackProducts = relatedProducts.length === 0 ? products.filter(p => p.id !== baseProduct.id).slice(0, 3) : [];
  
  // Dynamic reviews based on brand selection
  const getReviewsForBrand = () => {
    const reviews = {
      'Bukhara Masters': [
        { name: 'Sarah K.', rating: 5, text: 'Absolutely stunning! The traditional Bukhara craftsmanship is incredible.' },
        { name: 'Alex R.', rating: 5, text: 'You can feel the history and tradition in every stitch. Worth every penny!' }
      ],
      'Samarkand Artisans': [
        { name: 'Maria L.', rating: 5, text: 'Exquisite Samarkand artistry! The attention to detail is phenomenal.' },
        { name: 'James T.', rating: 5, text: 'Premium quality from Samarkand masters. Highly recommended!' }
      ],
      'Tashkent Crafters': [
        { name: 'Anna P.', rating: 5, text: 'Beautiful modern interpretation of traditional Uzbek patterns.' },
        { name: 'David M.', rating: 4, text: 'Great value for money. Tashkent crafters deliver quality work.' }
      ]
    };
    return reviews[selectedBrand.name as keyof typeof reviews] || reviews['Bukhara Masters'];
  };
  
  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % allImages.length);
  };
  
  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };
  
  const handleAddToCart = () => {
    if (buttonState !== 'default') return;
    setButtonState('adding');
    
    for (let i = 0; i < quantity; i++) {
      addItem(currentProduct);
    }
    
    setTimeout(() => {
      setButtonState('success');
      setTimeout(() => setButtonState('default'), 1500);
    }, 750);
  };

  const handleLike = () => {
    if (liked) {
      removeProduct(baseProduct.id);
    } else {
      addProduct(currentProduct);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Breadcrumb */}
      <div className="border-b">
        <div className="container-premium py-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <span>/</span>
            <Link to="/shop" className="hover:text-foreground">Shop</Link>
            <span>/</span>
            <span className="text-foreground">{baseProduct.name}</span>
          </div>
        </div>
      </div>

      <main className="py-8">
        <div className="container-premium">
          {/* Product Identity Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">{baseProduct.name}</h1>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Experience the timeless beauty of authentic Uzbek craftsmanship. Each piece is meticulously handcrafted by skilled artisans using traditional techniques passed down through generations. The intricate patterns tell stories of ancient Silk Road heritage, making this not just a decorative piece, but a window into Central Asian culture and artistry.
            </p>
            <div className="flex items-center gap-4 mb-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < Math.floor(currentProduct.rating || 4.8) ? "fill-accent text-accent" : "text-muted-foreground"}`} />
                ))}
                <span className="text-sm ml-1">{currentProduct.rating} ({currentProduct.reviewCount} reviews)</span>
              </div>
              <span className="text-sm text-muted-foreground">12 sold</span>
              <Badge variant={availableStock > 0 ? "secondary" : "destructive"}>
                {availableStock > 0 ? `${availableStock} available` : 'Out of stock'}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium">Authenticity Guaranteed - Handmade in {selectedBrand.region}, Uzbekistan</span>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Left Column - Visual Media */}
            <div className="sticky top-4 space-y-4">
              <div className="relative aspect-square rounded-lg overflow-hidden bg-secondary group">
                <img
                  src={selectedImage}
                  alt={baseProduct.name}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute top-4 right-4 rounded-full"
                >
                  <Play className="h-4 w-4" />
                </Button>
                
                {/* Image Navigation */}
                {allImages.length > 1 && (
                  <>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={prevImage}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={nextImage}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </div>
              
              {/* Thumbnail Gallery */}
              {allImages.length > 1 && (
                <div className="flex gap-2 justify-center">
                  {allImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${
                        selectedImageIndex === index ? 'border-primary shadow-md' : 'border-transparent hover:border-gray-300'
                      }`}
                    >
                      <img src={image} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
              
              {/* Product Description */}
              <div className="bg-card border rounded-lg p-4 space-y-4">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  ✨ Mahsulot haqida
                </h3>
                
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>
                    🎨 <strong>An'anaviy san'at:</strong> {baseProduct.description || "Bu mahsulot ming yillik o'zbek hunarmandchiligi an'analarini o'zida mujassam etgan noyob asar. Har bir naqsh va rang Ipak yo'li davridagi boy madaniy merosni aks ettiradi."}
                  </p>
                  
                  <p>
                    🏺 <strong>Qo'lda yasalgan:</strong> Tajribali hunarmandlar tomonidan to'liq qo'lda ishlab chiqarilgan. Har bir mahsulot o'ziga xos xususiyatlarga ega bo'lib, fabrika ishlab chiqarishida topilmaydigan issiqlik va ruhni o'zida saqlaydi.
                  </p>
                  
                  <p>
                    🌟 <strong>Premium sifat:</strong> Faqat eng yuqori sifatli xom ashyo va materiallardan foydalanilgan. Uzoq yillar davomida o'z go'zalligini saqlab qolish uchun maxsus texnologiyalar qo'llanilgan.
                  </p>
                  
                  <p>
                    🏠 <strong>Uy uchun mukammal:</strong> Zamonaviy interyerga ajoyib mos keladi va har qanday xonaga maxsus atmosfera yaratadi. Mehmonlaringiz albatta hayratda qolishadi.
                  </p>
                </div>
                
                <div className="bg-secondary/30 rounded-lg p-3 space-y-2">
                  <h4 className="font-medium text-sm flex items-center gap-2">
                    📋 Texnik ma'lumotlar
                  </h4>
                  <div className="grid grid-cols-1 gap-2 text-xs text-muted-foreground">
                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-1">🏭 Ishlab chiqaruvchi:</span>
                      <span className="font-medium">{selectedBrand.name}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-1">📏 O'lcham:</span>
                      <span className="font-medium">{selectedSize.value}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-1">🎨 Rang:</span>
                      <span className="font-medium">{selectedColor.name}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-1">🌍 Kelib chiqishi:</span>
                      <span className="font-medium">{selectedBrand.region}, O'zbekiston</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <h4 className="font-medium text-sm text-green-800 mb-2 flex items-center gap-2">
                    ✅ Kafolat va xizmatlar
                  </h4>
                  <div className="space-y-1 text-xs text-green-700">
                    <div className="flex items-center gap-2">
                      <span>🛡️</span>
                      <span>Asl ekanligiga 100% kafolat</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>🚚</span>
                      <span>150,000 UZS dan ortiq xaridlarga bepul yetkazib berish</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>↩️</span>
                      <span>30 kun ichida qaytarish imkoniyati</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>📞</span>
                      <span>24/7 mijozlarga yordam xizmati</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Purchase Info */}
            <div className="space-y-6">
              {/* Product Variants */}
              <div className="sticky top-4 bg-background pb-6 space-y-6">
                {/* Colors */}
                <div>
                  <h3 className="font-medium mb-3">Color: {selectedColor.name}</h3>
                  <div className="flex gap-2">
                    {variants.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => {
                          setSelectedColor(color);
                          resetImageIndex();
                        }}
                        className={`w-10 h-10 rounded-full border-2 transition-all ${
                          selectedColor.name === color.name ? 'border-primary shadow-md scale-110' : 'border-gray-300 hover:border-gray-400'
                        }`}
                        style={{ backgroundColor: color.value }}
                        title={`${color.name} (${color.stock} available)`}
                      />
                    ))}
                  </div>
                </div>
                
                {/* Sizes */}
                <div>
                  <h3 className="font-medium mb-3">Size: {selectedSize.name}</h3>
                  <div className="flex gap-2">
                    {variants.sizes.map((size) => (
                      <button
                        key={size.name}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 rounded-md border transition-all ${
                          selectedSize.name === size.name 
                            ? 'border-primary bg-primary text-primary-foreground' 
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <div className="text-sm font-medium">{size.name}</div>
                        <div className="text-xs opacity-80">{size.value}</div>
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Brands */}
                <div>
                  <h3 className="font-medium mb-3">Artisan: {selectedBrand.name}</h3>
                  <div className="space-y-2">
                    {variants.brands.map((brand) => (
                      <button
                        key={brand.name}
                        onClick={() => {
                          setSelectedBrand(brand);
                          resetImageIndex();
                        }}
                        className={`w-full p-3 rounded-md border text-left transition-all ${
                          selectedBrand.name === brand.name 
                            ? 'border-primary bg-primary/5' 
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <div className="font-medium">{brand.name}</div>
                        <div className="text-sm text-muted-foreground">{brand.region} • ★ {brand.rating} ({brand.reviews} reviews)</div>
                      </button>
                    ))}
                  </div>
                </div>
              
              {/* Specs Card */}
              <Card className="p-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><span className="font-medium">Dimensions:</span> {selectedSize.value}</div>
                  <div><span className="font-medium">Material:</span> Silk/Cotton</div>
                  <div><span className="font-medium">Technique:</span> Hand-stitched</div>
                  <div><span className="font-medium">Origin:</span> {selectedBrand.region}, UZ</div>
                </div>
              </Card>

              {/* Discounts Section */}
              <div className="space-y-4">
                <h3 className="font-medium">Mavjud chegirmalar</h3>
                <div className="grid grid-cols-1 gap-2">
                  {availableDiscounts.map((discount) => (
                    <button
                      key={discount.id}
                      onClick={() => setSelectedDiscount(selectedDiscount?.id === discount.id ? null : discount)}
                      className={`p-3 rounded-md border text-left transition-all ${
                        selectedDiscount?.id === discount.id
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-sm">{discount.name}</div>
                          <div className="text-xs text-muted-foreground">{discount.code}</div>
                        </div>
                        <div className="text-green-600 font-bold">-{discount.percent}%</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Pricing */}
              <div className="space-y-2">
                {selectedDiscount ? (
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-green-700">Chegirma qo'llanildi: {selectedDiscount.name}</span>
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        -{selectedDiscount.percent}%
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-lg text-muted-foreground line-through">{basePrice.toLocaleString()} UZS</span>
                      <span className="text-2xl font-bold text-green-600">{finalPrice.toLocaleString()} UZS</span>
                    </div>
                    <div className="text-sm text-green-700 mt-1">
                      Tejaldingiz: {discountAmount.toLocaleString()} UZS
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold text-primary">{basePrice.toLocaleString()} UZS</span>
                    {baseProduct.originalPrice && baseProduct.originalPrice > basePrice && (
                      <>
                        <span className="text-lg text-muted-foreground line-through">{baseProduct.originalPrice.toLocaleString()} UZS</span>
                        <Badge variant="destructive">-{Math.round(((baseProduct.originalPrice - basePrice) / baseProduct.originalPrice) * 100)}%</Badge>
                      </>
                    )}
                  </div>
                )}
              </div>



              {/* Purchase Controls */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center border rounded-md">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="px-4 py-2 font-medium">{quantity}</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setQuantity(Math.min(availableStock, quantity + 1))}
                      disabled={quantity >= availableStock}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <span className={`text-sm ${availableStock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {availableStock} available
                  </span>
                </div>

                {/* Total Price Summary - Above Add to Cart */}
                <div className="bg-secondary/50 rounded-lg p-4 border">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Birlik narxi:</span>
                      <span>{finalPrice.toLocaleString()} UZS</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Miqdor:</span>
                      <span>{quantity} dona</span>
                    </div>
                    {selectedDiscount && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span>Chegirma ({selectedDiscount.percent}%):</span>
                        <span>-{(discountAmount * quantity).toLocaleString()} UZS</span>
                      </div>
                    )}
                    <hr className="border-border" />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Jami:</span>
                      <span className="text-primary">{(finalPrice * quantity).toLocaleString()} UZS</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    ref={buttonRef}
                    className={cn(
                      "flex-1 transition-all duration-300",
                      buttonState === 'adding' && "scale-95 opacity-80",
                      buttonState === 'success' && "bg-green-500 hover:bg-green-600",
                      buttonState === 'default' && "bg-primary hover:bg-primary-hover"
                    )}
                    disabled={buttonState !== 'default' || availableStock === 0}
                    onClick={handleAddToCart}
                  >
                    {buttonState === 'success' ? (
                      <Check className="h-4 w-4 mr-2" />
                    ) : (
                      <ShoppingCart className="h-4 w-4 mr-2" />
                    )}
                    {buttonState === 'success' ? 'Added!' : buttonState === 'adding' ? 'Adding...' : 'Add to Cart'}
                  </Button>
                  
                  <Button
                    size="icon"
                    variant={liked ? "default" : "outline"}
                    onClick={handleLike}
                  >
                    <Heart className={`h-4 w-4 ${liked ? "fill-current" : ""}`} />
                  </Button>
                </div>
              </div>
              </div>

              
              {/* Delivery Info */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Truck className="h-4 w-4 text-accent" />
                <span>Free Shipping over 150,000 UZS</span>
              </div>
            </div>
          </div>

          {/* Trust Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <Card className="p-6 text-center">
              <Truck className="h-8 w-8 text-accent mx-auto mb-2" />
              <h3 className="font-medium mb-1">Free Shipping</h3>
              <p className="text-sm text-muted-foreground">Over 150,000 UZS</p>
            </Card>
            <Card className="p-6 text-center">
              <Shield className="h-8 w-8 text-accent mx-auto mb-2" />
              <h3 className="font-medium mb-1">Authentic</h3>
              <p className="text-sm text-muted-foreground">Guaranteed</p>
            </Card>
            <Card className="p-6 text-center">
              <RotateCcw className="h-8 w-8 text-accent mx-auto mb-2" />
              <h3 className="font-medium mb-1">Returns</h3>
              <p className="text-sm text-muted-foreground">30 Days</p>
            </Card>
          </div>

          {/* Customer Reviews */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Customer Reviews for {selectedBrand.name}</h2>
            <div className="space-y-4">
              {getReviewsForBrand().map((review, index) => (
                <Card key={index} className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium">{review.name}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'fill-accent text-accent' : 'text-muted-foreground'}`} />
                      ))}
                    </div>
                  </div>
                  <p className="text-muted-foreground">"{review.text}"</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Related Products */}
          <div>
            <h2 className="text-2xl font-bold mb-6">
              {relatedProducts.length > 0 ? `You May Also Like (From ${baseProduct.category} Category)` : "🔥 New Arrivals"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {(relatedProducts.length > 0 ? relatedProducts : fallbackProducts).map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} {...relatedProduct} />
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useCart } from '../context/CartContext';
import LoginPrompt from './LoginPrompt';

const Products = ({ searchQuery }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart, showLoginPrompt, closeLoginPrompt } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await axios.post('https://alphasilver.productsalphawizz.com/app/v1/api/get_sections');
        const allProducts = response.data.data.flatMap(section => section.product_details);
        
   
        if (allProducts.length === 0) {
          setTimeout(() => {
            setProducts(allProducts);
            setIsLoading(false);
          }, 60000); 
        } else {
          setProducts(allProducts);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getSlidesPerView = () => {
    const width = window.innerWidth;
    if (width < 640) return 1;
    if (width < 768) return 2;
    if (width < 1024) return 3;
    if (width < 1280) return 5;
    return 7;
  };

  return (
    <>
      <LoginPrompt isOpen={showLoginPrompt} onClose={closeLoginPrompt} />
      
      <div id="products" className="products-section py-10 px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">Our Products</h2>
        
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-600 mb-4"></div>
            <p className="text-gray-600">Loading products...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center text-gray-500 py-10">
            No products found matching your search.
          </div>
        ) : (
          <Swiper
            spaceBetween={20}
            slidesPerView={getSlidesPerView()}
            pagination={{ clickable: true }}
            navigation
            modules={[Autoplay, Pagination, Navigation]}
            className="product-slider"
            breakpoints={{
              320: {
                slidesPerView: 2,
                spaceBetween: 10
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 15
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 15
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 20
              },
              1280: {
                slidesPerView: 7,
                spaceBetween: 20
              }
            }}
          >
            {filteredProducts.map((product) => (
              <SwiperSlide key={product.id} className="product-item p-2 sm:p-4">
                <div className="border rounded-lg overflow-hidden shadow-lg bg-white h-full flex flex-col">
                  <div className="relative pb-[100%]">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="absolute top-0 left-0 w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3 sm:p-4 flex flex-col flex-grow">
                    <h3 className="text-sm sm:text-lg font-semibold line-clamp-2 mb-1">
                      {product.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 mb-2 flex-grow">
                      {product.short_description}
                    </p>
                    <p className="text-lg sm:text-xl font-bold text-green-600 mb-2">
                      ₹{product.min_max_price.special_price}
                    </p>
                    <button
                      onClick={() => {
                        addToCart(product);
                        console.log('Added to cart:', product.name);
                      }}
                      className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-sm sm:text-base"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </>
  );
};

export default Products;
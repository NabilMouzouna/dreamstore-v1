'use client'
import { useEffect, useState } from 'react';
import ProductCarousel from './product-carousel';

const fetchProducts = async (category: string) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_SERVER}/products?category=${category}`);
    if (!response.ok) throw new Error('Failed to fetch products');
    const data = await response.json();
    return data; // Assuming the response is an array of products
  } catch (error) {
    console.error(error);
    return []; // Return an empty array in case of an error
  }
};

export default function ProductShowcase() {
  const [phoneProducts, setPhoneProducts] = useState([]);
  const [laptopProducts, setLaptopProducts] = useState([]);
  const [tvProducts, setTvProducts] = useState([]);

  useEffect(() => {
    // Fetch phone products
    fetchProducts('smartphone').then(setPhoneProducts);

    // Fetch laptop products
    fetchProducts('tablette').then(setLaptopProducts);

    // Fetch TV products
    fetchProducts('tv').then(setTvProducts);
  }, []);

  return (
    <div className="space-y-12" id="products">
      <ProductCarousel category="Phones" products={phoneProducts} />
      <ProductCarousel category="Tablettes" products={laptopProducts} />
      <ProductCarousel category="TVs" products={tvProducts} />
    </div>
  );
}
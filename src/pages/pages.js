"use client";

import Head from 'next/head';
import ProductImages from '../components/ProductImage';
import ProductDetails from '../components/ProductDetails';
import usePersistedState from '../hook/usePersistedState';

export function HomeMain() {
  const product = {
    title: "Fone de Ouvido Bluetooth JBL Tune 510BT",
    price: 299.99,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
      "https://images.unsplash.com/photo-1507643179773-3e975d7ac515",
      "https://images.unsplash.com/photo-1613040809024-b297ef6c72d7",
    ],
    sizes: ["Único"],
    colors: ["Preto", "Branco", "Azul"],
  };

  const [mainImage, setMainImage] = usePersistedState('mainImage', product.images[0], 15);
  const [selectedSize, setSelectedSize] = usePersistedState('selectedSize', product.sizes[0], 15);
  const [selectedColor, setSelectedColor] = usePersistedState('selectedColor', product.colors[0], 15);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Head>
        <title>{product.title}</title>
      </Head>
      <div className="max-w-6xl w-full bg-white rounded-lg shadow-sm p-6 flex flex-col md:flex-row gap-6">
        <ProductImages images={product.images} mainImage={mainImage} setMainImage={setMainImage} />
        <ProductDetails
          title={product.title}
          price={product.price}
          sizes={product.sizes}
          colors={product.colors}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
        />
      </div>
    </div>
  );
}
"use client";

import Head from "next/head";
import ProductDetails from "../components/ProductDetails";
import ProductImages from "../components/ProductImage";
import usePersistedState from "../hook/usePersistedState";

export function HomeMain() {
  const product = {
    title: "Fone de Ouvido Bluetooth JBL Tune 510BT",
    price: 299.99,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
      "https://imgs.search.brave.com/BkxMZr3FSVEWjHViM9JsS5LOTa6apSMN2Ek4QffDxTM/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWdz/LnNlYXJjaC5icmF2/ZS5jb20vRzFvYk91/RTduR25YckFyNzFO/N2t6eUpMU2szbW5q/OUpBMUZ6Y01zNEo2/by9yczpmaXQ6NTAw/OjA6MDowL2c6Y2Uv/YUhSMGNITTZMeTlv/ZEhSdy9NaTV0YkhO/MFlYUnBZeTVqL2Iy/MHZSRjlSWDA1UVh6/SlkvWHpjNE5ETTBN/QzFOVEVJNC9NRFEy/TVRVMk5UZzRNbDh4/L01USXdNalF0UlMx/bWIyNWwvTFdSbExX/OTFkbWxrYnkxcS9Z/bXd0ZEhWdVpTMDNN/akJpL2RDMWliSFZs/ZEc5dmRHZ3QvWW1G/MFpYSnBZUzFrWlMx/aC9kR1V0Tnpab2Np/NTNaV0p3.jpeg",
      "https://imgs.search.brave.com/B6ejGW-0f7bVVShw6JOO7uxfOeRVnBzIDt0WkB7KhQc/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWdz/LnNlYXJjaC5icmF2/ZS5jb20vZkRaMnlE/Z1FmaG9GQzA2ejlu/ejFaaGdsQkd2U3I4/c3NDYzRwRTl3SXBL/dy9yczpmaXQ6NTAw/OjA6MDowL2c6Y2Uv/YUhSMGNITTZMeTlv/ZEhSdy9NaTV0YkhO/MFlYUnBZeTVqL2Iy/MHZSRjlSWDA1UVh6/SlkvWHprd05qYzVN/aTFOVEVFNC9NalF5/TkRVd05qTXhOVjh3/L01qSXdNalV0Vmk1/M1pXSnc.jpeg",
    ],
    sizes: ["Único"],
    colors: ["Preto", "Branco", "Azul"],
  };

  const [mainImage, setMainImage] = usePersistedState(
    "mainImage",
    product.images[0],
    15
  );
  const [selectedSize, setSelectedSize] = usePersistedState(
    "selectedSize",
    product.sizes[0],
    15
  );
  const [selectedColor, setSelectedColor] = usePersistedState(
    "selectedColor",
    product.colors[0],
    15
  );

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Head>
        <title>{product.title}</title>
      </Head>
      <div className="max-w-6xl w-full bg-white rounded-lg shadow-sm p-6 flex flex-col md:flex-row gap-6">
        <ProductImages
          images={product.images}
          mainImage={mainImage}
          setMainImage={setMainImage}
        />
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

"use client";

import usePersistedState from "../hook/usePersistedState";
import CepLookup from "./CepLookUp";
import VariantSelector from "./variantSelector";

export default function ProductDetails({ title, price, sizes, colors }) {
  const [selectedSize, setSelectedSize] = usePersistedState(
    "selectedSize",
    sizes[0],
    15
  );
  const [selectedColor, setSelectedColor] = usePersistedState(
    "selectedColor",
    colors[0],
    15
  );

  return (
    <div className="md:w-7/12 flex flex-col gap-6">
      <h1 className="text-2xl font-medium text-gray-900">{title}</h1>
      <p className="text-3xl font-bold text-gray-900">
        R$ {price.toFixed(2).replace(".", ",")}
      </p>
      <VariantSelector
        label="Tamanho"
        options={sizes}
        selected={selectedSize}
        onSelect={setSelectedSize}
      />
      <VariantSelector
        label="Cor"
        options={colors}
        selected={selectedColor}
        onSelect={setSelectedColor}
      />
      <CepLookup />
      <button className="bg-yellow-400 text-gray-900 font-medium px-6 py-3 rounded-md hover:bg-yellow-500">
        Comprar agora
      </button>
    </div>
  );
}

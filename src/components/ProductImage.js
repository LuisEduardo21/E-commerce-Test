"use client";

import usePersistedState from "../hook/usePersistedState";

export default function ProductImages({ images }) {
  const [mainImage, setMainImage] = usePersistedState(
    "mainImage",
    images[0],
    15
  );

  return (
    <div className="md:w-5/12 flex flex-col gap-4">
      <img
        src={mainImage}
        alt="Produto"
        className="w-full h-80 object-contain rounded-md border border-gray-200 bg-white p-4"
      />
      <div className="flex gap-2 overflow-x-auto">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Miniatura ${index + 1}`}
            className={`w-16 h-16 object-contain rounded-md border border-gray-200 cursor-pointer hover:border-blue-500 ${
              mainImage === img ? "border-blue-500" : ""
            }`}
            onClick={() => setMainImage(img)}
          />
        ))}
      </div>
    </div>
  );
}

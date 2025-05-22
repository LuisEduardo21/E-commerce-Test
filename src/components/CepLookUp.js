"use client";

import useCepLookup from "../hook/UseCepLook";

export default function CepLookup() {
  const { cep, setCep, address, error, loading } = useCepLookup();

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Calcular frete
      </label>
      <input
        type="text"
        value={cep}
        onChange={(e) => setCep(e.target.value.replace(/\D/g, ""))}
        placeholder="Digite seu CEP"
        className="p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
        maxLength="8"
      />
      {loading && <p className="mt-2 text-gray-500 text-sm">Carregando...</p>}
      {error && <p className="mt-2 text-red-600 text-sm">{error}</p>}
      {address && (
        <div className="mt-2 text-gray-600 text-sm">
          <p>
            {address.logradouro}, {address.bairro}
          </p>
          <p>
            {address.localidade} - {address.uf}, {address.cep}
          </p>
        </div>
      )}
    </div>
  );
}

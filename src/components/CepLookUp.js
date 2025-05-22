"use client";

import { useCepLookup } from "@/hook/UseCepLook";

export default function CepLookup() {
  const { cep, setCep, address, freight, error, loading } = useCepLookup();

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        Verificar Disponibilidade de Entrega
      </label>
      <input
        type="text"
        value={cep}
        onChange={(e) => setCep(e.target.value.replace(/\D/g, ""))}
        placeholder="Digite seu CEP (ex: 12345678)"
        className="mt-2 p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        maxLength={8}
      />
      {loading && <p className="mt-2 text-gray-500">Carregando...</p>}
      {error && <p className="mt-2 text-red-500">{error}</p>}
      {address && (
        <div className="mt-2 text-gray-700">
          <p>
            {address.logradouro}, {address.bairro}
          </p>
          <p>
            {address.localidade} - {address.uf}, {address.cep}
          </p>
          {freight !== null && (
            <p className="mt-2 font-semibold text-green-600">
              Frete: R$ {freight.toFixed(2).replace(".", ",")}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export function useCepLookup() {
  const loadPersistedState = () => {
    if (typeof window === "undefined")
      return { cep: "", address: null, freight: null };
    const saved = localStorage.getItem("cepData");
    if (saved) {
      const { cep, address, freight, timestamp } = JSON.parse(saved);
      const now = new Date().getTime();
      const fifteenMinutes = 15 * 60 * 1000;
      if (now - timestamp < fifteenMinutes) {
        return { cep, address, freight };
      }
      localStorage.removeItem("cepData");
    }
    return { cep: "", address: null, freight: null };
  };

  const [cep, setCep] = useState(loadPersistedState().cep);
  const [address, setAddress] = useState(loadPersistedState().address);
  const [freight, setFreight] = useState(loadPersistedState().freight);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const calculateFreight = (uf) => {
    // Lógica fictícia de cálculo de frete com base no estado (uf)
    if (uf === "SP") return 10.0;
    if (["RJ", "MG", "PR"].includes(uf)) return 15.0;
    return 20.0;
  };

  const saveState = (cep, address, freight) => {
    if (typeof window !== "undefined") {
      const data = {
        cep,
        address,
        freight,
        timestamp: new Date().getTime(),
      };
      localStorage.setItem("cepData", JSON.stringify(data));
    }
  };

  useEffect(() => {
    if (cep.length === 8) {
      setLoading(true);
      setError(null);
      axios
        .get(`https://viacep.com.br/ws/${cep}/json/`)
        .then((response) => {
          if (response.data.erro) {
            setError("CEP não encontrado.");
            setAddress(null);
            setFreight(null);
            saveState(cep, null, null);
          } else {
            const freightValue = calculateFreight(response.data.uf);
            setAddress(response.data);
            setFreight(freightValue);
            saveState(cep, response.data, freightValue);
          }
        })
        .catch(() => {
          setError("Erro ao consultar o CEP.");
          setAddress(null);
          setFreight(null);
          saveState(cep, null, null);
        })
        .finally(() => setLoading(false));
    } else {
      setAddress(null);
      setFreight(null);
      setError(null);
      saveState(cep, null, null);
    }
  }, [cep]);

  return { cep, setCep, address, freight, error, loading };
}

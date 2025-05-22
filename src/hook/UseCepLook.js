"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function useCepLookup() {
  const loadPersistedState = () => {
    if (typeof window === "undefined") return { cep: "", address: null };
    const saved = localStorage.getItem("cepData");
    if (saved) {
      const { cep, address, timestamp } = JSON.parse(saved);
      const now = new Date().getTime();
      const fifteenMinutes = 15 * 60 * 1000;
      if (now - timestamp < fifteenMinutes) {
        return { cep, address };
      }
      localStorage.removeItem("cepData");
    }
    return { cep: "", address: null };
  };

  const [cep, setCep] = useState(loadPersistedState().cep);
  const [address, setAddress] = useState(loadPersistedState().address);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const saveState = (cep, address) => {
    if (typeof window !== "undefined") {
      const data = {
        cep,
        address,
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
            saveState(cep, null);
          } else {
            setAddress(response.data);
            saveState(cep, response.data);
          }
        })
        .catch(() => {
          setError("Erro ao consultar o CEP.");
          setAddress(null);
          saveState(cep, null);
        })
        .finally(() => setLoading(false));
    } else {
      setAddress(null);
      setError(null);
      saveState(cep, null);
    }
  }, [cep]);

  return { cep, setCep, address, error, loading };
}

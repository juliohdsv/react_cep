import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import { Button } from "../../components/Button";
import type { CepDTO } from "./cep-dtos";
import GpsIcon from "../../../../public/gps.png";

export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [visible, setVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [address, setAddress] = useState<CepDTO | null>(null);

  function resetForm() {
    setAddress(null);
    setVisible(false);

    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.focus();
    }
  }

  async function handleSubmit() {
    const zipcode = inputRef.current?.value || "";

    if (zipcode.trim().length < 5) {
      return toast.error("Favor, inserir um cep válido.");
    }

    try {
      setIsLoading(true);
      setAddress(null);

      const response = await fetch(
        `https://brasilapi.com.br/api/cep/v2/${zipcode}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        throw new Error(`Fetching error: ${response.status}`);
      }

      const {
        location: { coordinates: { longitude, latitude } } = {},
        ...data
      } = await response.json();

      setAddress({
        ...data,
        longitude,
        latitude,
      });

      setVisible(true);
    } catch (error) {
      resetForm();
      toast.error("Erro ao carregar os dados.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full min-h-screen max-w-screen max-h-screen flex flex-col justify-center items-center text-teal-600 bg-gray-100">
      <div className="w-11/12 min-w-[300px] max-w-[600px] md:w-1/4 lg:w-1/5 flex flex-col justify-center items-center gap-6 text-zinc-600">
        <img src={GpsIcon} alt="Imagem do marcador gps" className="w-14 h-12" />

        <h1 className="w-full text-3xl text-center font-extrabold">
          LOCALIZAR CEP
        </h1>

        <input
          ref={inputRef}
          required
          type="text"
          placeholder="Exemplo: 0000000"
          minLength={5}
          className="w-full h-10 rounded-xl px-3 border border-teal-600 focus:border-teal-800 transition-all"
        />

        <div className="w-full flex flex-col gap-2 text-white">
          <Button onClick={handleSubmit} isLoading={isLoading}>
            Buscar
          </Button>

          <Button onClick={resetForm}>Limpar</Button>
        </div>
      </div>

      {visible && address !== null && (
        <div className="w-11/12 min-w-[300px] max-w-[600px] md:w-1/4 lg:w-1/5 flex flex-col justify-center items-center gap-4 border-t border-gray-50000 text-black font-mono">
          <h1 className="w-full text-md font-sans mt-14 text-center">
            ENDEREÇO
          </h1>
          <div className="w-full md:text-sm font-sans flex flex-col justify-center items-center uppercase">
            <span className="text-md">{`${address?.street}`}</span>
            <span className="text-md">{`Bairro: ${address?.neighborhood}`}</span>
            <span className="text-md">{`Cidade: ${address?.city} - ${address?.state}`}</span>
            <span className="text-md">{`CEP: ${address?.cep}`}</span>

            {address?.latitude && address?.longitude && (
              <Link
                to={`https://www.google.com/maps/dir/?api=1&destination=${address.latitude},${address.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11/12 text-md text-center font-semibold text-teal-600 italic mt-5"
              >
                Ver no Google Maps
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

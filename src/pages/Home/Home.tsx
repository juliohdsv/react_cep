import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

import cepApi from "../../services/cepApi";

const zcForSchema = z.object({
  zipocode: z.string()
    .min(5, "O cep é obrigatório"),
})

type zcFormData = z.infer<typeof zcForSchema>

export default function Home(){

  const { 
    register, 
    handleSubmit, 
    formState: { errors } } 
    = useForm<zcFormData>({
    resolver: zodResolver(zcForSchema),
  });

  const [ state, setState] = useState<string>('');
  const [ city, setCity] = useState<string>('');
  const [ neigh, setNeigh] = useState<string>('');
  const [ street, setStreet] = useState<string>('');

  async function getData(value:any){

    const { data } = await cepApi.get(`/cep/v2/${value.zipocode}`);

    if(data){
      setState(data.state);
      setCity(data.city);
      setNeigh(data.neighborhood);
      setStreet(data.street);
    }
  }

  return(
    <div className="container-home flex flex-col justify-center items-center w-full h-screen">
      <h1 className="text-3xl font-bold">Localizar CEP</h1>
      <form 
        onSubmit={handleSubmit(getData)} 
        className="flex flex-col justify-center items-center gap-4 w-full h-1/4"
      >
        <div className="flex flex-col w-full justify-center items-center gap-1">
          <input 
            {...register("zipocode",{required: true})} 
            type="text" 
            placeholder="Exemplo: 0000000"
            className="w-2/3 lg:w-2/12 xl:w-2/12 h-8 rounded-lg px-2"
          />
          {errors.zipocode && <span className="text-yellow-300 w-2/3 lg:w-2/12 xl:w-2/12 font-semibold text-sm">{errors.zipocode.message}</span>}
        </div>
        <div className="container-btns flex flex-col justify-center items-center w-full gap-2">
          <button 
            type="submit"
            className="bg-black font-semibold w-2/3 lg:w-2/12 xl:w-2/12 h-8 rounded-lg hover:bg-red-600 transition-all duration-300"
          >
            Buscar
          </button>
          <button 
            type="reset"
            className="bg-black font-semibold w-2/3 lg:w-2/12 xl:w-2/12 h-8 rounded-lg hover:bg-red-600 transition-all duration-300"
          >
            Limpar
          </button>
        </div>
      </form>

      <div className="container-results w-full h-1/2 flex flex-col justify-center items-center gap-4">
        <h1 className="text-xl font-bold">Informações</h1>
        <input 
          type="text"
          value={state} 
          placeholder="Estado"
          className="w-2/3 lg:w-2/12 xl:w-2/12 h-8 rounded-lg px-2"
        />
        <input 
          type="text" 
          value={city}
          placeholder="Cidade"
          className="w-2/3 lg:w-2/12 xl:w-2/12 h-8 rounded-lg px-2"
        />
        <input 
          type="text" 
          value={neigh}
          placeholder="Bairro"
          className="w-2/3 lg:w-2/12 xl:w-2/12 h-8 rounded-lg px-2"
        />
        <input 
          type="text" 
          value={street}
          placeholder="Rua/Av"
          className="w-2/3 lg:w-2/12 xl:w-2/12 h-8 rounded-lg px-2"
        />
      </div>
    </div>
  );
}

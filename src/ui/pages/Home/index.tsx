// import { useState } from "react";
// import { Loader2 } from "lucide-react";
import { useHomeController } from "./useHome.controller";

export default function Home(){

  const {
    errors,
    handleSubmit,
    register,
  } = useHomeController();


  return(
    <div className="flex flex-col justify-center items-center w-screen h-screen bg-zinc-700">

      <h1 className="text-3xl font-bold">Localizar CEP</h1>

        <form
          onSubmit={handleSubmit}
          className="w-11/12 lg:w-1/5 h-1/5 flex flex-col gap-2"
        >
          <input
            type="text"
            placeholder="Exemplo: 0000000"
            className="w-full h-8 rounded-lg px-2"
            {...register("zipocode")}
          />
          {errors.zipocode && <span className="text-yellow-300 w-2/3 lg:w-2/12 xl:w-2/12 font-semibold text-sm">{errors.zipocode.message}</span>}


        <div className="container-btns flex flex-col justify-center items-center w-full gap-2">
          <button
            type="submit"
            className="flex justify-center items-center bg-black font-semibold w-2/3 lg:w-2/12 xl:w-2/12 h-8 rounded-lg hover:bg-gray-600 transition-all duration-300"
          >
            {/* {loading === true ? <Loader2 className="animate-spin"/> : "Buscar"} */}
          </button>
          <button
            type="reset"

            className="bg-black font-semibold w-2/3 lg:w-2/12 xl:w-2/12 h-8 rounded-lg hover:bg-gray-600 transition-all duration-300"
          >
            Limpar
          </button>
        </div>
      </form>

      <div className="container-results w-full h-1/2 flex flex-col justify-center items-center gap-4">
        <h1 className="text-xl font-bold">Informações</h1>
        <input
          type="text"
          placeholder="Estado"
          className="w-2/3 lg:w-2/12 xl:w-2/12 h-8 rounded-lg px-2"
        />
        <input
          type="text"
          placeholder="Cidade"
          className="w-2/3 lg:w-2/12 xl:w-2/12 h-8 rounded-lg px-2"
        />
        <input
          type="text"
          placeholder="Bairro"
          className="w-2/3 lg:w-2/12 xl:w-2/12 h-8 rounded-lg px-2"
        />
        <input
          type="text"
          placeholder="Rua/Av"
          className="w-2/3 lg:w-2/12 xl:w-2/12 h-8 rounded-lg px-2"
        />
      </div>
    </div>
  );
}

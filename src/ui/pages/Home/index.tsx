// import { useState } from "react";
import { CrossCircledIcon } from "@radix-ui/react-icons"
import { useHomeController } from "./useHome.controller";
import { Spinner } from "../../components/Spinner";

export default function Home(){

  const {
    errors,
    handleSubmit,
    register,
    isLoading
  } = useHomeController();


  return(
    <div className="
      w-screen h-screen flex flex-col items-center text-teal-600 bg-zinc-200
    ">
      <h1 className="text-3xl font-bold tracking-widest mt-14">LOCALIZAR CEP</h1>
      <form
        onSubmit={handleSubmit}
        className="w-11/12 lg:w-[300px] min-h-[200px] max-h-[300px] flex flex-col justify-center items-center gap-6 text-zinc-600"
      >
        <div className="w-11/12 flex flex-col gap-2">
          <input
            type="text"
            placeholder="Exemplo: 0000000"
            className="w-full h-8 rounded-xl px-3 border border-teal-600 focus:border-teal-800 transition-all"
            {...register("zipocode")}
          />
          {errors.zipocode && (
            <span className="
              text-red-900 w-full text-sm flex flex-row items-center gap-2 px-1
            ">
              <CrossCircledIcon/>
              {errors.zipocode.message}
            </span>
          )}
        </div>

        <div className="w-full flex flex-col justify-center items-center gap-2 text-white">
          <button
            type="submit"
            className="w-11/12 h-8 flex justify-center items-center bg-teal-600 font-normal text-20 rounded-xl hover:bg-teal-800 transition-all duration-300 tracking-tight"
          >
            {isLoading ? <Spinner/> : "Buscar"}
          </button>
          <button
            type="reset"
            className="w-11/12 h-8 bg-teal-600 font-normal text-20 rounded-xl hover:bg-teal-800 transition-all duration-300 tracking-tight"
          >
            Limpar
          </button>
        </div>
      </form>

      <div className="w-full flex flex-col justify-center items-center gap-4">
        <h1 className="text-xl font-bold">Detalhes do Endereço</h1>

      </div>
    </div>
  );
}

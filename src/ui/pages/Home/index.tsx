import { CrossCircledIcon } from "@radix-ui/react-icons"
import { Link } from "react-router-dom";
import { useHomeController } from "./useHome.controller";
import { Spinner } from "../../components/Spinner";
import { localStorageKeys } from "../../../app/config/localStorageKeys";
import { IOutput } from "./IHome";

export default function Home(){

  const {
    errors,
    handleSubmit,
    register,
    isLoading,
    visible,
    zipocodeValue,
    clear,
  } = useHomeController();

  const address = (): IOutput | null => {
    const data = localStorage.getItem(localStorageKeys.API_DATA);
    return data ? (JSON.parse(data) as IOutput) : null;
  };

  return(
    <div className="
      w-screen h-screen flex flex-col items-center text-teal-600 bg-zinc-200
    ">
      <h1 className="text-3xl font-bold -tracking-tight mt-14">LOCALIZAR CEP</h1>
      <form
        onSubmit={handleSubmit}
        className="w-11/12 lg:w-[300px] min-h-[200px] max-h-[300px] flex flex-col justify-center items-center gap-6 text-zinc-600"
      >
        <div className="w-11/12 flex flex-col gap-2">
          <input
            type="text"
            placeholder="Exemplo: 0000000"
            className="w-full h-8 rounded-xl px-3 border border-teal-600 focus:border-teal-800 transition-all"
            {...register("zipocode", { required: true })}

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
            onClick={() => clear()}
            disabled={!zipocodeValue || zipocodeValue.trim() === ""}
            className={`
              w-11/12 h-8 flex justify-center items-center font-normal text-20 rounded-xl
              transition-all duration-300 tracking-tight
              ${!zipocodeValue ? "bg-gray-400 cursor-not-allowed" : "bg-teal-800 lg:hover:bg-gray-400"}
            `}
          >
            {isLoading ? <Spinner /> : "Buscar"}
          </button>
          <button
            type="reset"
            onClick={()=> clear()}
            className="w-11/12 h-8 flex justify-center items-center bg-teal-800 font-normal text-20 rounded-xl lg:hover:bg-gray-400 transition-all duration-300 tracking-tight"
          >
            Limpar
          </button>
        </div>
      </form>

      {visible && (
        <div className="w-10/12 lg:w-[300px] flex flex-col items-center gap-4 border-t border-gray-300 text-black font-mono">
          <h1 className="w-full text-xl text-teal-800 font-bold mt-10">Endereço:</h1>
          <div className="w-11/12 flex flex-col">
            <span className="w-11/12 text-md">{`CEP ${address()?.cep}`}</span>
            <span className="w-11/12 text-md">{`${address()?.street}`}</span>
            <span className="w-11/12 text-md">{`Bairro ${address()?.neighborhood}`}</span>
            <span className="w-11/12 text-md">{`${address()?.city} - ${address()?.state}`}</span>
            <Link
              target="_blank"
              rel="noopener noreferrer"
              className="w-11/12 text-md text-teal-600 italic mt-5"
              to={`https://www.google.com/maps/dir/${address()?.location.coordinates.latitude},${address()?.location.coordinates.longitude}`}
            >
              Link do endereço Google maps
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

import { Link } from "react-router-dom";

export default function Error(){
  return(
    <div className="container-error w-full h-screen flex flex-col justify-center items-center gap-4">
      <h1 className="text-6xl font-bold">404</h1>
      <h2 className="text-2xl font-semibold text-red-600">Página não encontrada</h2>
      <Link 
        to="/" 
        className="bg-black font-semibold text-xl text-white rounded-lg w-2/3 h-8 lg:w-15V xl:w-15V flex flex-row justify-center items-center hover:bg-red-600 transition-all duration-300"
      >
          Voltar
      </Link>
    </div>
  );
}
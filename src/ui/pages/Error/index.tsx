import { Link } from "react-router-dom";

export default function Error() {
  return (
    <div className="min-w-screen min-h-screen max-w-screen max-h-screen flex justify-center items-center">
      <div className="w-10/12 lg:w-[300px] flex flex-col justify-center items-center gap-2 text-center">
        <h1 className="w-full text-6xl font-bold  text-teal-800">404</h1>
        <h2 className="w-full text-2xl font-semibold">Página não encontrada</h2>
        <Link
          to="/"
          className="bg-teal-800 hover:bg-teal-600 text-white text-md rounded-xl w-full lg:w-11/12 h-10  flex flex-row justify-center items-center  transition-all duration-300"
        >
          Voltar
        </Link>
      </div>
    </div>
  );
}

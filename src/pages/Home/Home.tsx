export default function Home(){
  return(
    <div className="container-home flex flex-col justify-center items-center w-full h-screen">
      <h1 className="text-3xl font-bold">Localizar CEP</h1>
      <form 
        onSubmit=""
        className="flex flex-col justify-center items-center gap-4 w-full h-1/4"
      >
        <input 
          type="text" 
          placeholder="Informe o CEP"
          className="w-2/3 rounded-lg px-2"
        />
        <button 
          type="submit"
          className="bg-black font-semibold w-2/3 h-6 rounded-lg hover:bg-red-600 transition-all duration-300"
        >
          Buscar
        </button>
      </form>
      <div className="container-results w-full h-1/2 flex flex-col justify-center items-center gap-4">
        <h1 className="text-xl font-bold">Informações</h1>
        <input 
          type="text" 
          placeholder="Estado"
          className="w-2/3 rounded-lg px-2"
        />
        <input 
          type="text" 
          placeholder="Cidade"
          className="w-2/3 rounded-lg px-2"
        />
        <input 
          type="text" 
          placeholder="Bairro"
          className="w-2/3 rounded-lg px-2"
        />
        <input 
          type="text" 
          placeholder="Rua/Av"
          className="w-2/3 rounded-lg px-2"
        />
      </div>
    </div>
  );
}

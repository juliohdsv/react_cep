import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { CepApiService } from "../../../app/services/CepApi.service";
import { IOutput } from "./IHome";

const schema = z.object({
  zipocode: z.string()
    .min(5, "O cep é obrigatório"),
})

type zcFormData = z.infer<typeof schema>


export function useHomeController(){

  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors }
  } = useForm<zcFormData>({
    resolver: zodResolver(schema),
  });

  const handleSubmit = hookFormHandleSubmit(async (input)=>{
    try{
      const data: IOutput = await CepApiService.get(`/cep/v2/${input}`);

      if(!data) return toast.error("Erro na consulta, tenta novamente.");
      console.log(data);
    }catch{
      toast.error("Server internal error.");
    }
  });

  return{
    handleSubmit,
    errors,
    register
  };
}

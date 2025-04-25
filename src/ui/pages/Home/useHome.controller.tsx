import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { CepApiService } from "../../../app/services/CepApi.service";
import { localStorageKeys } from "../../../app/config/localStorageKeys";
import { sleep } from "../../../app/utils/sleep";

const schema = z.object({
  zipocode: z.string()
    .min(5, "O cep é obrigatório"),
})

type zcFormData = z.infer<typeof schema>


export function useHomeController(){

  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors }
  } = useForm<zcFormData>({
    resolver: zodResolver(schema),
  });

  const handleSubmit = hookFormHandleSubmit(async ({ zipocode })=>{
    try{
      setIsLoading(true);
      await sleep(2000);
      const { data } = await CepApiService.get(`/cep/v2/${zipocode}`);

      if(!data) return toast.error("Erro na consulta, tenta novamente.");
      localStorage.setItem(localStorageKeys.API_DATA, JSON.stringify(data));
      setIsLoading(false);
      // https://www.google.com/maps/dir/-23.5336746,-46.5746386
    }catch{
      toast.error("Server internal error.");
    }
  });

  return{
    handleSubmit,
    errors,
    register,
    isLoading
  };
}

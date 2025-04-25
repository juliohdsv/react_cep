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

  const [visible, setVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
    watch,
  } = useForm<zcFormData>({
    resolver: zodResolver(schema),
  });

  const zipocodeValue = watch("zipocode");
  const clear = ()=> {
    localStorage.removeItem(localStorageKeys.API_DATA);
    setVisible(false);
  };
  const handleSubmit = hookFormHandleSubmit(async ({ zipocode })=>{
    try{
      if(!zipocode) return toast.error("Favor, inserir o cep.");
      setVisible(false);
      setIsLoading(true);
      await sleep(2000);
      const { data } = await CepApiService.get(`/cep/v2/${zipocode}`);

      if(!data) return toast.error("Erro na consulta, tenta novamente.");
      localStorage.setItem(localStorageKeys.API_DATA, JSON.stringify(data));

      setIsLoading(false);
      setVisible(true);
    }catch{
      toast.error("Server internal error.");
    }
  });

  return{
    handleSubmit,
    errors,
    register,
    isLoading,
    visible,
    clear,
    zipocodeValue
  };
}

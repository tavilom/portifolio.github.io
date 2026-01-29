import { Dispatch, SetStateAction } from "react";
import { Perfil } from "./Perfil";


export type AuthContextType = {
  perfil: Perfil;
  setPerfil: Dispatch<SetStateAction<Perfil>>;
}
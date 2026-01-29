//@refresh reset
import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
  JSX
} from "react";
import { CircularProgress, Box } from "@mui/material";

// --- 1) Tipos --------------------------------------------------------------

export interface Perfil {
  usuario?: string;
  permissoes?: string;
  [key: string]: string | undefined;
}

export interface AuthContextType {
  perfil: Perfil;
  setPerfil: Dispatch<SetStateAction<Perfil>>;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

// --- 2) Criação do Contexto -----------------------------------------------

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

// --- 3) Provider -----------------------------------------------------------

export function AuthContextProvider({
  children
}: AuthContextProviderProps): JSX.Element {
  const STORAGE_KEY = "LOCAL";

  // Carrega perfil salvo localmente (se existir)
  const storedJSON = localStorage.getItem(STORAGE_KEY);
  const storedPerfil: Perfil = storedJSON ? JSON.parse(storedJSON) : {};

  // Estado principal (perfil local)
  const [perfil, setPerfil] = useState<Perfil>(
    Object.keys(storedPerfil).length > 0
      ? storedPerfil
      : {
          usuario: "dev_local",
          permissoes: "admin",
        }
  );

  // Estado de carregamento (simulado)
  const [loading, setLoading] = useState(true);

  // Simula carregamento inicial e salva no localStorage
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(perfil));
      setLoading(false);
    }, 500); // só pra simular delay (opcional)
    return () => clearTimeout(timer);
  }, [perfil]);

  // --- 4) Mostrar loader enquanto carrega ---------------------------------
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh"
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // --- 5) Provider pronto --------------------------------------------------
  return (
    <AuthContext.Provider value={{ perfil, setPerfil }}>
      {children}
    </AuthContext.Provider>
  );
}

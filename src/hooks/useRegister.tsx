import { useCallback } from 'react';

const REGISTER_API_URL = "http://localhost:3000/accounts";

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface RegisterResponse {
    id: string;
    name: string;
    email: string;
}

export const useRegister = () => {

  const register = useCallback(async (data: RegisterData): Promise<boolean> => {
    try {
      const response = await fetch(REGISTER_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.message && Array.isArray(errorData.message) 
            ? errorData.message.join(', ')
            : errorData.message || 'Erro desconhecido ao cadastrar.';

        alert(`Falha no Cadastro: ${errorMessage}`);
        return false;
      }

      const contentType = response.headers.get('content-type');
      if (response.status === 204 || !contentType || !contentType.includes("application/json")) {
          console.log("Cadastro bem-sucedido! (Sem conteúdo de retorno)");
          return true;
      }

      const successData: RegisterResponse = await response.json();
      console.log("Cadastro bem-sucedido:", successData);
      
      return true;

    } catch (error) {
      console.error("Erro de rede/servidor durante o cadastro:", error);
      alert("Não foi possível conectar ao servidor para cadastro.");
      return false;
    }
  }, []);

  return { register };
};
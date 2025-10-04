import { useCallback } from 'react';

const REGISTER_API_URL = "http://localhost:3000/accounts";

// Tipos esperados para o cadastro
interface RegisterData {
  name: string;
  email: string;
  password: string;
}

// O NestJS geralmente retorna o objeto do usuário (ou apenas uma mensagem de sucesso)
interface RegisterResponse {
    id: string;
    name: string;
    email: string;
    // ... outros campos
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
        // Lida com erros da API (ex: email já cadastrado)
        const errorData = await response.json();
        const errorMessage = errorData.message && Array.isArray(errorData.message) 
            ? errorData.message.join(', ') // Se o NestJS retornar um array de erros
            : errorData.message || 'Erro desconhecido ao cadastrar.';

        alert(`Falha no Cadastro: ${errorMessage}`);
        return false;
      }

      const contentType = response.headers.get('content-type');
      if (response.status === 204 || !contentType || !contentType.includes("application/json")) {
          // Se o status for No Content (204) OU não for JSON, trata como sucesso sem corpo.
          console.log("Cadastro bem-sucedido! (Sem conteúdo de retorno)");
          return true;
      }

      //Se houver JSON, processa os dados (opcional, mas bom para tipagem)
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
import { useCallback } from 'react';
import { getAuthHeaders } from './useAuth.tsx';


interface AgendamentoData {
  mentorId: string;
  dataHora: string; 
  duracao: number;
  topico: string;
}

const AGENDAMENTO_API_URL = "http://localhost:3000/appointments"; 

export const useAgendamento = () => {

  const agendar = useCallback(async (data: AgendamentoData): Promise<boolean> => {
    try {
      const response = await fetch(AGENDAMENTO_API_URL, {
        method: 'POST',
        headers: getAuthHeaders(), 
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Erro desconhecido.' }));
        const errorMessage = Array.isArray(errorData.message) 
            ? errorData.message.join(', ')
            : errorData.message || 'Não foi possível completar o agendamento. Verifique os dados.';

        alert(`Falha ao Agendar: ${errorMessage}`);
        return false;
      }

      console.log("Agendamento criado com sucesso!");
      return true;

    } catch (error) {
      console.error("Erro de rede/servidor durante o agendamento:", error);
      alert("Não foi possível conectar ao servidor. Tente novamente mais tarde.");
      return false;
    }
  }, []);

  return { agendar };
};
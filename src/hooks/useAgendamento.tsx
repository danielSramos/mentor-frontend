// src/hooks/useAgendamento.tsx

import { useCallback } from 'react';
import { getAuthHeaders } from './useAuth.tsx'; // Para autenticação

// Tipos de dados que sua API de agendamento espera
interface AgendamentoData {
  mentorId: string;
  dataHora: string; // Exemplo: 2025-10-25T14:30:00Z (ISO String)
  duracao: number; // Exemplo: 60 minutos
  topico: string;
}

// Ajuste esta URL para a rota de agendamento da sua API NestJS
const AGENDAMENTO_API_URL = "http://localhost:3000/appointments"; 

export const useAgendamento = () => {

  const agendar = useCallback(async (data: AgendamentoData): Promise<boolean> => {
    try {
      const response = await fetch(AGENDAMENTO_API_URL, {
        method: 'POST',
        // 🚀 Inclui o token JWT no cabeçalho
        headers: getAuthHeaders(), 
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        // Trata erros (token inválido, data indisponível, etc.)
        const errorData = await response.json().catch(() => ({ message: 'Erro desconhecido.' }));
        const errorMessage = Array.isArray(errorData.message) 
            ? errorData.message.join(', ')
            : errorData.message || 'Não foi possível completar o agendamento. Verifique os dados.';

        alert(`Falha ao Agendar: ${errorMessage}`);
        return false;
      }

      // Se for sucesso (201 Created), a requisição é concluída.
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
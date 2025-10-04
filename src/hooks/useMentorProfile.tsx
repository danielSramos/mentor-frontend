import { useEffect, useState } from "react";
import { getAuthHeaders } from "./useAuth";
import { Mentor } from "./useMentor";

// Tipagem da resposta da API de Perfil
interface ProfileResponse {
    status: number;
    content: Mentor;
}

// URL base para buscar um mentor individualmente (ajuste a rota do seu NestJS)
const PROFILE_API_URL = "http://localhost:3000/mentors"; 

export function useMentorProfile(mentorId: string | undefined) {
  const [mentor, setMentor] = useState<Mentor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!mentorId) {
      setLoading(false);
      setError("ID do mentor não fornecido.");
      return;
    }

    setLoading(true);
    setError(null);

    fetch(`${PROFILE_API_URL}/${mentorId}`, {
        headers: getAuthHeaders() // Envia o token JWT
    })
      .then(async (res) => {
        if (!res.ok) {
            // Se o ID for inválido ou o token falhar, lança erro
            const errorText = res.statusText || `Erro ${res.status}`;
            throw new Error(`Falha ao buscar perfil: ${errorText}`);
        }
        return res.json();
      })
      .then((data: ProfileResponse) => {
        if (data.status === 200 && data.content) {
            setMentor(data.content);
        } else {
             // Lida com a resposta do NestJS que usa 'status' e 'content'
            throw new Error(data.status ? `API retornou status: ${data.status}` : 'Dados inválidos no retorno da API.');
        }
      })
      .catch((err) => {
        console.error("Erro no fetch do perfil:", err);
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [mentorId]);

  return { mentor, loading, error };
}
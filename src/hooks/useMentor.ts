// src/hooks/useMentores.tsx (ou useMentor.tsx, dependendo do seu nome de arquivo)

import { useEffect, useState } from "react";
// 👈 Importe a função que pega o token
import { getAuthHeaders } from "./useAuth.tsx"; 

// Definição da nova estrutura de dados (simplificada)
interface KnowledgeArea {
  id: string;
  name: string;
}

interface Skill {
  id: string;
  name: string;
  knowledgeAreas: KnowledgeArea;
}

// Exportar Mentor é crucial para que Buscar.tsx consiga tipar o useMemo
export interface Mentor {
  id: string; // Agora é um UUID
  name: string;
  email: string;
  company: string | null;
  position: string | null;
  description: string | null;
  profile_img_url: string | null;
  skills: Skill[];
  user_profiles: {
    id: string;
    fk_profile_id: string;
    profiles: {
      id: string;
      profile_name: string;
    }
  };
  verified: any
  // Onde está a informação da área
  // ... outros campos
}

// **MUDE ESTA URL PARA A SUA NOVA API**
// A rota de busca deve retornar a lista com a estrutura que você forneceu.
const API_URL = "http://localhost:3000/mentors"; // <-- Use a URL do seu NestJS

export function useMentores(initialSearchTerm: string | null = "") {
  const [mentores, setMentores] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(false);
  const [buscaSimples, setBuscaSimples] = useState(initialSearchTerm ?? "");

  useEffect(() => {
    setLoading(true);
    setMentores([]);

    fetch(API_URL, {
        // 🚀 ADICIONA O TOKEN JWT AQUI!
        headers: getAuthHeaders() 
    })
      .then((res) => {
        if (!res.ok) {
          // Se o status for 401/403 (Não autorizado), o usuário deve ser redirecionado para o login.
          if (res.status === 401 || res.status === 403) {
             console.error("Não autorizado. Token inválido ou expirado.");
             // Aqui você pode chamar o logout() do useAuth se quiser forçar o logout
          }
          throw new Error("Erro ao buscar mentores.");
        }
        return res.json();
      })
      .then((data: Mentor[]) => {
        setMentores(data);
      })
      .catch((error) => {
        console.error("Falha no fetch dos mentores:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []); // Executa apenas uma vez no mount

  return { mentores, loading, buscaSimples, setBuscaSimples };
}
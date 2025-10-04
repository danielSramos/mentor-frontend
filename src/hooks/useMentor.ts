import { useEffect, useState } from "react";
import { getAuthHeaders } from "./useAuth.tsx"; 

interface KnowledgeArea {
  id: string;
  name: string;
}

interface Skill {
  id: string;
  name: string;
  knowledgeAreas: KnowledgeArea;
}

export interface Mentor {
  id: string;
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
}

const API_URL = "http://localhost:3000/mentors";

export function useMentores(initialSearchTerm: string | null = "") {
  const [mentores, setMentores] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(false);
  const [buscaSimples, setBuscaSimples] = useState(initialSearchTerm ?? "");

  useEffect(() => {
    setLoading(true);
    setMentores([]);

    fetch(API_URL, {
        headers: getAuthHeaders() 
    })
      .then((res) => {
        if (!res.ok) {
          if (res.status === 401 || res.status === 403) {
             console.error("Não autorizado. Token inválido ou expirado.");
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
  }, []);

  return { mentores, loading, buscaSimples, setBuscaSimples };
}
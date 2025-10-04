// src/hooks/useHomeMentors.ts

import { useEffect, useState } from "react";
// Importamos o tipo Mentor da sua nova estrutura de API
import { Mentor } from "./useMentor"; 

// **MUDE ESTA URL PARA A SUA NOVA API (se for diferente da /mentores)**
// Se for a mesma URL, o ideal é reusar a useMentores, mas como
// a Home pode precisar de um endpoint OTIMIZADO (ex: apenas 3 mentores),
// vamos criar um hook separado para manter a lógica isolada.
const API_URL = "http://localhost:3000/mentors"; // <-- Endpoint sugerido para a Home

// Tipo de dados que o componente CardTutorSmall espera
export type Tutor = {
  id: string; // Mudamos para string/UUID
  name: string;
  role: string;
  rating: number; 
  photo: string;
  skills: string[];
};

// Função de Mapeamento/Adaptação
// Transforma os dados da API (Mentor) para o formato esperado (Tutor)
const mapMentorToTutor = (mentor: Mentor): Tutor => {
  // Extrai as áreas de conhecimento
  const skillsList = mentor.skills.map(s => s.knowledgeAreas.name);

  return {
    id: mentor.id,
    name: mentor.name,
    role: mentor.position || 'Especialista', // Usa 'position' como 'role' ou fallback
    rating: 5, // Valor de fallback
    photo: mentor.profile_img_url || 'default_photo_url', // Usa URL de imagem ou fallback
    skills: skillsList,
  };
};

export function useHomeMentors() {
  const [tutores, setTutores] = useState<Tutor[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Falha ao buscar mentores da Home.");
        return res.json();
      })
      .then((data: Mentor[]) => {
        // Mapeia os dados da API para o formato esperado pelo CardTutorSmall
        const mappedTutores = data.map(mapMentorToTutor);
        setTutores(mappedTutores);
      })
      .catch((error) => {
        console.error("Erro no fetch para Home:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { tutores, loading };
}
import { useEffect, useState } from "react";
import { Mentor } from "./useMentor"; 

const API_URL = "http://localhost:3000/mentors";

export type Tutor = {
  id: string; 
  name: string;
  role: string;
  rating: number; 
  photo: string;
  skills: string[];
};

const mapMentorToTutor = (mentor: Mentor): Tutor => {
  const skillsList = mentor.skills.map(s => s.knowledgeAreas.name);

  return {
    id: mentor.id,
    name: mentor.name,
    role: mentor.position || 'Especialista', 
    rating: 5,
    photo: mentor.profile_img_url || 'default_photo_url',
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
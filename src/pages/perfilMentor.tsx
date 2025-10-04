import React from "react";
import { Link, useParams } from "react-router-dom";
import { useMentorProfile } from "../hooks/useMentorProfile.tsx";
import SkillBadge from "../components/badges/SkillBadge";
import Star from "../components/Star"; 

function Loading() {
  return <p className="text-gray-900 Text-lg dark:text-white text-center py-10">CARREGANDO PERFIL...</p>;
}

function PerfilMentor() {
  const { id } = useParams<{ id: string }>(); 
  const { mentor, loading, error } = useMentorProfile(id);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="container mx-auto py-10 text-center text-red-600">
        <h2 className="text-xl font-bold">Erro ao Carregar Perfil</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!mentor) {
    return (
      <div className="container mx-auto py-10 text-center text-yellow-600">
        <h2 className="text-xl font-bold">Mentor não Encontrado</h2>
        <p>Verifique o ID ou se você está logado.</p>
      </div>
    );
  }

  const mentorName = mentor.name;
  const mentorEmail = mentor.email;
  const mentorProfile = mentor.user_profiles?.profiles?.profile_name || 'Usuário';
  const profileImgUrl = mentor.profile_img_url || 'https://placehold.co/150';
  
  // Mapeia todas as áreas de conhecimento
  const skillAreas = mentor.skills
    .map(skill => skill.knowledgeAreas?.name)
    .filter((name): name is string => !!name); 
    

  const rating = 5;
  const description = mentor.description || 'Nenhuma descrição fornecida.';
  const price = 100;

  return (
    <section className="bg-gray-50 py-10">
      <div className="container mx-auto p-6 bg-white shadow-xl rounded-lg">
        
        {/* CABEÇALHO DO PERFIL */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 border-b pb-6 mb-6">
          <img
            src={profileImgUrl}
            alt={`Foto de ${mentorName}`}
            className="w-36 h-36 rounded-full object-cover shadow-lg flex-shrink-0"
          />
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-extrabold text-slate-900">{mentorName}</h1>
            <p className="text-xl text-blue-600 mt-1">{mentorProfile}</p>
            
            {/* Rating Simulado */}
            <div className="flex justify-center md:justify-start items-center mt-3">
              <Star rating={rating} is_small={false} mouseClick={() => {}} />
              <span className="ml-2 text-md text-gray-500">({rating}.0/5)</span>
            </div>
            
            <Link
              to={`/agendamento/${mentor.id}`}
              >
              <button className="mt-4 px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-300">
                Agendar Mentoria
              </button>
            </Link>
          </div>
        </div>

        {/* DETALHES E BIOGRAFIA */}
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Coluna de Detalhes */}
          <div className="md:col-span-1 space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 border-b pb-2">Detalhes</h2>
            
            <div className="text-lg">
                <p className="font-semibold">Email:</p>
                <p className="text-gray-600">{mentorEmail}</p>
            </div>

            <div className="text-lg">
                <p className="font-semibold">Valor da Sessão (Simulado):</p>
                <p className="text-gray-600 text-2xl font-extrabold">
                  {price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                  <span className="text-sm font-medium">/mês</span>
                </p>
            </div>

            <h3 className="text-xl font-bold text-slate-900">Áreas de Conhecimento</h3>
            <SkillBadge skills={skillAreas} is_small={false} />
          </div>

          {/* Coluna de Biografia/Descrição */}
          <div className="md:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 border-b pb-2">Sobre o Mentor</h2>
            <p className="text-gray-700 whitespace-pre-wrap">{description}</p>
            
            {/* Adicione outras seções aqui, como Experiência, Educação, etc. */}
          </div>
        </div>
        
      </div>
    </section>
  );
}

export default PerfilMentor;
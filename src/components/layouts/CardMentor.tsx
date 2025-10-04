import Star from "../Star";
import dollar from "../../assets/dollar.svg";
import checked from "../../assets/verified.svg";
import SkillBadge from '../badges/SkillBadge';
import { Link } from "react-router-dom";
import { Mentor } from "../../hooks/useMentor"; 

interface CardMentorProps {
  mentor: Mentor;
}

const CardMentor: React.FC<CardMentorProps> = ({ mentor }) => {
  
  const mentorName = mentor.name; 
  const profileImgUrl = mentor.profile_img_url || "https://placehold.co/400";
  const isVerified = mentor.verified ?? false;

  const position = mentor.position || 'Especialista';
  const company = mentor.company || 'Autônomo';
  const roleDisplay = `${position} na ${company}`;

  const skillNames = mentor.skills
    .map(skill => skill.knowledgeAreas?.name) 
    .filter((name): name is string => !!name); 

  const rating = 5; 
  const biography = mentor.description || "Mentor experiente e disponível para te ajudar a evoluir na sua carreira.";
  const price = 100;

  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-0 md:items-start items-center w-full p-4 border rounded">
      <div className="md:w-1/4 flex items-center justify-center">
        <img
          src={profileImgUrl}
          alt={`Foto de ${mentorName}`}
          className="w-32 h-32 rounded-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-1 md:w-2/3">
        <div className="flex items-center gap-2">
          <h3 className="text-2xl font-bold">{mentorName}</h3> 
          {isVerified && (
            <figure>
              <img src={checked} alt="Verificado" />
            </figure>
          )}
        </div>
        
        <span className="text-slate-600">{roleDisplay}</span>
        
        {/* Avaliação */}
        <figure>
          <Star
            rating={rating}
            is_small={false}
            mouseClick={() => {}}
          />
        </figure>
        
        {/* Biografia/Descrição */}
        <p className="text-sm text-justify">{biography}</p>
        
        {/* Habilidades/Skills */}
        <div className="mx-auto m-4">
          <SkillBadge skills={skillNames} is_small={true} />
        </div>
        
        <div className="flex justify-between">
          {/* Preço */}
          <div className="flex gap-1 items-center">
            <figure>
              <img src={dollar} alt="Símbolo do dólar" />
            </figure>
            <span className="text-2xl font-extrabold">
              {price.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
              <span className="text-sm font-medium">/mês</span>
            </span>
          </div>
          
          {/* Link para Perfil */}
          <Link 
            className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg" 
            to={`perfil/${mentor.id}`}
          >
            Ver perfil completo
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CardMentor;
import { useMemo, useState } from "react";
import lupa from "../assets/lupa.svg";
import CardMentor from "../components/layouts/CardMentor";
import { useSearchParams } from "react-router-dom";
import { useMentores, Mentor } from "../hooks/useMentor"; 

function Loading() {
  return <p className="text-gray-900 Text-lg dark:text-white">CARREGANDO...</p>;
}

function Buscar() {
  const areas_data = [
    { id: 1, nome: "Back-end" },
    { id: 2, nome: "UX/UI" },
    { id: 3, nome: "Front-end" },
    { id: 4, nome: "Starup" },
    { id: 5, nome: "Finanças" },
  ];

  const empresas_data = [
    { id: 1, nome: "Back-end" },
    { id: 2, nome: "UX/UI" },
    { id: 3, nome: "Front-end" },
    { id: 4, nome: "Starup" },
    { id: 5, nome: "Finanças" },
  ];

  const cargos_data = [
    { id: 1, nome: "CEO" },
    { id: 2, nome: "CTO" },
    { id: 3, nome: "Sênior" },
    { id: 4, nome: "Pleno" },
    { id: 5, nome: "Professor" },
  ];

  const [empresas] = useState(empresas_data);
  const [cargos] = useState(cargos_data);
  const [areas] = useState(areas_data);
  const [areasSelecionadas, setAreasSelecionadas] = useState<string[]>([]);
  
  const [query] = useSearchParams();
  const buscaTudo = query.get("habilidade");
  
  const { mentores, loading, buscaSimples, setBuscaSimples } = useMentores(buscaTudo);

  const dataSource = useMemo(() => {
    const mentorPassesFilter = (mentor: Mentor) => {
      if (areasSelecionadas.length === 0 && !buscaSimples) {
        return true;
      }

      const mentorKnowledgeAreas = mentor.skills
        .map(skill => skill.knowledgeAreas.name.toLowerCase());
      
      const buscaSimplesLower = buscaSimples.toLowerCase();

      const isAreaSelected = areasSelecionadas.some(selectedArea => 
        mentorKnowledgeAreas.includes(selectedArea.toLowerCase())
      );
      
      const hasSimpleSearchMatch = mentorKnowledgeAreas.some(areaName => 
        areaName.includes(buscaSimplesLower)
      );

      return isAreaSelected || hasSimpleSearchMatch;
    };
    
    return mentores.filter(mentorPassesFilter);
    
  }, [mentores, buscaSimples, areasSelecionadas]);
  
  return (
    <section>
      <div className="container mx-auto flex flex-col md:flex-row md:gap-16 py-4">
        
        {/* Coluna de Filtros */}
        <div className="flex flex-col md:w-1/3 md:p-0 p-6 gap-10">
          
          {/* Input: Busque por habilidades (Busca Simples) */}
          <div className="w-full md:w-full mx-auto relative">
            <input
              value={buscaSimples}
              onChange={(event) => {
                setBuscaSimples(event.target.value);
              }}
              className="border h-14 rounded-lg w-full px-4"
              type="text"
              placeholder="Busque por habilidades"
            />
            <img
              src={lupa}
              className="absolute top-1/3 right-4"
              alt="Search Icon"
            />
          </div>
          
          {/* Filtro: Área do Conhecimento - Input (UI) */}
          <div className="w-full relative">
            <label
              htmlFor="conhecimento"
              className="text-slate-800 font-semibold"
            >
              Área do Conhecimento
            </label>
            <input
              className="border h-14 rounded-lg w-full px-4"
              type="text"
              id="conhecimento"
            />
            <img
              src={lupa}
              className="absolute top-10 right-4"
              alt="Search Icon"
            />
          </div>
          
          {/* Filtro: Área do Conhecimento - Checkboxes (Com lógica de filtro) */}
          <div id="area-container" className="flex flex-col gap-3">
            {areas.map((area) => {
              return (
                <div className="flex gap-3 items-center" key={area.id}>
                  <input
                    checked={areasSelecionadas.includes(area.nome)}
                    onChange={(event) => {
                      if (event.target.checked) {
                        setAreasSelecionadas([area.nome]);
                      } else {
                        setAreasSelecionadas([]);
                      }
                    }}
                    type="checkbox"
                    className="appearance-none w-5 h-5 border rounded border-slate-300"
                  />
                  <span className="text-slate-600">{area.nome}</span>
                </div>
              );
            })}
          </div>
          
          {/* Filtro: Cargo - Input (UI) */}
          <div className="w-full relative">
            <label htmlFor="cargo" className="text-slate-800 font-semibold">
              Cargo
            </label>
            <input
              className="border h-14 rounded-lg w-full px-4"
              type="text"
              id="cargo"
            />
            <img
              src={lupa}
              className="absolute top-10 right-4"
              alt="Search Icon"
            />
          </div>
          
          {/* Filtro: Cargo - Checkboxes (UI) */}
          <div id="cargo-container" className="flex flex-col gap-3">
            {cargos.map((cargo) => {
              return (
                <div className="flex gap-3 items-center" key={cargo.id}>
                  <input
                    type="checkbox"
                    className="appearance-none w-5 h-5 border rounded border-slate-300"
                  />
                  <span className="text-slate-600">{cargo.nome}</span>
                </div>
              );
            })}
          </div>
          
          {/* Filtro: Empresas - Input (UI) */}
          <div className="w-full relative">
            <label htmlFor="empresa" className="text-slate-800 font-semibold">
              Empresas
            </label>
            <input
              className="border h-14 rounded-lg w-full px-4"
              type="text"
              id="empresa"
            />
            <img
              src={lupa}
              className="absolute top-10 right-4"
              alt="Search Icon"
            />
          </div>
          
          {/* Filtro: Empresas - Checkboxes (UI) */}
          <div id="empresa-container" className="flex flex-col gap-3">
            {empresas.map((empresa) => {
              return (
                <div className="flex gap-3 items-center" key={empresa.id}>
                  <input
                    type="checkbox"
                    className="appearance-none w-5 h-5 border rounded border-slate-300"
                  />
                  <span className="text-slate-600">{empresa.nome}</span>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Coluna de Mentores (Resultados) */}
        <div id="mentor-container" className="flex flex-col md:w-2/3 gap-6">
          {loading ? (
            <Loading /> 
          ) : dataSource.length > 0 ? (
            dataSource.map((mentor) => (
              <CardMentor key={mentor.id!} mentor={mentor} />
            ))
          ) : (
            <div
              className="p-4 mb-4 text-sm text-center text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300"
              role="alert"
            >
              <span className="font-medium">Nenhum Mentor Disponível</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Buscar;
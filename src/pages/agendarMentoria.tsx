// src/pages/AgendarMentoria.tsx

import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAgendamento } from "../hooks/useAgendamento.tsx";
import { useMentorProfile } from "../hooks/useMentorProfile.tsx";

// Componente simples para a tela de agendamento
function AgendarMentoria() {
  const { id: mentorId } = useParams<{ id: string }>(); // ID do mentor da URL
  const navigate = useNavigate();
  const { agendar } = useAgendamento();
  
  // Estados do Formulário
  const [data, setData] = useState("");
  const [hora, setHora] = useState("");
  const [duracao, setDuracao] = useState<number>(60); // Padrão: 60 minutos
  const [topico, setTopico] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Nota: Você pode buscar os dados do mentor aqui se quiser exibi-los
  // (usando o useMentorProfile(mentorId)), mas vamos focar no formulário.

  const mentor = useMentorProfile(mentorId);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!mentorId) {
        alert("Erro: ID do mentor não encontrado.");
        return;
    }
    if (!data || !hora || !topico) {
        alert("Preencha a data, hora e tópico do agendamento.");
        return;
    }

    setLoading(true);

    // Combina data e hora para criar o formato ISO esperado pela API
    const dataHoraISO = new Date(`${data}T${hora}:00`).toISOString();

    const success = await agendar({ 
        mentorId,
        dataHora: dataHoraISO,
        duracao,
        topico
    });
    
    setLoading(false);

    if (success) {
        alert("Agendamento solicitado com sucesso! Aguarde a confirmação do mentor.");
        // Redireciona para o perfil do mentor ou para uma página de sucesso
        navigate(`/buscar/perfil/${mentorId}`); 
    }
    // Se falhar, o hook já mostra o alert do erro.
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-xl p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-slate-900">
          Agendar Mentoria
        </h2>
        <p className="text-center text-gray-600">
          Você está agendando com o Mentor ID: **{mentor.mentor?.name}**
        </p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          
          {/* Data */}
          <div>
            <label htmlFor="data" className="block text-sm font-medium text-gray-700">Data Desejada</label>
            <input
              id="data"
              type="date"
              required
              value={data}
              onChange={(e) => setData(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Hora */}
          <div>
            <label htmlFor="hora" className="block text-sm font-medium text-gray-700">Hora (Ex: 14:30)</label>
            <input
              id="hora"
              type="time"
              step="300" // Permite passos de 5 minutos, ou ajuste para 15/30
              required
              value={hora}
              onChange={(e) => setHora(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          {/* Duração */}
          <div>
            <label htmlFor="duracao" className="block text-sm font-medium text-gray-700">Duração (minutos)</label>
            <select
              id="duracao"
              value={duracao}
              onChange={(e) => setDuracao(Number(e.target.value))}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value={30}>30 minutos</option>
              <option value={60}>60 minutos</option>
              <option value={90}>90 minutos</option>
            </select>
          </div>

          {/* Tópico / Objetivo */}
          <div>
            <label htmlFor="topico" className="block text-sm font-medium text-gray-700">Tópico Principal / Objetivo</label>
            <textarea
              id="topico"
              rows={3}
              required
              value={topico}
              onChange={(e) => setTopico(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ex: Revisão de código em NestJS, Planejamento de carreira, Dúvidas sobre AWS..."
            />
          </div>

          {/* Botão de Agendamento */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? "Processando Agendamento..." : "Confirmar Agendamento"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default AgendarMentoria;
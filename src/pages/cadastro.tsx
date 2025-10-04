import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegister } from "../hooks/useRegister.tsx"; // <-- Importa o novo hook

function Cadastro() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  
  const { register } = useRegister();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!name || !email || !password) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    setLoading(true);

    const success = await register({ name, email, password }); 
    
    setLoading(false);

    if (success) {
        alert("Cadastro realizado com sucesso! Faça login para continuar.");
        navigate('/login'); // Redireciona para a página de login
    }
    // Se falhar, o hook já mostra o alert do erro.
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-slate-900">
          Crie sua Conta Mentorr
        </h2>
        <p className="text-center text-gray-600">
          Rápido e fácil, comece a evoluir hoje.
        </p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          
          {/* Campo de Nome */}
          <div>
            <label 
              htmlFor="name" 
              className="block text-sm font-medium text-gray-700"
            >
              Nome Completo
            </label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Seu nome"
            />
          </div>

          {/* Campo de Email */}
          <div>
            <label 
              htmlFor="email" 
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="seu@email.com"
            />
          </div>

          {/* Campo de Senha */}
          <div>
            <label 
              htmlFor="password" 
              className="block text-sm font-medium text-gray-700"
            >
              Senha
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="••••••••"
            />
          </div>

          {/* Botão de Cadastro */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? "Registrando..." : "Cadastrar"}
          </button>
        </form>

        <div className="text-center">
          <Link 
            to="/login" 
            className="text-sm font-medium text-blue-600 hover:text-blue-500"
          >
            Já tem uma conta? Faça Login
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Cadastro;
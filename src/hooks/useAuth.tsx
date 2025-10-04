// src/hooks/useAuth.ts

import { useState, useContext, createContext, ReactNode, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

// Definição dos tipos de resposta da sua API
interface Account {
  id: string;
  name: string;
  email: string;
  username: string | null;
  company: string | null;
  position: string | null;
  nationality: string | null;
  verified: boolean | null;
  description: string | null;
  profile_img_url: string | null;
  // Adicione todos os campos relevantes aqui, se quiser tipar o objeto completo
}

interface AuthResponse {
  access_token: string;
  account: Account;
}

// Tipo de dados a serem armazenados no estado (ou localStorage)
interface AuthState {
  token: string | null;
  user: Account | null;
}

// Tipo do Contexto
interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

// URL da sua API de Autenticação (Ajuste conforme necessário)
const LOGIN_API_URL = "http://localhost:3000/accounts/login"; 

// 1. Criação do Contexto com valores default
// Isso permite que o useAuth não precise verificar se o contexto é 'undefined'.
const AuthContext = createContext<AuthContextType>({
  token: null,
  user: null,
  login: () => Promise.resolve(false), // Função default
  logout: () => {}, // Função default
});

// Hook principal de Lógica de Autenticação
export const useAuthHook = () => {
  // Inicializa o estado lendo do localStorage, se disponível
  const initialToken = localStorage.getItem('authToken');
  const initialUser = localStorage.getItem('authUser');

  const [token, setToken] = useState<string | null>(initialToken);
  const [user, setUser] = useState<Account | null>(initialUser ? JSON.parse(initialUser) : null);
  const navigate = useNavigate();

  // Função de Login
  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch(LOGIN_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Falha no login:", errorData);
        alert(`Erro de Login: ${errorData.message || 'Credenciais inválidas.'}`);
        return false;
      }

      const data: AuthResponse = await response.json();
      
      // Armazena e Persiste
      setToken(data.access_token);
      setUser(data.account);
      localStorage.setItem('authToken', data.access_token);
      localStorage.setItem('authUser', JSON.stringify(data.account));

      // Redireciona para a Home ou Dashboard
      navigate('/buscar'); 
      return true;

    } catch (error) {
      console.error("Erro de rede/servidor durante o login:", error);
      alert("Não foi possível conectar ao servidor de autenticação.");
      return false;
    }
  }, [navigate]);

  // Função de Logout
  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
    navigate('/login');
  }, [navigate]);

  return { token, user, login, logout };
};

// Provider do Contexto (Componente que envolve a aplicação)
interface AuthProviderProps {
    children: ReactNode;
}

// 2. AuthProvider: Usando a sintaxe de função direta para evitar erros de parser
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const auth = useAuthHook();
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook customizado para fácil acesso ao contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  // Não precisa mais de verificação, pois o contexto inicial é do tipo AuthContextType
  return context;
};

// Função auxiliar para adicionar o Token nas requisições (Headers)
export const getAuthHeaders = (): HeadersInit => {
  const storedToken = localStorage.getItem('authToken');
  const headers: HeadersInit = { 'Content-Type': 'application/json' };
  
  if (storedToken) {
    headers['Authorization'] = `Bearer ${storedToken}`;
  }
  return headers;
};
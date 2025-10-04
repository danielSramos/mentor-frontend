import { useState, useContext, createContext, ReactNode, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

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
}

interface AuthResponse {
  access_token: string;
  account: Account;
}

interface AuthState {
  token: string | null;
  user: Account | null;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const LOGIN_API_URL = "http://localhost:3000/accounts/login"; 

const AuthContext = createContext<AuthContextType>({
  token: null,
  user: null,
  login: () => Promise.resolve(false), 
  logout: () => {}, 
});

export const useAuthHook = () => {
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

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const auth = useAuthHook();
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};

export const getAuthHeaders = (): HeadersInit => {
  const storedToken = localStorage.getItem('authToken');
  const headers: HeadersInit = { 'Content-Type': 'application/json' };
  
  if (storedToken) {
    headers['Authorization'] = `Bearer ${storedToken}`;
  }
  return headers;
};
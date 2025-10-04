import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Buscar from "./pages/busca";
import AppLayout from "./components/layouts/AppLayout";
import PerfilMentor from "./pages/perfilMentor";
import { AuthProvider } from "./hooks/useAuth.tsx";
import Login from "./pages/login";
import Cadastro from "./pages/cadastro.tsx";
import AgendarMentoria from "./pages/agendarMentoria.tsx";

function App() {
    return (
        <BrowserRouter>
            { }
            <AuthProvider>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/cadastro" element={<Cadastro />} />

                    <Route element={<AppLayout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="buscar" element={<Buscar />} />
                        <Route path="agendamento/:id" element={<AgendarMentoria />} />
                        <Route path="buscar/perfil/:id" element={<PerfilMentor />} />
                    </Route>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
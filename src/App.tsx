import Home from "./pages/home";
import { BrowserRouter, Routes, Route } from "react-router";
import { Login } from "./pages/login";
import { List } from "./pages/list";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/list" element={<List />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

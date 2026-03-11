import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard } from "./containers/Dashboard";
import { NovoAluno } from "./containers/NovoAluno";
import { Alunos } from "./containers/Alunos";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/novoAluno" element={<NovoAluno />} />
        <Route path="/alunos" element={<Alunos />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
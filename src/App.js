import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import ListProdutos from "./components/produtos/listProdutos";
import ProtectedRoute from "./components/ProtectedRoute"; // Componente de Rota Protegida
import ListCompras from './components/compras/listCompras';
import Compra from './components/compras/Compra';

function App() {
  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/produtos" element={<ListProdutos />} />
          <Route path="/compras" element={<ListCompras />} />
          <Route path="/compra" element={<Compra />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

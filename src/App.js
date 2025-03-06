import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import { useEffect } from "react";
import ListProdutos from "./components/produtos/listProdutos";
import ProtectedRoute from "./components/ProtectedRoute"; // Componente de Rota Protegida
import ListCompras from './components/compras/listCompras';
import ListPessoas from './components/pessoas/listPessoas';
import Pessoa from './components/pessoas/Pessoa';
import Compra from './components/compras/Compra';
import Produto from './components/produtos/Produto';
import ListCategorias from './components/categorias/listCategorias';
import Categoria from './components/categorias/Categoria';
import ListRotas from './components/rotas/listRotas';
import Rota from './components/rotas/Rota';
import ListVendas from './components/vendas/listVendas';
import Venda from './components/vendas/Venda';
import ListContasAReceber from './components/contasareceber/listContasAReceber';

function App() {
  useEffect(() => {
    document.title = "Distribuidora RMTripas";
  }, []);

  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/contasareceber" element={<ListContasAReceber />} />
          <Route path="/vendas" element={<ListVendas />} />
          <Route path="/venda" element={<Venda />} />
          <Route path="/categorias" element={<ListCategorias />} />
          <Route path="/categoria" element={<Categoria />} />
          <Route path="/rotas" element={<ListRotas />} />
          <Route path="/rota" element={<Rota />} />
          <Route path="/produtos" element={<ListProdutos />} />
          <Route path="/produto" element={<Produto />} />
          <Route path="/pessoas" element={<ListPessoas />} />
          <Route path="/pessoa" element={<Pessoa />} />
          <Route path="/compras" element={<ListCompras />} />
          <Route path="/compra" element={<Compra />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

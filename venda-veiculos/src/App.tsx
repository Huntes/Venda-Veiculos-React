import { Route, Routes } from '../node_modules/react-router-dom/dist/index'
import { DetalhesVeiculo } from './Pages/Veiculos/Detalhes'
import {Vitrine} from './Pages/Veiculos/Vitrine'
import { CadastroVeiculo } from './Pages/Veiculos/Cadastro'
import { LoginPage } from './Pages/Login'
import { CadastroUsuario } from './Pages/Usuario/Cadastro'
import  {EditVeiculo}  from './Pages/Veiculos/Edicao'
// import Card from './components/Card'

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Vitrine />} />
      <Route path="/detalhes-veiculo/:id" element={<DetalhesVeiculo />} />
      <Route path="/editar-veiculo/:id" element={<EditVeiculo />} />
      <Route path="/CadastroVeiculo" element={<CadastroVeiculo />}/>
      <Route path="/Login" element={<LoginPage />}/>
      <Route path="/Logout" element={<LoginPage />}/>
      <Route path="/CadastroUsuario" element={<CadastroUsuario />}/>
    </Routes>
    </>
  )
}

export default App

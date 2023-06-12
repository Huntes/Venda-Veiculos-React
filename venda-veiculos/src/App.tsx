import { useState } from 'react'
import { Route, Routes } from '../node_modules/react-router-dom/dist/index'
import reactLogo from './assets/react.svg'
import { DetalhesVeiculo } from './Pages/Veiculos/Detalhes'
import {Vitrine} from './Pages/Veiculos/Vitrine'
import viteLogo from '/vite.svg'
import { CadastroVeiculo } from './Pages/Veiculos/Cadastro'
// import Card from './components/Card'

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Vitrine />} />
      <Route path="/Detalhes" element={<DetalhesVeiculo />} />
      <Route path="/CadastroVeiculo" element={<CadastroVeiculo />}/>
    </Routes>
    </>
  )
}

export default App

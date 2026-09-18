import { BrowserRouter, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import { PokemonProvider } from './context/PokemonContext';
import { RegistroUsuario } from './components/RegistroUsuario';
import { BuscadorPokemon } from './components/BuscadorPokemon';
import { InventarioPokemon } from './components/InventarioPokemon';

function App() {
  return (
    <PokemonProvider>
      <BrowserRouter>
        <div className="app-shell">
          <header className="app-header">
            <div className="brand-lockup">
              <span className="brand-kicker">POKÉMON // ROTOM SYSTEM</span>
              <h1>Registro de entrenadores y Pokémon</h1>
            </div>

            <nav className="nav-links" aria-label="Navegación principal">
              <NavLink to="/registro" className={({isActive}) => (isActive ? 'active-tab' : '')}>Registro</NavLink>
              <NavLink to="/buscador" className={({isActive}) => (isActive ? 'active-tab' : '')}>Buscador</NavLink>
              <NavLink to="/inventario" className={({isActive}) => (isActive ? 'active-tab' : '')}>Inventario</NavLink>
            </nav>
          </header>

          <main className="app-main">
            <Routes>
              <Route path="/registro" element={<RegistroUsuario />} />
              <Route path="/buscador" element={<BuscadorPokemon />} />
              <Route path="/inventario" element={<InventarioPokemon />} />
              <Route path="*" element={<Navigate to="/registro" replace />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </PokemonProvider>
  );
}

export default App;
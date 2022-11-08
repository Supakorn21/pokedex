import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PokemonInfoPage, SearchPage } from '@atomic';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchPage />}></Route>
        <Route path="pokemon" element={<PokemonInfoPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

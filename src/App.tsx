import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { Menubar } from './components/Menubar';
import { Accueil } from './pages/Accueil';
import { Parametres } from './pages/Parametres';
import { ListPage } from './pages/Liste';
import { List} from './types';

import './App.css';

function App() {
  const savedLists = localStorage.getItem('market-lists');
  const initialLists = savedLists ? JSON.parse(savedLists) as List[] : [];

  const [lists, setLists] = useState<List[]>(initialLists);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('market-lists', JSON.stringify(lists));
  }, [lists]);

  return (
    <Router>
      <div className="body">
        {menuOpen && <div className="overlay" onClick={() => setMenuOpen(false)} />}
        <Menubar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

        <div className="main-section">
          <Header toggleMenu={() => setMenuOpen(true)} />
          

          <Routes>
            <Route
              path="/"
              element={<Accueil lists={lists} setLists={setLists} />}
            />
            <Route
              path="/liste/:id"
              element={<ListPage lists={lists} setLists={setLists} />}
            />
            <Route path="/parametres" element={<Parametres />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

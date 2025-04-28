import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { Entry } from './components/Entry';
import { ListEntry } from './components/ListEntry';
import { Menubar } from './components/Menubar';
import { Accueil } from './pages/Accueil';  // Crée ce fichier
import { Parametres } from './pages/Parametres';  // Crée ce fichier

import './App.css';

function App() {
  // On tente de récupérer les données de `localStorage` directement pour l'initialisation
  const savedItems = localStorage.getItem('market-list');
  const initialItems = savedItems ? JSON.parse(savedItems) : [];

  const [items, setItems] = useState<Item[]>(initialItems); // Valeur initiale depuis localStorage

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('market-list', JSON.stringify(items));
  }, [items]);

  const addItem = (newItem: Item) => {
    setItems(prev => [...prev, newItem]);
  };

  const removeItem = (index: number) => {
    setItems(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <Router>
      <div className="body">
        {menuOpen && <div className="overlay" onClick={() => setMenuOpen(false)} />}
        <Menubar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

        <div className="main-section">
          <Header toggleMenu={() => setMenuOpen(true)} />
          <h1>Ma liste de marché 🛒</h1>

          <Routes>
            {/* Route pour la page d'accueil */}
            <Route path="/" element={<Accueil />} />
            {/* Route pour la page Liste avec les items */}
            <Route 
              path="/liste" 
              element={
                <div>
                  <Entry onAdd={addItem} />
                  <div className="list">
                    {items.map((item, index) => (
                      <ListEntry key={index} item={item} onRemove={() => removeItem(index)} />
                    ))}
                  </div>
                </div>
              }
            />
            {/* Route pour la page Paramètres */}
            <Route path="/parametres" element={<Parametres />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export interface Item {
  name: string;
  quantity: number;
  price: number;
  unit: string;
}

export default App;

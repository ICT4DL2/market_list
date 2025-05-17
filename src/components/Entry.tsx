import { useState } from 'react';
import { Item } from '../types';
import "../App.css"
import { Plus } from 'lucide-react'; // Import de l'icône

interface EntryProps {
  onAdd: (item: Item) => void;
}

export const Entry = ({ onAdd }: EntryProps) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const [unit, setUnit] = useState('kg');
  const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };
  const handleSubmit = () => {
    if (name.trim() === '') {
      alert("Le nom ne peut pas être vide.");
      return;
    }
    if (quantity <= 0) {
      alert("La quantité doit être supérieure à zéro.");
      return;
    }
    if (price < 0) {
      alert("Le prix ne peut pas être négatif.");
      return;
    }
    
    const id = generateUUID(); // ou ta version fallback
    const totalPrice = quantity * price;
    const newItem: Item = {
      name: name.trim(),
      quantity,
      price,
      unit,
      id: id,
      totalPrice: totalPrice
    };
    onAdd(newItem);
    
    // Reset inputs
    setName('');
    setQuantity(1);
    setPrice(0);
    setUnit('kg');
  };
  return (
    <div className="entry">
      <div className='simple-flex-container'>
        <div className='input-with-field'>
          <label>Nom</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nom du produit"
          />
        </div>
        <div className='input-with-field'>
          <label>Quantite</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            placeholder="Quantité"
          />
        </div>
        <div className='input-with-field'>
          <label>Unite</label>
          <select value={unit} onChange={(e) => setUnit(e.target.value)}>
            <option value="kg">Kg</option>
            <option value="g">Grammes</option>
            <option value="l">Litre</option>
            <option value="tasse">Tasse</option>
            <option value="seau">Seau</option>
          </select>
        </div>
        <div className='input-with-field'>
          <label>Prix</label>
          <div className='prix-input-button'> {/* Ajout du div manquant */}
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value))}
              placeholder="Prix"
            />
            
          </div>
        </div>
      </div>
      <button className='right-button' onClick={handleSubmit}>
        <Plus/>
      </button>
    </div>
  );
};
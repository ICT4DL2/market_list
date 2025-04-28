import { useState } from 'react';
import { Item } from '../App';

interface EntryProps {
  onAdd: (item: Item) => void;
}

export const Entry = ({ onAdd }: EntryProps) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const [unit, setUnit] = useState('kg');

  const handleSubmit = () => {
    if (name.trim() === '') return;

    const newItem: Item = {
      name: name.trim(),
      quantity,
      price,
      unit,
    };
    onAdd(newItem);

    setName('');
    setQuantity(1);
    setPrice(0);
    setUnit('kg');
  };

  return (
    <div className="entry">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nom du produit"
      />
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(parseInt(e.target.value))}
        placeholder="Quantité"
      />
      <select value={unit} onChange={(e) => setUnit(e.target.value)}>
        <option value="kg">Kg</option>
        <option value="g">Grammes</option>
        <option value="l">Litre</option>
        <option value="tasse">Tasse</option>
        <option value="seau">Seau</option>
      </select>
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(parseFloat(e.target.value))}
        placeholder="Prix"
      />
      <button onClick={handleSubmit}>Ajouter</button>
    </div>
  );
};

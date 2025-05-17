import { useState } from 'react';
import { Item } from '../types';
import { Pencil, Trash2 } from 'lucide-react'; // Import des icônes


interface ListEntryProps {
  item: Item;
  onRemove: (id: string) => void;
  onEdit: (id: string, newItem: Item) => void;
}

export const ListEntry = ({ item, onRemove, onEdit }: ListEntryProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(item.name);
  const [editQuantity, setEditQuantity] = useState(item.quantity);
  const [editPrice, setEditPrice] = useState(item.price);
  const [editUnit, setEditUnit] = useState(item.unit);

  const handleSaveClick = () => {
    if (editName.trim() === '') {
      alert("Le nom ne peut pas être vide.");
      return;
    }
    if (editQuantity <= 0) {
      alert("Quantité invalide.");
      return;
    }
    if (editPrice < 0) {
      alert("Prix invalide.");
      return;
    }

    const updatedItem: Item = {
      ...item,
      name: editName.trim(),
      quantity: editQuantity,
      price: editPrice,
      unit: editUnit,
      totalPrice: editQuantity * editPrice
    };

    // Ici on passe un seul champ modifiable, donc on peut modifier cette logique si besoin
    onEdit(item.id, updatedItem); // temporaire, on mettra à jour cela dans App

    // En option : remplace `onEdit` pour accepter l'objet complet (voir suite)
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditName(item.name);
    setEditQuantity(item.quantity);
    setEditPrice(item.price);
    setEditUnit(item.unit);
  };

  return (
    <div className="list-item">
      {!isEditing ? (
        <>
          <h3>{item.name} - {item.quantity} {item.unit}</h3>
          
          <p>Montant : {item.totalPrice} FCFA</p>
          <Pencil 
            size={25}
            className="edit-icon"
            aria-label="Modifier"
            onClick={() => setIsEditing(true)} />
          <Trash2 
          size={25}
          className="delete-icon"
          aria-label="Supprimer"
          onClick={() => onRemove(item.id)} />
        </>
      ) : (
        <>
          <input value={editName} onChange={(e) => setEditName(e.target.value)} />
          <input
            type="number"
            value={editQuantity}
            onChange={(e) => setEditQuantity(Number(e.target.value))}
          />
          <input
            type="number"
            value={editPrice}
            onChange={(e) => setEditPrice(Number(e.target.value))}
          />
          <select value={editUnit} onChange={(e) => setEditUnit(e.target.value)}>
            <option value="kg">Kg</option>
            <option value="g">Grammes</option>
            <option value="l">Litre</option>
            <option value="tasse">Tasse</option>
            <option value="seau">Seau</option>
          </select>
          <button onClick={handleSaveClick}>Enregistrer</button>
          <button onClick={handleCancelClick}>Annuler</button>
        </>
      )}
    </div>
  );
};

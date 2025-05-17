import { List } from '../types';
import { useState } from 'react';
interface EditListFormProps {
    list: List;
    onSave: (updatedList: List) => void;
  }
  
  export const EditListForm: React.FC<EditListFormProps> = ({ list, onSave }) => {
    const [title, setTitle] = useState(list.title);
    const [budget, setBudget] = useState(list.budget);
  
    const handleSubmit = () => {
      const updatedList = { ...list, title, budget };
      onSave(updatedList); // Envoie les modifications vers le parent
    };
  
    return (
      <div>
        <h2>Modifier la Liste</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Titre de la liste"
        />
        <input
          type="number"
          value={budget}
          onChange={(e) => setBudget(Number(e.target.value))}
          placeholder="Budget"
        />
        <button onClick={handleSubmit}>Sauvegarder</button>
      </div>
    );
  };
  
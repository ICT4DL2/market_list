import { Item } from '../App';

interface ListEntryProps {
  item: Item;
  onRemove: () => void;
}

export const ListEntry = ({ item, onRemove }: ListEntryProps) => {
  return (
    <div className="list-item">
      <h3>{item.name} - {item.quantity} {item.unit}</h3>
      <p>{item.price} FCFA</p>
      <button onClick={onRemove}>Supprimer</button>
    </div>
  );
};

import { Item } from '../App';

interface ListEntryProps {
  item: Item;
  onRemove: () => void;
}

export const ListEntry = ({ item, onRemove }: ListEntryProps) => {
  return (
    <div className="list-item">
      <h4>{item.name} - {item.quantity} {item.unit}</h4>
      <p>{item.price} $</p>
      <button onClick={onRemove}>Supprimer</button>
    </div>
  );
};

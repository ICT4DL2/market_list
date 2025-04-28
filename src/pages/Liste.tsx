import { Item } from '../App';
import { ListEntry } from '../components/ListEntry';

interface ListeProps {
  items: Item[];
  onRemove: (index: number) => void;
}

export function Liste({ items, onRemove }: ListeProps) {
  return (
    <div>
    
      <h1>Liste de courses</h1>
      <div className="list">
        {items.map((item, index) => (
          <ListEntry key={index} item={item} onRemove={() => onRemove(index)} />
        ))}
      </div>
    </div>
  );
}

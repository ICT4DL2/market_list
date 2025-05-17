import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Entry } from '../components/Entry';
import { ListEntry } from '../components/ListEntry';
import { Item, List } from '../types';

interface ListeProps {
  lists: List[];
  setLists: React.Dispatch<React.SetStateAction<List[]>>;
}

export const ListPage: React.FC<ListeProps> = ({ lists, setLists }) => {
  const { id } = useParams<{ id: string }>();
  const [currentList, setCurrentList] = useState<List | undefined>();
  const [titleInput, setTitleInput] = useState('');


  const [userBalance, setUserBalance] = useState<number>(0);
  const [balanceInput, setBalanceInput] = useState<string>('');
  const [isBudgetChecked, setIsBudgetChecked] = useState<boolean>(false);
  const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };
  useEffect(() => {
    const list = lists.find((l) => l.id === id);
    if (list) {
      setCurrentList(list);
      setIsBudgetChecked(list.isBudgetChecked);
      setTitleInput(list.title); 
    }
  }, [id, lists]);

  const updateCurrentList = (updatedItems: Item[], budgetChecked = isBudgetChecked) => {
    const updatedList: List = {
      ...currentList!,
      items: updatedItems,
      isBudgetChecked: budgetChecked,
    };

    setCurrentList(updatedList);
    setLists((prev) =>
      prev.map((l) => (l.id === updatedList.id ? updatedList : l))
    );
  };

  const addItem = (newItem: Item) => {
    const totalPrice = newItem.quantity * newItem.price;
    const newItemWithTotal: Item = {
      ...newItem,
      id: generateUUID(),//crypto.randomUUID(),
      totalPrice,
    };
    updateCurrentList([...(currentList?.items || []), newItemWithTotal]);
  };

  const removeItem = (id: string) => {
    const updated = currentList?.items.filter((item) => item.id !== id) || [];
    updateCurrentList(updated);
  };

  const handleEditItem = (id: string, updatedItem: Item) => {
    const updated = (currentList?.items || []).map((item) =>
      item.id === id ? updatedItem : item
    );
    updateCurrentList(updated);
  };

  

  const handleBalanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBalanceInput(e.target.value);
  };

  const handleBalanceSubmit = () => {
    const parsedBalance = parseFloat(balanceInput);
    if (!isNaN(parsedBalance)) {
      setUserBalance(parsedBalance);
      setBalanceInput('');
    } else {
      alert('Veuillez entrer un nombre valide.');
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsBudgetChecked(e.target.checked);
    updateCurrentList(currentList?.items || [], e.target.checked);
  };

  if (!currentList) return <p>Liste introuvable</p>;

  const totalPrice = currentList.items.reduce((sum, item) => sum + item.totalPrice, 0);
  const isBalanceSufficient = userBalance >= totalPrice;

  return (
    <div>
       <h1>Listes</h1>
        <div style={{ marginBottom: '1rem' }}>
          <input
            type="text"
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)}
            onBlur={() => {
              if (titleInput.trim() === '') return;

              const updatedList = { ...currentList!, title: titleInput.trim() };
              setCurrentList(updatedList);
              setLists((prev) =>
                prev.map((l) => (l.id === updatedList.id ? updatedList : l))
              );
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') (e.target as HTMLInputElement).blur();
            }}
            style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              border: 'none',
              borderBottom: '2px solid gray',
              outline: 'none',
              padding: '4px',
              width: '100%',
            }}
          />
        </div>



      <Entry onAdd={addItem} />

      <div className="list">
        {/* Budget Section */}
        <div className="budget-section">
          <div className="label">
            <input
              type="checkbox"
              checked={isBudgetChecked}
              onChange={handleCheckboxChange}
            />
            Définir un Budget pour la liste
          </div>
          <div style={{ display: !isBudgetChecked ? 'none' : 'block' }}>
            <span style={{ display: 'flex', alignItems: 'center' }}>
              <h2 style={{ marginRight: '10px' }}>Budget</h2>
              <input
                type="number"
                id="balanceInput"
                value={balanceInput}
                onChange={handleBalanceChange}
                placeholder="Votre Budget"
              />
              <button onClick={handleBalanceSubmit}>Valider</button>
            </span>
          </div>
        </div>

        {currentList.items.map((item) => (
          <ListEntry
            key={item.id}
            item={item}
            onRemove={() => removeItem(item.id)}
            onEdit={handleEditItem}
          />
        ))}

        {/* Balance Section */}
        <div
          className="balance-section"
          style={{ display: !isBudgetChecked ? 'none' : 'block' }}
        >
          <br />
          <p>
            <strong>Total à Dépenser :</strong> {totalPrice.toFixed(2)} FCFA
          </p>
          <p>
            <strong>Votre Budget : </strong>
            {userBalance.toFixed(2)} FCFA
          </p>

          {isBalanceSufficient ? (
            <p style={{ color: 'green' }}>Budget suffisant !</p>
          ) : (
            <p style={{ color: 'red' }}>Budget insuffisant.</p>
          )}
        </div>
      </div>
    </div>
  );
};

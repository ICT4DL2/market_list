import { useNavigate } from 'react-router-dom';
import { BigButton } from '../components/BigButton';
import { PlusCircle, ListFilterPlus, ArrowRight } from 'lucide-react';
import { List } from '../types';
import { useState } from 'react';

interface AccueilProps {
  lists: List[];
  setLists: React.Dispatch<React.SetStateAction<List[]>>;
}


export function Accueil({ lists, setLists }: AccueilProps) {
  const navigate = useNavigate();
  const [, setEditingList] = useState<List | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedListId, setSelectedListId] = useState('');
  const [newTitle, setNewTitle] = useState('');

  const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };
  

  const newList: List = {
    id: generateUUID(),//crypto.randomUUID(),
    title: `Liste du ${new Date().toLocaleDateString()}`,
    creation_date: new Date(),
    isBudgetChecked: false,
    items: [],
    totalPrice: 0,
  };
  const openCloneListModal = () => {
    setShowModal(true);
    setSelectedListId('');
    setNewTitle('');
  };
  

  const handleCreateNewList = () => {
 
    setLists(prev => [...prev, newList]);
    
    navigate(`/liste/${newList.id}`);
  };
  // Fonction pour supprimer une liste
const handleDeleteList = (listId: string) => {
  setLists(prevLists => prevLists.filter(list => list.id !== listId));
};
// Fonction pour modifier une liste
const handleEditList = (list: List) => {
  setEditingList(list); // Ouvre le formulaire d’édition avec les infos de cette liste;
};



const handleCreateFromAnotherList = () => {
  const sourceList = lists.find(l => l.id === selectedListId);
  if (!sourceList || newTitle.trim() === '') return;

  const newList: List = {
    ...sourceList,
    id: generateUUID(),
    title: newTitle.trim(),
    creation_date: new Date(),
    isBudgetChecked: false,
    
    items: sourceList.items.map(item => ({
      ...item,
      id: generateUUID()
    })),
    totalPrice: 0,
  };

  setLists(prev => [...prev, newList]);
  setShowModal(false);
};

  

  const handleNavigateToList = (id: string) => {
    navigate(`/liste/${id}`);
  };
  

  return (
    <div>
      <div className='section'>
        <h1 style={{textAlign:'center',}}>Bienvenue dans Market List 🛍️ !</h1>
      </div>

      <h2>Planifiez vos achat from now !</h2>
      <div className='flex-container'>
        <BigButton
          label='Créer une nouvelle liste vide'
          icon={PlusCircle}
          color='#ffa500'
          onClick={handleCreateNewList}
        />
        <BigButton
          label="Faire une liste à partir d'une autre"
          icon={ListFilterPlus}
          onClick={openCloneListModal}
        />
      </div>
      
      <h2>Browse your Recent Lists <ArrowRight /></h2>
      <div className="recent-lists">
        {lists.length === 0 ? (
          <p>Aucune liste encore créée.</p>
        ) : (
          lists.map((list) => (
            <div
              key={list.id}
              className="list-card"
              onClick={() => handleNavigateToList(list.id)}
            >
              <div>
                <h3>{list.title}</h3>
                <p>Créée le : {new Date(list.creation_date).toLocaleDateString()}</p>
                <p>{list.items.length} article(s)</p>
              </div>
              <div className="list-actions">
                <button className='main-button' onClick={() => handleEditList(list)}>Modifier</button>
                <button onClick={() => handleDeleteList(list.id)}>Supprimer</button>
                
              </div>
                 
            </div>
          ))
        )}
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Créer une liste à partir d'une autre</h2>
            <label>
              Liste source :
              <select
                value={selectedListId}
                onChange={(e) => setSelectedListId(e.target.value)}
              >
                <option value="">-- Choisir une liste --</option>
                {lists.map(list => (
                  <option key={list.id} value={list.id}>
                    {list.title}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Nouveau nom :
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Nom de la nouvelle liste"
              />
            </label>
            <button onClick={handleCreateFromAnotherList}>Créer</button>
            <button onClick={() => setShowModal(false)}>Annuler</button>
          </div>
        </div>
      )}

    </div>
  );
}

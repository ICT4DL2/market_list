import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  // États de la liste actuelle
  const [articles, setArticles] = useState([]);
  const [nom, setNom] = useState("");
  const [qte, setQte] = useState(1);
  const [prix, setPrix] = useState(0);
  const [unite, setUnite] = useState("kilo");
  const [budget, setBudget] = useState(0);
  const [creationDate, setCreationDate] = useState("");

  // Historique des listes validées
  const [historique, setHistorique] = useState([]);

  // Chargement des données actuelles et de l'historique au démarrage 
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("maListe"));
    if (saved) {
      setArticles(saved.articles);
      setCreationDate(saved.creationDate);
    }
    const hist = JSON.parse(localStorage.getItem("historiqueListes"));
    if (hist) {
      setHistorique(hist);
    }
  }, []);

  // Sauvegarde la liste actuelle à chaque modification
  useEffect(() => {
    localStorage.setItem("maListe", JSON.stringify({ articles, creationDate }));
  }, [articles, creationDate]);

  // Sauvegarde de l'historique
  useEffect(() => {
    localStorage.setItem("historiqueListes", JSON.stringify(historique));
  }, [historique]);

  // Calcul du total de la liste
  const total = articles.reduce(
    (sum, item) => sum + item.qte * item.prix,
    0
  );

  // Ajoute un article uniquement si le budget est défini et sera respecté
  const ajouterArticle = () => {
    if (budget <= 0) {
      alert("Veuillez définir votre budget pour ajouter des articles.");
      return;
    }
    if (!nom) return;
    const newArticleCost = Number(qte) * Number(prix);
    if (total + newArticleCost > budget) {
      alert("Ajout impossible : budget dépassé");
      return;
    }
    const article = { nom, qte: Number(qte), prix: Number(prix), unite };
    const newListe = [...articles, article];
    const date = creationDate || new Date().toLocaleString();
    setArticles(newListe);
    setCreationDate(date);
    // Réinitialisation du formulaire d'article
    setNom("");
    setQte(1);
    setPrix(0);
    setUnite("kilo");
  };

  // Validation de la liste : si le budget est respecté, on enregistre la liste dans l'historique et on vide l'actuelle
  const validerListe = () => {
    if (budget <= 0) {
      alert("Veuillez d'abord définir votre budget.");
      return;
    }
    if (total > budget) {
      alert("Budget dépassé, impossible de valider");
      return;
    }
    const validatedList = {
      id: Date.now(),
      articles,
      creationDate: new Date().toLocaleString(),
      budget,
    };
    setHistorique([...historique, validatedList]);
    // Vider la liste actuelle
    setArticles([]);
    setCreationDate("");
    alert("Liste validée et enregistrée !");
  };

  // Permet de charger une liste validée depuis l'historique
  const chargerListe = (id) => {
    const selectedList = historique.find((list) => list.id === id);
    if (selectedList) {
      setArticles(selectedList.articles);
      setCreationDate(selectedList.creationDate);
      setBudget(selectedList.budget);
    }
  };

  return (
    <div className="container">
      <h1>Liste de Marché</h1>
      
      {/* Section Budget toujours visible */}
      <div className="budget">
        <input
          type="number"
          placeholder="Définir votre budget"
          value={budget}
          onChange={(e) => setBudget(Number(e.target.value))}
        />
        {budget <= 0 && (
          <p className="budget-message">
            Veuillez définir un budget supérieur à 0 pour commencer.
          </p>
        )}
        <h2>Total: {total}</h2>
        <p>
          {total > budget && budget > 0 ? "Dépassement de budget" : "Budget OK"}
        </p>
      </div>

      {/* Affichage du formulaire d'ajout seulement si le budget est défini */}
      {budget > 0 && (
        <>
          <div className="form">
            <input
              type="text"
              placeholder="Nom de l'article"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
            />
            <div className="quantity">
              <input
                type="number"
                placeholder="Quantité"
                value={qte}
                onChange={(e) => setQte(e.target.value)}
              />
              <select value={unite} onChange={(e) => setUnite(e.target.value)}>
                <option value="sceau">sceau</option>
                <option value="kilo">kilo</option>
                <option value="sac">sac</option>
                <option value="litre">litre</option>
              </select>
            </div>
            <input
              type="number"
              placeholder="Prix"
              value={prix}
              onChange={(e) => setPrix(e.target.value)}
            />
            <button onClick={ajouterArticle}>Ajouter Article</button>
          </div>
          
          <div className="validation">
            <button
              className={total > budget ? "btn invalid" : "btn valid"}
              disabled={total > budget}
              onClick={validerListe}
            >
              Valider la liste
            </button>
          </div>
          
          {/* Affichage de la liste courante */}
          <div className="articles">
            <h2>Articles :</h2>
            {articles.length === 0 ? (
              <p>Aucun article ajouté</p>
            ) : (
              <ul>
                {articles.map((item, idx) => (
                  <li key={idx}>
                    {item.nom} - {item.qte} {item.unite} - Prix: {item.prix}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}

      {/* Historique des listes validées, visible même si budget n'est pas défini */}
      <div className="historique">
        <h2>Historique des listes validées :</h2>
        {historique.length === 0 ? (
          <p>Aucune liste validée</p>
        ) : (
          <ul>
            {historique.map((list) => (
              <li key={list.id} className="historique-item">
                <span>
                  {list.creationDate} - Total:{" "}
                  {list.articles.reduce(
                    (s, item) => s + item.qte * item.prix,
                    0
                  )}
                </span>
                <button onClick={() => chargerListe(list.id)}>
                  Charger
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import getMonth from '../../helpers/Date';
import "./style.scss";


const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  );
  const nextCard = () => {
    // Vérifie si byDateDesc est défini avant d'exécuter le setTimeout
    if (byDateDesc) {
      setTimeout(
        // correction ajout de -1 pour éviter l'erreur de l'index
        () => setIndex(index < byDateDesc.length - 1 ? index + 1 : 0),
        5000
      );
    }
  };
  // Utiliser useEffect pour appeler nextCard à chaque changement de slide
  useEffect(() => {
    nextCard();
  }, [index, byDateDesc]); // Ajout des dépendances pour éviter les rendus inutiles de nextCard
  
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event,idx) => ( // Utilise la méthode map pour parcourir le tableau byDateDesc
          <div key={event.title}>  {/* Conteneur pour chaque carte avec une clé unique basée sur le titre de l’événement */} 
            <div className={`SlideCard SlideCard--${
                index === idx ? "display" : "hide"}`}>
              <img src={event.cover} alt="forum" />
              <div className="SlideCard__descriptionContainer">
                <div className="SlideCard__description">
                  <h3>{event.title}</h3>
                  <p>{event.description}</p>
                  <div>{getMonth(new Date(event.date))}</div>
                </div>
              </div>
            </div>
            <div className="SlideCard__paginationContainer">
              <div className="SlideCard__pagination">
                {byDateDesc.map((radioDot, radioIdx) => ( // Parcourt le tableau byDateDesc et crée des boutons radio pour chaque élément.
                  <input
                    key={`${radioDot.title}`} // Crée un bouton radio pour chaque élément, avec l’attribut checked défini si l’index correspond à radioIdx, et rend le champ en lecture seule
                    type="radio"
                    name="radio-button"
                    checked={index === radioIdx} // correction idx vers index
                    readOnly
                  />
                ))}
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Slider;

import { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";
import "./style.css";

const PER_PAGE = 9;

const EventList = () => {
  const { data, error } = useData(); // Récupération des données et des erreurs via le hook useData
  const [type, setType] = useState(); // État pour stocker le type d'événement sélectionné
  const [currentPage, setCurrentPage] = useState(1); // État pour stocker la page actuelle

  // Ajout d'une logique pour filtrer les événements par type en fonction de la valeur de l'input
  const events = type
    ? data?.events.filter((event) => event.type === type) // Filtrage des événements par type si un type est sélectionné
    : data?.events; // Sinon, utilisation de tous les événements

  // Filtrage des événements pour la pagination
  const filteredEvents = (events || []).filter((event, index) => {
    if (
      (currentPage - 1) * PER_PAGE <= index &&
      PER_PAGE * currentPage > index
    ) {
      return true;
    }
    return false;
  });

  const changeType = (evtType) => {
    setCurrentPage(1);
    setType(evtType);
  };

  const pageNumber = events ? Math.ceil(events.length / PER_PAGE) : 0; // Calcul du nombre de pages en fonction du nombre d'événements filtrés
  const typeList = new Set(data?.events.map((event) => event.type));

  return (
    <>
      {error && <div>An error occured</div>}
      {data === null ? (
        "loading"
      ) : (
        <>
          <h3 className="SelectTitle">Catégories</h3>
          <Select
            selection={Array.from(typeList)}
            onChange={(value) => (value ? changeType(value) : changeType(null))}
          />
          <div id="events" className="ListContainer">
            {filteredEvents.map((event) => (
              <Modal key={event.id} Content={<ModalEvent event={event} />}>
                {({ setIsOpened }) => (
                  <EventCard
                    onClick={() => setIsOpened(true)}
                    imageSrc={event.cover}
                    title={event.title}
                    date={new Date(event.date)}
                    label={event.type}
                  />
                )}
              </Modal>
            ))}
          </div>
          {/* Affichage de la pagination seulement s'il y a plus d'une page */}
          {pageNumber > 1 && filteredEvents.length > 0 && (
            <div className="Pagination">
              {[...Array(pageNumber || 0)].map((_, n) => (
                // eslint-disable-next-line react/no-array-index-key
                <a key={n} href="#events" onClick={() => setCurrentPage(n + 1)} className={currentPage === n + 1 ? "active" : ""}
                >
                  {n + 1}
                </a>
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default EventList;

import PropTypes from "prop-types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const DataContext = createContext({});

export const api = {
  loadData: async () => {
    const json = await fetch("/events.json");
    return json.json();
  },
};

export const DataProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [last, setLast] = useState(null); // Déclare un état 'last' initialisé à 'null' et une fonction 'setLast' pour mettre à jour cet état
  const getData = useCallback(async () => {
    try {
      const loadData = await api.loadData(); // Charge les données depuis l'API
      setData(loadData); // Met à jour l'état 'data' avec les données chargées
      setLast(loadData.events[loadData.events.length - 1]); // Met à jour l'état 'last' avec le dernier événement des données chargées
    } catch (err) {
      setError(err); // Met à jour l'état 'error' en cas d'erreur lors du chargement des données
    }
  }, []);  // Utilise useCallback pour éviter de recréer la fonction à chaque rendu
  useEffect(() => {
    if (data) return; // Si 'data' existe, ne charge pas les données
    getData(); // Appelle la fonction 'getData' pour charger les données
  }, [data, getData]); // Utilise useEffect pour charger les données au montage du composant et lorsque 'data' ou 'getData' changent

  return (
    <DataContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        data,
        error,
        last,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export const useData = () => useContext(DataContext);

export default DataContext;

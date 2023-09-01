import { createContext, useContext, useEffect, useReducer } from "react";

// CITIES API LINK
const BASE_URL = "http://localhost:8000";

const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

// reducer function
function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };

    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };

    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };

    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };

    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case "city/loaded":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };

    default:
      throw new Error("Unkown action type");
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  // cities state
  // const [cities, setCities] = useState([]);
  // isLoading state
  // const [isLoading, setIsLoading] = useState(false);
  // useState to get current city
  // const [currentCity, setCurrentCity] = useState({});

  // fecth cities data
  useEffect(function () {
    async function fetchCities() {
      dispatch({ type: "loading" });

      try {
        // setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        // setCities(data);
        dispatch({ type: "cities/loaded", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was an error loading data...",
        });
      }
    }
    fetchCities();
  }, []);

  // Fetch current city data
  async function getCity(id) {
    if (id === currentCity.id) return;

    dispatch({ type: "loading" });

    try {
      // setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      // setCurrentCity(data);
      dispatch({ type: "city/loaded", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error loading data...",
      });
    }
  }

  async function createCity(newCity) {
    dispatch({ type: "loading" });

    try {
      // setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      // setCities((cities) => [...cities, data]);
      dispatch({ type: "city/created", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error loading data...",
      });
    }
  }

  // async function deleteCity(id) {
  //   dispatch({ type: "loading" });

  //   try {
  //     // setIsLoading(true);
  //     await fetch(`${BASE_URL}/cities/${id}`, {
  //       method: "DELETE",
  //     });

  //     // setCities((cities) => cities.filter((city) => city.id !== id));
  //     dispatch({ type: "city/deleted", payload: id });
  //   } catch {
  //     dispatch({ type: "rejected", payload: "There was an error deleting..." });
  //   }
  // }

  async function deleteCity(id) {
    dispatch({ type: "loading" });

    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });

      dispatch({ type: "city/deleted", payload: id });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error deleting the city...",
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        error,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside the CitiesProvider");
  return context;
}

export { CitiesProvider, useCities };

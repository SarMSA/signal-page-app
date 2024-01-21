import { createContext, useContext, useMemo, useReducer } from "react";
import Firestore from "../handlers/firestore";
import { photos } from "../data";

export const Context = createContext();
const { readDoc } = Firestore;
// setting the initialState value:
const initialState = {
  items: photos,
  searchItems: photos,
  count: photos.length,
  input: { title: null, file: null, path: null },
  isCollapse: false,
};

const onChangeValue = (state, e) => {
  if (e.target.name === "file") {
    return {
      ...state.input,
      file: e.target.files[0],
      path: URL.createObjectURL(e.target.files[0]),
    };
  } else {
    return { ...state.input, title: e.target.value };
  }
};

// setting the reducer function:
const reducer = (state, action) => {
  switch (action.type) {
    case "setItem":
      return {
        ...state, //update the current state
        items: [state.input, ...state.items], //update the current collection of items with a new element.ex: there is new object merged with the current state of items
        searchItems: [state.input, ...state.items],
        input: { title: null, file: null, path: null },
        count: state.items.length + 1,
      };
    case "setItems":
      return {
        ...state, //update the current state
        items: action.payload.items,
        searchItems: action.payload.items,
      };
    case "filteredItems":
      return {
        ...state,
        items: action.payload.results,
      };
    case "setInput":
      return {
        ...state,
        input: onChangeValue(state, action.payload.value),
      };
    case "collapse":
      return {
        ...state,
        isCollapse: action.payload.bool,
      };
    default:
      return state;
  }
};

export default function Provider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const read = async () => {
    const items = await readDoc("stocks");
    dispatch({ type: "setItems", payload: { items } });
  };
  const filterSearch = (input) => {
    if (input === "" || !!input) {
      dispatch({ type: "setItems", payload: { items: state.searchItems } });
    }
    let searchList = state.searchItems.flat();
    let results = searchList.filter((item) => {
      const title = item.title.toLowerCase();
      const searchItem = input.toLowerCase();

      return title.indexOf(searchItem) > -1;
    });
    dispatch({ type: "filteredItems", payload: { results } });
  };
  const value = useMemo(() => {
    return {
      state,
      dispatch,
      read,
      filterSearch,
    };
  }, [state, dispatch, read, filterSearch]);
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export const useFirebaseContext = () => {
  return useContext(Context);
};

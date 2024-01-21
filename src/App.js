import Card from "./components/Card";
import { useMemo, useContext, useEffect } from "react";
import { Context } from "./context/FirebaseContext";
import { useAuthContext } from "./context/AuthContext";
import List from "./components/List";

function App() {
  // const [state, dispatch] = useReducer(reducer, initialState);
  const { state } = useContext(Context);
  // const { authethy } = useAuthContext();

  const count = useMemo(() => {
    return `you have ${state.items.length} image${
      state.items.length > 1 ? "s" : ""
    }`;
  }, [state.items]);

  // useEffect(() => {
  //   read();
  //   authethy();
  // }, []);

  return (
    <>
      <h1 className="mb-4">Gallary</h1>
      <small className="align-self-start mt-4">{count}</small>
      <List items={state.items} />
    </>
  );
}

export default App;

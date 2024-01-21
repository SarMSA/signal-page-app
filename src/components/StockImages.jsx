import React, { useMemo } from "react";
import List from "./List";
import { useFirebaseContext } from "../context/FirebaseContext";
import { useAuthContext } from "../context/AuthContext";

export default function StockImages() {
  const { state } = useFirebaseContext();
  const { currentUser } = useAuthContext();

  const items = useMemo(() => {
    const filtered = state.items.filter((item) => {
      const username = currentUser?.displayName.split(" ").join("");
      return item.user === username?.toLowerCase();
    });
    return currentUser ? filtered : [];
  }, [state.items, currentUser]);

  return (
    <>
      <h1>My Stock Images</h1>
      <List items={items} />
    </>
  );
}

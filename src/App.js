import { useState } from "react";
import { RootContext } from "./contexts/rootContext";

function App() {
  const [state, setState] = useState({})
  return (
    <RootContext.Provider>

    </RootContext.Provider>
  );
}

export default App;

import { useState } from "react";

export const useHome = () => {
  const [state, setState] = useState(null);
  return { state, setState };
};

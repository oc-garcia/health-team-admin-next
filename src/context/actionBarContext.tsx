import { createContext, useState, useContext } from "react";

interface ActionBarType {
  isTableView: boolean;
  handleSetIsTableView: (value: boolean) => void;
}

export const ActionBarContext = createContext<ActionBarType | undefined>(undefined);

export const ActionBarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isTableView, setIsTableView] = useState(true);

  const handleSetIsTableView = (value: boolean) => {
    setIsTableView(value);
  };

  return (
    <ActionBarContext.Provider value={{ isTableView, handleSetIsTableView }}>{children}</ActionBarContext.Provider>
  );
};

export const useActionBarContext = () => {
  const context = useContext(ActionBarContext);
  if (!context) {
    throw new Error("useActionBarContext must be used within a ActionBarProvider");
  }
  return context;
};

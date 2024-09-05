import React, {createContext, useCallback, useContext, useState} from 'react';

type Props = {
  children: JSX.Element;
};

const BottomSheetContext = createContext({
  isOpen: true,
  openBottomSheet: () => {},
  closeBottomSheet: () => {},
});

// Define your context provider component
const BottomSheetProvider = ({children}: Props) => {
  const [isOpen, setIsOpen] = useState(true);
  const openBottomSheet = useCallback(() => {
    setIsOpen(true);
  }, []);
  const closeBottomSheet = useCallback(() => {
    setIsOpen(false);
  }, []);

  const contextValue = {
    isOpen,
    openBottomSheet,
    closeBottomSheet,
  };

  return (
    <BottomSheetContext.Provider value={contextValue}>
      {children}
    </BottomSheetContext.Provider>
  );
};

// Define the custom hook to access the context
export const useBottomSheet = () => {
  return useContext(BottomSheetContext);
};

export default BottomSheetProvider;

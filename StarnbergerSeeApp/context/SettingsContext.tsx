import React, { createContext, useContext, useState, ReactNode } from "react";

interface SettingsContextProps {
  isAlertEnabled: boolean;
  setIsAlertEnabled: (value: boolean) => void;
  isVibrationEnabled: boolean;
  setIsVibrationEnabled: (value: boolean) => void;
  isDemoEnabled: boolean;
  setIsDemoEnabled: (value: boolean) => void;
}

const SettingsContext = createContext<SettingsContextProps | undefined>(
  undefined
);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [isAlertEnabled, setIsAlertEnabled] = useState(false);
  const [isVibrationEnabled, setIsVibrationEnabled] = useState(false);
  const [isDemoEnabled, setIsDemoEnabled] = useState(false);

  return (
    <SettingsContext.Provider
      value={{
        isAlertEnabled,
        setIsAlertEnabled,
        isVibrationEnabled,
        setIsVibrationEnabled,
        isDemoEnabled,
        setIsDemoEnabled,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};

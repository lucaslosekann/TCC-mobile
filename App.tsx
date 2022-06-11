import React from 'react';
import { AuthProvider } from './src/components/AuthContext';
import { useFonts } from "expo-font";
import { Nunito_600SemiBold, Nunito_700Bold, Nunito_800ExtraBold } from "@expo-google-fonts/nunito";

import Routes from "./src/routes"

const App: React.FC = () => {
  const [fontsLoaded] = useFonts({
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold
  });

  if(!fontsLoaded) {
    return null;
  }

  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;
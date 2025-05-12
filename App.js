// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper'; // Proveedor de tema para React Native Paper
import AppNavigator from './src/navigation/AppNavigator'; // Tu navegador
import { TaskProvider } from './src/context/TaskContext'; // Tu proveedor de contexto
import { ColorPalette } from './src/components/ColorPalette'; // Para el tema (opcional)

// Opcional: Configura un tema para React Native Paper si lo deseas
// const theme = {
//   ...DefaultTheme, // o MD3DarkTheme
//   colors: {
//     ...DefaultTheme.colors,
//     primary: ColorPalette.primary,
//     accent: ColorPalette.secondary, // 'accent' puede ser 'secondary' en versiones más nuevas
//   },
// };

export default function App() {
  return (
    // Proveedor de React Native Paper para usar sus componentes
    <PaperProvider /* theme={theme} */>
      {/* Proveedor de Contexto para manejar el estado de las tareas */}
      <TaskProvider>
        {/* Contenedor de Navegación */}
        <NavigationContainer>
          {/* Tu Stack Navigator */}
          <AppNavigator />
        </NavigationContainer>
      </TaskProvider>
    </PaperProvider>
  );
}

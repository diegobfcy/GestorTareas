// src/navigation/AppNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/HomeScreen';
import { AddTaskScreen } from '../screens/AddTaskScreen';
import { EditTaskScreen } from '../screens/EditTaskScreen';
import { ColorPalette } from '../components/ColorPalette'; // Para estilos de header

const Stack = createNativeStackNavigator();

const AppNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: ColorPalette.primary, // Color de fondo del header
      },
      headerTintColor: 'white', // Color del texto y botones del header
      headerTitleStyle: {
        fontWeight: 'bold', // Estilo del título
      },
      headerTitleAlign: 'center', // Centrar título (opcional)
    }}
  >
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{ title: 'Mis Tareas' }} // Título para la pantalla principal
    />
    <Stack.Screen
      name="AddTask"
      component={AddTaskScreen}
      options={{ title: 'Nueva Tarea' }} // Título para añadir tarea
    />
    <Stack.Screen
      name="EditTask"
      component={EditTaskScreen}
      options={{ title: 'Editar Tarea' }} // Título para editar tarea
    />
  </Stack.Navigator>
);

export default AppNavigator;

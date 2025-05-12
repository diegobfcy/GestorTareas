// src/screens/HomeScreen.js
import React, { useState } from 'react';
import { View, FlatList, ActivityIndicator, Text as RNText } from 'react-native';
import { FAB, TextInput, Text as PaperText, useTheme } from 'react-native-paper';
import { TaskItem } from '../components/TaskItem';
import { styles as globalStyles } from '../styles'; // Estilos globales
import { ColorPalette } from '../components/ColorPalette';
import { useTaskContext } from '../context/TaskContext';

export  const HomeScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { tasks, loading, error, toggleTaskCompletion, deleteTask } = useTaskContext();
  const theme = useTheme(); // Para usar colores del tema si es necesario

  // Filtrar tareas basado en la búsqueda
  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // --- Renderizado Condicional ---

  // 1. Estado de Carga Inicial
  if (loading) {
    return (
      <View style={[globalStyles.container, globalStyles.centerContent]}>
        <ActivityIndicator size="large" color={ColorPalette.primary} />
        <PaperText style={{ marginTop: 15, color: ColorPalette.textSecondary }}>
          Cargando tareas...
        </PaperText>
      </View>
    );
  }

  // 2. Estado de Error al Cargar
  if (error) {
    return (
      <View style={[globalStyles.container, globalStyles.centerContent, globalStyles.emptyListContainer]}>
        <PaperText style={[globalStyles.emptyListText, { color: ColorPalette.danger, marginBottom: 5 }]}>
          Error al Cargar Tareas
        </PaperText>
        <PaperText style={[globalStyles.emptyListText, { fontSize: 14 }]}>
          Verifica tu conexión a internet e inténtalo de nuevo.
        </PaperText>
        {/* Aquí podrías añadir un botón para reintentar la carga si implementas esa lógica */}
      </View>
    );
  }

  // 3. No hay tareas (y no hay error, ni búsqueda activa que oculte todo)
  if (tasks.length === 0) {
    return (
      <View style={[globalStyles.container, globalStyles.centerContent, globalStyles.emptyListContainer]}>
        <PaperText style={globalStyles.emptyListText}>
          No tienes tareas pendientes.
        </PaperText>
        <PaperText style={[globalStyles.emptyListText, { fontSize: 14, marginTop: 5 }]}>
          ¡Crea una nueva con el botón +!
        </PaperText>
        <FAB
          style={globalStyles.fab}
          icon="plus"
          color="white" // Color del ícono
          // color={theme.colors.onPrimary} // Alternativa usando tema
          onPress={() => navigation.navigate('AddTask')}
          accessibilityLabel="Añadir nueva tarea"
        />
      </View>
    );
  }

  // 4. Hay tareas, se muestra la lista (filtrada o completa)
  return (
    <View style={globalStyles.container}>
      <TextInput
        label="Buscar tareas..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={globalStyles.searchInput}
        mode="outlined" // O 'flat'
        left={<TextInput.Icon icon="magnify" color={ColorPalette.iconDefault} />} // Ícono de búsqueda
        right={searchQuery ? <TextInput.Icon icon="close-circle" onPress={() => setSearchQuery('')} color={ColorPalette.iconDefault}/> : null} // Ícono para limpiar búsqueda
      />

      {filteredTasks.length > 0 ? (
        <FlatList
          data={filteredTasks}
          keyExtractor={(item) => item.id} // Firestore IDs son strings únicos
          renderItem={({ item }) => (
            <TaskItem
              task={item}
              onToggle={() => toggleTaskCompletion(item.id)}
              onEdit={() => navigation.navigate('EditTask', { task: item })} // Pasar la tarea completa
              onDelete={() => deleteTask(item.id)}
            />
          )}
          contentContainerStyle={globalStyles.taskList}
          keyboardShouldPersistTaps="handled" // Para que el teclado se oculte al hacer scroll
        />
      ) : (
        // Mensaje cuando la búsqueda no encuentra resultados pero sí hay tareas
        <View style={[globalStyles.centerContent, globalStyles.emptyListContainer, {paddingTop: 50}]}>
          <PaperText style={globalStyles.emptyListText}>
            No se encontraron tareas con "{searchQuery}".
          </PaperText>
        </View>
      )}

      <FAB
        style={globalStyles.fab}
        icon="plus"
        color="white"
        onPress={() => navigation.navigate('AddTask')}
        accessibilityLabel="Añadir nueva tarea"
      />
    </View>
  );
};

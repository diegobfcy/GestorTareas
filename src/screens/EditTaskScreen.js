// src/screens/EditTaskScreen.js
import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet as RNStyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView
} from 'react-native';
import { Text, TextInput, Button, Checkbox as PaperCheckbox, Snackbar } from 'react-native-paper';
import { styles as globalStyles } from '../styles';
import { ColorPalette } from '../components/ColorPalette';
import { useTaskContext } from '../context/TaskContext';

// Definición de prioridades (igual que en AddTaskScreen)
const PRIORITIES = [
  { label: 'Alta', value: 'high', color: ColorPalette.priorityHigh },
  { label: 'Media', value: 'medium', color: ColorPalette.priorityMedium },
  { label: 'Baja', value: 'low', color: ColorPalette.priorityLow },
];

export const EditTaskScreen = ({ route, navigation }) => {
  const { task } = route.params; // Recibe la tarea a editar

  // Estados inicializados con los datos de la tarea existente
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || '');
  const [completed, setCompleted] = useState(task.completed);
  const [priority, setPriority] = useState(task.priority || 'medium'); // Usa prioridad existente o default
  const [error, setError] = useState('');
  const [showSnackbar, setShowSnackbar] = useState(false);

  const { updateTask } = useTaskContext();

  // Actualizar la tarea
  const handleUpdate = () => {
    if (!title.trim()) {
      setError('El título es obligatorio');
      setShowSnackbar(true);
      Keyboard.dismiss();
      return;
    }

    // Llama a updateTask del contexto con el ID y los datos actualizados
    updateTask(task.id, {
      // No se pasa el ID aquí, ya es el primer argumento de updateTask
      title: title.trim(),
      description: description.trim(),
      completed,
      priority // Incluir la prioridad actualizada
    });

    navigation.goBack(); // Volver a la pantalla anterior
  };

  // Ocultar el teclado
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <ScrollView
        style={globalStyles.formContainer}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={globalStyles.screenTitle}>Editar Tarea</Text>

        {/* Checkbox para marcar como completada */}
        <PaperCheckbox.Item
          label="Marcar como completada"
          status={completed ? 'checked' : 'unchecked'}
          onPress={() => setCompleted(!completed)}
          color={ColorPalette.primary}
          labelStyle={globalStyles.checkboxLabel}
          style={localStyles.checkboxItem}
          position='leading' // Poner el checkbox antes del label
        />

        <TextInput
          label="Título *"
          value={title}
          onChangeText={setTitle}
          mode="outlined"
          style={globalStyles.input}
          error={error && !title.trim()}
          returnKeyType="next"
        />

        <TextInput
          label="Descripción (Opcional)"
          value={description}
          onChangeText={setDescription}
          mode="outlined"
          multiline
          numberOfLines={4}
          style={[globalStyles.input, globalStyles.descriptionInput]}
        />

        {/* Selector de Prioridad */}
        <Text style={localStyles.priorityLabel}>Prioridad:</Text>
        <View style={localStyles.prioritySelectorContainer}>
          {PRIORITIES.map((p) => (
            <TouchableOpacity
              key={p.value}
              style={[
                localStyles.priorityButton,
                priority === p.value && localStyles.priorityButtonSelected,
              ]}
              onPress={() => setPriority(p.value)}
              activeOpacity={0.7}
            >
              <View style={[localStyles.priorityColorCircle, { backgroundColor: p.color }]} />
              <Text
                style={[
                  localStyles.priorityButtonText,
                  priority === p.value && localStyles.priorityButtonTextSelected,
                ]}
              >
                {p.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ flex: 1 }} />

        <Button
          mode="contained"
          onPress={handleUpdate}
          style={globalStyles.saveButton}
          labelStyle={globalStyles.buttonLabel}
          buttonColor={ColorPalette.primary}
          textColor={"white"}
          icon="check" // Ícono de check para actualizar
        >
          Actualizar Tarea
        </Button>

        <Snackbar
          visible={showSnackbar}
          onDismiss={() => setShowSnackbar(false)}
          duration={3000}
          style={{ backgroundColor: ColorPalette.danger }}
          action={{
            label: 'CERRAR',
            textColor: 'white',
            onPress: () => setShowSnackbar(false),
          }}>
           <Text style={{ color: 'white' }}>{error}</Text>
        </Snackbar>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

// Estilos locales para EditTaskScreen (similares a AddTaskScreen)
const localStyles = RNStyleSheet.create({
  checkboxItem: {
    backgroundColor: 'transparent',
    paddingHorizontal: 0,
    marginBottom: 10, // Espacio debajo del checkbox
  },
  priorityLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: ColorPalette.text,
    marginBottom: 10,
    marginTop: 10,
  },
  prioritySelectorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  priorityButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: ColorPalette.borderColor,
  },
  priorityButtonSelected: {
    borderColor: ColorPalette.primary,
    backgroundColor: ColorPalette.primary + '1A',
  },
  priorityColorCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginRight: 6,
  },
  priorityButtonText: {
    fontSize: 14,
    color: ColorPalette.textSecondary,
  },
  priorityButtonTextSelected: {
    fontWeight: 'bold',
    color: ColorPalette.primary,
  },
});

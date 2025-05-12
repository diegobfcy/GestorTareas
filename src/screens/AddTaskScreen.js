// src/screens/AddTaskScreen.js
import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet as RNStyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView // Para permitir scroll si el contenido es mucho
} from 'react-native';
import { Text, TextInput, Button, Snackbar } from 'react-native-paper';
import { styles as globalStyles } from '../styles';
import { ColorPalette } from '../components/ColorPalette';
import { useTaskContext } from '../context/TaskContext';

// Definición de prioridades
const PRIORITIES = [
  { label: 'Alta', value: 'high', color: ColorPalette.priorityHigh },
  { label: 'Media', value: 'medium', color: ColorPalette.priorityMedium },
  { label: 'Baja', value: 'low', color: ColorPalette.priorityLow },
];

export const AddTaskScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium'); // Prioridad por defecto
  const [error, setError] = useState('');
  const [showSnackbar, setShowSnackbar] = useState(false);

  const { addTask } = useTaskContext();

  // Guardar la tarea
  const handleSave = () => {
    if (!title.trim()) {
      setError('El título es obligatorio');
      setShowSnackbar(true);
      Keyboard.dismiss(); // Ocultar teclado si hay error
      return;
    }
    addTask(title.trim(), description.trim(), priority);
    navigation.goBack(); // Volver a la pantalla anterior
  };

  // Ocultar el teclado
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      {/* ScrollView permite que el contenido se desplace si el teclado ocupa mucho espacio */}
      <ScrollView
        style={globalStyles.formContainer}
        contentContainerStyle={{ flexGrow: 1 }} // Para que el contenido se expanda si es necesario
        keyboardShouldPersistTaps="handled" // Maneja taps mientras el teclado está abierto
      >
        <Text style={globalStyles.screenTitle}>Nueva Tarea</Text>

        <TextInput
          label="Título *" // Indicar que es obligatorio
          value={title}
          onChangeText={setTitle}
          mode="outlined"
          style={globalStyles.input}
          autoFocus // Enfocar automáticamente este campo
          error={error && !title.trim()} // Mostrar error si existe y el campo está vacío
          returnKeyType="next" // Botón "Siguiente" en el teclado
          onSubmitEditing={() => { /* Podrías enfocar la descripción aquí si tuvieras una ref */ }}
        />

        <TextInput
          label="Descripción (Opcional)"
          value={description}
          onChangeText={setDescription}
          mode="outlined"
          multiline
          numberOfLines={4} // Sugerir altura inicial
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
              activeOpacity={0.7} // Feedback visual al presionar
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

        {/* Espacio antes del botón para que no quede pegado al teclado */}
        <View style={{ flex: 1 }} />

        <Button
          mode="contained"
          onPress={handleSave}
          style={globalStyles.saveButton}
          labelStyle={globalStyles.buttonLabel}
          buttonColor={ColorPalette.primary}
          textColor={"white"}
          icon="content-save" // Ícono para guardar
        >
          Guardar Tarea
        </Button>

        {/* Snackbar para mostrar errores */}
        <Snackbar
          visible={showSnackbar}
          onDismiss={() => setShowSnackbar(false)}
          duration={3000}
          style={{ backgroundColor: ColorPalette.danger }} // Fondo rojo para errores
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

// Estilos locales para AddTaskScreen
const localStyles = RNStyleSheet.create({
  priorityLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: ColorPalette.text,
    marginBottom: 10,
    marginTop: 10,
  },
  prioritySelectorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Distribuir uniformemente
    marginBottom: 30, // Más espacio abajo
  },
  priorityButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1.5, // Borde ligeramente más grueso
    borderColor: ColorPalette.borderColor,
  },
  priorityButtonSelected: {
    borderColor: ColorPalette.primary,
    backgroundColor: ColorPalette.primary + '1A', // Fondo muy sutil
  },
  priorityColorCircle: {
    width: 14, // Círculo un poco más pequeño aquí
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

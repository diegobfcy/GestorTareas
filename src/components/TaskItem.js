// src/components/TaskItem.js
import React from 'react';
import { View, StyleSheet as RNStyleSheet } from 'react-native';
import { Card, Text, Checkbox, IconButton } from 'react-native-paper';
import { ColorPalette } from './ColorPalette';

// Función helper para obtener el color de la prioridad
const getPriorityColor = (priority) => {
  switch (priority) {
    case 'high': return ColorPalette.priorityHigh;
    case 'medium': return ColorPalette.priorityMedium;
    case 'low': return ColorPalette.priorityLow;
    default: return null; // No mostrar si no hay prioridad
  }
};

export const TaskItem = React.memo(({ task, onToggle, onEdit, onDelete }) => {
  // Usar React.memo para optimizar el renderizado si las props no cambian
  const priorityColor = getPriorityColor(task.priority);

  return (
    <Card style={localStyles.taskCard}>
      <View style={localStyles.taskContent}>
        {/* Sección Izquierda: Prioridad y Checkbox */}
        <View style={localStyles.leftSection}>
          {priorityColor && (
            <View style={[localStyles.priorityIndicator, { backgroundColor: priorityColor }]} />
          )}
          <Checkbox
            status={task.completed ? 'checked' : 'unchecked'}
            onPress={onToggle}
            color={ColorPalette.primary}
            style={localStyles.checkbox}
          />
        </View>

        {/* Sección Central: Título y Descripción */}
        <View style={localStyles.taskTextContainer}>
          <Text
            style={[localStyles.taskTitle, task.completed && localStyles.completedTask]}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {task.title}
          </Text>
          {task.description ? ( // Mostrar descripción solo si existe
            <Text
              style={[localStyles.taskDescription, task.completed && localStyles.completedTaskDescription]}
              numberOfLines={3}
              ellipsizeMode="tail"
            >
              {task.description}
            </Text>
          ) : null}
        </View>

        {/* Sección Derecha: Acciones */}
        <View style={localStyles.taskActions}>
          <IconButton
            icon="pencil-outline" // Ícono de lápiz (outline)
            iconColor={ColorPalette.primary}
            size={22}
            onPress={onEdit}
            style={localStyles.actionButton}
            accessibilityLabel="Editar tarea" // Para accesibilidad
          />
          <IconButton
            icon="delete-outline" // Ícono de basura (outline)
            iconColor={ColorPalette.danger}
            size={22}
            onPress={onDelete}
            style={localStyles.actionButton}
            accessibilityLabel="Eliminar tarea" // Para accesibilidad
          />
        </View>
      </View>
    </Card>
  );
}); // Fin de React.memo

// Estilos locales para TaskItem
const localStyles = RNStyleSheet.create({
  taskCard: {
    marginVertical: 7, // Ligeramente menos espacio vertical
    marginHorizontal: 5,
    borderRadius: 10, // Bordes un poco menos redondeados
    elevation: 2, // Sombra sutil
    backgroundColor: ColorPalette.cardBackground,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
  },
  taskContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
    marginLeft: 4, // Espacio a la izquierda del círculo/checkbox
  },
  priorityIndicator: {
    width: 16, // Tamaño del círculo
    height: 16,
    borderRadius: 8,
    marginRight: 8, // Espacio entre círculo y checkbox
  },
  checkbox: {
    // Ajustes mínimos necesarios aquí, alineación manejada por el contenedor
  },
  taskTextContainer: {
    flex: 1, // Ocupa el espacio disponible
    justifyContent: 'center',
    // paddingRight: 5, // Pequeño espacio antes de los botones de acción
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '500', // Peso medio
    color: ColorPalette.text,
    marginBottom: 1,
  },
  taskDescription: {
    fontSize: 13, // Descripción un poco más pequeña
    color: ColorPalette.textSecondary,
    lineHeight: 17,
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: ColorPalette.textCompleted,
  },
  completedTaskDescription: {
    color: ColorPalette.textCompletedDesc,
    textDecorationLine: 'line-through',
  },
  taskActions: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginLeft: 'auto', // Dejar que flexbox maneje el espacio
  },
  actionButton: {
    margin: -4, // Reducir el espacio alrededor de los IconButton
    width: 40,  // Área táctil adecuada
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

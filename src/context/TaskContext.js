// src/context/TaskContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { Alert } from 'react-native';
import { db } from '../firebase/firebaseConfig'; // Ruta a tu configuración de Firebase
import {
  collection,
  addDoc,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  query,
  orderBy
} from "firebase/firestore";

const TaskContext = createContext();

export const useTaskContext = () => useContext(TaskContext);

// Referencia a la colección 'tasks' en Firestore
const tasksCollectionRef = collection(db, 'tasks');

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Estado para errores de carga

  // Efecto para suscribirse a los cambios en Firestore
  useEffect(() => {
    setLoading(true);
    setError(null);
    console.log('[TaskContext] Iniciando listener de Firestore para tareas...');
    // Consulta para obtener tareas ordenadas por fecha de creación descendente
    const q = query(tasksCollectionRef, orderBy('createdAt', 'desc'));

    // onSnapshot establece el listener en tiempo real
    const unsubscribe = onSnapshot(q,
      (querySnapshot) => { // Callback para datos/cambios exitosos
        const fetchedTasks = [];
        if (querySnapshot) {
          querySnapshot.forEach((documentSnapshot) => {
            fetchedTasks.push({
              id: documentSnapshot.id,
              ...documentSnapshot.data(),
            });
          });
        }
        setTasks(fetchedTasks); // Actualiza el estado local con las tareas
        setLoading(false); // Indica que la carga terminó
        setError(null);    // Limpia cualquier error previo
        console.log('[TaskContext] Tareas leídas/actualizadas desde Firestore:', fetchedTasks.length, 'tareas');
      },
      (err) => { // Callback para errores del listener
        console.error('[TaskContext] Error en onSnapshot de Firestore:', err);
        Alert.alert(
          'Error de Conexión',
          'No se pudieron cargar las tareas. Verifica tu conexión y configuración. Los cambios podrían no reflejarse.'
        );
        setError(err); // Guarda el error en el estado
        setLoading(false); // Indica que la carga terminó (con error)
      }
    );

    // Función de limpieza: se ejecuta cuando el componente se desmonta
    return () => {
      console.log('[TaskContext] Desuscribiendo listener de Firestore.');
      unsubscribe(); // Cancela la suscripción para evitar fugas de memoria
    }
  }, []); // El array vacío asegura que el efecto se ejecute solo al montar

  // --- Funciones CRUD ---

  // CREATE: Añadir una nueva tarea
  const addTask = async (title, description, priority) => {
    if (!title.trim()) {
      Alert.alert('Campo Requerido', 'El título de la tarea no puede estar vacío.');
      return;
    }
    console.log('[TaskContext] Intentando agregar tarea:', { title, description, priority });
    try {
      const newTaskData = {
        title: title.trim(),
        description: description.trim(),
        completed: false,
        createdAt: serverTimestamp(), // Timestamp del servidor
        priority: priority || 'medium', // Prioridad (default 'medium')
      };
      const docRef = await addDoc(tasksCollectionRef, newTaskData);
      console.log('[TaskContext] Tarea agregada con ID:', docRef.id);
    } catch (err) {
      console.error('[TaskContext] Error al agregar tarea a Firestore:', err);
      Alert.alert('Error', 'No se pudo agregar la tarea. Inténtalo de nuevo.');
    }
  };

  // UPDATE: Actualizar una tarea existente
  const updateTask = async (id, updatedData) => {
    if (!updatedData.title || !updatedData.title.trim()) {
        Alert.alert('Campo Requerido', 'El título de la tarea no puede estar vacío.');
        return;
    }
    console.log('[TaskContext] Intentando actualizar tarea ID:', id, 'con datos:', updatedData);
    const taskDocRef = doc(db, 'tasks', id);
    try {
      // Prepara los datos a actualizar
      const dataToUpdate = {
        title: updatedData.title.trim(),
        description: updatedData.description ? updatedData.description.trim() : '',
        completed: updatedData.completed, // Asegúrate que 'completed' esté en updatedData
        priority: updatedData.priority || 'medium', // Actualiza la prioridad
      };
      await updateDoc(taskDocRef, dataToUpdate);
      console.log('[TaskContext] Tarea actualizada con ID:', id);
    } catch (err) {
      console.error('[TaskContext] Error al actualizar tarea en Firestore:', err);
      Alert.alert('Error', 'No se pudo actualizar la tarea. Inténtalo de nuevo.');
    }
  };

  // DELETE: Eliminar una tarea
  const deleteTask = (id) => {
    Alert.alert(
      "Confirmar Eliminación",
      "¿Estás seguro de que quieres borrar esta tarea de forma permanente?",
      [
        { text: "Cancelar", style: "cancel", onPress: () => console.log('[TaskContext] Eliminación cancelada para tarea ID:', id) },
        {
          text: "Borrar",
          onPress: async () => {
            console.log('[TaskContext] Intentando borrar tarea ID:', id);
            const taskDocRef = doc(db, 'tasks', id);
            try {
              await deleteDoc(taskDocRef);
              console.log('[TaskContext] Tarea borrada con ID:', id);
            } catch (err) {
              console.error('[TaskContext] Error al borrar tarea de Firestore:', err);
              Alert.alert('Error', 'No se pudo borrar la tarea. Inténtalo de nuevo.');
            }
          },
          style: "destructive"
        }
      ],
      { cancelable: true }
    );
  };

  // UPDATE (Specific): Cambiar estado de completado
  const toggleTaskCompletion = async (id) => {
    console.log('[TaskContext] Intentando cambiar estado de completado para tarea ID:', id);
    const taskDocRef = doc(db, 'tasks', id);
    try {
      const taskToToggle = tasks.find(task => task.id === id);
      if (taskToToggle) {
        const newCompletedState = !taskToToggle.completed;
        await updateDoc(taskDocRef, {
          completed: newCompletedState,
        });
        console.log('[TaskContext] Estado de completado cambiado para tarea ID:', id, 'a', newCompletedState);
      } else {
        console.warn("[TaskContext] Tarea no encontrada en estado local para toggle:", id);
        Alert.alert('Error', 'No se encontró la tarea para actualizar. Intenta recargar.');
      }
    } catch (err) {
      console.error('[TaskContext] Error al cambiar estado de tarea en Firestore:', err);
      Alert.alert('Error', 'No se pudo cambiar el estado de la tarea. Inténtalo de nuevo.');
    }
  };

  // Valor proporcionado por el contexto
  const value = {
    tasks,
    loading,
    error,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

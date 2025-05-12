// src/styles.js
import { StyleSheet } from 'react-native';
import { ColorPalette } from './components/ColorPalette'; // Asegúrate que la ruta sea correcta

export const styles = StyleSheet.create({
  // Contenedores Generales
  container: {
    flex: 1,
    backgroundColor: ColorPalette.background,
    padding: 16, // Padding general para pantallas como HomeScreen
  },
  centerContent: {
    flex: 1, // Ocupa todo el espacio disponible
    justifyContent: 'center', // Centra contenido verticalmente
    alignItems: 'center', // Centra contenido horizontalmente
  },
  formContainer: {
    flex: 1, // Ocupa todo el espacio
    paddingHorizontal: 20, // Padding lateral en formularios
    paddingTop: 20,
    paddingBottom: 20, // Padding inferior
    backgroundColor: ColorPalette.background,
  },

  // Listas
  taskList: {
    paddingBottom: 90, // Espacio extra en el fondo para que el FAB no tape el último item
  },
  emptyListContainer: {
    flex: 1, // Para que ocupe espacio si la lista está vacía
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40, // Márgenes laterales para el texto
    marginTop: -50, // Ajuste para centrar mejor verticalmente
  },
  emptyListText: {
    textAlign: 'center',
    fontSize: 16,
    color: ColorPalette.textSecondary,
    lineHeight: 24,
  },

  // Botón Flotante (FAB)
  fab: {
    position: 'absolute', // Posición fija en la pantalla
    margin: 16, // Margen respecto a los bordes
    right: 10,  // Alineado a la derecha
    bottom: 15, // Alineado abajo
    backgroundColor: ColorPalette.primary,
    borderRadius: 28, // Para hacerlo circular
    elevation: 6, // Sombra en Android
    shadowColor: '#000', // Sombra en iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },

  // Formularios (Inputs, Botones, etc.)
  screenTitle: {
    fontSize: 24, // Tamaño del título de la pantalla
    fontWeight: 'bold',
    color: ColorPalette.text,
    marginBottom: 24, // Espacio debajo del título
    textAlign: 'center',
  },
  input: {
    marginBottom: 16, // Espacio debajo de cada input
    backgroundColor: ColorPalette.cardBackground, // Fondo blanco para inputs
  },
  descriptionInput: {
    minHeight: 100, // Altura mínima para descripción
    textAlignVertical: 'top', // Texto empieza arriba en multilínea
  },
  saveButton: {
    marginTop: 24, // Espacio arriba del botón principal del formulario
    paddingVertical: 8, // Padding vertical interno del botón
    borderRadius: 8, // Bordes redondeados
    elevation: 2, // Sombra ligera
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: '600', // Texto del botón en negrita
    letterSpacing: 0.5, // Espaciado ligero entre letras
  },
  searchInput: {
    marginBottom: 16, // Espacio debajo de la barra de búsqueda
    backgroundColor: ColorPalette.cardBackground,
  },
  checkboxLabel: { // Estilo para el label del Checkbox.Item
    color: ColorPalette.text,
    fontSize: 16,
  },

  // --- Puedes añadir más estilos globales aquí ---
});

import { create } from 'zustand';

// Define la estructura del estado para una alerta
interface Alert {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info'; // Diferentes tipos de alertas
}

interface AlertState {
  alerts: Alert[];
  addAlert: (message: string, type: Alert['type']) => void;
  removeAlert: (id: string) => void;
}

const useAlertStore = create<AlertState>((set) => ({
  alerts: [], // Inicialmente sin alertas

  // Función para agregar una alerta
  addAlert: (message: string, type: Alert['type']) => {
    const id = Math.random().toString(36).substr(2, 9); // Generar ID único para la alerta
    set((state) => ({
      alerts: [...state.alerts, { id, message, type }]
    }));

    // Remover la alerta automáticamente después de 5 segundos
    setTimeout(() => {
      set((state) => ({
        alerts: state.alerts.filter((alert) => alert.id !== id)
      }));
    }, 3000); // 5 segundos
  },

  // Función para remover una alerta manualmente
  removeAlert: (id: string) => {
    set((state) => ({
      alerts: state.alerts.filter((alert) => alert.id !== id)
    }));
  }
}));

export default useAlertStore;

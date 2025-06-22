import React from 'react';
import useAlertStore from '@/store/alerts';
import { FaCheckCircle, FaTimesCircle, FaInfoCircle, FaExclamationTriangle } from 'react-icons/fa';

const AlertProvider: React.FC = () => {
  const { alerts, removeAlert } = useAlertStore();

  const getAlertStyles = (type: "success" | "error" | "warning" | "info") => {
    switch (type) {
      case "success":
        return {
          bg: "bg-teal-500",
          icon: <FaCheckCircle className="w-5 h-5 mr-3" />
        };
      case "error":
        return {
          bg: "bg-red-500",
          icon: <FaTimesCircle className="w-5 h-5 mr-3" />
        };
      case "info":
        return {
          bg: "bg-gray-700",
          icon: <FaInfoCircle className="w-5 h-5 mr-3" />
        };
      case "warning":
        return {
          bg: "bg-yellow-500",
          icon: <FaExclamationTriangle className="w-5 h-5 mr-3" />
        };
      default:
        return {
          bg: "bg-gray-800",
          icon: <FaInfoCircle className="w-5 h-5 mr-3" />
        };
    }
  }

  return (
    <div className="fixed top-5 right-5 z-[1001] space-y-3">
      {alerts.map((alert) => {
        const styles = getAlertStyles(alert.type);
        return (
          <div 
            key={alert.id}
            className={`flex items-center text-white rounded-lg p-4 shadow-lg animate-fade-in-down ${styles.bg}`}
          >
            {styles.icon}
            <p>{alert.message}</p>
            <button
              onClick={() => removeAlert(alert.id)}
              className="ml-4 text-white hover:text-gray-200 transition-colors"
            >
              &times;
            </button>
          </div>
        )
      })}
    </div>
  );
};

export default AlertProvider;

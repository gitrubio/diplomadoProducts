import React from 'react';
import { Transition } from '@headlessui/react'; // Para animaciones opcionales
import useAlertStore from '@/store/alerts';
import { FaExclamationCircle, FaExclamationTriangle, FaInfoCircle } from 'react-icons/fa';

const AlertProvider: React.FC = () => {
  const { alerts, removeAlert } = useAlertStore();
  const alertIcon = (type: "success" | "error" | "warning" | "info") =>{
    switch (type) {
        case "warning":
            return <FaExclamationTriangle className="text-1xl"/>
    
        case "error":
            return <FaExclamationCircle className="text-1xl"/>
    
        case "success":
            return <FaInfoCircle className="text-1xl"/>
    
        default:
            return <FaInfoCircle className="text-1xl"/>
            ;
    }
  }
  return (
    <div className="fixed bottom-5 right-5 space-y-3 z-50">
      {alerts.map((alert) => (
          <div
            className={`animate__animated  animate__slideInRight animate__faster p-4 rounded-lg shadow-md text-white ${
              alert.type === 'success'
                ? 'bg-green-500'
                : alert.type === 'error'
                ? 'bg-red-500'
                : alert.type === 'warning'
                ? 'bg-yellow-500'
                : 'bg-blue-500'
            }`}
          >
            <div className="flex justify-between items-center gap-2">
            {alertIcon(alert.type)}
              <p>{alert.message}</p>
              <button
                className="ml-4 text-white"
                onClick={() => removeAlert(alert.id)}
              >
                &times;
              </button>
            </div>
          </div>
      ))}
    </div>
  );
};

export default AlertProvider;

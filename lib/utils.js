import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const formatearCantidad = (cantidad) => {
  return (
    cantidad.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }));
};

export const formatearFecha = (fecha) => {
  const fechaNueva = new Date(fecha.replace(/-/g, '/'));
  const opciones = {
    year: 'numeric',
    month: 'short',
    day: '2-digit'
  };

  return fechaNueva.toLocaleDateString('en-US', opciones);
};

export const formatTimeAgo = (fecha) => {
  const currentDate = new Date();
  const createdDate = new Date(fecha);
  const timeDifference = currentDate - createdDate;
  const minutesAgo = Math.floor(timeDifference / (1000 * 60));
  const hoursAgo = Math.floor(minutesAgo / 60);

  if (minutesAgo < 1) {
    return 'few minutes ago';
  } else if (minutesAgo < 60) {
    return `${minutesAgo} minutes ago`;
  } else if (hoursAgo === 1) {
    return '1 hour ago';
  } else if (hoursAgo < 24) {
    return `${hoursAgo} hours ago`;
  } else {
    const opciones = {
      year: 'numeric',
      month: 'long',
      day: '2-digit'
    };

    return createdDate.toLocaleDateString('en-US', opciones);
  }
}

export const calcularDiasTranscurridos = (fechaInicioStr) => {
  const fechaInicio = new Date(fechaInicioStr.replace(/(\d{4})\/(\w{3})\/(\d{2})/, '$1 $2 $3'));
  const fechaActual = new Date();
  const diferenciaMillis = fechaActual - fechaInicio;
  const diasTranscurridos = Math.floor(diferenciaMillis / (1000 * 60 * 60 * 24));

  return diasTranscurridos;
}

export const calcularDiasrestantes = (fechaFinalStr) => {
  const fechaFinal = new Date(fechaFinalStr.replace(/(\d{4})\/(\w{3})\/(\d{2})/, '$1 $2 $3'));
  const fechaActual = new Date();
  const diferenciaMillis = fechaFinal - fechaActual;
  const diasRestantes = Math.floor(diferenciaMillis / (1000 * 60 * 60 * 24));

  return diasRestantes;
}

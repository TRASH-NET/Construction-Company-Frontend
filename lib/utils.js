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
    }));
};

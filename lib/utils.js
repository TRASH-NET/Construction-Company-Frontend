import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

function formatPhoneNumber(validatedPhoneNumber) {
  
  const parts = validatedPhoneNumber.split('-');

  // Formatear el número según las especificaciones
  const formattedNumber = `+${parts[0]} ${parts[1].slice(0, 3)}-${parts[1].slice(3, 7)}-${parts[1].slice(7)}`;

  return formattedNumber;
}

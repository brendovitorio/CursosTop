type ClassValue = 
  | string 
  | number 
  | boolean 
  | null 
  | undefined 
  | Record<string, boolean> 
  | ClassValue[];

export function cn(...inputs: ClassValue[]): string {
  return inputs
    .flatMap(input => {
      if (!input) return [];
      
      if (typeof input === 'string' || typeof input === 'number') {
        return input.toString();
      }
      
      if (Array.isArray(input)) {
        return input.filter(Boolean);
      }
      
      if (typeof input === 'object') {
        return Object.entries(input)
          .filter(([_, value]) => value)
          .map(([key]) => key);
      }
      
      return [];
    })
    .filter(Boolean)
    .join(' ');
}
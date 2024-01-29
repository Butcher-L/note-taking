function padWithZero(value: number, width: number): string {
    const paddedValue = value.toString().padStart(width, '0');
    return paddedValue;
  }
  
  let nextId = 1;
  
  export function generateUniqueId(): string {
    const now = new Date();
    const day = padWithZero(now.getDate(), 2);
    const month = padWithZero(now.getMonth() + 1, 2); 
    const year = now.getFullYear().toString().slice(-2); 
  
    const uniqueId = `${day}${month}${year}-ID${nextId++}`;
    return uniqueId;
  }
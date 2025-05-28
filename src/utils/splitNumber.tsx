export const convertNumber = (input: number): string => {
  const multipliedValue = input * 10000;
  return multipliedValue.toLocaleString("ru-RU");
};

// Пример использования в TypeScript:

export const convertNumberKm = (input: number): string => {
  const multipliedValue = input;
  return multipliedValue.toLocaleString("ru-RU");
};

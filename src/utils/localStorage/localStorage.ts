export const setItemLS = (name: string, payload: string): void => {
  window.localStorage.setItem(name, payload);
};

export const removeItemLS = (name: string): void => {
  window.localStorage.removeItem(name);
};

export const getItemLS = (name: string) => {
  return window.localStorage.getItem(name) || '';
};

export const setItemToLocalStorage = (key: string, value: any) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};
export const getItemFromLocalStorage = (key: string) => {
  try {
    const value = window.localStorage.getItem(key) as string;
    return JSON.parse(value);
  } catch (error) {
    console.log(error);
  }
};

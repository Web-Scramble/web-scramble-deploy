import { getItemFromLocalStorage } from "./localStorage"

 export const getToken = () => {
    return getItemFromLocalStorage("TOKEN")
}

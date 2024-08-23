// getDataUser.js
export function getDataUser() {
  const storedData = localStorage.getItem("dataUser");
  console.log("Datos obtenidos del localStorage:", storedData);
  if (storedData) {
    return JSON.parse(storedData);
  }

}
//récupération de l'id de la commande provenant du LS
const responseId = localStorage.getItem("responseId");

//Structure html de la page confirmation de commande
const positionElement = document.querySelector(".recapCommande");
console.log(positionElement)
const structureConfirmationCommande = `
<p>Votre commande n°: ${responseId} a bien été prise en compte `;

//injection HTML
positionElement.insertAdjacentHTML("beforebegin", structureConfirmationCommande);

//effacer tout le LS sauf le formulaire
function enleverCleLocalStorage(){
    localStorage.removeItem();
};
enleverCleLocalStorage("responseId");
enleverCleLocalStorage("products");
enleverCleLocalStorage("contact");

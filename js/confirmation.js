//récupération de l'id de la commande provenant du LS
const responseId = localStorage.getItem("responseId");

//Structure html de la page confirmation de commande
const positionElement = document.querySelector(".recapCommande");
console.log(positionElement)
const structureConfirmationCommande = `
    <p>Merci pour votre commande</p>
    <p>Votre commande n°: ${responseId} a bien été prise en compte
    <p>Au plaisir de vous revoir</p> 

`;

//injection HTML
positionElement.insertAdjacentHTML("beforebegin", structureConfirmationCommande);


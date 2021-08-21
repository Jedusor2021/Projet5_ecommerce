(async function() {
  const article_id = getArticleId()
  const article = await getArticle(article_id)
  hydrateArticle(article)    //on reprend la div mais on va changer le contenu// 
})()

function getArticleId() {
  return new URL(location.href).searchParams.get("_id")
}

function getArticle(article_id) {
  return fetch(`http://localhost:3000/api/teddies/${article_id}`)
  .then(function(httpBodyResponse) {
    return httpBodyResponse.json()
  })
  .then(function(articles) {
    return articles
  })
  .catch(function(error) {
    alert(error)
  })
}

function hydrateArticle(article) {
 
document.getElementById("img").src = article.imageUrl
document.getElementById("Name").textContent = article.name
document.getElementById("Price").textContent = `${article.price / 100}.00 €` 
document.getElementById("Description").textContent = article.description
}
console.log(article);

//---------------------------GESTION DU PANIER----------------------------
//récupération des données sélectionnées par l'utilisateur et envoie au panier
//sélection de l'id du formulaire
const idForm = document.querySelector("#option_article");

//Sélection du boutton ajouter l'article au panier
const btn_envoyerPanier = document.querySelector("#btn-envoyer");

//Ecouter le boutton et envoyer le panier
btn_envoyerPanier.addEventListener("click", (event)=>{
event.preventDefault();

//Mettre le choix de l'utilisateur dans une variable
const choixForm = idForm.Value;

//Récupération des valeurs du formulaire - clé + valeurs de la clé
let optionsProduit = {
  Name:article.name,
  price:`${article.price / 100}.00 €`,
  option_article:choixForm,
  quantite:1,
}
console.log(optionsProduit);
});

//------------------LOCAL STORAGE---------------------------------------
//----------stocker la récupération des valeurs du formulaire dans le LS

//Déclaration d'une variable "produitEnregistreDansLocalStorage"
let produitEnregistreDansLocalStorage = JSON.parse(localStorage.getItem("article"));
//parse = convertir du JS en objet JSON


//s'il y a déjà des produits dans le LS
if(produitEnregistreDansLocalStorage){
  produitEnregistreDansLocalStorage.push(article);
  localStorage.setItem("article", JSON.stringify(produitEnregistreDansLocalStorage));
  //popupConfirmation();
}
//s'il n'y a pas de produit dans LS
else{
  produitEnregistreDansLocalStorage = [];
  produitEnregistreDansLocalStorage.push(article);
  localStorage.setItem("article", JSON.stringify(produitEnregistreDansLocalStorage));
  //popupConfirmation();
}
console.log(produitEnregistreDansLocalStorage);


(async function() {
  const article_Id = getArticleId()
  const article = await getArticle(article_Id)
  hydrateArticle(article)    //on reprend la div mais on va changer le contenu
})()

function getArticleId() {
  return new URL(location.href).searchParams.get("_id")
}

function getArticle(article_Id) {
  return fetch(`http://localhost:3000/api/teddies/${article_Id}`)
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
document.getElementById("_id").textContent = article._id
}


//---------------------------GESTION DU PANIER----------------------------
//récupération des données sélectionnées par l'utilisateur et envoie au panier
//sélection de l'id du formulaire
const idForm = document.querySelector("#option_article");

//Sélection du boutton ajouter l'article au panier
const btn_envoyerPanier = document.querySelector("#btn-envoyer");

//ECOUTER LE BOUTTON ET ENVOYER LE PANIER------------------------
btn_envoyerPanier.addEventListener("click", (event)=>{
event.preventDefault();

//Mettre le choix de l'utilisateur dans une variable
const choixForm = idForm.value;

//Récupération des valeurs du formulaire - clé + valeurs de la clé
let optionsProduit = {
  Name:document.getElementById('Name').innerHTML,
  price:document.getElementById('Price').innerHTML,
  option_article:choixForm,
  quantite:1,
  _id:document.getElementById('_id').innerHTML,
  
}
console.log(optionsProduit);
//------------------LOCAL STORAGE---------------------------------------
//----------stocker la récupération des valeurs du formulaire dans le LS

//Déclaration d'une variable "produitEnregistreDansLocalStorage"
let produitEnregistreDansLocalStorage = JSON.parse(localStorage.getItem("article"));
//parse = convertir du JS en objet JSON

//s'il y a déjà des produits dans le LS
if(produitEnregistreDansLocalStorage){
  produitEnregistreDansLocalStorage.push(optionsProduit);
  localStorage.setItem("article", JSON.stringify(produitEnregistreDansLocalStorage));
}
//s'il n'y a pas de produit dans LS
else{
  produitEnregistreDansLocalStorage = [];
  produitEnregistreDansLocalStorage.push(optionsProduit);
  localStorage.setItem("article", JSON.stringify(produitEnregistreDansLocalStorage));
  }
  
});


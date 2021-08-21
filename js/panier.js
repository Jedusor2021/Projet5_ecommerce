//Déclaration d'une variable "produitEnregistreDansLocalStorage"
let produitEnregistreDansLocalStorage = JSON.parse(localStorage.getItem("article"));
//parse = convertir du JS en objet JSON

//------------------AFFICHAGE DES PRODUITS DU PANIER--------------------
//Sélection de la classe où injecter le code HTML-------------------------
const positionElement3 = document.querySelector("#container-produits-panier");

//si le panier est vide : afficher le panier est vide
if(produitEnregistreDansLocalStorage === null || produitEnregistreDansLocalStorage == 0){
const panierVide = `
<div class="container-panier-vide">
    <div>Le panier est vide</div>
</div>
`;
positionElement3.innerHTML = panierVide;
//si le panier n'est pas vide
}else{
let structureProduitPanier = [];
for(k = 0; k < produitEnregistreDansLocalStorage.length; k++){ 

    structureProduitPanier = structureProduitPanier + ` 
    <div class="container-recapitulatif">
        <div>Quantité - ${produitEnregistreDansLocalStorage[k].name} Options : ${produitEnregistreDansLocalStorage[k].option_produit}</div>
        <div>${produitEnregistreDansLocalStorage[k].price} € - <button class="btn-supprimer"> supprimer </button></div>
    </div> 
    `;}
    if(k === produitEnregistreDansLocalStorage.lenght) { 
    //injection html dans la page panier
    positionElement3.innerHTML = structureProduitPanier;
}
}

//-----------------------GESTION DU BTN SUPPRIMER L'ARTICLE--------------
//Sélection des références de tous les bouttons btn-supprimer
let btn_supprimer = document.querySelectorAll(".btn-supprimer");
 for (let l = 0; 1 < btn_supprimer.length; 1++){
     btn_supprimer[1].addEventListener("click" , (event) =>{
        event.preventDefault();

    //Sélection de l'id du produit qui va être supprimé en cliquant sur le bouton
    let id_selectionner_suppression = 
    produitEnregistreDansLocalStorage[l]._id;
    
    //Methode filter, suppression des éléments
    produitEnregistreDansLocalStorage = produitEnregistreDansLocalStorage.filter( 
        (el) => el._id !== id_selectionner_suppression
    );
    //envoyer la variable dans le LS
    localStorage.setItem( 
        "article",
        JSON.stringify(produitEnregistreDansLocalStorage)
    );
    //alerte ppour avertir que le produit a été supprimé de la page
    alert("ce produit a été supprimé du panier");
    window.location.href = "panier.html";
});
 }

//-----------------------------MONTANT TOTAL DU PANIER----------------------
//Déclaration de la variable pour pouvoir y mettre les prix qui sont dans le panier
let prixTotalCalcul = [];

//Aller chercher les prix dans le panier
for(let m = 0; m < produitEnregistreDansLocalStorage.lenght; m++) {
    let prixProduitPanier = produitEnregistreDansLocalStorage[m].price;

    //mettre les prix du panier dans la variable prixProduitPanier
    prixTotalCalcul.push(prixProduitPanier)

    //additionner les prix avec la méthode reduce
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const prixTotal = prixTotalCalcul.reduce(reducer, 0);

    //code HTML du prix total affiché
    const affichagePrixhtml = `
    <div class="affichagePrixhtml">Le prixtotal est de : ${prixTotal} € </div>
    `
    //injection html dans la page panier
    positionElement3.innerHTML("beforeend", affichagePrixhtml);

}
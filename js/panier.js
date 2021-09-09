//Déclaration d'une variable "produitEnregistreDansLocalStorage"
let produitEnregistreDansLocalStorage = JSON.parse(localStorage.getItem("article"));
//parse = convertir du JS en objet JSON

//------------------AFFICHAGE DES PRODUITS DU PANIER--------------------

//Sélection de la classe où injecter le code HTML
const positionElement3 = document.querySelector("#container-produits-panier");

//si le panier est vide : afficher le panier est vide
if(produitEnregistreDansLocalStorage === null){
const panierVide = `
<div class="container-panier-vide">
    <div>Le panier est vide</div>
</div>
`; 
positionElement3.innerHTML = panierVide;
//si le panier n'est pas vide
}
else{
let structureProduitPanier = [];

for(l = 0; l < produitEnregistreDansLocalStorage.length; l++){ 
    structureProduitPanier = 
        structureProduitPanier + ` 
        <div class="container-recapitulatif">
          <div>Quantité 1 - ${produitEnregistreDansLocalStorage[l].Name}</div>
          <div>${produitEnregistreDansLocalStorage[l].price} - <button class="btn-supprimer"> supprimer </button></div>
        </div> 
    `; 
    }
    if(l == produitEnregistreDansLocalStorage.length) { 
    //injection html dans la page panier
    positionElement3.innerHTML = structureProduitPanier;
  }
}
//--------------------------------fin affichage panier-----------------------

//***************************MONTANT TOTAL DU PANIER************************

//Déclaration de la variable pour pouvoir y mettre les prix qui sont dans le panier
let prixTotalCalcul = [];

//Aller chercher les prix dans le panier
for(let m = 0; m < produitEnregistreDansLocalStorage.length; m++){
let prixProduitPanier = produitEnregistreDansLocalStorage[m].price;
    
//mettre les prix du panier dans la variable prixProduitPanier
prixTotalCalcul.push(prixProduitPanier)
}
//additionner les prix avec la méthode reduce
const reducer = (accumulator, currentValue) => accumulator + parseFloat(currentValue);
const prixTotal = prixTotalCalcul.reduce(reducer, 0);

//code HTML du prix total affiché
const affichagePrixhtml = `
    <div class="affichage-Prix-html">Le prix total est de : ${prixTotal} €</div>
    `;
//injection html dans la page panier
positionElement3.insertAdjacentHTML("beforeend", affichagePrixhtml);
    

//----------------------------fin calcul du montant total---------------

//*****************************FORMULAIRE DE COMMANDE***************** */
const afficherFormulaireHtml = () => {
//Sélection élément du DOM pour le positionnement du formulaire
    const positionElement4 = document.querySelector("#container-produits-panier");
    
    const structureFormulaire = `  
    <div id="formulaireCommande">
        <h5>Remplissez le formulaire pour valider la commande</h5>
    
    <form>
        <label for="prenom">Prénom :</label>
        <input type="text" id="prenom" name="prenom" required>

        <label for="nom">Nom :</label>
        <input type="text" id="nom" name="nom" required>

        <label for="adresse">Adresse :</label>
        <textarea id="adresse" name="adresse" required></textarea>

        <label for="ville">Ville :</label>
        <input type="text" id="ville" name="ville" required>

        <label for="cp">Code Postal :</label>
        <input type="text" id="cp" name="cp" required>

        <label for="email">email :</label>
        <input type="text" id="email" name="email" required>

        <button id="envoyerFormulaire" type="submit" name="envoyerFormulaire">Confirmation de la commande</button>
    </form>
    </div>
     `;
     //injection HTML
     positionElement4.insertAdjacentHTML("afterend", structureFormulaire);
};
    //Affichage du formulaire
    afficherFormulaireHtml();

    //Selection du bouton envoyer le fomulaire
    const btnEnvoyerFormulaire = document.querySelector("#envoyerFormulaire");

//----------------------addEventListener------------------------------
    btnEnvoyerFormulaire.addEventListener("click", (e)=>{ 
    e.preventDefault();

    //Récupération des valeurs du formulaire
    const formulaireValues = {
        prenom:document.querySelector("#prenom").value,
        nom:document.querySelector("#nom").value,
        adresse:document.querySelector("#adresse").value,
        cp:document.querySelector("#cp").value,
        ville:document.querySelector("#ville").value,
        email:document.querySelector("#email").value
    }

//****************GESTION ET VALIDATION DU FORMULAIRE****************** */

    const textAlert = (value) =>{
        return `${value} :chiffre et symbole ne sont pas autorisés \n Ne pas dépasser 20 caractères`;
    }
    const regExPrenomNomVille = (value) =>{
        return /^[A-Za-z\s]{3,20}$/.test(value);
    }
    const regExCp = (value) =>{
        return /^[0-9]{5}$/.test(value);
    } 
    const regExAdresse = (value) =>{
        return /^[A-Za-z0-9\s]{5,50}$/.test(value);
    }
    const regExEmail = (value) =>{
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
    }

    function prenomControle(){ 
    //contrôle de la validité du prénom
    const lePrenom = formulaireValues.prenom;
    if(regExPrenomNomVille(lePrenom)){
        return true;
    }else{
        alert(textAlert("prenom"));
        return false;
        }
    };
    function nomControle(){ 
        //contrôle de la validité du nom
        const leNom = formulaireValues.nom;
        if(regExPrenomNomVille(leNom)){
            return true;
        }else{
            alert(textAlert("nom"));
            return false;
        }
    };
    function adresseControle(){ 
        //contrôle de la validité de l'adresse
        const leAdresse = formulaireValues.adresse;
        if(regExAdresse(leAdresse)){
            return true;
        }else{
            alert("L'adresse ne doit contenir que des lettres sans ponctuation et des chiffres");
            return false;
        }
    };
    function villeControle(){ 
        //contrôle de la validité de la ville
        const laVille = formulaireValues.ville;
        if(regExPrenomNomVille(laVille)){
            return true;
        }else{
            alert(textAlert("ville"));
            return false;
        }
    };
    function cpControle(){ 
        //contrôle de la validité du CP
        const leCp = formulaireValues.cp;
        if(regExCp(leCp)){
            return true;
        }else{
            alert("cp : doit être composé de 5 chiffres");
            return false;
        }
    };
    function emailControle(){ 
        //contrôle de la validité de l'email
        const leEmail = formulaireValues.email;
        if(regExEmail(leEmail)){
            return true;
        }else{
            alert("email n'est pas valide");
            return false;
        }
    };
//Contrôle validité du formulaire avant envoi dans le LS
    if(prenomControle() && nomControle() && villeControle() && cpControle() && adresseControle() &&emailControle()){

//Mettre l'objet "formulaireValues", "prixTotal" dans le LS
    localStorage.setItem("formulaireValues", JSON.stringify(formulaireValues));
    localStorage.setItem("prixTotal", JSON.stringify(prixTotal));
    }else{
    alert("Veuillez bien remplir le formulaire");
    };

//--------------------------FIN GESTION DU FORMULAIRE----------------------/

//Renommer les champs pour se mettre au standard de l'attendu de l'api
contact = {
    firstName: formulaireValues.prenom,
    lastName: formulaireValues.nom,
    address: formulaireValues.adresse,
    city: formulaireValues.ville,
    email: formulaireValues.email
 }
//Génèrer un array "products" avec tous les _id
let products = [];
for(let u=0; u < produitEnregistreDansLocalStorage.length; u++){
    let _id = produitEnregistreDansLocalStorage[u]._id;
    products.push(_id)
}

//Mettre les values du formulaire et les produits sélectionnés dans un objet à envoyer au server
const aEnvoyer = {
    contact, 
    products
}
//Envoi de l'objet sur le serveur
const promise01 = fetch("http://localhost:3000/api/teddies/order", {
    method: "POST",
    body: JSON.stringify(aEnvoyer),
    headers: {
        "Content-Type" : "application/json",
    }
})

//pour voir le résultat dans la console
promise01.then(async(response)=>{
    try{
        const contenu = await response.json();
        console.log("contenu de response");

        if(response.ok){
            console.log(`Resultat de response.ok : ${response.ok}`);

            //Récupération de l'id de la reponse du serveur
            localStorage.setItem("responseId", contenu.orderId);
            //Aller vers la page confirmation de commande
            window.location = "confirmation_cde.html";

        }else{
            console.log(`Repose du serveur : ${response.status}`)
            alert(`Probleme avec le serveur : erreur ${response.status}`)
        };
    }catch(e){
        console.log("erreur qui vient du catch()");
    }
})
});
//--------------Fin addEventListener---------------------------//

//*********METTRE LE CONTENU DU LS DANS LES CHAMPS DU FORMULAIRE***********
  //Prendre la key dans le LS et la mettre dans une variable
  const dataLocalStorage = localStorage.getItem("formulaireValues");

  //Convertir la chaine de caractères en objet JS
  const dataLocalStorageObjet = JSON.parse(dataLocalStorage);

    //fonction pour que le champ du formulaire soit rempli par les données du LS
    function remplirChampInputDepuisLocalStorage(input){
        if(dataLocalStorageObjet == null){
            console.log("le local storage à pour valeur null")
        }else{ 
        document.querySelector(`#${input}`).value = dataLocalStorageObjet[input];
    }};
    remplirChampInputDepuisLocalStorage("prenom");
    remplirChampInputDepuisLocalStorage("nom");
    remplirChampInputDepuisLocalStorage("adresse");
    remplirChampInputDepuisLocalStorage("cp");
    remplirChampInputDepuisLocalStorage("ville");


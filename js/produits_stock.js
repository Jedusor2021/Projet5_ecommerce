//envoyer une requete avec l'API pour recevoir les produits en stock//
function Produits() {
    fetch("http://localhost:3000/api/teddies");
    .then(function(res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function(value) {
      document
          .getElementById("produits_en_stock")
          .innerText = value.queryString.greetings;
    })
    .catch(function(err) {
      // Une erreur est survenue
    });
  }
  document
    .getElementById("produits_en_stock")
    .addEventListener("click", Produits);//au clic sur produits, affiche les produits en stock//
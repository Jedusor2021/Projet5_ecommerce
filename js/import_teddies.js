//envoyer une requete avec l'API pour recevoir les produits en stock//
fetch("http://localhost:3000/api/teddies")
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(teddies) {
    index.html(teddies);
  })
  .catch(function(err) {
    // Une erreur est survenue
  });
  Btn.onclick = () => { 
    fetch("http://localhost:3000/api/${teddies}")
      .then(reponse => reponse.json ())
      .then(reponse2 => {
        let affichage = '<ul>';
        for(let teddies of reponse2) {
          affichage += '<li>${teddies.name} - ${teddies.price} - ${teddies._id} - ${teddies;description}'
        }
          affichage += '</ul>'
          document.querySelector('#teddies').innerHTML = affichage;
    })
}
 
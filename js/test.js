
    fetch("http://localhost:3000/api/teddies")
      .then(reponse => reponse.json ())
      .then(reponse2 => {
        output.textContent = '${reponse2.name}';
    })

 
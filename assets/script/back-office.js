class Bike {
  constructor(_name, _description, _brand, _imgUrl, _price) {
    this.name = _name;
    this.description = _description;
    this.brand = _brand;
    this.imageUrl = _imgUrl;
    this.price = _price;
  }
}

const bikeForm = document.getElementById("bikeForm");
bikeForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;
  const brand = document.getElementById("brand").value;
  const imgUrl = document.getElementById("imgUrl").value;
  const price = parseInt(document.getElementById("price").value);

  const newBike = new Bike(name, description, brand, imgUrl, price);

  fetch(urlApi, {
    method: "POST",
    body: JSON.stringify(newBike),
    headers: {
      "Content-type": "application/json",
      Authorization: apiKey
    }
  })
    .then((response) => {
      if (response.ok) {
        //momentaneamente
        alert("Bici salvata");
      } else {
        throw new Error("Qualcosa è andato storto");
      }
    })
    .catch((err) => {
      console.log("ERRORE", err);
    });
});

class Bike {
  constructor(_name, _description, _brand, _imgUrl, _price) {
    this.name = _name;
    this.description = _description;
    this.brand = _brand;
    this.imageUrl = _imgUrl;
    this.price = _price;
  }
}

const addressBarLink = new URLSearchParams(location.search);
const bikeId = addressBarLink.get("bikeId");
if (bikeId) {
  fetch(urlApi + bikeId, {
    headers: {
      Authorization: apiKey
    }
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("C'è qualche problema");
      }
    })
    .then((bike) => {
      const name = document.getElementById("name");
      const description = document.getElementById("description");
      const brand = document.getElementById("brand");
      const imgUrl = document.getElementById("imgUrl");
      const price = document.getElementById("price");
      name.value = bike.name;
      description.value = bike.description;
      brand.value = bike.brand;
      imgUrl.value = bike.imageUrl;
      price.value = bike.price;

      const deleteBtn = document.getElementById("deleteBtn");
      deleteBtn.classList.remove("d-none");

      const confrimDeleteBtn = document.getElementById("confrimDeleteBtn");
      confrimDeleteBtn.addEventListener("click", () => {
        fetch(urlApi + bikeId, {
          method: "DELETE",
          headers: {
            Authorization: apiKey
          }
        }).then((response) => {
          if (response.ok) {
            alert("Bici eliminata");
            location.href = "./index.html";
          } else {
            throw new Error("Ci sono dei problemi nel trovare la bici");
          }
        });
      });
    })
    .catch((err) => {
      console.log("ERRORE", err);
    });
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

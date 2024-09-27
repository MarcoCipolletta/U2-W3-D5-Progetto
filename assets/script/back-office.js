class Bike {
  constructor(_name, _description, _brand, _imgUrl, _price) {
    this.name = _name;
    this.description = _description;
    this.brand = _brand;
    this.imageUrl = _imgUrl;
    this.price = _price;
  }
}

const backgroundModal = document.getElementById("backgroundModal");

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

      const submitBtn = document.getElementById("submitBtn");
      submitBtn.innerText = "Modifica";

      const confrimDeleteBtn = document.getElementById("confrimDeleteBtn");
      confrimDeleteBtn.addEventListener("click", () => {
        fetch(urlApi + bikeId, {
          method: "DELETE",
          headers: {
            Authorization: apiKey
          }
        }).then((response) => {
          if (response.ok) {
            const bikeDeleted = document.getElementById("bikeDeleted");
            bikeDeleted.classList.add("show");
            bikeDeleted.role = "dialog";
            bikeDeleted.style.display = "block";
            backgroundModal.classList.remove("d-none");
            const btndDelSuccess = document.getElementById("btndDelSuccess");
            btndDelSuccess.addEventListener("click", () => {
              backgroundModal.classList.add("d-none");
              location.href = "./index.html";
            });
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

  fetch(bikeId ? urlApi + bikeId : urlApi, {
    method: bikeId ? "PUT" : "POST",
    body: JSON.stringify(newBike),
    headers: {
      "Content-type": "application/json",
      Authorization: apiKey
    }
  })
    .then((response) => {
      if (response.ok) {
        console.log(response.status);
        const bikeAdded = document.getElementById("bikeAdded");

        bikeAdded.classList.add("show");
        bikeAdded.role = "dialog";
        bikeAdded.style.display = "block";
        backgroundModal.classList.remove("d-none");

        const modalBody = document.querySelector("#bikeAdded .modal-body");
        modalBody.innerText = bikeId ? "Bici modificata con successo!" : "Bici aggiunta con successo!";

        const btnAddedSuccess = document.getElementById("btnAddedSuccess");

        btnAddedSuccess.addEventListener("click", () => {
          backgroundModal.classList.remove("d-none");
          location.href = "./index.html";
        });
      } else {
        throw new Error("Qualcosa è andato storto");
      }
    })
    .catch((err) => {
      console.log("ERRORE", err);
    });
});

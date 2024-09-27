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
      const brand = document.getElementById("brand");
      const title = document.getElementById("title");
      const image = document.getElementById("image");
      const description = document.getElementById("description");
      const price = document.getElementById("price");
      brand.innerText = bike.brand;
      title.innerText = bike.name;
      image.src = bike.imageUrl;
      description.innerText = bike.description;
      price.innerText = bike.price + ",00 €";
    })
    .catch((err) => {
      console.log("Errore", err);
    });
}

const btnEdit = document.getElementById("btnEdit");
btnEdit.addEventListener("click", () => {
  location.href = "./back-office.html?bikeId=" + bikeId;
});

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
        if (response.status >= 300 && response.status < 400) {
          throw new Error("Redirezione imprevista.");
        } else if (response.status >= 400 && response.status < 500) {
          throw new Error("Richiesta non valida dal client.");
        } else if (response.status >= 500) {
          throw new Error("Errore interno del server.");
        }
      }
    })
    .then((bike) => {
      const loadPage = document.getElementById("loadPage");
      loadPage.classList.add("d-none");

      const btnsDNone = document.querySelectorAll(".btn.d-none");
      btnsDNone.forEach((btn) => {
        btn.classList.remove("d-none");
      });

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

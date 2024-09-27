const rowBikes = document.getElementById("rowBikes");

const loadBike = () => {
  fetch(urlApi, {
    headers: {
      Authorization: apiKey
    }
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("errore nel caricamento");
      }
    })
    .then((bikes) => {
      console.log(bikes);
      bikes.forEach((bike) => {
        //nuovo
        const col = document.createElement("div");
        col.classList.add("col-12", "col-md-4", "col-lg-3");

        const card = document.createElement("div");
        card.classList.add("card", "mb-4", "shadow-sm", "h-100");

        const img = document.createElement("img");
        img.src = bike.imageUrl;
        img.classList.add("bd-placeholder-img", "card-img-top", "p-2", "sameSize");
        img.role = "button";
        img.addEventListener("click", () => {
          location.href = "./details.html?bikeId=" + bike._id;
        });

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        const cardTitle = document.createElement("h5");
        cardTitle.classList.add("card-title", "fw-bold", "text-truncate");
        cardTitle.innerText = bike.name;
        cardTitle.role = "button";
        cardTitle.addEventListener("click", () => {
          location.href = "./details.html?bikeId=" + bike._id;
        });

        const brand = document.createElement("p");
        brand.classList.add("card-text");
        brand.style.letterSpacing = "2px";

        brand.innerText = bike.brand.toUpperCase();

        const cardFooter = document.createElement("div");
        cardFooter.classList.add("card-footer", "d-flex", "justify-content-between", "align-items-center");

        const btnEdit = document.createElement("button");
        btnEdit.classList.add("btn", "btn-sm", "btn-outline-secondary");
        btnEdit.type = "button";
        btnEdit.innerText = "Edit";
        btnEdit.addEventListener("click", () => {
          location.href = "./back-office.html?bikeId=" + bike._id;
        });

        const price = document.createElement("small");
        price.classList.add("fw-bold");
        price.innerText = bike.price + ",00 €";

        cardFooter.append(btnEdit, price);
        cardBody.append(cardTitle, brand);
        card.append(img, cardBody, cardFooter);
        col.appendChild(card);
        rowBikes.appendChild(col);
      });
    })
    .catch((err) => {
      console.log("ERRORE", err);
    });
};

loadBike();

import { createElementWithClass } from "./helpers.js";

async function loadRestaurants() {
  let response;
  try {
    response = await fetch(
      "https://media2.edu.metropolia.fi/restaurant/api/v1/restaurants"
    );
  } catch {
    return alert("Couldn't fetch restaurants");
  }
  const json = await response.json();

  const carousel = document.querySelector(".main-restaurants-carousel");

  for (const restaurant of json) {
    const container = createElementWithClass("div", "main-restaurants-item");

    const coverImage = document.createElement("img");
    coverImage.src = "https://placecats.com/neo_banana/300/200";

    const descriptionContainer = createElementWithClass(
      "div",
      "main-restaurants-item-description"
    );

    const restaurantName = createElementWithClass(
      "h3",
      "main-restaurants-item-description-name"
    );
    restaurantName.textContent = restaurant.name;
    const restaurantAddress = createElementWithClass(
      "span",
      "main-restaurants-item-description-address"
    );
    restaurantAddress.textContent = restaurant.address;
    const restaurantDistance = createElementWithClass(
      "span",
      "main-restaurants-item-description-distance"
    );

    descriptionContainer.append(
      restaurantName,
      restaurantAddress,
      restaurantDistance
    );
    container.append(coverImage, descriptionContainer);

    container.addEventListener("click", () =>
      displayModalForRestaurant(restaurant._id)
    );

    carousel.append(container);
  }
}

async function displayModalForRestaurant(id) {
  const modalContainer = document.createElement("dialog");

  try {
    response = await fetch(
      "https://media2.edu.metropolia.fi/restaurant/api/v1/restaurants"
    );
  } catch {
    return alert("Couldn't fetch restaurants");
  }
  const restaurant = await response.json();

  const restaurantName = document.createElement("p");
  restaurantName.textContent = `Name: ${restaurant.name}`;
  const restaurantAddress = document.createElement("p");
  restaurantAddress.textContent = `Address: ${restaurant.address}, ${restaurant.city} ${restaurant.postalCode}`;
  const restaurantPhone = document.createElement("p");
  restaurantPhone.textContent = `Phone: ${restaurant.phone}`;

  modalContainer.append(restaurantName, restaurantAddress, restaurantPhone);

  const dailyMenu = await getDailyMenu(id);

  dailyMenu.courses.forEach(({ name, diets }, n) => {
    const courseContainer = document.createElement("div");
    courseContainer.classList.add("course-container");
    const courseHeader = document.createElement("h2");
    courseHeader.textContent = `Course ${n + 1}`;

    const courseName = document.createElement("p");
    courseName.textContent = name;

    const courseDiets = document.createElement("b");
    courseDiets.textContent = diets;

    courseContainer.append(courseHeader, courseName, courseDiets);

    modalContainer.append(courseContainer);
  });

  modalContainer.addEventListener("close", () => modalContainer.remove());
  document.body.append(modalContainer);
  modalContainer.showModal();
}

async function getDailyMenu(id) {
  const response = await fetch(
    `https://media2.edu.metropolia.fi/restaurant/api/v1/restaurants/daily/${id}/fi`
  );
  const json = await response.json();
  return json;
}

export default loadRestaurants();

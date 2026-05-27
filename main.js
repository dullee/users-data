const url = "https://6a15904991ff9a63de086238.mockapi.io/v1/users";

const getUsers = async () => {
  const response = await fetch(url);
  const users = await response.json();
  return users;
};

function createCard(user) {
  const container = document.getElementById("user-container"); // Use a specific container, not body
  const cardHtml = `
    <div class="w-15 bg-gray-200 p-4 rounded-lg shadow-md flex flex-col items-center">
      <h2 class="text-xl font-bold">${user.name}</h2>
      <img src="${user.avatar}" class="size-20 rounded-full" alt="${user.name}">
      <p class="text-gray-700"><strong></strong> ${user.jobTitle}</p>
      <p class="text-blue-600">${user.email}</p>
    </div>
  `;

  container.insertAdjacentHTML("beforeend", cardHtml);
}

const renderUsers = async () => {
  const container = document.getElementById("user-container");
  container.textContent = "Loading";

  const users = await getUsers();
  container.textContent = "";

  users.forEach((user) => {
    createCard(user);
  });
};
renderUsers();
const input = document.querySelector("input");
input.addEventListener("input", (e) => {
  const searchTerm = e.target.value.toLowerCase().trim();
  const container = document.getElementById("user-container");
  const cards = container.children;

  for (const card of cards) {
    const name = card.querySelector("h2").textContent.toLowerCase();
    if (name.includes(searchTerm)) {
      card.style.display = "flex";
    } else {
      card.style.display = "none";
    }
  }
});

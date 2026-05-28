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
const usersPerPage = 10;
let currentUserIndex = 0;
const renderUsers = async () => {
  const container = document.getElementById("user-container");
  container.textContent = "Loading";

  const users = await getUsers();
  container.textContent = "";

  for (let i = 0; i < usersPerPage; i++) {
    createCard(users[currentUserIndex]);

    currentUserIndex++;
  }
};

const changePageData = (amount) => {
  const backButton = document.getElementById("backButton");
  const forwardButton = document.getElementById("forwardButton");
  const currentDisplay = document.getElementById("currentPageIndex");
  if (currentDisplay.textContent == 1 && amount < 0)
    return console.log(currentDisplay.textContent, Math.sign(amount));
  console.log(currentDisplay.textContent, Math.sign(amount));

  currentUserIndex += amount;
  currentDisplay.textContent = Number(currentDisplay.textContent) + amount;
  backButton.textContent = Number(currentDisplay.textContent) - 1;
  forwardButton.textContent = Number(currentDisplay.textContent) + 1;
  renderUsers();
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

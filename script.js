// Load from localStorage
let foods = JSON.parse(localStorage.getItem("foods")) || [];

// Elements
const form = document.getElementById("food-form");
const foodList = document.getElementById("food-list");
const totalDisplay = document.getElementById("total");
const resetBtn = document.getElementById("reset");

// Save to localStorage
function saveData() {
  localStorage.setItem("foods", JSON.stringify(foods));
}

// Render foods
function renderFoods() {
  foodList.innerHTML = "";
  let total = 0;

  foods.forEach((food, index) => {
    total += food.calories;

    const li = document.createElement("li");
    li.className = "flex justify-between bg-gray-200 p-2 rounded";

    li.innerHTML = `
      <span>${food.name} - ${food.calories} cal</span>
      <button onclick="removeFood(${index})" class="text-red-500">X</button>
    `;

    foodList.appendChild(li);
  });

  totalDisplay.textContent = total;
}

// Add food
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("food-name").value;
  const calories = parseInt(document.getElementById("calories").value);

  foods.push({ name, calories });

  saveData();
  renderFoods();

  form.reset();
});

// Remove food
function removeFood(index) {
  foods.splice(index, 1);
  saveData();
  renderFoods();
}

// Reset
resetBtn.addEventListener("click", () => {
  foods = [];
  saveData();
  renderFoods();
});

// Initial render
renderFoods();
async function fetchCalories(foodName) {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
    const data = await response.json();

    // Fake calorie value
    return Math.floor(Math.random() * 500);
  } catch (error) {
    alert("Error fetching calorie data");
    return 0;
  }
}
const calories = await fetchCalories(Name);
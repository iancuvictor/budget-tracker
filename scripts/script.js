let incomeList = document.querySelector("#incomeList");
let expenseList = document.querySelector("#expenseList");

// Functions
//Type = expense, income
function createInput(type = "Enter name", location) {
  let object = location.insertAdjacentHTML(
    "beforeend",
    `
    <li>
        <input type="text" placeholder="${type} name">
        <input type="number" class="${type}Input" placeholder="0,00" />
        <button class="selfDestroyBTN">delete</button>
    </li>
    `,
  );
}

// Initialise the table for each type
function initialiseTable(length, type, location) {
  for (let i = 0; i < length; i++) {
    createInput(type, location);
  }
}

initialiseTable(2, "Income", incomeList);
initialiseTable(2, "Expense", expenseList);

function generateArray(type) {
  let array = [];
  let inputs = document.querySelectorAll(`.${type}Input`);
  for (let i = 0; i < inputs.length; i++) {
    array.push(inputs[i].value);
  }
  return array;
  alert(array);
}
//let expenseArray = generateArray("expense");

function sum(type) {
  let incomeArray = generateArray("income");
  let total = document.querySelector(`#total${type}`);
  //let inputs = document.querySelectorAll(`${type}Input`)
  let sum = 0;
  for (i = 0; i < incomeArray.length; i++) {
      sum = +sum + +incomeArray[i];
  }

  total.value = sum;
  alert(sum);
}

// sum(incomeArray, "Income");
// sum(expenseArray, "Expense");



// EVENT LISTENER
// Event listener for ADDING EXPENSES
document.querySelector("#createExpenseBtn").addEventListener("click", () => {
  createInput("Expense", expenseList);
});

// Event listener for ADDING INCOMES
document.querySelector("#createIncomeBtn").addEventListener("click", () => {
  createInput("Income", incomeList);
});

// Event listener for REMOVING anything.
document.addEventListener("click", () => {
  if (event.target.classList.contains("selfDestroyBTN")) {
    event.target.parentElement.remove();
  }
});

document.querySelector("#calculateIncomeBTN").addEventListener("click", () => {
  sum("Income");
});

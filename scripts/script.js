let incomeList = document.querySelector("#incomeList");
let expenseList = document.querySelector("#expenseList");

// Functions

// Initialise the table for each type
function initialiseTable(length, type, location) {
  for (let i = 0; i < length; i++) {
    createInput(type, location);
  }
}

initialiseTable(2, "income", incomeList);
initialiseTable(2, "expense", expenseList);

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

function sum(type) {
  let arrType = type.toLowerCase();
  let array = [];
  let inputs = document.querySelectorAll(`.${arrType}Input`);
  let sum = 0;
  let total = document.querySelector(`#total${type}`);

  for (let i = 0; i < inputs.length; i++) {
    array.push(inputs[i].value);
  }

  for (i = 0; i < array.length; i++) {
    sum = +sum + +array[i];
  }

  total.value = sum;
}

// EVENT LISTENER
// Event listener for ADDING EXPENSES
document.querySelector("#createExpenseBtn").addEventListener("click", () => {
  createInput("expense", expenseList);
});

// Event listener for ADDING INCOMES
document.querySelector("#createIncomeBtn").addEventListener("click", () => {
  createInput("income", incomeList);
});

// Event listener for REMOVING anything.
document.addEventListener("click", () => {
  if (event.target.classList.contains("selfDestroyBTN")) {
    event.target.parentElement.remove();
    sum("Income");
    sum("Expense");
  }
});

// Event listeners for summing each category
// for incomes
let totalIncome = document.querySelector("#totalIncome");
let totalExpense = document.querySelector("#totalExpense");

document.addEventListener("input", () => {
  if (event.target.classList.contains("incomeInput")){
    sum("Income");
  } else if(event.target.classList.contains("expenseInput")) {
    sum("Expense");
  }
  document.querySelector("#bruteSavings").value = totalIncome.value - totalExpense.value;
});
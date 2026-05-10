
//Type = expense, income
function createInput(type, ){
    let div = document.createElement('div');
    div.className= `${type}Box`;
    div.innerHTML = `${type} body goes here`;

    document.body.append(div);
}

document.querySelector('#createExpenseBtn').addEventListener('click', () => {
    createInput('Expense')
});

document.querySelector('#createIncomeBtn').addEventListener('click', () => {
    createInput('Income');
});


// elements from top to bottom

// balance amount
let balanceAmt = document.getElementById('balanceAmt');

// income and expenses boxes
let incomeAmt = document.getElementById('incomeAmt');
let expenseAmt = document.getElementById('expenseAmt');

// Description and amount input values
let descInput = document.getElementById('descInput');
let amtInput = document.getElementById('amtInput');

// Add transcation button
let addBtn = document.getElementById('addBtn');


// income and expenses start point
let totalIncome = 0.00;
let totalExpenses = 0.00;

//testing

// primarly to display the balance of difference. green if postive, and red if negative
// function to update balance where it will be called from
function updateBalance() {
    // storing a variable balance with variables totalincome + totalexpenses that are called
      const balance = totalIncome + totalExpenses; // expenses are negative
      // if balance is greater than 0 or if balance is positive, run the code in if block
      if (balance >= 0 || Object.is(balance, +0)) {
        // balance display to be fixed with dollar sign and to 2 decimals.
        balanceAmt.textContent = `$ ${balance.toFixed(2)}`;
        // balance display to be color light green when positive amount
        balanceAmt.style.color = '#90EE90';
        // if balance is not positive, then run this else block
      } else {
        // then the balance display is dollar sign minus and fixed to two decimals.
        balanceAmt.textContent = `$ -${(-balance).toFixed(2)}`;
        // balance display to be color light red when negative amount
        balanceAmt.style.color = '#FF7F7F';
      }
    }


    // when the add transaction button is clicked, then run this code.
addBtn.addEventListener('click', () => {
  const desc = descInput.value.trim();
  const amt = parseFloat(amtInput.value.trim());

  if (!desc || isNaN(amt)) {
    alert('Please enter a valid description and number.');
    return;
  }



  // Update income or expense totals
  if (amt >= 0) {
    totalIncome += amt;
    incomeAmt.textContent = `$ ${totalIncome.toFixed(2)}`;
  } else {
    totalExpenses += amt;
    expenseAmt.textContent = `$ ${(-totalExpenses).toFixed(2)}`;
  }



  // Create new transaction item
  const listItem = document.createElement('div');
  listItem.className = 'list-bar';
  listItem.innerHTML = `
    <div class="detail-desc"><p>${desc}</p></div>
    <div class="detail-amt"><p>$${amt.toFixed(2)}</p></div>
    <div class="detail-edit">
      <i class="fa-solid fa-pen-to-square" style="font-size: 1.2em; cursor: pointer;"></i>
    </div>
    <div class="detail-trash">
      <i class="fa-solid fa-trash" style="color: red; font-size: 1.2em; cursor: pointer;"></i>
    </div>
  `;



    // Store the amount and whether it's income or expense
    listItem.setAttribute('data-amount', amt.toString());
    listItem.setAttribute('data-type', amt >= 0 ? 'income' : 'expense');

    // Add delete functionality
    const trashIcon = listItem.querySelector('.detail-trash i');
    trashIcon.addEventListener('click', () => {
    const itemAmount = parseFloat(listItem.getAttribute('data-amount'));
    const type = listItem.getAttribute('data-type');

    if (type === 'income') {
        totalIncome -= itemAmount;
        incomeAmt.textContent = `$ ${totalIncome.toFixed(2)}`;
    } else {
        totalExpenses -= itemAmount;
        expenseAmt.textContent = `$ ${(-totalExpenses).toFixed(2)}`;
    }

    listItem.remove();
    updateBalance();
    });





  // Append new item to the container
  detailContainer.appendChild(listItem);

  // Update balance
  updateBalance();

  // Clear inputs
  descInput.value = '';
  amtInput.value = '';
});







// check solde
function checkSolde(user, amount) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (amount <= user.solde) {
        resolve("solde suffisant");
      } else {
        reject("solde insuffisant");
      }
    }, 100);
  });
}

// update solde
function updateSolde(user, amount) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (amount > 0) {
        user.solde -= amount;
        resolve("solde mis à jour");
      } else {
        reject("montant invalide");
      }
    }, 100);
  });
}

// add transaction
function addTransaction(user, amount,Description) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const transaction = {
        type: "-",
        description: Description,
        date: new Date().toLocaleString(),
        amount: amount,
       
      };

      user.transactions.push(transaction);
      sessionStorage.setItem("currentUser", JSON.stringify(user));
      resolve("transaction ajoutée");
    }, 100);
  });
}

// payer (async / await)
async function payer(user, amount,Description) {
  try {
    const soldeMsg = await checkSolde(user, amount);
    console.log(soldeMsg);

    const updateMsg = await updateSolde(user, amount);
    console.log(updateMsg);

    await addTransaction(user, amount,Description);
    console.log("paiement terminé");
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export { payer };

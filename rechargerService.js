import { finduserbyaccount } from "../Model/Data.js";
export { recharger };

// trouver la carte
function findCarte(user, numCarte) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const carte = user.cartes.find(c => c.numCarte === numCarte);
      if(carte){
         resolve(carte);

      }else
        reject("Carte introuvable");
    }, 100);
  });
}

// vérifier solde carte
function checkSolde(user, amount) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (amount <= user.solde) {
        resolve("solde  suffisant");
      } else {
        reject("solde insuffisant");
      }
    }, 100);
  });
}

// mise à jour soldes
function updateSoldes(user, carte, amount) {
  return new Promise((resolve) => {
    setTimeout(() => {
      carte.solde += amount;
      user.solde -= amount;
      resolve("soldes mis à jour");
    }, 100);
  });
}

// ajouter transaction
function addTransaction(user,numCarte,  amount) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const transaction = {
        type: "-",
        description: 'Recharge la carte '+numCarte,
        amount: amount,
        date: new Date().toLocaleString()
      };

      user.transactions.push(transaction);
      sessionStorage.setItem("currentUser", JSON.stringify(user));
      resolve("transaction ajoutée");
    }, 100);
  });
}

// fonction principale
async function recharger(user, numCarte, amount) {
  try {
    const carte = await findCarte(user, numCarte);
    console.log("carte trouvée");

    const soldeMsg = await checkSolde(user, amount);
    console.log(soldeMsg);

    const updateMsg = await updateSoldes(user, carte, amount);
    console.log(updateMsg);

    await addTransaction(user,numCarte, amount);
    console.log("recharge terminée");
  } catch (error) {
    console.log(error);
    throw error;
  }
}



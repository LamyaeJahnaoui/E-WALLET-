// importer la fonction recharger
import { recharger } from "../Services/rechargerService.js";

const numCarteInput = document.querySelector("#numCarte");
const rechargeInput = document.querySelector("#recharge");
const rechargeBtn = document.querySelector("#rechargebtn");
const msg = document.querySelector("#msg");

let user = JSON.parse(sessionStorage.getItem("currentUser"));
console.log(user);

rechargeBtn.addEventListener("click", handleRecharger);

async function handleRecharger() {
  const numCarte = numCarteInput.value;
  const amount = Number(rechargeInput.value);

  if (numCarte === "" || amount <= 0) {
    msg.textContent = "Données invalides";
    return;
  }

  try {
    await recharger(user, numCarte, amount);
    msg.textContent = "Recharge effectuée avec succès ";
  } catch (error) {
    msg.textContent = error;
    console.log(error);
  }finally{// optionnel
    setTimeout(() => window.location.href = "../view/dashboard.html", 1500);
 }
}

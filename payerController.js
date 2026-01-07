// importer la fonction payer
import { payer } from "../Services/payerservice.js";

const payInput = document.querySelector("#pay");
const descr=document.querySelector("#description");
const payBtn = document.querySelector("#payBtn");
const msg = document.querySelector("#msg");

let user = JSON.parse(sessionStorage.getItem("currentUser"));
console.log(user);

payBtn.addEventListener("click", handlePayer);

async function handlePayer() {
  const amount = Number(payInput.value);
  const Description=descr.value;

  if (!user || amount <= 0 || Description==="") {
    msg.textContent = "Données invalides";
    return;
  }

  try {
    await payer(user, amount,Description);
    msg.textContent = "Paiement effectué avec succès ";
    
    
  } catch (error) {
    msg.textContent = error;
    console.log(error);
  }finally{// optionnel
    setTimeout(() =>{
       window.location.href = "../view/dashboard.html";
    }, 1500);
   
  }
}

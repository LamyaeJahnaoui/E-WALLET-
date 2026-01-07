// importer la fonction transferer
import{transferer} from "../Services/transferservice.js"
const numcomptInput=document.querySelector("#numCompte");
const amountInput=document.querySelector("#amount");
const validerbtn=document.querySelector("#valider");

 validerbtn.addEventListener("click",handlevalider);
  let exp=JSON.parse(sessionStorage.getItem("currentUser"));
 
 async function handlevalider(){
    let numcompte=numcomptInput.value;
    let amount=parseFloat(amountInput.value);
     console.log(exp);
    if(amount<=0 || numcompte===""||exp.numCompte==numcompte ){
        alert("invalide data");
        return;
    }
// appel à la fonction  qui fait le transfert
    try{
      const message =await transferer(exp,numcompte,amount);
      alert(message);
      console.log("transfer succesfly added");
    }catch(error){
      console.log(error);
    }finally{// optionnel
    setTimeout(() => window.location.href = "../view/dashboard.html", 1500);
 }}

//import {users,findUser} from "../Model/Data.js";!!
// Get user from storage safely
/* const currentUserString = sessionStorage.getItem("currentUser");
const currentUser = currentUserString ? JSON.parse(currentUserString) : null;

// Safely show the welcome message
if(currentUser && currentUser.nom){
    welcome_message.textContent = "Bienvenue " + currentUser.nom;
} else {
    welcome_message.textContent = "Bienvenue invité";
    // Optional: redirect to login if no user
     window.location.href = "/src/view/index.html";
} */
//import {users,findUser} from "../Model/Data.js";    
const welcome_message = document.getElementById("welcome_message");
const balance=document.getElementById("balance");

const currentUser=JSON.parse(sessionStorage.getItem("currentUser"));//should not use the same variable name 
welcome_message.textContent = "Bienvenue " + currentUser.nom;
balance.textContent=currentUser.solde+" MAD";

const transactions_table=document.getElementById("transactions");

const transferbtn=document.getElementById("transferer");
const rechargebtn=document.getElementById("recharger");

//afficher transactions
const tab=currentUser.transactions;
const affichetransactions=(tab)=>{ //fct prend un argument we gotte know which table
    transactions_table.innerHTML="";
    tab.forEach((u)=>{
    const row=document.createElement("tr");
    row.innerHTML="<td>"+u.date+"</td><td>"+u.description+"</td><td>"+u.type+"</td><td>"+u.amount+" MAD</td>";//coud use +montant or -montant selon type
    transactions_table.appendChild(row);
})
}
affichetransactions(tab);


const paybtn=document.getElementById("payer");
const payForm=document.getElementById("payForm");
const payAmount=document.getElementById("pay");
const describe=document.getElementById("description");

// PAYER 
paybtn.addEventListener("click",()=>{
    payForm.style.display="block";
});

function checkUser(){
    return new Promise((resolve,reject)=>{
        if(currentUser){
            resolve(currentUser);
        }else{
            reject("User not found");
        }
    });
}

function checkSolde(currentUser,montant){
    return new Promise((resolve,reject)=>{
        if(currentUser.solde>montant)
            resolve(currentUser);
        else
            reject("solde insuffisant");

    })
}


function addTransaction(currentUser,montant,description){
      return new Promise((resolve)=>{
        //ajouter transaction
        currentUser.transactions.push(
            { type:"-",description:description, amount: montant , date: new Date().toISOString().split('T')[0] } // new Date().toLocaleDateString(),
        );
        resolve(currentUser);
        
      });
}  
   

function updateSolde(currentUser,montant){
      return new Promise((resolve)=>{
        currentUser.solde -= montant;
        resolve(currentUser)
      })
}

payForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    const montant=parseFloat(payAmount.value);// convert string to number
    const description=describe.value;
    checkUser()
     .then((currentUser)=>checkSolde(currentUser,montant))
     .then((currentUser)=>addTransaction(currentUser,montant,description))
     .then((currentUser)=>updateSolde(currentUser,montant))
     .then((user) => {
            // Update your view and storage
            balance.textContent = user.solde + " MAD";
            affichetransactions(user.transactions);
            sessionStorage.setItem("currentUser", JSON.stringify(user));
            updateUserInDB(user);//:(

            //alert("Paiement effectué avec succès");
            payForm.style.display = "none";
            payForm.reset();// equiv a 
            // describe.value="";
           // payAmount.value=""; 

        })
        .catch(() => {
            console.log("Error during payment:");
            alert();
        });
});




//update? DB TT  
function updateUserInDB(currUser){
    let usersDB = JSON.parse(sessionStorage.getItem("users")) || [];
    console.log("Before update:", usersDB);//vide?

    const updatingUser = usersDB.find(u => u.email === currUser.email && u.password === currUser.password);
    if (updatingUser){
        updatingUser.solde = currUser.solde;
        updatingUser.transactions = currUser.transactions;
    }

    sessionStorage.setItem("users", JSON.stringify(usersDB));
    console.log("After update:", usersDB);
}



   

   
   

const filtrer=document.getElementById("filtrer");

filtrer.addEventListener("change",handlefilter);//we do not click only we change :)
function handlefilter(){
    let t;
    //console.log(filtrer.value==="cred"); //verifier value 
    if(filtrer.value==="cred") {
        t=currentUser.transactions.filter((u)=>u.type==="+");
         affichetransactions(t);
    
        
    }else if(filtrer.value==="deb"){
        t=currentUser.transactions.filter((u)=>u.type==="-");
        affichetransactions(t);
    }
    else{
       affichetransactions(tab);
    }

    }

       

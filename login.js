const mail=document.getElementById('mail');
const pass=document.getElementById('password');
const result=document.getElementById('result');

const submitbtn=document.getElementById('submitbtn');

import {findUser} from '../Model/Data.js';
let user=null;

submitbtn.addEventListener('click',handleSubmit);

function handleSubmit(){
    const email=mail.value;
    const password=pass.value;  //be aware of variable shadowing !!

     user=findUser(email,password);

    if(!email || !password){
        result.textContent="insert email and password";
        result.style.color="red";
    }else{
        if(!user){
            result.textContent="Donnees incorrecte";
            result.style.color="red";
        }else{
            sessionStorage.setItem("currentUser",JSON.stringify(user));
            result.textContent="successful login";
            result.style.color="green";
            console.log(sessionStorage.getItem("currentUser"));
            setTimeout(()=>{ window.location.href="/src/view/dashboard.html";},1000);

        }

        
    }
}
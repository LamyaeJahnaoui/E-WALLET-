const loginbtn=document.getElementById("Loginbtn");

loginbtn.addEventListener("click",handlelogin);

function handlelogin(){
    loginbtn.textContent="loading...";
    loginbtn.style.color="white";
    setTimeout(()=>{ window.location.href="/src/view/login.html";},1000);
}


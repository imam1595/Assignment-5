
// sign in part
const logInDiv = document.getElementById("logInDiv");
const userName = document.getElementById("userName");
const password = document.getElementById("password");
const signInBtn = document.getElementById("signInBtn");

const mainSection = document.getElementById("mainSection");


console.log(userName);
// sign in function
function signIn(){
    const userNameValue = userName.value;
    const passwordValue = password.value;

    console.log(userNameValue);
    console.log(passwordValue);

    if(userNameValue == "admin" && passwordValue === "admin123"){
        console.log(userNameValue === "admin");
        console.log(passwordValue === "admin123");
        logInDiv.classList.add("hidden");
        mainSection.classList.remove("hidden");
    }else{
        alert("Use Default user name and password.")
    }
}
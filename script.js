
// Array
let allBtnArray = [];
let openBtnArray = [];
let closedBtnArray = [];


// sign in part
const logInDiv = document.getElementById("logInDiv");
const userName = document.getElementById("userName");
const password = document.getElementById("password");
const signInBtn = document.getElementById("signInBtn");

const mainSection = document.getElementById("mainSection");

const cardContainer = document.getElementById("cardContainer");

// loading spinner
const loadingSpinner = document.getElementById("loadingSpinner");

// getting total issues
const totalIssues = document.getElementById("totalIssues");


// button
const btnAll = document.getElementById("btnAll");
const btnOpen = document.getElementById("btnOpen");
const btnClosed = document.getElementById("btnClosed");






// sign in function
function signIn(){
    const userNameValue = userName.value;
    const passwordValue = password.value;


    if(userNameValue == "admin" && passwordValue === "admin123"){
        // console.log(userNameValue === "admin");
        // console.log(passwordValue === "admin123");
        logInDiv.classList.add("hidden");
        mainSection.classList.remove("hidden");
    }else{
        alert("Use Default user name and password.")
    }
}


// spinner loading function
function showLoading(){
    loadingSpinner.classList.remove("hidden");
    loadingSpinner.classList.add("flex");
}

function hideLoading(){
    loadingSpinner.classList.add("hidden");
}


// active button
function allBtnActive(){
    btnAll.classList.remove("btn-outline");
    btnAll.classList.add("btn-primary");

    btnOpen.classList.remove("btn-primary");
    btnClosed.classList.remove("btn-primary");

    // update total issues
    totalIssues.innerText = allBtnArray.length;

    displayAllCards(allBtnArray);
}

function openBtnActive(){

    // got add showloading
    // showLoading();

    btnOpen.classList.remove("btn-outline");
    btnOpen.classList.add("btn-primary");

    btnAll.classList.remove("btn-primary");
    btnClosed.classList.remove("btn-primary");

    
    // update total issues
    totalIssues.innerText = openBtnArray.length;


    displayAllCards(openBtnArray);
    
}

function closedBtnActive(){
    btnClosed.classList.remove("btn-outline");
    btnClosed.classList.add("btn-primary");

    btnOpen.classList.remove("btn-primary");
    btnAll.classList.remove("btn-primary");

    // update total issues
    totalIssues.innerText = closedBtnArray.length;

    displayAllCards(closedBtnArray);
}



async function loadAllCards() {

    showLoading();
    
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");

    const data = await res.json();

    // console.log(data.data);

    const allDatum = data.data;
    // console.log(allDatum);

    // getting array of issues 
    allDatum.forEach(data => {
        // console.log(data);
        // console.log(data.status);

        if(data.status == "open"){


            openBtnArray.push(data);

            allBtnArray.push(data);
        }else{
            closedBtnArray.push(data);
            
            allBtnArray.push(data);
        }

        
    });
    // console.log(allBtnArray.length);
    // console.log(openBtnArray.length);
    // console.log(closedBtnArray.length);

    // console.log(data.status);

    hideLoading();

    // displayAllCards(data.data);
    displayAllCards(allBtnArray);
}

function displayAllCards(cards){
    // console.log(cards);
    
    // first clear the previous cards
        cardContainer.innerHTML = ""; 

    cards.forEach(card => {
        // console.log(card);


        const divCard = document.createElement("div");
        // divCard.className = "card bg-base-100 shadow-sm";

        if(card.status == "open"){

            divCard.className = "card bg-base-100 shadow-sm border-t-6 border-t-[#00a96e]";
        }else{
            
            divCard.className = "card bg-base-100 shadow-sm border-t-6 border-t-[#a855f7]"; 
        }

        divCard.innerHTML = `
            <div class="card-body">

                <div class="flex justify-between">
                    <img src="./assets/Open-Status.png" alt="" class="w-[30px]">
                    <span class="bg-green-300 p-2 rounded-full">${card.priority}</span>
                </div>

                <div>
                    <h2 class="card-title">${card.title}</h2>
                    <p class="line-clamp-2">${card.description}</p>

                    <div class="flex gap-5">
                        <span class="bg-[#EF4444] rounded-md p-1">${card.labels[0]}</span>
                        <span class="bg-[#FDE68A] rounded-md p-1">${card.labels[1]}</span>
                    </div>
                </div>
                
                <br>
                <hr>

                <div>
                    <div class="flex mb-5">
                        <p><span>${card.id}</span> by <span>${card.author}</span></p>
                        <span>${card.createdAt}</span>
                    </div>

                    <div class="flex">
                        <p>Assignee: <span>${card.assignee}</span></p>
                        <span>${card.updatedAt}</span>
                    </div>
                </div>

            </div>
        `;

        cardContainer.appendChild(divCard);
    });
}


loadAllCards();
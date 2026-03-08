
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


// search button
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");





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


// search card
function searchCard(arrays){


    // for search bar
    let searchArrays = [];

    const value = searchInput.value.toLowerCase();
    console.log(value);
    // console.log(arrays);
    arrays.forEach(array => {
        // console.log(array.title);

        const lowerTitle = array.title.toLowerCase();
        // console.log(lowerTitle);
        if(lowerTitle.includes(value)){
            console.log(array);
            searchArrays.push(array);
        }
    })

    // update total issues
    totalIssues.innerText = searchArrays.length;

    console.log(searchArrays);
    displayAllCards(searchArrays);

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

    // got add show loading
    showLoading();

    btnOpen.classList.remove("btn-outline");
    btnOpen.classList.add("btn-primary");

    btnAll.classList.remove("btn-primary");
    btnClosed.classList.remove("btn-primary");

    
    // update total issues
    totalIssues.innerText = openBtnArray.length;


    displayAllCards(openBtnArray);

    hideLoading();
    
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



// get cards api
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




// show cards
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



        // changing card status image
        let cardStatusImg = "";

        if(card.status == "open"){
            cardStatusImg = "./assets/Open-Status.png";
            
        }else{
            cardStatusImg = "./assets/Closed-Status.png";
        }

        // changing card priority color variable
        let cardPriorityColor = "";

        if(card.priority == "high"){
            cardPriorityColor = "bg-[#EEBFBF]";
        }
        else if(card.priority == "medium"){
            cardPriorityColor = "bg-[#FFF2BD]";
        }
        else{
            cardPriorityColor = "bg-[#B4C6FA]";
        }



        divCard.innerHTML = `
            <div class="card-body" onclick="loadingCardDetail(${card.id})">

                <div class="flex justify-between mb-2">
                    <img src="${cardStatusImg}" alt="" class="w-[30px]">
                    <span class="${cardPriorityColor} p-2 rounded-full">${card.priority}</span>
                </div>

                <div class= "space-y-4">
                    <h2 class="card-title">${card.title}</h2>
                    <p class="line-clamp-2">${card.description}</p>

                    <div class="flex gap-5">
                        <span class="bg-[#f17575] rounded-md p-1">${card.labels[0]}</span>
                        <span class="bg-[#e4d38f] rounded-md p-1">${card.labels[1]}</span>
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


async function loadingCardDetail(id) {

    console.log(id);

    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`);

    const data = await res.json();

    // console.log(data);
    // console.log(data.data);

    displayCardDetail(data.data);
    
}


function displayCardDetail(datum){
    console.log(datum);

    // Display single card detail on click
    const cardModalDetails = document.getElementById("cardModalDetails");

    // pop up card
    const myModal = document.getElementById("my_modal");

    cardModalDetails.innerHTML = `
        <div class="w-[400px] h-[400px] space-y-5 card card-body  bg-base-100 shadow-sm">

            <h1 class="font-bold text-2xl">Fix broken image uploads</h1>

            <div class="flex gap-5 items-center">
                <span class="bg-green-400 p-2 rounded-md text-white"><span>Open</span>ed</span>
                <span>* Opened by <span>John_joe</span></span>
                <span>* 22/02/2026</span>

            </div>

            <div class="flex gap-7">
                <span class="bg-[#ee6767] rounded-md p-1">BUG</span>
                <span class="bg-[#FDE68A] rounded-md p-1">HELP WANTED</span>
            </div>

            <p class="line-clamp-2">The navigation menu doesn't collapse properly on  mobile devices. Need to fix the responsive behavior.</p>
        

            <div class="flex justify-between">

                <div class="flex flex-col space-y-2">
                    <span class="font-bold text-lg">Assignee</span>
                    <span>John_joe</span>
                </div>

                <div class="flex flex-col space-y-2">
                    <span class="font-bold text-lg">Priority</span>
                    <span class="bg-[#ee6767] rounded-md p-1 text-center">HIGH</span>
                </div>
            </div>
        </div>
    `;

    

    myModal.showModal();


    // my_modal.showModal();
}


loadAllCards();
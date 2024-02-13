let gameseq=[];
let userseq=[];
let btns=["yellow","red","green","purple"];

let started=false;
let level=0;
let highestScore = 0;

let h2 = document.querySelector("h2");
document.addEventListener("keypress",function(){
    if(!started){
        console.log("game started");
        started=true;
        levelUp();
    }  
});

function btnFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
}
function updateHighScore(){
    if(level>highestScore){
        highestScore=level;
        document.querySelector("#highest-score").innerHTML=`Highest Score: <b>${highestScore}</b>`;
    }
}
function levelUp(){
    userseq=[];
    level++;
    h2.innerText=`Level ${level}`;
    let randIdx = Math.floor(Math.random()*4);
    let randColor=btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameseq.push(randColor);
    btnFlash(randBtn);

}
function checkAns(idx){
    if(userseq[idx]===gameseq[idx]){
        if(userseq.length==gameseq.length){
            setTimeout(levelUp,1000);
        }

    }else{
        
        h2.innerHTML=`Game Over!Your score was <b>${level}</b> <br> Press any key to start.`;
        updateHighScore();
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
        },150);
        reset();
    }
}
function btnpress(){
    let btn = this;
    btnFlash(btn);
    userColor=btn.getAttribute("id");
    userseq.push(userColor);
    checkAns(userseq.length-1);
    
}
let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnpress);
}
function reset(){
    started= false;
    gameseq=[];
    userseq=[];
    level=0;
}
let boxes = document.querySelectorAll('.box');
let reset = document.getElementById("reset");
let newgame = document.querySelector("#new-game");
let msgcontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turn0 = true;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
]

boxes.forEach((box) => {
    box.addEventListener("click", () =>{
        if(turn0){
            box.innerText = "0";
            turn0 = false;
        }
        else{
            box.innerText = "X";
            turn0 = true;
        }
        box.disabled = true;
        checkWinner();
    })
})

const disableboxes = () => {
    for(box of boxes){
        box.disabled = true;
    }
}

const resetGame = () =>{
    turn0 = true;
    enableboxes();
    msgcontainer.classList.add("hide");
}


const enableboxes = () => {
    for(box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

// const nowWinner = () =>{
//     msg.innerText = "No winner! Please play again";
//     msgcontainer.classList.remove("hide");
// }
const showWinner = (winner) =>{
    msg.innerText = `Congratulation Winner is ${winner}`;
    msgcontainer.classList.remove("hide");
    disableboxes();
}

const checkWinner = () =>{
    let isWinner = false;
    for ( pattern of winPatterns) {
        
        // console.log(pattern[0], pattern[1], pattern[2]);
        // console.log(boxes[pattern[0]].innerText, boxes[pattern[1]].innerText, boxes[pattern[2]].innerText);

        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if(pos1 != "" && pos2 != "" && pos3 != ""){
            if(pos1 === pos2 && pos2 === pos3){
                // console.log("winner");
                showWinner(pos1);
                isWinner = true;
                break;
            }
        }
    }
    if (!isWinner) {
        let allFilled = Array.from(boxes).every(box => box.innerText !== "");
        if (allFilled) {
            msg.innerText = "No winner! Please play again";
            msgcontainer.classList.remove("hide");
        }
    }
}




newgame.addEventListener("click",resetGame);
reset.addEventListener("click",resetGame);
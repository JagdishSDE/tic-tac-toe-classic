const gameInfo = document.querySelector(".game-info"); //which player turn is there
const boxes = document.querySelectorAll(".box"); // main grid div box-9 total 
const newGameBtn = document.querySelector(".btn"); //start new game button 

let currentPlayer;//either X or Y
let gameGrid; //Game info regarding where our game have been completed or not based on the cells filled ->it will be an array
 
const winningPositions = [ //we created an array of possibility of winning this game
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//Now creating a function to initialise the game

initGame = () => {
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    //we have to show this gameGrid in UI also ->because when we do new game click trhe previous detonated mines have not been changed with new ones
    boxes.forEach((box,index)=>{
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        //one more thing is missing ==> initialize box with css properties again (default properties)
        box.classList = `box box${index + 1}`;
    })
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current player - ${currentPlayer}`;
}

initGame();

swapTurn = () =>{
    if(currentPlayer === "X") {
        currentPlayer = "O";
    }
    else{
                currentPlayer = "X";

    }
    //UI update based on above swap 
    gameInfo.innerText = `Current player - ${currentPlayer}`;
}

checkGameOver = () =>{

    let answer = "";

    winningPositions.forEach((position)=>{
        //all 3 boxes should be non empty and exactly same in value 
        if( (gameGrid[position[0]] != "" || gameGrid[position[1]] != "" || gameGrid[position[2]] != "" )&&
        (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])  &&
            (gameGrid[position[2]] === gameGrid[position[3]])){
                //check if winner is X
                if(gameGrid[position[0]] === "X"){
                    answer = "X";
                }
                else{
                    answer = "O";
                }

                //disable pointer events
                boxes.forEach((box)=>{
                    box.style.pointerEvents = "none";
                })

                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");
        }
    });

    //It mean we have a winner
    if(answer !== ""){
        gameInfo.innerText = `Winner Player -${answer}`;
        newGameBtn.classList.add("active");
        return; //still not working so we used disable pointer events in above
    }

    //let's check if there is a tie 
    let fillcount = 0;
    gameGrid.forEach((box)=>{
        if(box != ""){
            fillcount++;
        }
    });

    //board is filled, game is tie
    if(fillcount == 9){
        gameInfo.innerText = "Game Tie !";
        newGameBtn.classList.add("active");
    }
}

handleClick = (index) =>{
    if(gameGrid[index] === ""){
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        //now we will swap the turns
        swapTurn();
        //check is someone won or not
        checkGameOver();
    }
}

//now we will create an eventListener =>"Click" on each of the boxes(like we have land mines in cod which just blink waiting for an impact) so which ever box clicked(whichever mine pressed ->kaboom impact) will be passed to another function(reporting the command we want)
boxes.forEach((boxai,index)=>{
    boxai.addEventListener("click",()=>{
        handleClick(index); //which box is clicked (which mine is detonated or pressed bny someone)
    })
});

newGameBtn.addEventListener("click",initGame);
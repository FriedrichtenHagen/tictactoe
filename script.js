const gameBoard = (() => {
    const fieldArray = [" "," "," "," "," "," "," "," "," "];
    return {fieldArray}
})();

const player = (name) => {
    this.name = name;
    this.turn = true; 
    return {name, turn}
}
const player1 = player("Fred");
const player2 = player("Johannes");


const displayControl = (() => {
    const gameFields = document.querySelectorAll(".gameField")
    const createField = () => {
        for(let i=0; i<gameFields.length; i++){
            gameFields[i].textContent = gameBoard.fieldArray[i]
        }
    }
    let validClickCounter = 0;
    const addEvents = () => {
        let makeMark = function(field, index){
            return function curriedFunc(e){
                if(gameBoard.fieldArray[index]===" "){           
                    if(validClickCounter%2===0||validClickCounter===0){
                            field.textContent= "x"
                            gameBoard.fieldArray[index] = "x"
                            validClickCounter++
                            //field.removeEventListener("click", makeMark)
                    }
                    else{
                        field.textContent= "o"
                        gameBoard.fieldArray[index] = "o"
                        validClickCounter++
                        //field.removeEventListener("click", makeMark)
                    }
                }
                checkForWin()
            }
        }
        gameFields.forEach((field, index) => field.addEventListener("click", makeMark(field, index)))
    }
    const checkForWin = () =>{
        if(
            // horizontal x
            (gameBoard.fieldArray[0]==="x"&&gameBoard.fieldArray[1]==="x"&&gameBoard.fieldArray[2]==="x")||
            (gameBoard.fieldArray[3]==="x"&&gameBoard.fieldArray[4]==="x"&&gameBoard.fieldArray[5]==="x")||
            (gameBoard.fieldArray[6]==="x"&&gameBoard.fieldArray[7]==="x"&&gameBoard.fieldArray[8]==="x")||
            // vertical x
            (gameBoard.fieldArray[0]==="x"&&gameBoard.fieldArray[3]==="x"&&gameBoard.fieldArray[6]==="x")||
            (gameBoard.fieldArray[1]==="x"&&gameBoard.fieldArray[4]==="x"&&gameBoard.fieldArray[7]==="x")||
            (gameBoard.fieldArray[2]==="x"&&gameBoard.fieldArray[5]==="x"&&gameBoard.fieldArray[8]==="x")||
            // diagonal x
            (gameBoard.fieldArray[0]==="x"&&gameBoard.fieldArray[4]==="x"&&gameBoard.fieldArray[8]==="x")||
            (gameBoard.fieldArray[6]==="x"&&gameBoard.fieldArray[4]==="x"&&gameBoard.fieldArray[2]==="x")||
            // horizontal o
            (gameBoard.fieldArray[0]==="o"&&gameBoard.fieldArray[1]==="o"&&gameBoard.fieldArray[2]==="o")||
            (gameBoard.fieldArray[3]==="o"&&gameBoard.fieldArray[4]==="o"&&gameBoard.fieldArray[5]==="o")||
            (gameBoard.fieldArray[6]==="o"&&gameBoard.fieldArray[7]==="o"&&gameBoard.fieldArray[8]==="o")||
            // vertical o
            (gameBoard.fieldArray[0]==="o"&&gameBoard.fieldArray[3]==="o"&&gameBoard.fieldArray[6]==="o")||
            (gameBoard.fieldArray[1]==="o"&&gameBoard.fieldArray[4]==="o"&&gameBoard.fieldArray[7]==="o")||
            (gameBoard.fieldArray[2]==="o"&&gameBoard.fieldArray[5]==="o"&&gameBoard.fieldArray[8]==="o")||
            // diagonal o 
            (gameBoard.fieldArray[0]==="o"&&gameBoard.fieldArray[4]==="o"&&gameBoard.fieldArray[8]==="o")||
            (gameBoard.fieldArray[6]==="o"&&gameBoard.fieldArray[4]==="o"&&gameBoard.fieldArray[2]==="o")
        ){
            alert("win!")
        }
    }
    return {createField, addEvents, validClickCounter}
})();

displayControl.createField()
displayControl.addEvents()

/* 


if(validClickCounter%2==!0||validClickCounter===0) (uneven number) it is player1 turn

add function that checks for win or draw
if(gameBoard.fieldArray[0]==="x"&&gameBoard.fieldArray[1]==="x"&&gameBoard.fieldArray[2]==="x"){game over!}

012
345
678


remove eventlistener after click



*/
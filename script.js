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
            }
        }
        gameFields.forEach((field, index) => field.addEventListener("click", makeMark(field, index)))
    }

    return {createField, addEvents, validClickCounter}
})();

displayControl.createField()
displayControl.addEvents()

/* 


if(validClickCounter%2==!0||validClickCounter===0) (uneven number) it is player1 turn

add function that checks for win or draw
if(gameBoard.fieldArray[0]==="x"&&gameBoard.fieldArray[1]==="x"&&gameBoard.fieldArray[2]==="x"){game over!}


remove eventlistener after click



*/
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
        gameFields.forEach((field, index) => field.addEventListener("click", makeMark.bind(field, index))) // fix this
    }
    const makeMark = (field, index) => {
        if(gameBoard.fieldArray[index]===" "){           
            if(validClickCounter%2===0||validClickCounter===0){
                    field.textContent= "x"
                    gameBoard.fieldArray[index] = "x"
                    validClickCounter++
                    field.removeEventListener("click", makeMark())
            }
            else{
                field.textContent= "o"
                gameBoard.fieldArray[index] = "o"
                validClickCounter++
            }
        }
    }
    return {createField, addEvents}
})();

displayControl.createField()
displayControl.addEvents()

/* 


if(validClickCounter%2==!0||validClickCounter===0) (uneven number) it is player1 turn

add function that checks for win or draw
remove eventlistener after click



*/
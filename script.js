const gameBoard = (() => {
    const fieldArray = ["x"," ","x","x","x"," "," "," ","x"];
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
    const addEvents = () => {
        gameFields.forEach((field, index) => field.addEventListener("click", e => {
            if(gameBoard.fieldArray[index]===" "){
                field.textContent= "x"
                gameBoard.fieldArray[index] = "x"
            }
        }))
    }
    return {createField, addEvents}
})();

displayControl.createField()
displayControl.addEvents()
// add eventlisteners to nodelist
/* 
player1 starts, uses "x"
click on gameFields --> "x"
                    --> "o"
replaces gameFields index in fieldArray (unless fieldArray[i]==!" ")
    validClickCounter++ 
        validClickCounter goes from 0-9
update the game: displayControl.createField
if(validClickCounter%2==!0||validClickCounter===0) (uneven number) it is player1 turn


*/
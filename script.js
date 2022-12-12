const gameBoard = (() => {
    const fieldArray = [" "," "," "," "," "," "," "," "," "];
    const gameActive = true
    return {fieldArray, gameActive}
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
    const modal = document.querySelector(".modal")
    const resultMessage = document.querySelector(".resultMessage")

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
                    field.classList.add("filled")
                }
                if(!checkForWin()){
                    checkForDraw()
                }
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
            gameBoard.gameActive = false
            modal.classList.add("modalActive")
            resultMessage.classList.add("modalActive")
            
            return true
        }
    }
    const checkForDraw = () => {
        let drawCounter = 0
            for(let i=0; i<gameBoard.fieldArray.length; i++){
                if(gameBoard.fieldArray[i]!==" "){
                    drawCounter++
                }  
            }
        if(drawCounter === 9){
            alert("draw")
        } 
        return {drawCounter}
    }
    const deactivateField = () => {
        gameFields.forEach((field, index) => field.removeEventListener("click", makeMark)) //not working
    }
    return {createField, addEvents, checkForDraw, deactivateField}
})();

displayControl.createField()
displayControl.addEvents()

/* 


highlight the winning combination?
display win message
    show which player won
    close modal on click
        clear field (empty array and field)


*/
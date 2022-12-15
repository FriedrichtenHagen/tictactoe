const gameBoard = (() => {
    const fieldArray = [" "," "," "," "," "," "," "," "," "];
    const gameActive = true
    return {fieldArray, gameActive}
})();

const player = (name) => {
    this.name = name;
    this.score = 0;
    return {name, score}
}
const player1 = player("Fred");
const player2 = player("Johannes");


const displayControl = (() => {
    const gameFields = document.querySelectorAll(".gameField")
    const modal = document.querySelector(".modal")
    const resultMessage = document.querySelector(".resultMessage")
    const scoreX = document.querySelector(".scoreX")
    const scoreY = document.querySelector(".scoreY")

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
                        // start robots move
                        robotMoves()
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
            (gameBoard.fieldArray[6]==="x"&&gameBoard.fieldArray[4]==="x"&&gameBoard.fieldArray[2]==="x")){
                // activate modal
                modal.classList.add("modalActive")
                resultMessage.classList.add("modalActive")
                // enter win Message
                resultMessage.textContent = `x wins!`
                player1.score++
                displayScore()
                return true
            }
            else if(
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
            (gameBoard.fieldArray[6]==="o"&&gameBoard.fieldArray[4]==="o"&&gameBoard.fieldArray[2]==="o")){
                // activate modal
                modal.classList.add("modalActive")
                resultMessage.classList.add("modalActive")
                // enter win Message
                resultMessage.textContent = `o wins!`
                player2.score++
                displayScore()
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
            // display draw message
            // activate modal
            modal.classList.add("modalActive")
            resultMessage.classList.add("modalActive")
            // enter win Message
            resultMessage.textContent = `It's a draw!`
        } 
        return {drawCounter}
    }
    const deactivateField = () => {
        gameFields.forEach((field, index) => field.removeEventListener("click", makeMark)) //not working
    }

    const restartGame = () => {
        // empty array
        gameBoard.fieldArray = [" "," "," "," "," "," "," "," "," "];
        // empty fields
        gameFields.forEach((field) => {
            field.textContent = ""
            field.classList.remove("filled")
        })
        // deactivate modal
        modal.classList.remove("modalActive")
        resultMessage.classList.remove("modalActive")
    }
    modal.addEventListener("click", restartGame)
    resultMessage.addEventListener("click", restartGame)

    // function for displaying score
    const displayScore = () => {
        scoreX.textContent = player1.score
        scoreY.textContent = player2.score
    }

    const robotMoves = () => {
        // random move: choose num between 0 and 8
        let randomMove = Math.floor(Math.random() * 8) + 1
        // if illegal, choose again 

        // add move to array
        gameBoard.fieldArray[randomMove] = "o"
        // make move in DOM
        gameFields[randomMove].textContent = "o"
        gameFields[randomMove].classList.add("filled")
        // count the move
        validClickCounter++

    }

    return {createField, addEvents, checkForDraw, deactivateField}
})();

displayControl.createField()
displayControl.addEvents()

/* 


highlight the winning combination?
*/
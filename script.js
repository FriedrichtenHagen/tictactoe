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



    const addEvents = () => {
        let makeMark = function(field, index){
            return function curriedFunc(e){
                if(gameBoard.fieldArray[index]===" "){           
                    field.textContent= "x"
                    gameBoard.fieldArray[index] = "x"
                    //field.removeEventListener("click", makeMark)
                    field.classList.add("filled")
                
                    // check for win or draw
                    if(checkForWin()!=="x" && checkForWin()!=="o" && checkForDraw()!=="draw" ){
                        // start robots move
                        setTimeout(robotMoves, 500);
                    }
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
                return "x"
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
                return "o"
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
            return "draw"
        } 
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
        // if illegal, choose again 
        let randomMove = 0 // starter value, will be immediately overwriten
        do{
            randomMove = Math.floor(Math.random() * 8) + 1
        }while(gameBoard.fieldArray[randomMove]!==" ")

        // add move to array
        gameBoard.fieldArray[randomMove] = "o"
        // make move in DOM
        gameFields[randomMove].textContent = "o"
        gameFields[randomMove].classList.add("filled")

        // check for win or draw
        if(checkForWin()!=="o" && checkForWin()!=="x"){
            checkForDraw()
        }
    }
    const unbeatableMoves = () => {
        // current Player
        let activePlayerX = true  
        // save bestScore in a variable
        let bestScore = -Infinity
        // save bestMove in a variable
        let bestMove;
        // go through all possible moves
        for(let i=0; i<gameBoard.fieldArray.length; i++){
            // check if field is available
            if(gameBoard.fieldArray[i]===" "){
                // ai makes a move, to be evaluated
                gameBoard.fieldArray[i]="o"
                // find best possible move
                let score = minimax(0, true)
                // undo the tested move
                gameBoard.fieldArray[i]=" "
                // update bestMove and bestScore
                if(score > bestScore){
                    bestScore=score
                    bestMove=i
                }
            }
        }
        gameBoard.fieldArray[bestMove]="o"
        // make move in DOM
        gameFields[bestMove].textContent = "o"
        gameFields[bestMove].classList.add("filled")

        // minimax algorithm


    }
    let scores = {
        x : 1,
        o : -1,
        tie : 0,
    }
    const minimax = (depth, isMinimizing) => {
        // if leaf node is reached(win, loss or draw) return a corresponding score (1,-1, 0)
        result = checkForWin()
        if(result !== null){
            let score = scores[result]
            return score
        }
        // choose the next move for o
        if(isMinimizing){
            for(let i=0; i<gameBoard.fieldArray.length; i++){
                // check if field is available
                if(gameBoard.fieldArray[i]===" "){
                    // ai makes a move, to be evaluated
                    gameBoard.fieldArray[i]="o"
                    // find best possible move
                    let score = minimax(0, false)
                    // undo the tested move
                    gameBoard.fieldArray[i]=" "
                    // update bestMove and bestScore
                    if(score > bestScore){
                        bestScore=score
                        bestMove=i
                    }
                }
            }
        }
        
    }

    return {createField, addEvents, checkForDraw, checkForWin, unbeatableMoves}
})();

displayControl.createField()
displayControl.addEvents()

/* 


highlight the winning combination?

create a unbeatable algorithm using minimax algo
https://www.neverstopbuilding.com/blog/minimax
https://www.geeksforgeeks.org/introduction-to-evaluation-function-of-minimax-algorithm-in-game-theory/
https://www.youtube.com/watch?v=trKjYdBASyQ


make the ai play to lose
invert depth to apply different skill levels
*/
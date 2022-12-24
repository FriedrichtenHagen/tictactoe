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
                        // setTimeout(robotMoves, 500);
                        unbeatableMoves()
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
                player1.score++
                activateModal("x")
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
                player2.score++
                activateModal("o")
                return "o"
        }
        return null // no winner
    }
    const checkForDraw = () => {
        let drawCounter = 0
            for(let i=0; i<gameBoard.fieldArray.length; i++){
                if(gameBoard.fieldArray[i]!==" "){
                    drawCounter++
                }  
            }
        if(drawCounter === 9){
            activateModal("draw")
            return "draw"
        } 
        return null
    }
    const activateModal = (result) => {
        // activate modal
        modal.classList.add("modalActive")
        resultMessage.classList.add("modalActive")
        // enter win Message
        if(result==="x"){
            resultMessage.textContent = `x wins!`
        }
        else if(result==="o"){
            resultMessage.textContent = `o wins!`
        }
        else if(result==="draw"){
            resultMessage.textContent = `It's a draw!`
        }
        displayScore()
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
                // find best possible move (for x, maximizing)
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
    }
    let scores = {
        x : 1,
        o : -1,
        draw : 0,
    }
    const minimax = (depth, isMaximizing) => {
        
        // if leaf node is reached(win, loss or draw) return a corresponding score (1,-1, 0)
        let result = checkForWin()
        if(result !== null){
            return scores[result]
        }
        let drawCheck = checkForDraw()
        if(drawCheck !== null){
            return scores[drawCheck]
        }
        
        // choose the next move
        if(isMaximizing){
            console.log("max")
            let bestScore = -Infinity
            
            for(let i=0; i<gameBoard.fieldArray.length; i++){
                // check if field is available
                if(gameBoard.fieldArray[i]===" "){
                    // x makes a move, to be evaluated
                    gameBoard.fieldArray[i]="x"
                    // find next, best possible move for o
                    let score = minimax(depth + 1, false)
                    // undo the tested move
                    gameBoard.fieldArray[i]=" "
                    // update bestMove and bestScore
                    bestScore = Math.max(score, bestScore)
                }
            }
            return bestScore
        } else { // is minimizing
            console.log("min")
            let bestScore = Infinity
            for(let i=0; i<gameBoard.fieldArray.length; i++){
                // check if field is available
                if(gameBoard.fieldArray[i]===" "){
                    // ai(o) makes a move, to be evaluated
                    gameBoard.fieldArray[i]="o"
                    // find next, best possible move for x
                    let score = minimax(depth + 1, true)
                    // undo the tested move
                    gameBoard.fieldArray[i]=" "
                    // update bestMove and bestScore
                    bestScore = Math.min(score, bestScore)
                }
            }
            return bestScore;
        }  
        return "test"
    }

    return {createField, addEvents, checkForDraw, checkForWin, unbeatableMoves, minimax}
})();

displayControl.createField()
displayControl.addEvents()

/* 


highlight the winning combination?

create a unbeatable algorithm using minimax algo
https://www.neverstopbuilding.com/blog/minimax
https://www.geeksforgeeks.org/introduction-to-evaluation-function-of-minimax-algorithm-in-game-theory/
https://www.youtube.com/watch?v=trKjYdBASyQ

separate the win/lose/draw message from the evaluation function

seperate any dom manipulation (and player score changes) from the check for win function

this allows the minimax to call these functions, without the results being displayed


make the ai play to lose
invert depth to apply different skill levels
*/
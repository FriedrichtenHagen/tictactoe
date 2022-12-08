const gameBoard = (() => {
    const fieldArray = [];
    return {fieldArray}
})();

function player(name){
    this.name = name;
    return {name}
}

const displayControl = (() => {
    const createField = () => {
        alert("test")
    }
    return {createField}
})();

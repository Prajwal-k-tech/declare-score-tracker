let players = [];
let scores = [];
function setupGame(){
    //A function to set the game board up
    const num = parseInt(document.getElementById("numPlayers").value);//should take it from the input field
    scores = Array(num).fill(0); //make the scores 0 initially
    players = Array(num);
    //I just want to let the players be player 1, player 2, player 3, etc
    for(let i = 0; i < num; i++){
        players[i] = "Player " + (i+1);
    }
    renderTable();
}
function renderTable(){
    //A function to render the table
    document.getElementById("scoreboard").style.display = "block";
    document.getElementById("results").display = "none";
    const tableHead = document.getElementById("tableHead");
    const tableBody = document.getElementById("tableBody");
    tableHead.innerHTML = `<tr><th>Round</th>${players.map(p => `<th>${p}</th>`).join('')}</tr>`; ///this maps over players array
    tableBody.innerHTML = " ";
    addNewRound();
}
function addNewRound() {
    const tableBody = document.getElementById("tableBody");
    const row = document.createElement("tr");

    // Create round number column
    const roundCell = document.createElement("td");
    roundCell.textContent = `Round ${tableBody.children.length + 1}`;
    row.appendChild(roundCell);

    // Create input fields for each player
    for (let i = 0; i < players.length; i++) {
        const cell = document.createElement("td");
        const input = document.createElement("input");
        input.type = "number";
        input.id = `score-${i}`;
        input.style.width = "60px";
        input.style.textAlign = "center";
        cell.appendChild(input);
        row.appendChild(cell);
    }

    tableBody.appendChild(row);
}
function nextRound(){
    for(let i = 0; i < players.length; i++){
        const score = document.getElementById(`score-${i}`).value;
        scores[i] += parseInt(score);
    }
    addNewRound();
}
function declareWinner() {
    document.getElementById("results").style.display = "block";

    const sortedPlayers = players.map((p, i) => ({ name: p, score: scores[i] }))
        .sort((a, b) => a.score - b.score);

    document.getElementById("winner").innerHTML = `Winner: ${sortedPlayers[0].name} with ${sortedPlayers[0].score} points`;
    document.getElementById("runnerUp").innerHTML = `Runner-up: ${sortedPlayers[1].name} with ${sortedPlayers[1].score} points`;
    document.getElementById("loser").innerHTML = `Loser: ${sortedPlayers[sortedPlayers.length - 1].name} with ${sortedPlayers[sortedPlayers.length - 1].score} points, Lmao you suck`;

    document.getElementById("restartButton").style.display = "block";
}

function newGame() {
    document.getElementById("scoreboard").style.display = "none";
    document.getElementById("results").style.display = "none";
    document.getElementById("restartButton").style.display = "none";
    document.getElementById("tableBody").innerHTML = "";
    document.getElementById("tableHead").innerHTML = "";
    players = [];
    scores = [];
}


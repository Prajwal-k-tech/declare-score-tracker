let players = [];

function setupGame() {
    const count = Number(document.getElementById("numPlayers").value);
    if (!Number.isInteger(count) || count < 2 || count > 12) {
        alert("Choose between 2 and 12 players.");
        return;
    }
    players = Array.from({length: count}, (_, i) => `Player ${i + 1}`);
    document.getElementById("results").style.display = "none";
    document.getElementById("scoreboard").style.display = "block";
    document.getElementById("tableHead").innerHTML =
        `<tr><th>Round</th>${players.map(name => `<th>${name}</th>`).join("")}</tr>`;
    document.getElementById("tableBody").replaceChildren();
    addNewRound();
}

function addNewRound() {
    const body = document.getElementById("tableBody");
    const row = document.createElement("tr");
    const label = document.createElement("td");
    label.textContent = `Round ${body.children.length + 1}`;
    row.appendChild(label);
    players.forEach(name => {
        const cell = document.createElement("td");
        const input = document.createElement("input");
        input.type = "number";
        input.step = "1";
        input.style.width = "60px";
        input.style.textAlign = "center";
        input.setAttribute("aria-label", `${name}, ${label.textContent}`);
        cell.appendChild(input);
        row.appendChild(cell);
    });
    body.appendChild(row);
}

function collectScores() {
    const scores = Array(players.length).fill(0);
    for (const row of document.getElementById("tableBody").children) {
        for (const [i, input] of [...row.querySelectorAll("input")].entries()) {
            const value = input.value.trim() === "" ? 0 : Number(input.value);
            if (input.validity.badInput || !Number.isSafeInteger(value) ||
                !Number.isSafeInteger(scores[i] + value)) {
                alert("Enter a valid whole-number score for each player. Blank scores count as zero.");
                input.focus();
                return null;
            }
            scores[i] += value;
        }
    }
    return scores;
}

function nextRound() {
    if (!players.length || collectScores() === null) return;
    document.getElementById("results").style.display = "none";
    addNewRound();
}

function declareWinner() {
    if (!players.length) return;
    const scores = collectScores();
    if (scores === null) return;
    const totals = [...new Set(scores)].sort((a, b) => a - b);
    const namesAt = score => players.filter((_, i) => scores[i] === score).join(", ");
    document.getElementById("winner").textContent =
        `Winner: ${namesAt(totals[0])} with ${totals[0]} points`;
    document.getElementById("runnerUp").textContent = totals.length > 1
        ? `Runner-up: ${namesAt(totals[1])} with ${totals[1]} points`
        : "All players are tied.";
    document.getElementById("loser").textContent = totals.length > 1
        ? `Highest total: ${namesAt(totals[totals.length - 1])} with ${totals[totals.length - 1]} points`
        : "";
    document.getElementById("results").style.display = "block";
    document.getElementById("restartButton").style.display = "block";
}

function newGame() {
    document.getElementById("scoreboard").style.display = "none";
    document.getElementById("results").style.display = "none";
    document.getElementById("restartButton").style.display = "none";
    document.getElementById("tableBody").replaceChildren();
    document.getElementById("tableHead").replaceChildren();
    players = [];
}

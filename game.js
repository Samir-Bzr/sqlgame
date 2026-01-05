// ===== Game State =====
const player = {
    name: "Data Warrior",
    hp: 100,
    xp: 0,
    level: 1,
    inventory: []
};

let currentLevel = 1;
let failCount = 0;

// ===== Mock Database =====
const mockDB = {
    heroes: [
        { id: 1, name: "Alice", hp: 50 },
        { id: 2, name: "Bob", hp: 70 }
    ],
    monsters: [
        { id: 1, name: "Goblin", hp: 30 },
        { id: 2, name: "Orc", hp: 50 }
    ],
    items: [
        { id: 1, name: "Sword", power: 10 },
        { id: 2, name: "Shield", defense: 5 }
    ],
    quests: [
        { id: 1, name: "Retrieve Artifact", reward: 50 },
        { id: 2, name: "Defeat Goblin", reward: 30 }
    ]
};

// ===== Levels =====
const levels = [
    { level: 1, concept: "SELECT basics", table: "heroes", task: "Retrieve all records from heroes" },
    { level: 2, concept: "WHERE clause", table: "monsters", task: "Retrieve monsters with hp > 40" },
    { level: 3, concept: "ORDER BY", table: "heroes", task: "Retrieve all heroes ordered by hp descending" },
    { level: 4, concept: "Aggregate functions", table: "heroes", task: "Count the number of heroes" },
    { level: 5, concept: "GROUP BY", table: "items", task: "Group items by name and count them" },
    { level: 6, concept: "JOIN operations", table: "heroes", task: "Join heroes and items on id" },
    { level: 7, concept: "Complex query", table: "monsters", task: "Select monsters with hp < 50 and name starting with 'G'" }
];

// ===== Game Log =====
const gameLog = document.getElementById("game-log");
function log(message) {
    gameLog.innerHTML += message + "<br>";
    gameLog.scrollTop = gameLog.scrollHeight;
}

// ===== Player Stats =====
function updateStats() {
    document.getElementById("player-stats").innerHTML =
        `Level: ${player.level} | HP: ${player.hp} | XP: ${player.xp} | Quest: ${levels[currentLevel-1].task}`;
}

// ===== SQL Parser & Validator =====
function parseSQL(query) {
    const normalized = query.trim().toUpperCase();
    const levelObj = levels[currentLevel - 1];
    const table = levelObj.table.toUpperCase();

    if(currentLevel === 1 && normalized === `SELECT * FROM ${table}`) return true;
    if(currentLevel === 2 && normalized === `SELECT * FROM ${table} WHERE HP > 40`) return true;
    if(currentLevel === 3 && normalized === `SELECT * FROM ${table} ORDER BY HP DESC`) return true;
    if(currentLevel === 4 && normalized === `SELECT COUNT(*) FROM ${table}`) return true;
    if(currentLevel === 5 && normalized === `SELECT NAME, COUNT(*) FROM ${table} GROUP BY NAME`) return true;
    if(currentLevel === 6 && normalized === `SELECT HEROES.ID, HEROES.NAME, ITEMS.NAME FROM HEROES JOIN ITEMS ON HEROES.ID = ITEMS.ID`) return true;
    if(currentLevel === 7 && normalized === `SELECT * FROM ${table} WHERE HP < 50 AND NAME LIKE 'G%'`) return true;

    return false;
}

// ===== Hint System =====
const hints = [
    "Check your SELECT statement.",
    "Remember the WHERE clause syntax.",
    "Try using ORDER BY with DESC.",
    "Aggregate functions like COUNT can help.",
    "GROUP BY groups records based on a column.",
    "JOIN combines tables on a common field.",
    "Combine WHERE with LIKE for complex filters."
];

function showHint() {
    failCount++;
    log(`💡 Hint: ${hints[currentLevel - 1]} (Attempts: ${failCount})`);
}

// ===== Query Submission =====
function submitQuery() {
    const query = document.getElementById("sql-query").value;
    if(parseSQL(query)) {
        log(`✅ Correct! Level ${currentLevel} complete.`);
        player.xp += 50;
        player.level += 1;
        currentLevel++;
        failCount = 0;

        if(currentLevel > levels.length) {
            log("🎉 Congratulations! You completed SQL Quest RPG!");
        } else {
            log(`Next Quest: ${levels[currentLevel-1].task}`);
        }
    } else {
        failCount++;
        log(`❌ Incorrect query. Use the Hint button if stuck!`);
    }
    updateStats();
    document.getElementById("sql-query").value = "";
}

// ===== Canvas Rendering =====
const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

function renderGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Player
    ctx.fillStyle = "#27ae60";
    ctx.fillRect(50, 200, 50, 50);
    ctx.fillStyle = "#fff";
    ctx.font = "14px Arial";
    ctx.fillText("Player", 55, 195);

    // Quest / Enemy
    ctx.fillStyle = "#e74c3c";
    ctx.fillRect(500, 200, 50, 50);
    ctx.fillStyle = "#fff";
    ctx.fillText("Quest", 505, 195);

    // Flash on failed attempts
    if(failCount > 0) {
        ctx.strokeStyle = "yellow";
        ctx.lineWidth = 3;
        ctx.strokeRect(50, 200, 50, 50);
    }
}

// ===== Game Loop =====
function gameLoop() {
    renderGame();
    updateStats();
}
setInterval(gameLoop, 100);
updateStats();
log(`Welcome to SQL Quest RPG! Your first quest: ${levels[0].task}`);
// ===== Unlockable Tables =====
const unlockedTables = {
    heroes: false,
    monsters: false,
    items: false,
    quests: false
};

// ===== Helper: Render Table =====
function renderTable(tableName, data) {
    const container = document.getElementById("table-container");
    container.innerHTML = ""; // clear previous

    if(!data || data.length === 0) {
        container.innerHTML = `<p>No data to display.</p>`;
        return;
    }

    const table = document.createElement("table");
    table.style.width = "100%";
    table.style.borderCollapse = "collapse";
    table.style.marginTop = "10px";

    // Table header
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    Object.keys(data[0]).forEach(col => {
        const th = document.createElement("th");
        th.textContent = col;
        th.style.border = "1px solid #fff";
        th.style.padding = "5px";
        th.style.backgroundColor = "rgba(255,255,255,0.2)";
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Table body
    const tbody = document.createElement("tbody");
    data.forEach(row => {
        const tr = document.createElement("tr");
        Object.values(row).forEach(cell => {
            const td = document.createElement("td");
            td.textContent = cell;
            td.style.border = "1px solid #fff";
            td.style.padding = "5px";
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
    table.appendChild(tbody);

    container.appendChild(table);
}

// ===== Unlock Table View Button =====
function unlockTable(tableName) {
    unlockedTables[tableName] = true;
    const container = document.getElementById("table-container");
    const btn = document.createElement("button");
    btn.textContent = `View ${tableName}`;
    btn.style.marginTop = "10px";
    btn.style.padding = "8px 12px";
    btn.style.border = "none";
    btn.style.borderRadius = "6px";
    btn.style.backgroundColor = "#3498db";
    btn.style.color = "#fff";
    btn.style.cursor = "pointer";
    btn.onclick = () => renderTable(tableName, mockDB[tableName]);
    container.appendChild(btn);
}

// ===== Modified submitQuery to Unlock Tables & Show Results =====
function submitQuery() {
    const query = document.getElementById("sql-query").value;
    const levelObj = levels[currentLevel - 1];
    const tableName = levelObj.table;

    if(parseSQL(query)) {
        log(`✅ Correct! Level ${currentLevel} complete.`);
        player.xp += 50;
        player.level += 1;

        // Unlock the table if not yet unlocked
        if(!unlockedTables[tableName]) {
            unlockTable(tableName);
            log(`🔓 You unlocked a view for table: ${tableName}`);
        }

        // Show query result visually (for simplicity, show full table for now)
        renderTable(tableName, mockDB[tableName]);

        currentLevel++;
        failCount = 0;

        if(currentLevel > levels.length) {
            log("🎉 Congratulations! You completed SQL Quest RPG!");
        } else {
            log(`Next Quest: ${levels[currentLevel-1].task}`);
        }
    } else {
        failCount++;
        log(`❌ Incorrect query. Use the Hint button if stuck!`);
    }

    updateStats();
    document.getElementById("sql-query").value = "";
}

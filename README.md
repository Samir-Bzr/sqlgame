# sqlgame
is an **educational browser-based RPG** designed to teach SQL concepts in a fun and interactive way. Players progress through levels, complete quests, and unlock table views by writing SQL queries—all without requiring a real database.

The game is built with **HTML, CSS, and JavaScript**, and runs fully locally.

---

## **🎮 Game Concept**

* You are the **Data Warrior**, navigating a world of monsters, heroes, items, and quests.
* Each level represents a **SQL challenge**—like `SELECT`, `WHERE`, `JOIN`, or `GROUP BY`.
* Correct queries allow you to progress, earn XP, and unlock **table views** for exploration.
* The game simulates a database using **JavaScript objects and arrays**, so no backend or database setup is needed.

---

## **🛠 Features**

### **Core Gameplay**

* **7 progressive levels** teaching SQL basics to more complex queries.
* **RPG-themed visuals**: player, quest icons, and flashing effects for feedback.
* **Player stats**: HP, XP, Level, and current quest.
* **Game log**: Shows success, failures, and hints.

### **SQL Learning**

* **SQL Parser & Validator**: Checks queries against level objectives.
* **Dynamic Hints**: Context-aware hints available via a **Hint button**.
* **Visual Table Representation**: Shows query results as HTML tables.
* **Unlockable Views**: Players unlock table views as they progress through levels.

### **AI Optimization**

* Tracks failed attempts and provides hints.
* Flashing visual cues on the canvas for incorrect queries.
* Levels are progressively harder, but hints and table unlocks reduce frustration.

---

## **📚 Level Progression**

| Level | SQL Concept         | Task                                                        |
| ----- | ------------------- | ----------------------------------------------------------- |
| 1     | SELECT basics       | Retrieve all records from `heroes`                          |
| 2     | WHERE clause        | Retrieve `monsters` with `hp > 40`                          |
| 3     | ORDER BY            | Retrieve all `heroes` ordered by `hp` descending            |
| 4     | Aggregate functions | Count the number of `heroes`                                |
| 5     | GROUP BY            | Group `items` by name and count them                        |
| 6     | JOIN operations     | Join `heroes` and `items` on `id`                           |
| 7     | Complex query       | Select `monsters` with `hp < 50` and name starting with 'G' |

---

## **🗃 Data Structure**

The game uses a **mock in-memory database**:

```javascript
const mockDB = {
    heroes: [{ id: 1, name: "Alice", hp: 50 }, { id: 2, name: "Bob", hp: 70 }],
    monsters: [{ id: 1, name: "Goblin", hp: 30 }, { id: 2, name: "Orc", hp: 50 }],
    items: [{ id: 1, name: "Sword", power: 10 }, { id: 2, name: "Shield", defense: 5 }],
    quests: [{ id: 1, name: "Retrieve Artifact", reward: 50 }, { id: 2, name: "Defeat Goblin", reward: 30 }]
};
```

* Tables: `heroes`, `monsters`, `items`, `quests`.
* Relationships: Join `heroes` with `items` on `id` for learning `JOIN`.

---

## **🧩 Game Logic**

1. **Level Tracking**

   * The current level is tracked via `currentLevel`.
   * Each level has an objective (SQL concept + task).

2. **Query Submission**

   * Player writes a query in the input box and clicks **Submit**.
   * The query is validated against the level’s expected SQL.
   * If correct: XP is awarded, the level progresses, and relevant table views are unlocked.
   * If incorrect: the player can request a hint via the **Hint button**.

3. **Unlockable Table Views**

   * Each table is **locked** initially.
   * When the level using the table is completed, a **“View Table” button** appears.
   * Clicking it displays the table’s data in a styled HTML table.

4. **Visual Feedback**

   * Player and quest icons are drawn on `<canvas>`.
   * Flashing player icon indicates failed attempts.
   * Logs show actions, hints, and achievements.

5. **Hint System**

   * Each level has a **predefined hint**.
   * Hints are accessed via the **Hint button** and count the number of attempts.

---

## **💻 How to Run Locally**

1. **Clone the repository**

```bash
git clone https://github.com/Samir-Bzr/sqlgame.git
cd sqlgame
```

2. **Open the game in a browser**

* Open `index.html` with any modern browser (Chrome, Firefox, Edge).
* No installation or backend required.

---

## **📦 File Structure**

```
sql-quest-rpg/
│
├── index.html          # Main game page
├── game.js             # JavaScript logic and SQL simulation
└── README.md           # Documentation (this file)
```

---

## **🎯 Future Improvements**

* **Dynamic SQL parser**: Allow multiple valid query formats.
* **Interactive tables**: Select and filter data like a real database.
* **Inventory system**: Collect items and use them to defeat monsters.
* **Visual animations**: RPG-style movement and battle effects.

---

## **👾 Screenshot / Example**

```
Player Stats: Level 1 | HP: 100 | XP: 0
Quest: Retrieve all records from heroes

Game Log:
✅ Correct! Level 1 complete.
🔓 You unlocked a view for table: heroes

[HTML Table Displays Heroes]
```



-

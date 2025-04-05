var button = document.getElementById("btn");
var text = document.getElementById("text");

var restart = document.getElementById("restart");
var autoCliker = document.getElementById("auto");
var lvlUp = document.getElementById("lvlUp");

var saveBTN = document.getElementById("save");
var loadBTN = document.getElementById("load");

var score = 0;
var autoClickActive = false;

var autoClickPrice = 50;
var lvlUpPrice = 35;

var autoClickerPower = 0;
var clickPower = 1;

function updateScoreColor() {
    text.style.transition = "color 0.5s ease-in-out";
    text.style.color = "red";

    setTimeout(() => {
        text.style.color = "";
    }, 500);
}

function changeColorToRed(button) {
    button.classList.add("red", "shake");

    setTimeout(() => {
        button.classList.remove("red", "shake");
    }, 500);
}

function changeButtonColorToGreen(button) {
    button.style.backgroundColor = "green";
    button.style.color = "white";
    setTimeout(() => {
        button.style.backgroundColor = "";
        button.style.color = "";
    }, 1000);
}

function autoClickFunction() {
    if (score >= autoClickPrice) {
        score -= autoClickPrice;
        text.innerText = "Score: " + score;
        updateScoreColor();

        if (!autoClickActive) {
            autoClickActive = true;
            autoCliker.innerText = "Upgrade Auto Clicker: (" + autoClickPrice + "$)";
            
            setInterval(() => {
                score += autoClickerPower;
                text.innerText = "Score: " + score;
            }, 1000);
        }

        autoClickPrice += 50;
        autoClickerPower++;
        autoCliker.innerText = "Upgrade Auto Clicker: (" + autoClickPrice + "$)";
        
        changeButtonColorToGreen(autoCliker);
    } else {
        changeColorToRed(autoCliker);
    }
}

function levelUpFunction() {
    if (score >= lvlUpPrice) {
        score -= lvlUpPrice;
        text.innerText = "Score: " + score;
        updateScoreColor();

        clickPower++;
        lvlUpPrice += 35;
        button.textContent = "Click: (" + clickPower + ")";
        lvlUp.innerText = "Upgrade Click Power: (" + lvlUpPrice + "$)";
        
        changeButtonColorToGreen(lvlUp);
    } else {
        changeColorToRed(lvlUp);
    }
}

function saveGame() {
    var gameData = `
Score: ${score}
Auto Clicker Price: ${autoClickPrice}
Level Up Price: ${lvlUpPrice}
Auto Clicker Power: ${autoClickerPower}
Click Power: ${clickPower}
`;

    var blob = new Blob([gameData], { type: 'text/plain' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = "game_save.txt";
    a.click();
    URL.revokeObjectURL(url);
}

function loadGame() {
    var gameDataText = prompt("Please paste your saved game data from the .txt file:");

    if (gameDataText) {
        try {
            var gameData = gameDataText.split('\n');

            score = parseInt(gameData[0].split(": ")[1]);
            autoClickPrice = parseInt(gameData[1].split(": ")[1]);
            lvlUpPrice = parseInt(gameData[2].split(": ")[1]);
            autoClickerPower = parseInt(gameData[3].split(": ")[1]);
            clickPower = parseInt(gameData[4].split(": ")[1]);

            text.innerText = "Score: " + score;
            autoCliker.innerText = "Upgrade Auto Clicker: (" + autoClickPrice + "$)";
            lvlUp.innerText = "Upgrade Click Power: (" + lvlUpPrice + "$)";
            button.textContent = "Click: (" + clickPower + ")";
        } catch (e) {
            alert("Invalid data. Please check the format of the text you pasted.");
        }
    } else {
        alert("No data was pasted. Please try again.");
    }
}

autoCliker.onclick = function() {
    autoClickFunction();
};

lvlUp.onclick = function() {
    levelUpFunction();
};

restart.onclick = function() {
    location.reload();
};

button.onclick = function() {
    score += clickPower;
    text.innerText = "Score: " + score;
};

autoCliker.innerText = "Buy Auto Clicker: (" + autoClickPrice + "$)";
lvlUp.innerText = "Upgrade Click Power: (" + lvlUpPrice + "$)";

saveBTN.onclick = saveGame;
loadBTN.onclick = loadGame;

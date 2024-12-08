let motActuel = "";
let lettreMasquer = "";
let score = 0;
let niveau = 1;
let motsTrouves = 0;
let tempsRestant = 100;
let timerInterval;

// Liste des mots
const mots = [
    "aimer", "bête", "chambre", "danger", "école", "fort", "grand", "homme", "île", "jardin",
    "kilo", "lire", "manger", "nager", "orange", "porte", "quitter", "rire", "savoir", "tomber",
    "un", "vent", "wagon", "xylophone", "yeux", "zéro", "abaisser", "battre", "cacher", "dormir",
    "écrire", "faire", "gagner", "habiter", "ignorer", "jeter", "laver", "manger", "nettoyer",
    "ouvrir", "parler", "regarder", "salir", "tenir", "utiliser", "vendre", "xérophile", "yoga",
    "zapper", "actif", "bien", "courage", "diligent", "énergie", "fou", "générosité", "heureux",
    "intelligent", "juste", "kinder", "loyal", "modeste", "neutre", "optimiste", "puissant",
    "quasi", "respectueux", "sincère", "tranquille", "utile", "volontaire", "zélé", "analyser",
    "briser", "construire", "désirer", "employer", "former", "générer", "hésiter", "ignorer",
    "jouer", "lancer", "marcher", "naviguer", "ouvrir", "penser", "quitter", "réfléchir", "suggérer",
    "tuer", "vendre", "respecter", "yarder", "zoomer", "abandonner", "bouger", "cacher", "démarrer",
    "abandon", "abeille", "abord", "absolu", "accepter", "addition", "affaire", "agriculture", "aider", "alarme",
    "amour", "animal", "ancien", "apprendre", "argent", "aventure", "bizarre", "blesser", "bonheur", "calmer",
    "cancer", "caractère", "chiffre", "chose", "clair", "claire", "cloche", "combat", "commencer", "commerce",
    "comprendre", "conseil", "construire", "danger", "décider", "délirer", "demander", "écrire", "élément", "énergie",
    "essayer", "exemple", "exception", "explorer", "famille", "femme", "fier", "fille", "froid", "gagner",
    "grandeur", "guerre", "honneur", "horizon", "hôpital", "idée", "important", "invention", "intégrer", "isoler",
    "jardin", "jamais", "joie", "jouer", "jour", "juste", "légende", "lien", "lire", "lourd", "manger",
    "marcher", "matin", "mélange", "merveille", "moderne", "moteur", "mouvement", "mystère", "nature", "navire",
    "noble", "nouveau", "obstacle", "occasion", "opération", "oublier", "parler", "patience", "perdre", "placer",
    "pluie", "poids", "point", "porter", "prévoir", "progrès", "promesse", "quitter", "raison", "reconnaître",
    "régime", "rien", "saison", "savoir", "sécurité", "simple", "sorte", "souscrire", "souvenir", "système",
    "tableau", "tactique", "téléphone", "tempête", "traduction", "très", "vache", "valeur", "valise", "vitesse",
    "voler", "vrai", "zéro"
];

const alphabet = "abcdefghijklmnopqrstuvwxyzêéèàùî";

// Initialiser le clavier
const clavier = document.getElementById("clavier");
alphabet.split("").forEach(letter => {
    const key = document.createElement("button");
    key.classList.add("key");
    key.textContent = letter;
    key.onclick = () => guessLetter(letter, key);
    clavier.appendChild(key);
});

// Mettre à jour le score et le niveau
function updateScoreAndLevel() {
    document.getElementById("score").textContent = score;
    document.getElementById("level").textContent = niveau;
}

// Choisir un mot aléatoire et cacher une lettre
function motHasard() {
    motActuel = mots[Math.floor(Math.random() * mots.length)];
    const randomIndex = Math.floor(Math.random() * motActuel.length);
    lettreMasquer = motActuel[randomIndex];
    const displayedWord = motActuel.replace(lettreMasquer, "_");
    document.getElementById("mot").textContent = displayedWord;
    document.getElementById("msg").textContent = "Trouvez la lettre manquante!";
}

// Vérifier la lettre devinée
function guessLetter(letter, key) {
    const motDisplay = document.getElementById("mot").textContent.split("");

    if (letter === lettreMasquer) {
        score += 10;
        motsTrouves++;
        motDisplay[motDisplay.indexOf("_")] = letter;
        document.getElementById("mot").textContent = motDisplay.join("");
        document.getElementById("msg").textContent = "Bonne réponse!";
        key.classList.add("correct");
        setTimeout(() => key.classList.remove("correct"), 300);

        // Vérification du niveau
        if (motsTrouves >= 10) {
            niveau++;
            motsTrouves = 0;
            score = 0;
            updateScoreAndLevel();
        }

    } else {
        // Si la lettre est incorrecte, diminuer le score
        score = Math.max(0, score - 5); // Réduit de 5 points mais pas en dessous de 0
        key.classList.add("incorrect");
        setTimeout(() => key.classList.remove("incorrect"), 900);
        document.getElementById("msg").textContent = `Échec! Le mot correct était "${motActuel}".`;


        // Afficher un nouveau mot après une mauvaise réponse
        setTimeout(() => motHasard(), 1000);
    }

    // Si le mot est complètement trouvé
    if (!motDisplay.includes("_")) {
        setTimeout(() => motHasard(), 1000);
    }

    updateScoreAndLevel();
}

// Timer
function startTimer() {
    const timerElement = document.getElementById("span");
    timerInterval = setInterval(() => {
        tempsRestant--;
        timerElement.textContent = tempsRestant;
        if (tempsRestant <= 0) {
            clearInterval(timerInterval);
            document.getElementById("msg").textContent = "Temps écoulé!";
            disableKeyboard(); // Désactiver le clavier lorsque le temps est écoulé
        }
    }, 1000);
}

// Fonction pour désactiver le clavier
function disableKeyboard() {
    const keys = document.querySelectorAll(".key");
    keys.forEach(key => {
        key.disabled = true; // Désactiver chaque bouton du clavier
    });
}


// Démarrer le jeu
function startGame() {
    motHasard();
    startTimer();
}

function restartGame() {
    // Réinitialiser les variables du jeu
    score = 0;
    niveau = 1;
    motsTrouves = 0;
    tempsRestant = 100;

    // Mise à jour de l'affichage
    updateScoreAndLevel();
    document.getElementById("msg").textContent = "";
    document.getElementById("span").textContent = tempsRestant;

    // Réactiver le clavier
    const keys = document.querySelectorAll(".key");
    keys.forEach(key => {
        key.disabled = false;
    });

    // Redémarrer le jeu et le timer
    clearInterval(timerInterval);
    startTimer();
    motHasard();
}

// Appel initial pour démarrer le jeu
function startGame() {
    motHasard();
    startTimer();
}

window.onload = startGame;
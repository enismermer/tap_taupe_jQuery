$(document).ready(function() {
    let score = 0; // Variable pour stocker le score du joueur
    let chrono = 30; // Variable pour le chronomètre initialisé à 30 secondes
    let gameInterval; // Identifiant de l'intervalle de jeu

    // Fonction pour afficher le temps restant au format mm:ss
    function displayTime() {
        const minutes = Math.floor(chrono / 60);
        const seconds = chrono % 60;
        const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        $("#chrono").text(formattedTime); // Affiche le temps dans l'élément HTML avec l'ID "chrono"
    }

    // Fonction pour arrêter le jeu
    function stopGame() {
        clearInterval(gameInterval); // Arrête l'intervalle de jeu
        $(".taupe").hide(); // Cache toutes les taupes
        $("#btCommencer").prop("disabled", false).val("Rejouer"); // Réactive le bouton "Commencer" avec le texte "Rejouer"
    }

    // En cliquant sur "Commencer" ou "Rejouer"
    $("#btCommencer").click(function() {
        score = 0; // Réinitialise le score à 0
        chrono = 30; // Réinitialise le chrono à 30 secondes
        displayTime(); // Affiche le temps initial
        $("#score").html("Score : " + score + " pt"); // Affiche le score initial
        $(this).prop("disabled", true).val("En cours..."); // Désactive le bouton "Commencer" et change son texte
        
        // Commencer le jeu
        gameInterval = setInterval(function() {
            if (chrono > 0) {
                chrono--; // Diminue le chrono d'une seconde
                displayTime(); // Met à jour l'affichage du temps restant
            }
            if (chrono <= 0) {
                stopGame(); // Arrête le jeu lorsque le chrono atteint 0
                alert("Partie terminée !"); // Affiche une alerte quand la partie est terminée
            }
        }, 1000); // Mettre à jour le chrono toutes les secondes

        // Réinitialiser l'affichage des taupes
        $(".taupe").hide();

        // Afficher une taupe aléatoire dans un trou
        function showRandomTaupe() {
            const randomHole = Math.floor(Math.random() * 9) + 1; // Sélectionne un trou aléatoire
            const $hole = $(".t" + randomHole + " .taupe"); // Sélectionne l'élément taupe dans le trou aléatoire
            $hole.show(); // Affiche la taupe

            // Cacher la taupe après un délai aléatoire
            setTimeout(function() {
                $hole.hide(); // Cache la taupe
                if (chrono > 0) {
                    showRandomTaupe(); // Afficher une nouvelle taupe si le chrono n'est pas épuisé
                }
            }, Math.random() * 1500 + 500); // Délai aléatoire entre 0.5 et 1.5 secondes
        }

        // Démarrer l'affichage aléatoire des taupes au début du jeu
        showRandomTaupe();

        // En cliquant sur une taupe
        $(".taupe").click(function() {
            $(this).hide(); // Cache la taupe cliquée
            score++; // Incrémente le score de 1
            $("#score").html("Score : " + score + " pts"); // Met à jour l'affichage du score
        });
    });
});

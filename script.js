$(document).ready(function() {
    let score = 0;
    let chrono = 30;
    let gameInterval;

    // Fonction pour afficher le temps restant au format mm:ss
    function displayTime() {
        const minutes = Math.floor(chrono / 60);
        const seconds = chrono % 60;
        const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        $("#chrono").text(formattedTime);
    }

    // Fonction pour arrêter le jeu
    function stopGame() {
        clearInterval(gameInterval);
        $(".taupe").hide();
        $("#btCommencer").prop("disabled", false).val("Rejouer");
    }

    // En cliquant sur "Commencer" ou "Rejouer"
    $("#btCommencer").click(function() {
        score = 0;
        chrono = 30;
        displayTime();
        $("#score").html("Score : " + score + " pt");
        $(this).prop("disabled", true).val("En cours...");
        
        // Commencer le jeu
        gameInterval = setInterval(function() {
            if (chrono > 0) {
                chrono--;
                displayTime();
            }
            if (chrono <= 0) {
                stopGame();
            }
        }, 1000); // Mettre à jour le chrono toutes les secondes

        // Réinitialiser l'affichage des taupes
        $(".taupe").hide();

        // Afficher une taupe aléatoire dans un trou
        function showRandomTaupe() {
            const randomHole = Math.floor(Math.random() * 9) + 1;
            const $hole = $(".t" + randomHole + " .taupe");
            $hole.show();

            // Cacher la taupe après un délai
            setTimeout(function() {
                $hole.hide();
                if (chrono > 0) {
                    showRandomTaupe(); // Afficher une nouvelle taupe
                }
            }, Math.random() * 2000 + 500); // Délai aléatoire entre 0.5 et 2.5 secondes
        }

        // Démarrer l'affichage aléatoire des taupes
        showRandomTaupe();

        // En cliquant sur une taupe
        $(".taupe").click(function() {
            $(this).hide();
            score++;
            $("#score").html("Score : " + score + " pts");
        });
    });
});

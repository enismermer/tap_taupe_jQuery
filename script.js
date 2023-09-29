$(document).ready(function() {
    // let score = 0;
    // let chrono = 30; // Temps initial en secondes
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

    // Génération des trous en JavaScript
    for (let i = 1; i <= 9; i++) {
        $(".trous").append('<div class="taupe-hole" id="t' + i + '"><img class="taupe" src="img/taupe.png" width="50px" style="display:none;"></div>');
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
            chrono--;
            $("#chrono").html("00:" + chrono);
            displayTime();
            if (chrono <= 0) {
                stopGame();
                $(".taupe").hide();
            }
        }, 1000); // Mettre à jour le chrono toutes les secondes

        // Afficher les taupes aléatoirement
        $(".taupe").hide();
        const randomHole = Math.floor(Math.random() * 9) + 1;
        $("#t" + randomHole + " .taupe").show();

        // En cliquant sur une taupe
        $(".taupe").click(function() {
            $(this).hide();
            score++;
            $("#score").html("Score : " + score + " pts");
        });
    });
});

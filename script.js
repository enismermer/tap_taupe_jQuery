$(document).ready(function() 
{
    let score = 1;
    // en cliquant sur "commencer", une image taupe apparait
    $("#btCommencer").click(function() {
        // l'image taupe apparait aléatoirement
        setInterval(function () {
            $(".taupe").fadeIn()
            var random = Math.floor(Math.random() * jQuery('.taupe').length);
            jQuery('.taupe').hide().eq(random).show();
        }, 900)

        // une fois le jeu commencé, quand on clique sur l'image taupe
        $(".taupe").click(function() {
            // l'image taupe disparait
            $(".taupe").hide();
            // le score augmente de 1 point
            $("#score").html("Score : " + score++ + " pts")
        })
    })
})
// Ajoute des fonctionnalités interactives ici (ex: animations, form validations, etc.)
document.addEventListener("DOMContentLoaded", function() {
    // Exemple d'animation simple
    const heroText = document.querySelector(".hero-content h1");
    heroText.style.opacity = 0;
    setTimeout(() => {
        heroText.style.transition = "opacity 1s";
        heroText.style.opacity = 1;
    }, 300);
});

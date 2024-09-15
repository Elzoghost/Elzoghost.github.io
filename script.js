document.addEventListener("DOMContentLoaded", function() {
    // Animation d'apparition pour le texte de la section hero
    const heroText = document.querySelector(".hero-content h1");
    if (heroText) {
        heroText.style.opacity = 0;
        setTimeout(() => {
            heroText.style.transition = "opacity 1.5s ease";
            heroText.style.opacity = 1;
        }, 300);
    }

    // Validation du formulaire de contact
    const form = document.querySelector("form");
    if (form) {
        form.addEventListener("submit", function(event) {
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const message = document.getElementById("message").value;

            if (name === "" || email === "" || message === "") {
                event.preventDefault();
                alert("Veuillez remplir tous les champs.");
            } else if (!validateEmail(email)) {
                event.preventDefault();
                alert("Veuillez entrer une adresse email valide.");
            }
        });
    }

    // Fonction de validation d'email
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Animation des éléments de navigation au défilement
    const navLinks = document.querySelectorAll("nav ul li a");
    window.addEventListener("scroll", function() {
        const scrollPos = window.scrollY || document.documentElement.scrollTop;
        navLinks.forEach(link => {
            if (scrollPos > 100) {
                link.style.transition = "color 0.3s ease";
                link.style.color = "#007bff";
            } else {
                link.style.color = "#fff";
            }
        });
    });

    // Bouton de retour vers le haut
    const scrollTopBtn = document.createElement("button");
    scrollTopBtn.innerText = "⬆";
    scrollTopBtn.style.position = "fixed";
    scrollTopBtn.style.bottom = "20px";
    scrollTopBtn.style.right = "20px";
    scrollTopBtn.style.padding = "10px";
    scrollTopBtn.style.backgroundColor = "#007bff";
    scrollTopBtn.style.color = "#fff";
    scrollTopBtn.style.border = "none";
    scrollTopBtn.style.borderRadius = "50%";
    scrollTopBtn.style.cursor = "pointer";
    scrollTopBtn.style.display = "none";
    scrollTopBtn.style.zIndex = "1000";
    document.body.appendChild(scrollTopBtn);

    // Affichage du bouton quand on défile vers le bas
    window.addEventListener("scroll", function() {
        if (window.scrollY > 300) {
            scrollTopBtn.style.display = "block";
        } else {
            scrollTopBtn.style.display = "none";
        }
    });

    // Remonter en haut de la page en cliquant sur le bouton
    scrollTopBtn.addEventListener("click", function() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    // Met à jour l'année dynamique dans le footer
    const currentYear = new Date().getFullYear();
    const yearElements = document.querySelectorAll('.year');
    yearElements.forEach(element => {
        element.textContent = currentYear;
    });

    document.addEventListener("DOMContentLoaded", function() {
    // Fonction pour charger et afficher un fichier Markdown
    async function loadMarkdown(file) {
        try {
            const response = await fetch(`blog/${file}`);
            if (!response.ok) {
                document.getElementById('blog-content').innerHTML = 'Erreur : Article introuvable.';
                return;
            }
            const markdown = await response.text();
            const blogContent = marked.parse(markdown);
            document.getElementById('blog-content').innerHTML = blogContent;
        } catch (error) {
            console.error('Erreur lors du chargement de l\'article :', error);
            document.getElementById('blog-content').innerHTML = 'Erreur lors du chargement de l\'article.';
        }
    }

    // Charger le fichier Markdown basé sur le paramètre de l'URL
    const urlParams = new URLSearchParams(window.location.search);
    const file = urlParams.get('file');
    if (file) {
        loadMarkdown(file);
    } else {
        document.getElementById('blog-content').innerHTML = 'Aucun article sélectionné.';
    }
});


    // Fonction pour charger la liste des articles
    async function loadArticles() {
        try {
            const response = await fetch('blog/articles.json');
            if (!response.ok) {
                throw new Error('Erreur lors du chargement des articles');
            }
            const articles = await response.json();
            const blogList = document.getElementById('blog-list');
            blogList.innerHTML = '';
            articles.forEach(article => {
                const link = document.createElement('a');
                link.href = `blog-view.html?file=${encodeURIComponent(article.path)}`;
                link.textContent = article.title;
                const listItem = document.createElement('li');
                listItem.appendChild(link);
                blogList.appendChild(listItem);
            });
        } catch (error) {
            console.error('Erreur lors du chargement des articles :', error);
            const blogList = document.getElementById('blog-list');
            blogList.innerHTML = 'Erreur lors du chargement des articles.';
        }
    }

    // Charger la liste des articles si on est sur la page d'accueil ou blog-view.html
    if (window.location.pathname.endsWith('blog-view.html') || window.location.pathname === '/') {
        loadArticles();
    }
});

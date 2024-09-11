<?php
// Vérifier si le formulaire est soumis
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Récupérer les données soumises via le formulaire
    $name = strip_tags(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $message = trim($_POST["message"]);

    // Vérifier que les champs ne sont pas vides
    if (empty($name) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        // Réponse si des champs sont manquants ou invalides
        http_response_code(400);
        echo "Merci de remplir tous les champs du formulaire.";
        exit;
    }

    // L'adresse email de destination (là où vous recevrez les messages)
    $recipient = "elzodp125@gmail.com"; // Remplacez avec votre adresse email

    // Objet du message
    $subject = "Nouveau message de contact de $name";

    // Contenu de l'email
    $email_content = "Nom: $name\n";
    $email_content .= "Email: $email\n\n";
    $email_content .= "Message:\n$message\n";

    // En-têtes de l'email
    $email_headers = "From: $name <$email>";

    // Envoi de l'email
    if (mail($recipient, $subject, $email_content, $email_headers)) {
        // Réponse si l'email est envoyé avec succès
        http_response_code(200);
        echo "Merci! Votre message a été envoyé.";
    } else {
        // Réponse si l'envoi de l'email échoue
        http_response_code(500);
        echo "Oops! Une erreur s'est produite et nous n'avons pas pu envoyer votre message.";
    }

} else {
    // Réponse si le formulaire n'a pas été soumis correctement
    http_response_code(403);
    echo "Il y a un problème avec votre soumission, veuillez réessayer.";
}
?>

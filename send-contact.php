<?php
declare(strict_types=1);

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: contact.html', true, 302);
    exit;
}

function clean_input(string $value): string
{
    $value = trim($value);
    $value = str_replace(["\r", "\n"], ' ', $value);
    return $value;
}

$name = clean_input($_POST['name'] ?? '');
$email = filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL);
$howDidYouHear = clean_input($_POST['howDidYouHear'] ?? '');
$contactNumber = clean_input($_POST['contactNumber'] ?? '');
$message = trim($_POST['message'] ?? '');
$honeypot = trim($_POST['website'] ?? '');

$errors = [];

if ($honeypot !== '') {
    $errors[] = 'Spam submission detected.';
}

if ($name === '') {
    $errors[] = 'Name is required.';
}

if ($email === '' || filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
    $errors[] = 'A valid email address is required.';
}

if ($contactNumber === '') {
    $errors[] = 'Contact number is required.';
}

if ($message === '') {
    $errors[] = 'Message is required.';
}

$recipient = 'sushenman83@gmail.com';
$subject = "O'botz Contact Form Submission";

$emailBody = "New contact form submission from the O'botz website.\n\n";
$emailBody .= "Name: {$name}\n";
$emailBody .= "Email: {$email}\n";
$emailBody .= "How did you hear about us: " . ($howDidYouHear !== '' ? $howDidYouHear : 'Not provided') . "\n";
$emailBody .= "Contact Number: {$contactNumber}\n\n";
$emailBody .= "Message:\n{$message}\n";

$headers = [];
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-Type: text/plain; charset=UTF-8';
$headers[] = "From: O'botz Website <no-reply@" . ($_SERVER['HTTP_HOST'] ?? 'localhost') . '>';
$headers[] = "Reply-To: {$name} <{$email}>";

$mailSent = false;

if (!$errors) {
    $mailSent = mail($recipient, $subject, $emailBody, implode("\r\n", $headers));
    if (!$mailSent) {
        $errors[] = 'The server could not send your message right now.';
    }
}

$statusTitle = $mailSent ? 'Message Sent' : 'Message Not Sent';
$statusText = $mailSent
    ? 'Thanks. Your message has been sent successfully.'
    : implode(' ', $errors);
?>
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title><?php echo htmlspecialchars($statusTitle, ENT_QUOTES, 'UTF-8'); ?></title>
    <link rel="stylesheet" href="Css/style.css" />
  </head>
  <body>
    <section class="lets-chat lets-chat-status-page">
      <div class="lets-chat-inner lets-chat-status-card">
        <div class="lets-chat-header">
          <h1><?php echo htmlspecialchars($statusTitle, ENT_QUOTES, 'UTF-8'); ?></h1>
        </div>
        <p class="lets-chat-status-text">
          <?php echo htmlspecialchars($statusText, ENT_QUOTES, 'UTF-8'); ?>
        </p>
        <div class="lets-chat-actions">
          <a class="lets-chat-submit lets-chat-submit-link" href="contact.html">Back to Contact</a>
        </div>
      </div>
    </section>
  </body>
</html>

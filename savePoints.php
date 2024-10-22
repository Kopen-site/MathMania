<?php
$data = json_decode(file_get_contents('php://input'), true);
$points = $data['points'] ?? 0;
file_put_contents('points.txt', $points);
?>

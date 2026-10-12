<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$dataFile = dirname(__DIR__) . '/data.json';
$data = [];
if (file_exists($dataFile)) {
    $data = json_decode(file_get_contents($dataFile), true) ?: [];
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $reviews = $data['reviews'] ?? [];
    echo json_encode($reviews, JSON_UNESCAPED_UNICODE);
    exit;
}

if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true) ?: $_POST;
    $newReview = [
        'id' => 'R-' . rand(100, 999),
        'name' => $input['name'] ?? 'Client',
        'rating' => intval($input['rating'] ?? 5),
        'comment' => $input['comment'] ?? '',
        'roomType' => $input['roomType'] ?? 'Séjour EDIVINCE',
        'date' => date('Y-m-d')
    ];

    if (!isset($data['reviews'])) $data['reviews'] = [];
    array_unshift($data['reviews'], $newReview);

    if (is_writable($dataFile)) {
        file_put_contents($dataFile, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    }

    echo json_encode(['success' => true, 'review' => $newReview], JSON_UNESCAPED_UNICODE);
    exit;
}

echo json_encode(['success' => true]);

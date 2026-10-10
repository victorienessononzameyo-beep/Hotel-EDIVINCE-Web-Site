<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data) {
    // If not JSON, check $_POST
    $data = $_POST;
}

$prices = [
    'confort' => 55000,
    'prestige' => 65000,
    'premium' => 75000,
    'twin' => 90000,
    'junior' => 100000,
    'prestige-suite' => 135000,
    'ocean-suite' => 150000
];

$roomType = strtolower($data['roomType'] ?? 'confort');
$pricePerNight = $prices[$roomType] ?? 55000;

$d1 = strtotime($data['checkIn'] ?? 'now');
$d2 = strtotime($data['checkOut'] ?? '+1 day');
$diff = max(1, round(($d2 - $d1) / 86400));
$totalPrice = $pricePerNight * $diff;

$booking = [
    'id' => 'B-' . rand(100, 999),
    'guestName' => $data['guestName'] ?? 'Client',
    'guestEmail' => $data['guestEmail'] ?? 'non-spécifié',
    'guestPhone' => $data['guestPhone'] ?? '',
    'roomType' => $roomType,
    'checkIn' => $data['checkIn'] ?? date('Y-m-d'),
    'checkOut' => $data['checkOut'] ?? date('Y-m-d', strtotime('+1 day')),
    'guestsCount' => intval($data['guestsCount'] ?? 1),
    'totalPrice' => $totalPrice,
    'status' => 'pending',
    'segment' => $data['segment'] ?? 'Tourisme',
    'createdAt' => date('c')
];

// Try persisting to data.json if writable
$possiblePaths = [
    __DIR__ . '/../data.json',
    __DIR__ . '/../../data.json',
    dirname(__DIR__) . '/data.json'
];

foreach ($possiblePaths as $path) {
    if (file_exists($path) && is_writable($path)) {
        $json = json_decode(file_get_contents($path), true) ?: [];
        if (!isset($json['bookings'])) $json['bookings'] = [];
        $json['bookings'][] = $booking;
        file_put_contents($path, json_encode($json, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
        break;
    }
}

echo json_encode([
    'success' => true,
    'booking' => $booking
], JSON_UNESCAPED_UNICODE);

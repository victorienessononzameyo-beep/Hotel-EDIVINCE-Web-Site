<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, PATCH, OPTIONS');
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
    $rooms = $data['rooms'] ?? [];
    echo json_encode($rooms, JSON_UNESCAPED_UNICODE);
    exit;
}

if ($method === 'PATCH') {
    $input = json_decode(file_get_contents('php://input'), true) ?: [];
    $pathParts = explode('/', trim($_SERVER['REQUEST_URI'], '/'));
    $roomNum = end($pathParts);
    if (isset($input['number'])) $roomNum = $input['number'];

    if (isset($data['rooms']) && is_array($data['rooms'])) {
        foreach ($data['rooms'] as &$r) {
            if ($r['number'] === $roomNum) {
                if (isset($input['status'])) $r['status'] = $input['status'];
                if (isset($input['housekeeper'])) $r['housekeeper'] = $input['housekeeper'];
                $r['lastCleaned'] = date('Y-m-d');
                break;
            }
        }
        if (is_writable($dataFile)) {
            file_put_contents($dataFile, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
        }
    }

    echo json_encode(['success' => true], JSON_UNESCAPED_UNICODE);
    exit;
}

echo json_encode(['success' => true]);

<?php

declare(strict_types=1);

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3001');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, Accept');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH) ?: '/';

function json_response(array $payload, int $status = 200): void
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
}

function request_json(): array
{
    $raw = file_get_contents('php://input') ?: '';
    $decoded = json_decode($raw, true);

    return is_array($decoded) ? $decoded : [];
}

function pdo(): PDO
{
    return new PDO(
        'mysql:host=127.0.0.1;port=3306;dbname=ecm;charset=utf8mb4',
        'root',
        '',
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ],
    );
}

if ($path === '/api/health') {
    json_response([
        'success' => true,
        'message' => 'Backend API is running',
        'timestamp' => date(DATE_ATOM),
    ]);
}

if ($path === '/api/auth/login' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $body = request_json();
    $email = trim((string) ($body['email'] ?? ''));
    $password = (string) ($body['password'] ?? '');

    if ($email === '' || $password === '') {
        json_response([
            'success' => false,
            'error' => 'Email and password are required',
        ], 422);
    }

    try {
        $statement = pdo()->prepare('SELECT id, name, email, password, phone, role, status FROM users WHERE email = ? LIMIT 1');
        $statement->execute([$email]);
        $user = $statement->fetch();
    } catch (Throwable $exception) {
        json_response([
            'success' => false,
            'error' => 'Database connection failed',
        ], 500);
    }

    if (!$user || !password_verify($password, $user['password'])) {
        json_response([
            'success' => false,
            'error' => 'Invalid credentials',
        ], 401);
    }

    if ($user['status'] !== 'active') {
        json_response([
            'success' => false,
            'error' => 'Account is ' . $user['status'],
        ], 403);
    }

    $tokenPayload = [
        'sub' => (int) $user['id'],
        'email' => $user['email'],
        'role' => $user['role'],
        'iat' => time(),
    ];

    json_response([
        'success' => true,
        'message' => 'Login successful',
        'data' => [
            'user' => [
                'id' => (int) $user['id'],
                'name' => $user['name'],
                'email' => $user['email'],
                'role' => $user['role'],
                'phone' => $user['phone'],
            ],
            'access_token' => base64_encode(json_encode($tokenPayload)),
            'token_type' => 'Bearer',
            'expires_in' => 43200,
        ],
    ]);
}

json_response([
    'success' => false,
    'error' => 'Endpoint not found',
], 404);

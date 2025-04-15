<?php
/**
 * Database Configuration File
 * 
 * This file contains the database connection parameters for the Amaris Heavy Machinery website.
 * For local development using XAMPP/phpMyAdmin.
 */

// Database connection parameters
$host = 'localhost';      // Database host (localhost for XAMPP)
$dbname = 'amaris_db';    // Database name
$username = 'root';       // Default XAMPP username
$password = '';           // Default XAMPP password (empty)

// Create database connection
try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    
    // Set the PDO error mode to exception
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Set default fetch mode to associative array
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    
    // Set character set to UTF-8
    $pdo->exec("SET NAMES 'utf8'");
    
} catch(PDOException $e) {
    // For development, show the error
    die("Database Connection Failed: " . $e->getMessage());
    
    // For production, use this instead:
    // die("Database Connection Failed. Please contact the administrator.");
}
?>
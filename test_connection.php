<?php
/**
 * Database Connection Test File
 * 
 * This file tests the connection to the local database.
 * Access this file in your browser to verify your database setup is working.
 */

// Include database configuration
require_once 'includes/db_config.php';

// Check if connection is successful
if(isset($pdo)) {
    echo '<h1>Database Connection Test</h1>';
    echo '<div style="color: green; font-weight: bold;">Connection successful!</div>';
    
    // Test query to verify database content
    try {
        $stmt = $pdo->query("SELECT COUNT(*) as count FROM products");
        $result = $stmt->fetch();
        echo '<p>Number of products in database: ' . $result['count'] . '</p>';
        
        $stmt = $pdo->query("SELECT COUNT(*) as count FROM categories");
        $result = $stmt->fetch();
        echo '<p>Number of categories in database: ' . $result['count'] . '</p>';
        
        echo '<p>Your local setup is working correctly.</p>';
    } catch(PDOException $e) {
        echo '<div style="color: orange; font-weight: bold;">Connection successful, but there was an error querying the database:</div>';
        echo '<p>' . $e->getMessage() . '</p>';
        echo '<p>This might be because you haven\'t imported the database schema yet. Please follow the instructions in the README.md file.</p>';
    }
} else {
    echo '<h1>Database Connection Test</h1>';
    echo '<div style="color: red; font-weight: bold;">Connection failed!</div>';
    echo '<p>Please check your database configuration in includes/db_config.php</p>';
}
?>

<p><a href="index.php">Return to homepage</a></p>
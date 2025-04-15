# Amaris Heavy Machinery Website

This is the official website for Amaris Heavy Machinery, showcasing our products, services, and company information.

## Local Development Setup

### Prerequisites
- [XAMPP](https://www.apachefriends.org/index.html) (version 7.4 or higher recommended)
- [Git](https://git-scm.com/downloads) (to clone the repository)
- Web browser (Chrome, Firefox, Edge, etc.)

### Installation Steps

#### 1. Install XAMPP
- Download XAMPP from [https://www.apachefriends.org/index.html](https://www.apachefriends.org/index.html)
- Install XAMPP following the installation wizard
- Start the XAMPP Control Panel and start the Apache and MySQL services

#### 2. Clone the Repository
- Open a terminal or command prompt
- Navigate to the XAMPP htdocs directory:
  ```
  cd C:\xampp\htdocs    # Windows
  cd /Applications/XAMPP/htdocs    # macOS
  cd /opt/lampp/htdocs    # Linux
  ```
- Clone the repository:
  ```
  git clone https://github.com/efatha1/amaris.git
  ```
- Navigate to the project directory:
  ```
  cd amaris
  ```

#### 3. Set Up the Database
- Open your web browser and navigate to [http://localhost/phpmyadmin](http://localhost/phpmyadmin)
- Create a new database named `amaris_db`:
  - Click on "New" in the left sidebar
  - Enter "amaris_db" as the database name
  - Click "Create"
- Import the database schema (if available):
  - Select the newly created database from the left sidebar
  - Click on the "Import" tab
  - Click "Choose File" and select the database SQL file from the `database` folder
  - Click "Go" to import the schema

#### 4. Configure Database Connection
- Open the database configuration file in the project (typically located in a config or includes directory)
- Update the database connection parameters:
  ```php
  $host = 'localhost';
  $dbname = 'amaris_db';
  $username = 'root';
  $password = '';  // Default XAMPP password is empty
  ```

#### 5. Access the Website
- Open your web browser and navigate to [http://localhost/amaris](http://localhost/amaris)
- The website should now be running locally on your machine

### Troubleshooting

#### Common Issues:
1. **Apache or MySQL won't start**
   - Check if another service is using ports 80 (Apache) or 3306 (MySQL)
   - Check XAMPP logs for specific error messages

2. **Database connection errors**
   - Verify your database credentials in the configuration file
   - Ensure the MySQL service is running in XAMPP Control Panel

3. **Missing files or 404 errors**
   - Ensure all files were properly cloned from the repository
   - Check file permissions (especially on Linux/macOS)

4. **PHP errors**
   - Check PHP error logs in XAMPP (typically in the logs directory)
   - Enable error reporting in PHP for development

### Development Workflow
1. Make changes to the files in your local repository
2. Test changes at [http://localhost/amaris](http://localhost/amaris)
3. Commit and push changes to the repository when ready

## Contact
For any questions or issues, please contact the development team.
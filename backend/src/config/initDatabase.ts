import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// SQL query to create the projects table
const createProjectsTableQuery = `
  CREATE TABLE IF NOT EXISTS projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    status ENUM('Pending', 'In Progress', 'Completed') DEFAULT 'Pending',
    due_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
`;

/**
 * Initialize database and create tables
 * This function creates the database if it doesn't exist and sets up the schema
 */
export const initializeDatabase = async (): Promise<void> => {
  let connection;
  
  try {
    // First connect without specifying database to create it if needed
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      port: Number(process.env.DB_PORT) || 3306,
    });

    const dbName = process.env.DB_NAME || 'hasthiya_tracker';

    // Create database if it doesn't exist
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`);
    console.log(`✅ Database '${dbName}' is ready`);

    // Switch to the database
    await connection.query(`USE ${dbName}`);

    // Create projects table
    await connection.query(createProjectsTableQuery);
    console.log('✅ Projects table created successfully');

    console.log('✅ Database initialization completed');
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    throw error;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};

// Run initialization if this file is executed directly
if (require.main === module) {
  initializeDatabase()
    .then(() => {
      console.log('Database setup complete');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Database setup failed:', error);
      process.exit(1);
    });
}

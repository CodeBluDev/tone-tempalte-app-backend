const db = require('./models'); // Ensure this points to your models index file (usually ./models/index.js)

async function resetDatabase() {
  try {
    if (db.connection && typeof db.connection.sync === 'function') {
      await db.connection.sync({ force: true }); // Force drop and recreate all tables
      console.log('Database reset and synchronized');
    } else {
      throw new Error("Sequelize instance is not available or not properly configured.");
    }
  } catch (error) {
    console.error('Error resetting database:', error);
  }
}

resetDatabase();

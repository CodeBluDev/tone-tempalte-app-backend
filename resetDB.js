const db = require('./models'); // Ensure this points to your models index file (usually ./models/index.js)

async function resetDatabase() {
  try {
    // Ensure db.sequelize is defined and has the sync method
    if (db.sequelize && typeof db.sequelize.sync === 'function') {
      await db.sequelize.sync({ force: true }); // Drop and recreate all tables
      console.log('Database reset and synchronized');
    } else {
      throw new Error("Sequelize instance is not available or not properly configured.");
    }
  } catch (error) {
    console.error('Error resetting database:', error);
  }
}

resetDatabase();

// insert-only.js
require('dotenv').config();
const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mydb';

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  age: Number
});
const User = mongoose.model('User', userSchema);

async function main() {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('✅ MongoDB connected');

    const u = new User({ name: 'Ishan', email: 'Ishan@example.com', age: 25 });
    await u.save();
    console.log('✅ User saved:', u);

    if (mongoose.connection.readyState === 1) {
      await mongoose.disconnect();
      console.log('Disconnected');
    }
  } catch (err) {
    console.error('Error:', err.message || err);
    process.exit(1);
  }
}
main();

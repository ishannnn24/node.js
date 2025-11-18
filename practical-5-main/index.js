// index.js
require('dotenv').config();
const EventEmitter = require('events');
const mongoose = require('mongoose');

const emitter = new EventEmitter();
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mydb';

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  age: Number
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

async function connectDB() {
  await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('✅ MongoDB connected');
}

// Listener: when "greet" event occurs, save user to DB
emitter.on('greet', async (userData) => {
  try {
    const user = new User(userData);
    await user.save();
    console.log(✅ Saved user ${user.name} (id: ${user._id}));
  } catch (err) {
    console.error('❌ Error saving user:', err.message || err);
  }
});

// main runner
(async () => {
  try {
    await connectDB();

    // Emit a greet event with user details
    emitter.emit("greet", { name: "harsh", email: "harsh@example.com", age: 27 });


    // Optionally: give it a second to finish and then list users & disconnect
    setTimeout(async () => {
      const users = await User.find().limit(10);
      console.log('Current users in DB:', users);
      await mongoose.disconnect();
      console.log('Disconnected.');
      process.exit(0);
    }, 1200);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();

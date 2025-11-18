 
const { MongoClient } = require("mongodb");
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);
const dbName = "collegeDB";

async function run() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB!");

    const db = client.db(dbName);

   
    console.log("📘 Creating collection...");
    await db.createCollection("students");
    console.log("✅ Collection 'students' created!");

    const students = db.collection("students");

    console.log("📘 Inserting documents...");
    await students.insertMany([
      { name: "Ishan", age: 21, course: "CS" },
      { name: "Aryan", age: 20, course: "IT" }
    ]);
    console.log("✅ Data inserted!");

    console.log("📘 Finding all students...");
    const allStudents = await students.find().toArray();
    console.log(allStudents);

    await students.updateOne({ name: "Aryan" }, { $set: { age: 22 } });
    console.log("✅ Updated Aryan's age");

    await students.deleteOne({ name: "Ishan" });
    console.log("✅ Deleted Ishan");

   
    await db.dropCollection("students");
    console.log("✅ Dropped collection 'students'");

  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    await client.close();
    console.log("🔒 Connection closed.");
  }
}

run();

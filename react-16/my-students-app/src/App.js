
import StudentCard from "./StudentCard";
import SimpleForm from "./SimpleForm";




function App() {
  return (
    <div>
      <h1>React Tasks</h1>

      <StudentCard name="Ishan Sharma" course="React" score="95" />
      <StudentCard name="Aditi Roy" course="JavaScript" score="90" />
      <StudentCard name="Rahul Mehta" course="Node.js" score="85" />

      <SimpleForm />
    </div>
  );
}

export default App;

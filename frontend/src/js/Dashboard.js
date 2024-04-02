import "../css/Dashboard.css";  
import Menu from "../components/Menu";
import Container from "../components/Container";

function Dashboard() {
  return (
    <div className="dashboard">
      <Menu />
      <Container />
    </div>
  );
}

export default Dashboard;
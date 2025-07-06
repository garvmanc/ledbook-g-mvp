import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div style={{ padding: 20 }}>
      <h2>Dashboard</h2>
      <p>Welcome to LedBook! Select a section:</p>
      <ul>
        <li><Link to="/customers">Customers</Link></li>
        <li>Products</li>
        <li>Invoices</li>
      </ul>
    </div>
  );
}

export default Dashboard;
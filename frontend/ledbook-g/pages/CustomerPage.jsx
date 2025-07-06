import { useEffect, useState } from 'react';
import axios from 'axios';

function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    gstin: ''
  });

  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/customers', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCustomers(res.data);
    } catch (err) {
      setError('Failed to fetch customers');
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await axios.post('http://localhost:5001/api/customers', form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setForm({
        name: '',
        phone: '',
        email: '',
        address: '',
        gstin: ''
      });
      fetchCustomers();
    } catch (err) {
      setError('Error adding customer');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/customers/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchCustomers();
    } catch (err) {
      setError('Error deleting customer');
    }
  };

  return (
    <div className="py-5">
      <div className="container">
        <h2 className="mb-4 fw-semibold">Customers</h2>

        {error && <div className="alert alert-danger">{error}</div>}

        {/* Add Customer Card */}
        <div className="card mb-4 p-4">
          <h4 className="mb-3">Add Customer</h4>
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-4">
                <input
                  className="form-control"
                  name="name"
                  placeholder="Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-4">
                <input
                  className="form-control"
                  name="phone"
                  placeholder="Phone"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-4">
                <input
                  className="form-control"
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <input
                  className="form-control"
                  name="address"
                  placeholder="Address"
                  value={form.address}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <input
                  className="form-control"
                  name="gstin"
                  placeholder="GSTIN"
                  value={form.gstin}
                  onChange={handleChange}
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary mt-3">
              Add Customer
            </button>
          </form>
        </div>

        {/* Customers List */}
        <div className="card p-4">
          <h4 className="mb-3">All Customers</h4>
          {customers.length === 0 ? (
            <p className="fst-italic">No customers found.</p>
          ) : (
            <ul className="list-group list-group-flush">
              {customers.map((c) => (
                <li
                  key={c._id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    <strong>{c.name}</strong> ({c.phone})
                  </div>
                  <button
                    onClick={() => handleDelete(c._id)}
                    className="btn btn-sm btn-outline-danger"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default CustomersPage;

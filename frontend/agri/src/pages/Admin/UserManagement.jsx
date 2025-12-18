import { useEffect, useState } from "react";
import api from "../../services/api.js";
import { FaSearch } from "react-icons/fa";
import Layout from "../../components/layout/Layout.jsx";
const regions = [
  "Addis Ababa",
  "Afar",
  "Amhara",
  "Benishangul-Gumuz",
  "Central Ethiopia",
  "Dire Dawa",
  "Gambela",
  "Harari",
  "Oromia",
  "Sidama",
  "Somali",
  "South Ethiopia",
  "South West Ethiopia",
  "Tigray",
];

const roles = ["farmer", "agent", "extension"];

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    full_name: "",
    phone_number: "",
    region: "",
    role: "farmer",
    password: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");
      setUsers(res.data);
    } catch (err) {
      setMessage("Error loading users");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      if (editingId) {
        await api.put(`/users/${editingId}`, form);
        setMessage("User updated successfully");
      } else {
        await api.post("/users", form);
        setMessage("User created successfully");
      }
      setForm({
        full_name: "",
        phone_number: "",
        region: "",
        role: "farmer",
        password: "",
      });
      setEditingId(null);
      fetchUsers();
    } catch (err) {
      setMessage(err.response?.data?.message || "Error saving user");
    }
  };

  const handleEdit = (user) => {
    setForm({
      full_name: user.full_name,
      phone_number: user.phone_number,
      region: user.region,
      role: user.role,
      password: "",
    });
    setEditingId(user.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await api.delete(`/users/${id}`);
      setMessage("User deleted successfully");
      fetchUsers();
    } catch (err) {
      setMessage("Error deleting user");
    }
  };

  // Filter users by search term (name, region, role)
  const filteredUsers = users.filter((user) => {
    const term = search.toLowerCase();
    return (
      user.full_name.toLowerCase().includes(term) ||
      user.region.toLowerCase().includes(term) ||
      user.role.toLowerCase().includes(term)
    );
  });

  return (
 <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-3xl font-bold text-green-800 mb-8">
        {editingId ? "Edit User" : "Add New User"}
      </h2>

      {message && (
        <div
          className={`p-4 rounded-lg mb-6 ${
            message.includes("success")
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>
          <input
            type="text"
            name="full_name"
            value={form.full_name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <input
            type="text"
            name="phone_number"
            value={form.phone_number}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Region
          </label>
          <select
            name="region"
            value={form.region}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600"
          >
            <option value="">Select region</option>
            {regions.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Role
          </label>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600"
          >
            {roles.map((r) => (
              <option key={r} value={r}>
                {r.charAt(0).toUpperCase() + r.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {!editingId && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600"
            />
          </div>
        )}

        <div className="md:col-span-2">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition"
          >
            {editingId ? "Update User" : "Add User"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setForm({
                  full_name: "",
                  phone_number: "",
                  region: "",
                  role: "farmer",
                  password: "",
                });
              }}
              className="ml-4 bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-lg"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <h2 className="text-3xl font-bold text-green-800 mb-4">All Users</h2>

      {/* Search input */}
      <div className="mb-6 relative">
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search by name, region, or role..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-green-100">
              <th className="p-4 border">Full Name</th>
              <th className="p-4 border">Phone</th>
              <th className="p-4 border">Region</th>
              <th className="p-4 border">Role</th>
              <th className="p-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="p-4 border">{user.full_name}</td>
                <td className="p-4 border">{user.phone_number}</td>
                <td className="p-4 border">{user.region}</td>
                <td className="p-4 border capitalize">{user.role}</td>
                <td className="p-4 border">
                  <button
                    onClick={() => handleEdit(user)}
                    className="text-blue-600 hover:underline mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filteredUsers.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="p-4 border text-center text-gray-500"
                >
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

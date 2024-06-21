import React, { useState, useEffect } from 'react';
import { getUsers, createUser, updateUser, deleteUser, getUserById } from '../userService';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({ name: '', email: '' });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const fetchedUsers = await getUsers();
    setUsers(fetchedUsers);
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    setUsers(users.filter(user => user.id !== id));
  };

  const handleEdit = async (id) => {
    const user = await getUserById(id);
    setCurrentUser(user);
    setEditing(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      await updateUser(currentUser.id, currentUser);
      setEditing(false);
    } else {
      await createUser(currentUser);
    }
    setCurrentUser({ name: '', email: '' });
    fetchUsers();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <h2>Lista Użytkowników</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={currentUser.name}
          onChange={handleChange}
          placeholder="Imię"
          required
        />
        <input
          name="email"
          value={currentUser.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <button type="submit">{editing ? 'Aktualizuj' : 'Dodaj'}</button>
      </form>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} - {user.email}
            <button onClick={() => handleEdit(user.id)}>Edytuj</button>
            <button onClick={() => handleDelete(user.id)}>Usuń</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
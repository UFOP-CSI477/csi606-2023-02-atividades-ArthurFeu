import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserComponent = () => {
	const [users, setUsers] = useState([]);
	const [newUser, setNewUser] = useState({ email: '', name: '' });
	const [editingUser, setEditingUser] = useState(null);

	useEffect(() => {
		axios.get('http://localhost:5555/users/')
			.then(response => {
				setUsers(response.data);
			})
			.catch(error => {
				console.error('Erro ao buscar usuários!', error);
			});
	}, []);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		if (editingUser) {
			setEditingUser({ ...editingUser, [name]: value });
		} else {
			setNewUser({ ...newUser, [name]: value });
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const payload = editingUser ? editingUser : newUser;
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};

		const request = editingUser
			? axios.put(`http://localhost:5555/users/${editingUser.id}`, payload, config)
			: axios.post('http://localhost:5555/users/', payload, config);

		request.then(response => {
			if (editingUser) {
				setUsers(users.map(user => user.id === editingUser.id ? response.data : user));
				setEditingUser(null);
			} else {
				setUsers([...users, response.data]);
			}
			setNewUser({ email: '', name: '' });
		})
			.catch(error => {
				console.error(editingUser ? 'Erro ao atualizar usuário' : 'Erro ao criar usuário:', error);
			});
	};

	const startEditing = (user) => {
		setEditingUser(user);
	};

	const handleDelete = async (userId) => {
		try {
			await axios.delete(`http://localhost:5555/users/${userId}`);
			setUsers(users.filter(user => user.id !== userId));
		} catch (error) {
			console.error('Erro ao deletar usuário:', error);
		}
	};

	return (
		<div>
			<form onSubmit={handleSubmit} style={{ marginBottom: '20px', marginLeft: '20px' }}>
				<input
					type="email"
					name="email"
					className='input-full-width'
					value={editingUser ? editingUser.email : newUser.email}
					onChange={handleInputChange}
					placeholder="Email"
					required
				/>
				<input
					type="text"
					name="name"
					className='input-full-width'
					value={editingUser ? editingUser.name : newUser.name}
					onChange={handleInputChange}
					placeholder="Nome"
					required
				/>
				<button className="button-style button-small" type="submit">{editingUser ? 'Atualizar Usuário' : 'Adicionar Usuário'}</button>
				{editingUser && <button className="button-style button-small" type="button" onClick={() => setEditingUser(null)}>Cancelar</button>}
			</form>

			<ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
				{users.map(user => (
					<li key={user.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
						<span onClick={() => startEditing(user)} style={{ flex: 1 }}>
							{user.name} - {user.email}
						</span>
						<button className="button-style button-small" onClick={() => handleDelete(user.id)}>Excluir</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default UserComponent;

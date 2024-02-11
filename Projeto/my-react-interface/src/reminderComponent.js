import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RemindersComponent = () => {
	const [reminders, setReminders] = useState([]);
	const [newReminder, setNewReminder] = useState({
		title: '',
		description: '',
		date: '',
		userId: ''
	});
	const [editingReminder, setEditingReminder] = useState(null);
	const [users, setUsers] = useState([]);

	useEffect(() => {
		axios.get('http://localhost:5555/users/')
			.then(response => {
				setUsers(response.data);
			})
			.catch(error => {
				console.error('Erro ao buscar usuários!', error);
			});
	}, []);


	useEffect(() => {
		axios.get('http://localhost:5555/reminders/')
			.then(response => {
				setReminders(response.data);
			})
			.catch(error => {
				console.error('Erro ao buscar lembretes!', error);
			});
	}, []);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		if (editingReminder) {
			setEditingReminder({ ...editingReminder, [name]: value });
		} else {
			setNewReminder({ ...newReminder, [name]: value });
		}
	};

	const toggleCompletedStatus = async (reminderId) => {
		const reminderToUpdate = reminders.find(reminder => reminder.id === reminderId);
		if (!reminderToUpdate) return; // Caso o lembrete não seja encontrado, não faça nada

		// Alternar o estado de `completed`
		const updatedReminder = {
			...reminderToUpdate,
			completed: !reminderToUpdate.completed,
		};

		try {
			await axios.put(`http://localhost:5555/reminders/${reminderId}`, updatedReminder, {
				headers: {
					'Content-Type': 'application/json'
				}
			});

			// Atualizar o estado dos lembretes
			setReminders(reminders.map(reminder =>
				reminder.id === reminderId ? { ...reminder, completed: updatedReminder.completed } : reminder
			));
		} catch (error) {
			console.error('Erro ao atualizar o estado de conclusão do lembrete:', error);
		}
	};



	const handleSubmit = async (event) => {
		event.preventDefault();
		const payload = {
			...(editingReminder ? editingReminder : newReminder),
			userId: parseInt(editingReminder ? editingReminder.userId : newReminder.userId, 10) // Converte userId para Int
		};

		if (isNaN(payload.userId)) {
			console.error('UserID deve ser um número inteiro.');
			return; // Impede a submissão se userId não for um número
		}

		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};

		const requestMethod = editingReminder ? 'put' : 'post';
		const url = editingReminder ? `http://localhost:5555/reminders/${editingReminder.id}` : 'http://localhost:5555/reminders/';

		axios[requestMethod](url, payload, config)
			.then(response => {
				if (editingReminder) {
					setReminders(reminders.map(reminder => reminder.id === editingReminder.id ? response.data : reminder));
					setEditingReminder(null);
				} else {
					setReminders([...reminders, response.data]);
				}
				setNewReminder({ title: '', description: '', date: '', userId: '' });
			})
			.catch(error => {
				console.error(editingReminder ? 'Erro ao atualizar lembrete' : 'Erro ao criar lembrete:', error);
			});
	};

	const startEditing = (reminder) => {
		setEditingReminder(reminder);
	};

	const handleDelete = async (reminderId) => {
		try {
			await axios.delete(`http://localhost:5555/reminders/${reminderId}`);
			setReminders(reminders.filter(reminder => reminder.id !== reminderId));
		} catch (error) {
			console.error('Erro ao deletar lembrete:', error);
		}
	};
	return (
		<div>
			<div className="form-group">

				<form className="form-container" onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
					<input
						type="text"
						name="title"
						className="input-full-width"
						value={editingReminder ? editingReminder.title : newReminder.title}
						onChange={handleInputChange}
						placeholder="Título"
						required
					/>
					<textarea
						name="description"
						className="input-full-width"
						value={editingReminder ? editingReminder.description : newReminder.description}
						onChange={handleInputChange}
						placeholder="Descrição"
					/>
					<input
						type="datetime-local"
						className="input-full-width"
						name="date"
						value={editingReminder ? editingReminder.date : newReminder.date}
						onChange={handleInputChange}
						placeholder="Data e Hora"
						required
					/>
					<select
						name="userId"
						className="input-full-width"
						value={editingReminder ? editingReminder.userId : newReminder.userId}
						onChange={handleInputChange}
						required
					>
						<option value="">Selecione um Usuário</option>
						{users.map(user => (
							<option key={user.id} value={user.id}>
								{user.name}
							</option>
						))}
					</select>
					<div className="form-buttons">
						<button className="button-style button-small" type="submit">{editingReminder ? 'Atualizar Lembrete' : 'Adicionar Lembrete'}</button>
						{editingReminder && <button className="button-style button-small" type="button" onClick={() => setEditingReminder(null)}>Cancelar</button>}
					</div>

				</form>
			</div>

			<ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
				{reminders.map(reminder => {
					const user = users.find(u => u.id === reminder.userId);
					const userName = user ? user.name : 'Usuário Desconhecido';

					return (
						<li key={reminder.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
							<span style={{ flex: 1, cursor: 'pointer' }}>
								<span
									style={{
										textDecoration: reminder.completed ? 'line-through' : 'none'
									}}
									onClick={() => startEditing(reminder)}
								>
									{reminder.title} - {new Date(reminder.date).toLocaleString()} - {userName}
								</span>
							</span>
							<label>
								<input
									type="checkbox"
									checked={reminder.completed}
									className="custom-checkbox"
									onChange={() => toggleCompletedStatus(reminder.id)}
								/>
								⠀⠀⠀⠀
							</label>
							<button className="button-style button-small" onClick={() => handleDelete(reminder.id)}>Excluir</button>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default RemindersComponent;

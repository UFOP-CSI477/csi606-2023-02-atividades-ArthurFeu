import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CalendarComponent = () => {
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [selectedUserId, setSelectedUserId] = useState('');
	const [reminders, setReminders] = useState([]);
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

	const handleDateChange = date => {
		setSelectedDate(date);
	};

	const handleUserChange = event => {
		setSelectedUserId(event.target.value);
	};

	const getRemindersForDateAndUser = date => {
		return reminders.filter(reminder => {
			const reminderDate = new Date(reminder.date);
			return reminderDate.toDateString() === date.toDateString() &&
				(selectedUserId ? reminder.userId === Number(selectedUserId) : true);
		});
	};

	return (
		<div className="calendar-container">
			<DatePicker
				selected={selectedDate}
				onChange={handleDateChange}
				inline
				calendarClassName="custom-calendar"
			/>
			<br />
			<select
				value={selectedUserId}
				onChange={handleUserChange}
				className="user-select"
			>
				<option value="">Todos os Usuários</option>
				{users.map(user => (
					<option key={user.id} value={user.id}>{user.name}</option>
				))}
			</select>
			<div className="reminders-list">
				<h3>Lembretes para {selectedDate.toLocaleDateString()}</h3>
				<ul>
					{getRemindersForDateAndUser(selectedDate).map(reminder => (
						<li key={reminder.id}>
							{reminder.title}{reminder.description ? ` - ${reminder.description}` : ''} - {new Date(reminder.date).toLocaleTimeString()}
						</li>
					))}
				</ul>
			</div>
		</div>
	);

};

export default CalendarComponent;

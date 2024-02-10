import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StatesComponent = () => {
	const [states, setStates] = useState([]);
	const [newStateName, setNewStateName] = useState('');
	const [newStateSigla, setNewStateSigla] = useState('');
	const [editingState, setEditingState] = useState(null);
	const [editingStateName, setEditingStateName] = useState('');
	const [editingStateSigla, setEditingStateSigla] = useState('');

	useEffect(() => {
		axios.get('/estados')
			.then(response => {
				setStates(response.data);
			})
			.catch(error => {
				console.error('Erro ao buscar estados!', error);
			});
	}, []);

	const handleCreateState = (event) => {
		event.preventDefault();
		axios.post('/estados', { nome: newStateName, sigla: newStateSigla })
			.then(response => {
				setStates([...states, response.data]);
				setNewStateName('');
				setNewStateSigla('');
			})
			.catch(error => {
				console.error('Erro ao criar estado:', error);
			});
	};

	const startEditing = (state) => {
		setEditingState(state);
		setEditingStateName(state.nome);
		setEditingStateSigla(state.sigla);
	};

	const handleEditChangeName = (event) => {
		setEditingStateName(event.target.value);
	};

	const handleEditChangeSigla = (event) => {
		setEditingStateSigla(event.target.value);
	};

	const handleUpdateState = async (event) => {
		event.preventDefault();
		try {
			const response = await axios.put('/estados', {
				id: editingState.id,
				nome: editingStateName,
				sigla: editingStateSigla
			});
			setStates(states.map(state => state.id === editingState.id ? response.data : state));
			setEditingState(null);
			setEditingStateName('');
			setEditingStateSigla('');
		} catch (error) {
			console.error('Erro ao atualizar estado:', error);
		}
	};

	const handleDeleteState = (stateId) => {
		axios.delete('/estados', { data: { id: stateId } })
			.then(() => {
				setStates(states.filter(state => state.id !== stateId));
			})
			.catch(error => {
				console.error('Erro ao deletar estado:', error);
			});
	};

	return (
		<div>
			<h2>Estados</h2>
			<form onSubmit={editingState ? handleUpdateState : handleCreateState} style={{ marginBottom: '20px' }}>
				<input
					type="text"
					value={editingState ? editingStateName : newStateName}
					onChange={editingState ? handleEditChangeName : (e) => setNewStateName(e.target.value)}
					placeholder="Insira o nome do estado"
					required
				/>
				<input
					type="text"
					value={editingState ? editingStateSigla : newStateSigla}
					onChange={editingState ? handleEditChangeSigla : (e) => setNewStateSigla(e.target.value)}
					placeholder="Insira a sigla do estado"
					required
				/>
				<button type="submit">{editingState ? 'Atualizar Estado' : 'Adicionar Estado'}</button>
				{editingState && <button onClick={() => setEditingState(null)}>Cancelar</button>}
			</form>

			<ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
				{states.map(state => (
					<li key={state.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
						{editingState && editingState.id === state.id ? (
							<form onSubmit={handleUpdateState} style={{ flex: 1 }}>
								<input
									type="text"
									value={editingStateName}
									onChange={handleEditChangeName}
									autoFocus
								/>
								<input
									type="text"
									value={editingStateSigla}
									onChange={handleEditChangeSigla}
								/>
								<button type="submit">Atualizar</button>
								<button onClick={() => setEditingState(null)}>Cancelar</button>
							</form>
						) : (
							<span onClick={() => startEditing(state)} style={{ flex: 1 }}>
								{state.nome} - {state.sigla}
							</span>
						)}
						<button onClick={() => handleDeleteState(state.id)}>Excluir</button>
					</li>
				))}
			</ul>
			<p>Para editar clique no estado desejado.</p>
		</div>
	);
}

export default StatesComponent;

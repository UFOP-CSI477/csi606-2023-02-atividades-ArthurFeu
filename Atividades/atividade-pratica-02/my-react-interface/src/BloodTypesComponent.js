import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BloodTypesComponent = () => {
	const [bloodTypes, setBloodTypes] = useState([]);
	const [newBloodType, setNewBloodType] = useState({ tipo: '', fator: '' });
	const [editingBloodType, setEditingBloodType] = useState(null);

	useEffect(() => {
		axios.get('/tiposSanguineos')
			.then(response => {
				setBloodTypes(response.data);
			})
			.catch(error => {
				console.error('Erro ao buscar tipos sanguíneos!', error);
			});
	}, []);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		if (editingBloodType) {
			setEditingBloodType({ ...editingBloodType, [name]: value });
		} else {
			setNewBloodType({ ...newBloodType, [name]: value });
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const payload = editingBloodType ? editingBloodType : newBloodType;

		const request = editingBloodType ? axios.put('/tiposSanguineos', payload) : axios.post('/tiposSanguineos', payload);

		request.then(response => {
			if (editingBloodType) {
				setBloodTypes(bloodTypes.map(bt => bt.id === editingBloodType.id ? response.data : bt));
				setEditingBloodType(null);
			} else {
				setBloodTypes([...bloodTypes, response.data]);
			}
			setNewBloodType({ tipo: '', fator: '' });
		})
			.catch(error => {
				console.error(editingBloodType ? 'Erro ao atualizar tipo sanguíneo' : 'Erro ao criar tipo sanguíneo:', error);
			});
	};

	const startEditing = (bt) => {
		setEditingBloodType(bt);
	};

	const handleDelete = async (btId) => {
		try {
			await axios.delete('/tiposSanguineos', { data: { id: btId } });
			setBloodTypes(bloodTypes.filter(bt => bt.id !== btId));
		} catch (error) {
			console.error('Erro ao deletar tipo sanguíneo:', error);
		}
	};

	return (
		<div>
			<h2>Tipos Sanguíneos</h2>
			<form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
				<input
					type="text"
					name="tipo"
					value={editingBloodType ? editingBloodType.tipo : newBloodType.tipo}
					onChange={handleInputChange}
					placeholder="Tipo"
					required
				/>
				<input
					type="text"
					name="fator"
					value={editingBloodType ? editingBloodType.fator : newBloodType.fator}
					onChange={handleInputChange}
					placeholder="Fator"
					required
				/>
				<button type="submit">{editingBloodType ? 'Atualizar Tipo Sanguíneo' : 'Adicionar Tipo Sanguíneo'}</button>
				{editingBloodType && <button type="button" onClick={() => setEditingBloodType(null)}>Cancelar</button>}
			</form>

			<ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
				{bloodTypes.map(bt => (
					<li key={bt.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
						<span onClick={() => startEditing(bt)} style={{ flex: 1 }}>
							{bt.tipo} {bt.fator}
						</span>
						<button onClick={() => handleDelete(bt.id)}>Excluir</button>
					</li>
				))}
			</ul>
			<p>Para editar clique em um tipo e utilize o mesmo espaço para criação.</p>
		</div>
	);
};

export default BloodTypesComponent;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DonationsComponent = () => {
	const [donations, setDonations] = useState([]);
	const [newDonation, setNewDonation] = useState({ pessoaId: '', localId: '' });
	const [editingDonation, setEditingDonation] = useState(null);

	useEffect(() => {
		axios.get('/doacoes')
			.then(response => {
				setDonations(response.data);
			})
			.catch(error => {
				console.error('Erro ao buscar doações!', error);
			});
	}, []);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		if (editingDonation) {
			setEditingDonation({ ...editingDonation, [name]: parseInt(value, 10) });
		} else {
			setNewDonation({ ...newDonation, [name]: parseInt(value, 10) });
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const payload = editingDonation ? editingDonation : newDonation;

		const request = editingDonation ? axios.put('/doacoes', payload) : axios.post('/doacoes', payload);

		request.then(response => {
			if (editingDonation) {
				setDonations(donations.map(doacao => doacao.id === editingDonation.id ? response.data : doacao));
				setEditingDonation(null);
			} else {
				setDonations([...donations, response.data]);
			}
			setNewDonation({ pessoaId: '', localId: '' });
		})
			.catch(error => {
				console.error(editingDonation ? 'Erro ao atualizar doações' : 'Erro ao criar doações:', error);
			});
	};

	const startEditing = (doacao) => {
		setEditingDonation(doacao);
	};

	const handleDelete = async (doacaoId) => {
		try {
			await axios.delete('/doacoes', { data: { id: doacaoId } });
			setDonations(donations.filter(doacao => doacao.id !== doacaoId));
		} catch (error) {
			console.error('Erro ao deletar doações:', error);
		}
	};

	return (
		<div>
			<h2>Doações</h2>
			<form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
				<input
					type="number"
					name="pessoaId"
					value={editingDonation ? editingDonation.pessoaId : newDonation.pessoaId}
					onChange={handleInputChange}
					placeholder="Pessoa"
					required
				/>
				<input
					type="number"
					name="localId"
					value={editingDonation ? editingDonation.localId : newDonation.localId}
					onChange={handleInputChange}
					placeholder="Local"
					required
				/>
				<button type="submit">{editingDonation ? 'Atualizar Doação' : 'Adicionar Doação'}</button>
				{editingDonation && <button type="button" onClick={() => setEditingDonation(null)}>Cancelar</button>}
			</form>

			<ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
				{donations.map(doacao => (
					<li key={doacao.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
						<span onClick={() => startEditing(doacao)} style={{ flex: 1 }}>
							{doacao.pessoaId} {doacao.localId}
						</span>
						<button onClick={() => handleDelete(doacao.id)}>Excluir</button>
					</li>
				))}
			</ul>
			<p>Para editar clique em uma Doação e utilize o mesmo espaço para criação.</p>
		</div>
	);
};

export default DonationsComponent;

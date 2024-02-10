import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PeopleComponent = () => {
	const [people, setPeople] = useState([]);
	const [cities, setCities] = useState({});
	const [bloodTypes, setBloodTypes] = useState({});
	const [newPerson, setNewPerson] = useState({
		nome: '',
		rua: '',
		numero: '',
		complemento: '',
		rg: '',
		cidadeId: '',
		tipoId: ''
	});
	const [editingPerson, setEditingPerson] = useState(null);

	useEffect(() => {
		axios.get('http://localhost:5555/pessoas/')
			.then(response => {
				setPeople(response.data);
			})
			.catch(error => {
				console.error('Erro ao buscar pessoas!', error);
			});
	}, []);

	useEffect(() => {
		// Buscar pessoas
		axios.get('http://localhost:5555/pessoas/')
			.then(response => {
				setPeople(response.data);
			})
			.catch(error => {
				console.error('Erro ao buscar pessoas!', error);
			});

		// Buscar cidades
		axios.get('http://localhost:5555/cidades/')
			.then(response => {
				const citiesById = response.data.reduce((acc, city) => {
					acc[city.id] = city.nome;
					return acc;
				}, {});
				setCities(citiesById);
			});

		// Buscar tipos sanguíneos
		axios.get('http://localhost:5555/tiposSanguineos/')
			.then(response => {
				const bloodTypesById = response.data.reduce((acc, type) => {
					acc[type.id] = `${type.tipo} ${type.fator}`;
					return acc;
				}, {});
				setBloodTypes(bloodTypesById);
			});
	}, []);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		let finalValue = value;

		// Verifica se o campo é 'cidadeId' ou 'tipoId' e, em caso afirmativo, converte o valor para número.
		if (name === 'cidadeId' || name === 'tipoId') {
			finalValue = parseInt(value, 10) || 0; // Converte para inteiro, ou define como 0 se a conversão falhar.
		}

		if (editingPerson) {
			setEditingPerson({ ...editingPerson, [name]: finalValue });
		} else {
			setNewPerson({ ...newPerson, [name]: finalValue });
		}
	};


	const handleSubmit = async (event) => {
		event.preventDefault();
		const payload = editingPerson ? editingPerson : newPerson;

		const request = editingPerson ? axios.put('http://localhost:5555/pessoas', payload) : axios.post('http://localhost:5555/pessoas', payload);

		request.then(response => {
			if (editingPerson) {
				setPeople(people.map(p => p.id === editingPerson.id ? response.data : p));
				setEditingPerson(null);
			} else {
				setPeople([...people, response.data]);
			}
			setNewPerson({ nome: '', rua: '', numero: '', complemento: '', rg: '', cidadeId: '', tipoId: '' });
		})
			.catch(error => {
				console.error(editingPerson ? 'Erro ao atualizar pessoa' : 'Erro ao criar pessoa:', error);
			});
	};

	const startEditing = (p) => {
		setEditingPerson(p);
	};

	const handleDelete = async (personId) => {
		try {
			await axios.delete('http://localhost:5555/pessoas', { data: { id: personId } });
			setPeople(people.filter(p => p.id !== personId));
		} catch (error) {
			console.error('Erro ao deletar pessoa:', error);
		}
	};

	return (
		<div>
			<h2>Pessoas</h2>
			<form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
				<input type="text" name="nome" value={editingPerson ? editingPerson.nome : newPerson.nome} onChange={handleInputChange} placeholder="Nome" required />
				<input type="text" name="rua" value={editingPerson ? editingPerson.rua : newPerson.rua} onChange={handleInputChange} placeholder="Rua" required />
				<input type="text" name="numero" value={editingPerson ? editingPerson.numero : newPerson.numero} onChange={handleInputChange} placeholder="Número" required />
				<input type="text" name="complemento" value={editingPerson ? editingPerson.complemento : newPerson.complemento} onChange={handleInputChange} placeholder="Complemento" />
				<input type="text" name="rg" value={editingPerson ? editingPerson.rg : newPerson.rg} onChange={handleInputChange} placeholder="RG" required />
				<input type="number" name="cidadeId" value={editingPerson ? editingPerson.cidadeId : newPerson.cidadeId} onChange={handleInputChange} placeholder="Cidade ID" required />
				<input type="number" name="tipoId" value={editingPerson ? editingPerson.tipoId : newPerson.tipoId} onChange={handleInputChange} placeholder="Tipo ID" required />
				<button type="submit">{editingPerson ? 'Atualizar Pessoa' : 'Adicionar Pessoa'}</button>
				{editingPerson && <button type="button" onClick={() => setEditingPerson(null)}>Cancelar</button>}
			</form>

			<ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
				{people.map(p => (
					<li key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
						<span onClick={() => startEditing(p)} style={{ flex: 1 }}>
							{p.nome} - {p.rua}, {p.numero} {p.complemento && `, ${p.complemento}`} - RG: {p.rg} - Cidade: {cities[p.cidadeId]} - Tipo Sanguíneo: {bloodTypes[p.tipoId]}
						</span>
						<button onClick={() => handleDelete(p.id)}>Excluir</button>
					</li>
				))}
			</ul>
			<p>Para editar clique em um tipo e utilize o mesmo espaço para criação.</p>
		</div>
	);
};

export default PeopleComponent;

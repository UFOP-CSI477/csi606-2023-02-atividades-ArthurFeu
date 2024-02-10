import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CollectPlacesComponent = () => {
	const [places, setPlaces] = useState([]);
	const [newPlace, setNewPlace] = useState({
		nome: '',
		rua: '',
		numero: '',
		complemento: '',
		cidadeId: ''
	});
	const [editingPlace, setEditingPlace] = useState(null);
	const [cities, setCities] = useState({});

	useEffect(() => {
		// Buscar locais de coleta
		axios.get('http://localhost:5555/locais/')
			.then(response => {
				setPlaces(response.data);
			})
			.catch(error => {
				console.error('Erro ao buscar locais de coleta!', error);
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
	}, []);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		const finalValue = name === 'cidadeId' ? parseInt(value, 10) || 0 : value;
		if (editingPlace) {
			setEditingPlace({ ...editingPlace, [name]: finalValue });
		} else {
			setNewPlace({ ...newPlace, [name]: finalValue });
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const payload = editingPlace ? editingPlace : newPlace;

		const request = editingPlace ? axios.put('http://localhost:5555/locais', payload) : axios.post('http://localhost:5555/locais', payload);

		request.then(response => {
			if (editingPlace) {
				setPlaces(places.map(place => place.id === editingPlace.id ? response.data : place));
				setEditingPlace(null);
			} else {
				setPlaces([...places, response.data]);
			}
			setNewPlace({ nome: '', rua: '', numero: '', complemento: '', cidadeId: '' });
		})
			.catch(error => {
				console.error(editingPlace ? 'Erro ao atualizar local de coleta' : 'Erro ao criar local de coleta:', error);
			});
	};

	const startEditing = (place) => {
		setEditingPlace(place);
	};

	const handleDelete = async (placeId) => {
		try {
			await axios.delete('http://localhost:5555/locais', { data: { id: placeId } });
			setPlaces(places.filter(place => place.id !== placeId));
		} catch (error) {
			console.error('Erro ao deletar local de coleta:', error);
		}
	};

	return (
		<div>
			<h2>Locais de Coleta</h2>
			<form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
				<input type="text" name="nome" value={editingPlace ? editingPlace.nome : newPlace.nome} onChange={handleInputChange} placeholder="Nome" required />
				<input type="text" name="rua" value={editingPlace ? editingPlace.rua : newPlace.rua} onChange={handleInputChange} placeholder="Rua" required />
				<input type="text" name="numero" value={editingPlace ? editingPlace.numero : newPlace.numero} onChange={handleInputChange} placeholder="Número" required />
				<input type="text" name="complemento" value={editingPlace ? editingPlace.complemento : newPlace.complemento} onChange={handleInputChange} placeholder="Complemento" />
				<input type="number" name="cidadeId" value={editingPlace ? editingPlace.cidadeId : newPlace.cidadeId} onChange={handleInputChange} placeholder="Cidade ID" required />
				<button type="submit">{editingPlace ? 'Atualizar Local de Coleta' : 'Adicionar Local de Coleta'}</button>
				{editingPlace && <button type="button" onClick={() => setEditingPlace(null)}>Cancelar</button>}
			</form>

			<ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
				{places.map(place => (
					<li key={place.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
						<span onClick={() => startEditing(place)} style={{ flex: 1 }}>
							{place.nome} - {place.rua}, {place.numero} {place.complemento && `, ${place.complemento}`} - Cidade: {cities[place.cidadeId]}
						</span>
						<button onClick={() => handleDelete(place.id)}>Excluir</button>
					</li>
				))}
			</ul>
			<p>Para editar clique em um tipo e utilize o mesmo espaço para criação.</p>
		</div>
	);
};

export default CollectPlacesComponent;

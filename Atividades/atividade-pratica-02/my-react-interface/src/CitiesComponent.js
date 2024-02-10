import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CitiesComponent = () => {
	const [cities, setCities] = useState([]);
	const [estados, setEstados] = useState([]);
	const [newCityName, setNewCityName] = useState('');
	const [selectedEstadoId, setSelectedEstadoId] = useState('');
	const [editingCity, setEditingCity] = useState(null); // Armazena a cidade que está sendo editada
	const [editingCityName, setEditingCityName] = useState(''); // Armazena o novo nome da cidade durante a edição


	useEffect(() => {
		// Carrega as cidades e inclui os dados dos estados
		axios.get('/cidades')
			.then(response => {
				setCities(response.data);
			})
			.catch(error => {
				console.error('Erro ao buscar cidades!', error);
			});

		// Carrega os estados para o seletor
		axios.get('/estados')
			.then(response => {
				setEstados(response.data);
			})
			.catch(error => {
				console.error('Erro ao buscar estados!', error);
			});
	}, []);

	const handleCreateCity = (event) => {
		event.preventDefault();
		axios.post('/cidades', { nome: newCityName, estadoId: Number(selectedEstadoId) })
			.then(response => {
				// Inclui os dados completos do estado na nova cidade
				const newCity = response.data;
				const estado = estados.find(e => e.id === Number(selectedEstadoId));
				newCity.estado = estado;

				setCities([...cities, newCity]);
				setNewCityName('');
				setSelectedEstadoId('');
			})
			.catch(error => {
				console.error('Erro ao criar cidade:', error);
			});
	};

	const handleDeleteCity = (cityId) => {
		axios.delete('/cidades', { data: { id: cityId } })
			.then(() => {
				setCities(cities.filter(city => city.id !== cityId));
			})
			.catch(error => {
				console.error('Erro ao deletar cidade:', error);
			});
	};

	const startEditing = (city) => {
		setEditingCity(city);
		setEditingCityName(city.nome);
	};

	const handleEditChange = (event) => {
		setEditingCityName(event.target.value);
	};

	const handleUpdateCity = async (event) => {
		event.preventDefault(); // Previne o comportamento padrão do formulário

		const payload = {
			id: editingCity.id, // Garantir que o id está sendo enviado
			nome: editingCityName,
			estadoId: Number(editingCity.estado.id)
		};

		try {
			await axios.put('/cidades', payload);

			// Atualiza a lista de cidades com a versão atualizada
			const updatedCities = cities.map(city => {
				if (city.id === editingCity.id) {
					// Supondo que o servidor retorne a cidade atualizada, caso contrário, use o payload
					return { ...city, nome: editingCityName };
				}
				return city;
			});
			setCities(updatedCities);
			setEditingCity(null); // Reseta a cidade que está sendo editada
			setEditingCityName(''); // Reseta o nome da cidade que estava sendo editada
		} catch (error) {
			console.error('Erro ao atualizar cidade:', error);
		}
	};

	return (
		<div>
			<h2>Cidades</h2>
			<form onSubmit={handleCreateCity} style={{ marginBottom: '20px' }}>
				<input
					type="text"
					value={newCityName}
					onChange={(e) => setNewCityName(e.target.value)}
					placeholder="Insira o nome da cidade"
					required
				/>
				<select
					value={selectedEstadoId}
					onChange={(e) => setSelectedEstadoId(e.target.value)}
					required
				>
					<option value="">Selecione um estado</option>
					{estados.map(estado => (
						<option key={estado.id} value={estado.id}>{estado.nome}</option>
					))}
				</select>
				<button type="submit">Adicionar Cidade</button>
			</form>

			<ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
				{cities.map(city => (
					<li key={city.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
						{editingCity && editingCity.id === city.id ? (
							<form onSubmit={handleUpdateCity} style={{ flex: 1 }}>
								<input
									type="text"
									value={editingCityName}
									onChange={handleEditChange}
									autoFocus
								/>
								<button type="submit">Editar</button>
								<button type="button" onClick={() => setEditingCity(null)}>Cancelar</button>
							</form>
						) : (
							<span style={{ flex: 1 }} onClick={() => startEditing(city)}>
								{city.nome} - {city.estado.sigla}
							</span>
						)}
						<button onClick={() => handleDeleteCity(city.id)}>Excluir</button>
					</li>
				))}
			</ul>
			<p>Para editar clique na cidade desejada.</p>
		</div>
	);
}

export default CitiesComponent;
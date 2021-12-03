import { useEffect, useState } from 'react';
const api_base = 'http://localhost:3000';

function App() {
	const [todos, setTodos] = useState([]);
	const [popupActive, setPopupActive] = useState(false);
	const [newTodo, setNewTodo] = useState("");

	useEffect(() => {
		GetTodos();
	}, []);

	const GetTodos = () => {
		fetch(api_base + '/todos')
			.then(res => res.json())
			.then(data => setTodos(data))
			.catch((err) => console.error("Error: ", err));
	}

	const addTodo = async () => {
		const data = await fetch(api_base + "/todo/new", {
			method: "POST",
			headers: {
				"Content-Type": "application/json" 
			},
			body: JSON.stringify({
				placa: newTodo
			})
		}).then(res => res.json());
		setTodos([...todos, data]);
		setPopupActive(false);
		setNewTodo("");
	}

	const deleteTodo = async id => {
		const data = await fetch(api_base + '/todo/delete/' + id, { method: "DELETE" }).then(res => res.json());
		setTodos(todos => todos.filter(todo => todo._id !== data.result._id));
	}

	return (
		<div className="App">
			<h1>Bienvenidos a nuestro Parking</h1>
			<h3>Cupos disponibles </h3>
			<div className="todos">
				{todos.length > 0 ? todos.map(todo => (
					<div className={
						"todo" + (todo.complete ? " is-complete" : "")
					} key={todo._id}>
						<div className="checkbox"></div>
						<div className="text">{todo.placa}</div>
						<div className="delete-todo" onClick={() => deleteTodo(todo._id)}>x</div>
					</div>
					
				)) : (
					<div>
						<br/><br/>
						<h4>Todos los cupos estan disponibles</h4>
					</div>
				)}
			</div>

			<div className="addPopup" onClick={() => setPopupActive(true)}>+</div>

			{popupActive ? (
				<div className="popup">
					<div className="closePopup" onClick={() => setPopupActive(false)}>X</div>
					<div className="content">
						<h3>Agregar la placa del vehiculo</h3>
						<input type="text" className="add-todo-input" onChange={e => setNewTodo(e.target.value)} value={newTodo} />
						<div className="button" onClick={addTodo}>Agregar Vehiculo</div>
					</div>
				</div>
			) : ''}
		</div>
	);
}

export default App;

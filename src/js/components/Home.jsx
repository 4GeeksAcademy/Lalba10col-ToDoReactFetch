import React, { useEffect, useState } from 'react'
const API_URL_BASE = "https://playground.4geeks.com/todo";
const Home = () => {
	const [todos, setTodos] = useState([]);
	const [inputValue, setinputValue] = useState("");

	const getTodos = async () => {
		try {
			const response = await fetch(API_URL_BASE + '/users/Lalba10col', {
				method: "GET"
			});

			if (!response.ok) {
				throw new Error("Sucedio un error al consultar el endpoint.");
			}
			const data = await response.json();
			console.log(data);
			setTodos(data.todos)

		} catch (error) {
			console.log(error)
		}
	};

	const createTodo = async () => {
		try {
			let task = {
				"label": inputValue,
				"is_done": false
			};

			const response = await fetch(API_URL_BASE + '/todos/Lalba10col', {
				method: 'POST',
				headers: {
					'content-type': 'application/json'
				},
				body: JSON.stringify(task)
			});

			if (!response.ok) {
				throw new Error("Ocurrio un error al leer la tarea");
			}
			//const data = response.json();
			getTodos();

		} catch (error) {
		}
	};

	const deleteTodo = async (todo_id) => {
		try {
			const response = await fecth(API_URL_BASE + '/todos/' + todo_id, {
				method: 'DELETE'
			});
			if (!response.ok) {
				throw new error("Ocurrio un error eliminando la tarea con id" + todo_id);
			}

		} catch (error) {
			console.log(error)
		}
	}
	useEffect(() => {
		getTodos();
	}, [])
	return (
		<div className='container'>
			<div className='row'>
				<div className='col'>
					<h2>Lista de Tareas</h2>
					<input type="text" classname="form-control" placeholder="Write you task...." onChange={(event) => {
						setinputValue(event.target.value);
					}}
						onKeyDown={(event) => {
							if (event.key == 'Enter') {
								createTodo();
							}
						}}
					/>
				</div>
			</div>
			<div className='row'>
				<div className='col'>
					<ul>
						{todos.map((todo, index) => {
							return (
								<div key={todo.id} classname='d-flex justify-content-between aling-items-center'>
									<li>{todo.label}</li>
									<i className="fas fa-trash-alt" onClick={() => {
										deleteTodo(todo.id);
									}}></i>
								</div>
							)
						})}
					</ul>
				</div>
			</div>
		</div>)
}

export default Home
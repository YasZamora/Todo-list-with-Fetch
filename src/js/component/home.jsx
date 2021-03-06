import React, { Fragment, useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Lista = () => {
	const [lista, setLista] = useState([
		// { label: "Wash my hands", done: false },
		// { label: "Make the bed", done: false },
		// { label: "Wash my hands", done: false },
		// { label: "Eat", done: false },
		// { label: "Walk the dog", done: false },
	]);
	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/yaszamora")
			.then((resp) => {
				return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
			})
			.then((data) => {
				//here is were your code should start after the fetch finishes
				setLista(data);
				console.log(data); //this will print on the console the exact object received from the server
			})
			.catch((error) => {
				//error handling
				console.log(error);
			});
	}, []);
	const FuncionsetLista = () => {
		setLista([...lista, { label: value, done: false }]);
		fetch("https://assets.breatheco.de/apis/fake/todos/user/yaszamora", {
			method: "PUT",
			body: JSON.stringify([...lista, { label: value, done: false }]),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((resp) => {
				return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
			})
			.then((data) => {
				//here is were your code should start after the fetch finishes
				console.log(data); //this will print on the console the exact object received from the server
			})
			.catch((error) => {
				//error handling
				console.log(error);
			});
	};

	const [value, setValue] = useState("");
	const handleChange = (e) => {
		setValue(e.target.value);
	};
	const handleKeypress = (e) => {
		if (e.key == "Enter") {
			FuncionsetLista();
		}
	};
	const cleanAll = () => {
		const newList = [];
		setLista(newList);
		fetch("https://assets.breatheco.de/apis/fake/todos/user/yaszamora", {
			method: "PUT",
			body: JSON.stringify(newList),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((resp) => {
				console.log(resp.ok); // will be true if the response is successfull
				console.log(resp.status); // the status code = 200 or code = 400 etc.
				console.log(resp.text()); // will try return the exact result as string
				return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
			})
			.then((data) => {
				//here is were your code should start after the fetch finishes
				console.log(data); //this will print on the console the exact object received from the server
			})
			.catch((error) => {
				//error handling
				console.log(error);
			});
	};
	const deleteItem = (index) => {
		const listCopy = [...lista];
		listCopy.splice(index, 1);
		setLista(listCopy);
		fetch("https://assets.breatheco.de/apis/fake/todos/user/yaszamora", {
			method: "PUT",
			body: JSON.stringify(listCopy),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((resp) => {
				return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
			})
			.then((data) => {
				//here is were your code should start after the fetch finishes
				console.log(data); //this will print on the console the exact object received from the server
			})
			.catch((error) => {
				//error handling
				console.log(error);
			});
	};
	return (
		<>
			<input
				value={value}
				onChange={handleChange}
				onKeyPress={handleKeypress}></input>
			<ListGroup className="grupolista">
				{lista.map((elemento, index) => {
					return (
						<>
							<ListGroup.Item className="Item">
								<span>{elemento.label}</span>
								<span
									className="x"
									onClick={() => deleteItem(index)}>
									x
								</span>
							</ListGroup.Item>
						</>
					);
				})}
			</ListGroup>
			<div className="contador">{lista.length} item left</div>
			<button
				style={{
					float: "right",
					borderColor: "#DEC2C6",
					boxShadow: "none",
					color: "#DEC2C6",
				}}
				onClick={cleanAll}>
				{" "}
				Clean all
			</button>
		</>
	);
};

const Home = () => {
	return (
		<div className="container">
			<span className="titulo">todos</span>
			<Lista />
		</div>
	);
};

export default Home;

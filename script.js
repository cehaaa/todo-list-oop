class Store {
	#localStorageKey;
	constructor() {
		this.localStorageKey = "todo-local-storage";
		this.store = JSON.parse(localStorage.getItem(this.localStorageKey)) || [];
	}
	get getTaskList() {
		return this.store;
	}
	setStore(payload) {
		this.store.push(payload);
		localStorage.setItem(this.localStorageKey, JSON.stringify(this.store));
	}
	removeFromStore(id) {
		this.store = this.store.filter(task => task.id !== id);
		localStorage.setItem(this.localStorageKey, JSON.stringify(this.store));
	}
}
class Form {
	constructor({ store, onTaskAdded }) {
		this.store = store;
		this.onTaskAdded = onTaskAdded;

		this.mockDescription =
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis sint beatae.";

		this.taskForm = document.querySelector("#task-form");
		this.taskInput = document.querySelector("#task-input");
		this.taskForm.addEventListener("submit", this.addTaskHandler.bind(this));
	}
	addTaskHandler(e) {
		e.preventDefault();
		const value = this.taskInput.value.trim();
		const isHasValue = value.length > 0;
		if (!isHasValue) return;

		const payload = {
			id: this.store.getTaskList.length + 1,
			title: value,
			description: this.mockDescription,
		};

		this.store.setStore(payload);
		this.taskInput.value = "";
		this.onTaskAdded();
	}
}

class App {
	constructor() {
		this.store = new Store();
		this.form = new Form({
			store: this.store,
			onTaskAdded: this.render.bind(this),
		});
		this.taskList = document.querySelector("#task-list");
	}
	render() {
		this.taskList.innerHTML = "";
		const cards = this.store.getTaskList.reduce((acc, curr) => {
			const card = new Card(curr);
			return (acc += card.render());
		}, "");
		this.taskList.innerHTML = cards;
		this.applyRemoveTaskHandler();
	}
	applyRemoveTaskHandler(e) {
		const removeButtons = document.querySelectorAll(".remove-task");
		removeButtons.forEach(button => {
			button.addEventListener("click", this.removeTaskHandler.bind(this));
		});
	}
	removeTaskHandler(e) {
		const { id } = e.currentTarget.dataset;
		this.store.removeFromStore(+id);
		this.render();
	}
	init() {
		this.render();
	}
}

document.addEventListener("DOMContentLoaded", () => {
	const app = new App();
	app.init();
});

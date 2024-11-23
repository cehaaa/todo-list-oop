class Card {
	constructor({ id, title, description }) {
		this.id = id;
		this.title = title;
		this.description = description;
	}
	render() {
		const closeIcon = new CloseIcon().render();
		return `
			<figure class="bg-white p-4 rounded hover:shadow duration-200">
				<div class="flex items-center justify-between">
					<h1 class="font-medium capitalize">${this.title}</h1>
					<button class="remove-task" data-id="${this.id}">${closeIcon}</button>
				</div>
				<p class="text-gray-500 text-sm mt-2">
					${this.description}
				</p>
			</figure>
		`;
	}
}

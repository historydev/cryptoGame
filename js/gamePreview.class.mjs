export class PreviewGame {
	constructor(config) {
		this.types = ['land', 'machine', 'slot'];
		this.name = config.name;
		this.logo = config.logo;
		this.favicon = config.favicon;
		this.contentElement = document.querySelector(config.contentElement);
		this.lands = [];
		this.machines = [];
		this.checkType = (type) => {
			if(type === 'land') return {
				item: this.lands,
				output: 'lands'
			}
		}
		this.sortRenderElems = (items, output) => {

			const arr = [];
			items.forEach(el => {
				return arr.push(output.removeChild(el));
			});
			arr.sort((a, b) => a.dataset.id > b.dataset.id ? 1 : -1)
			arr.forEach(el => output.appendChild(el));

		}

		document.querySelector('header .logo img').setAttribute('src', this.logo);
		document.querySelector('title').innerText = this.name;
		document.querySelector('link[rel=icon]').href = this.favicon;

	}

	render(renderElems, type, outputNode) {
		if(
			typeof renderElems === typeof []
			&& typeof type === 'string'
		) {
			this.output = this.contentElement.querySelector(`.${outputNode}`);
			this.itemType = this.types.find(el => el === type);

			if(this.itemType && typeof this.itemType === 'string') {

				renderElems.forEach(el => {

					const div = document.createElement('div');
					div.className = el.className;
					div.innerHTML = el.html;
					div.dataset.id = `${el.name} - ${el.id}`;
					div.dataset.name = el.name;

					this.output.append(div);

					this.sortRenderElems(this.output.querySelectorAll('.box[data-id]'), this.output);

				});

				return 'Elements has been rendered';
			} else throw 'Render type incorrect';
		}

		throw 'Error in render elements';
	}

	addMachine(machine) {
		if(
			typeof machine.name === 'string'
			&& typeof machine.title === 'string'
			&& typeof machine.img === 'string'
			&& typeof machine.data === typeof []
			&& typeof machine.inventory === typeof []
			&& typeof machine.buttonText === 'string'
			&& typeof machine.removeButtonText === 'string'
			&& typeof machine.profit === 'number'
			&& typeof machine.time === 'number'
			&& typeof machine.render === 'boolean'
			&& typeof machine.land === 'string'
			&& Object.keys(machine).length === 11
		) {

			const updatedMachine = {
				...machine,
				html: `
					<div class="useInventory">
						<div class="useItem">
							<img src="https://d7qtdni8y4s5w.cloudfront.net/a2761b66-86e3-4cfd-9c7d-e629305efb3e/img/financial/bee.png" alt="">
							<div class="count">1</div>
							<button class="useBtn">Use</button>
						</div>
						<div class="useItem">
							<img src="https://d7qtdni8y4s5w.cloudfront.net/a2761b66-86e3-4cfd-9c7d-e629305efb3e/img/financial/bee.png" alt="">
							<div class="count">1</div>
							<button class="useBtn">Use</button>
						</div>
						<div class="useItem">
							<img src="https://d7qtdni8y4s5w.cloudfront.net/a2761b66-86e3-4cfd-9c7d-e629305efb3e/img/financial/bee.png" alt="">
							<div class="count">1</div>
							<button class="useBtn">add</button>
						</div>
					</div>
					<img src="${machine.img}" alt="">
					<div class="desc">
						<div class="title">${machine.name}</div>
						<div class="title title2">${machine.title}</div>
						${machine.data.map(el => `
							<div class="descItem">
								<div class="title">${el.name}:</div>
								<div class="value">${el.value}</div>
							</div>
						`)}
					</div>
					<div class="buttons">
						<button class="remove">${machine.removeButtonText}</button>
						<button class="take">${machine.buttonText}</button>
					</div>
				`,
				className: 'box boxItem'
			}

			this.machineIndex = this.machines.findIndex(el => el.name === updatedMachine.name);

			if(this.machineIndex < 0) {

				this.machines.push(updatedMachine);
				updatedMachine.id = this.machines.findIndex(el => el === updatedMachine);

				if(machine.render)  {
					this.render(this.machines.filter(el => el === updatedMachine).map(el => el), 'machine', 'machines');
					return 'Machine has been added';
				}

				this.addSlot(updatedMachine.name, 'machine');

				return 'Slot has been added';
			}

			return 'This machine has been find, change name';
		}

		throw 'Error in added element';
	}

	slotHandler(itemName, type) {
		if(itemName && typeof itemName !== 'string') throw `Incorrect itemName type value: ${typeof itemName}`;

		const T = this.checkType(type);

		this.itemIndex = T.item.findIndex(el => el.name === itemName);
		if(this.itemIndex < 0) throw `Incorrect itemName value: ${itemName}`;

		if(T) {
			T.item[this.itemIndex].html = T.item.filter(el => el.name === itemName)[0].html;
			this.render(T.item.filter(el => el.name === itemName), type, T.output);
		}

		this.contentElement.querySelector(`.addBox[data-name="${itemName}"]`).remove();


		return `Slot added for ${itemName}`;
	}

	addSlot(itemName, type) {
		if(itemName && typeof itemName !== 'string') throw 'Land name already exists';

		const T = this.checkType(type);

		this.itemIndex = T.item.findIndex(el => el.name === itemName);

		if(this.itemIndex < 0) throw `Name ${itemName} not found`;

		T.item[this.itemIndex].slot = {
			id: this.itemIndex,
			name: itemName,
			html: `<div>+</div>`
		};

		T.item[this.itemIndex].slot.className = `box addBox`;

		this.render(T.item.filter(el => el.name === itemName).map(el => el.slot), type, T.output);
		document.querySelector(`.lands .addBox[data-name="${itemName}"]`).onclick = () => this.slotHandler(itemName, type);

		return 'Slots added';
	}

	addLand(land) {
		if(
			typeof land.name === 'string'
			&& typeof land.img === 'string'
			&& typeof land.data === typeof []
			&& typeof land.buttonText === 'string'
			&& typeof land.render === 'boolean'
			&& Object.keys(land).length === 5
		)
		{
			const updatedLand = {
				...land,
				html: `
					<img src="${land.img}" alt="">
					<div class="desc">
						<div class="title">${land.name}</div>
						${land.data.map(el => `
						
							<div class="descItem">
								<div class="title">${el.name}:</div>
								<div class="value">${el.value}</div>
							</div>
						
						`)}
					</div>
					<div class="buttons">
						<button>${land.buttonText}</button>
					</div>`,
				className: 'box'
			}

			this.landIndex = this.lands.findIndex(el => el.name === updatedLand.name);

			if(this.landIndex < 0) {

				this.lands.push(updatedLand);
				updatedLand.id = this.lands.findIndex(el => el === updatedLand);

				if(land.render)  {
					this.render(this.lands.filter(el => el === updatedLand).map(el => el), 'land', 'lands');
					return 'Land has been added';
				}

				this.addSlot(updatedLand.name, 'land');

				return 'Slot has been added';
			}

			return 'This land has been find, change land name';
		}

		throw 'Error in added element';
	}
}
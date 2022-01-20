export class PreviewGame {
	constructor(config) {
		this.types = config.renderTypes;
		this.name = config.name;
		this.logo = config.logo;
		this.favicon = config.favicon;
		this.contentElement = document.querySelector(config.contentElement);
		this.lands = [];
		this.slots = [];

		document.querySelector('header .logo img').setAttribute('src', this.logo);
		document.querySelector('title').innerText = this.name;
		document.querySelector('link[rel=icon]').href = this.favicon;

	}

	render(renderElems, type, outputNode) {
		if(
			typeof renderElems === 'object'
			&& typeof type === 'string'
		) {
			const itemType = this.types.find(el => el === type);
			if(itemType && typeof itemType === 'string') {
				const array = [];
				renderElems.map((el, i, elems) => {
					const div = document.createElement('div');
					div.innerHTML = el;
					array.push(div);
					if([... new Set(array)].length === elems.length) this.contentElement.querySelector(`.${outputNode}`).append(div);
				}, array);
				// this.slots.forEach(el => {
				// 	if(this.contentElement.querySelector(`.addBox[data-name="${el.name}"]`)) {
				// 		if(!el.render) {
				// 			this.contentElement.querySelector(`.addBox[data-name="${el.name}"]`).onclick = () =>
				// 				this.slotHandler(el.name, el.itemName, el.type);
				// 		}
				// 	}
				// });
				this.lands.forEach((land, i) => {
					if(this.contentElement.querySelector(`.box[data-name="${land.name}"]`)) {
						this.contentElement.querySelector(`.box[data-name="${land.name}"] button`).onclick = () => {
							document.querySelector('.lands').classList.remove('active');
							document.querySelector('.machines').classList.add('active');
						}
						// land.machines.forEach(machine => {
						// 	if(!machine.render) return this.addSlot(`Slot ${machine.name}`, machine.name, 'machine');
						// });
						land.slots.forEach(slot => {
							if(this.contentElement.querySelector(`.addBox[data-name="${slot.name}"]`)) {
								if(!slot.render) {
									this.contentElement.querySelector(`.addBox[data-name="${slot.name}"]`).onclick = () =>
										this.slotHandler(slot.name, slot.itemName, slot.type);
								}
							}
						})
					}
				});
				return 'Elements has been rendered';
			} else throw 'Render type incorrect';
		}
		throw 'Error in render elements';
	}

	addMachine(machine) {
		if(
			typeof machine.name === 'string'
			&& typeof machine.desc === 'string'
			&& typeof machine.img === 'string'
			&& typeof machine.data === typeof []
			&& typeof machine.buttonText === 'string'
			&& typeof machine.removeButtonText === 'string'
			&& typeof machine.inventory === 'object'
			&& typeof machine.render === 'boolean'
			&& typeof machine.land === 'string'
			&& Object.keys(machine).length === 9
		)
		{
			const updatedMachine = {
				...machine,
				slots: [],
				html: `
					<div class="box boxItem">
                        <div class="useInventory">
                            <div class="useItem">
                                <img src="${machine.img}" alt="">
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
                        <img src="https://d7qtdni8y4s5w.cloudfront.net/8a374261-6993-4ef4-88fe-56a51c5d0458/img/splants/CrystalAdultReadyBlush.png" alt="">
                        <div class="desc">
                            <div class="title">${machine.name}</div>
                            <div class="title title2">${machine.desc}</div>
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
                    </div>`
			}

			const landIndex = this.lands.findIndex(el => el.name === machine.land);
			if(landIndex < 0) throw `Incorrect land name: ${machine.land}`;

			if(!this.lands[landIndex].machines.filter(el => el.name === updatedMachine.name).length) {
				if(this.lands[landIndex].render) {
					this.lands[landIndex].machines.push(updatedMachine);
				}
			} else throw `This machine name already exists: ${updatedMachine.name}`;

			if(machine.render) {
				this.render(this.lands[landIndex].machines.filter(el => el.render !== false).map(el => el.html), 'machine', 'machines');
			} else {
				this.addSlot(`Slot ${machine.name}`, machine.land, 'machine');
			}

			return 'Land has been added';
		}
		throw 'Error in added element';
	}

	slotHandler(slot, item, type) {
		if(!slot && typeof slot !== 'string') throw `Incorrect slotName type value: ${typeof slot}`;
		if(!item && typeof item !== 'string') throw `Incorrect itemName type value: ${typeof item}`;

		const updated = (() => {
			if(type === 'land') return {
				item: this.lands,
				output: 'lands'
			};
			if(type === 'machine') return {
				item: this.lands.map(el => {
					if(el.machines.filter(el => el.name === item).length) return el;
					return false
				})[0].machines,
				output: 'machines'
			};
		})();

		const slotIndex = updated.item.slots.findIndex(el => el.name === slot);
		const itemIndex = updated.item.findIndex(el => el.name === item);

		if(slotIndex < 0) throw `Incorrect slotName value: ${slot}`;
		if(itemIndex < 0) throw `Incorrect itemName value: ${item}`;

		updated.item.slots[slotIndex].html = updated.item.filter(el => el.name === item)[0].html;
		this.render(updated.item.slots.filter(el => el.type === type).map(el => el.html), type, updated.output);
		this.contentElement.querySelector(`.addBox[data-name="${slot}"]`).remove();

		return `Land added in slot ${slot}`;

	}

	addSlot(slotName, itemName, type) {
		if(this.slots.filter(el => el.name === slotName).length) throw 'Slot name already exists';
		if(this.slots.filter(el => el.itemName === itemName).length && type !== 'machine') throw 'Land name already exists';
		if(slotName && typeof slotName !== 'string') throw `Incorrect slotName type: ${typeof slotName}`;
		if(itemName && typeof itemName !== 'string') throw `Incorrect itemName type: ${itemName}`;
		if(type === 'land' && this.lands.filter(el => el.name === itemName && el.render === true).length) throw `This land rendered: ${itemName}`;

		const output = (() => {
			if(type === 'land') return 'lands';
			if(type === 'machine') return 'machines';
		})();

		if(type === 'land') {

			const index = this.lands.findIndex(el => el.name === itemName);
			if(index < 0) throw `Can't install slot in land: ${itemName}`;
			this.lands[index].slots.push({
				name: slotName,
				html: `<div class="box addBox" data-name="${slotName}"><div>+</div></div>`,
				itemName: itemName,
				type: type
			});
			this.render(this.lands[index].slots.filter(el => el.type === type).map(el => el.html), type, output);

			return 'Lands slots added'
		} else if(type === 'machine') {

			console.log(this.lands.map(land => land.machines).map(machine => machine.filter(el => el.name === itemName)));
			const index = this.lands.map(land => land.machines).map(machine => machine.filter(el => el.render === false));
			if(index < 0) throw `Can't install slot in machine: ${itemName}`;
			this.lands.forEach(land => land.machines.forEach(machine => {
				if(machine.length) {
					machine.slots.push({
						name: slotName,
						html: `<div class="box addBox" data-name="${slotName}"><div>+</div></div>`,
						itemName: itemName,
						type: type
					})
				}
			}));
			this.render(this.lands[index].slots.filter(el => el.type === type).map(el => el.html), type, output);

			return 'Lands slots added'
		}

	}

	addLand(land) {
		if(
			typeof land.name === 'string'
			&& typeof land.img === 'string'
			&& typeof land.data === 'object'
			&& typeof land.machines === 'object'
			&& typeof land.buttonText === 'string'
			&& typeof land.render === 'boolean'
			&& Object.keys(land).length === 6
		)
		{
			const updatedLand = {
				...land,
				slots: [],
				html: `
					<div class="box" data-name="${land.name}">
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
	                    </div>
	                </div>`
			}

			if(!this.lands.filter(el => el.name === updatedLand.name).length) {
				this.lands.push(updatedLand);
			} else return 'This land has been find, change land name';

			if(!updatedLand.render) {
				this.addSlot(`Slot ${updatedLand.name}`, updatedLand.name, 'land');
				console.log(this.lands.filter(el => el.name === updatedLand.name));
			}

			if(!this.lands.filter(el => el.name === updatedLand.name)[0].slots.filter(el => el.type === 'land' && el.itemName === updatedLand.name).length) {
				this.render(this.lands.filter(el => el.render !== false).map(el => el.html), 'land', 'lands');
			}

			return 'Land has been added';
		}
		throw 'Error in added element';
	}

}
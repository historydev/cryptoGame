export class PreviewGame {
	constructor(config) {
		this.types = ['land', 'machine', 'slot'];
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
			typeof renderElems === typeof []
			&& typeof type === 'string'
		) {
			const itemType = this.types.find(el => el === type);
			if(itemType && typeof itemType === 'string') {
				this.contentElement.querySelector(`.${outputNode}`).innerHTML = renderElems.map(el => el).join('');
				this.slots.forEach(el => {
					if(this.contentElement.querySelector(`.addBox[data-name="${el.name}"]`)) {
						this.contentElement.querySelector(`.addBox[data-name="${el.name}"]`).onclick = () =>
							this.slotHandler(el.name, el.itemName, el.type);
					}
				})
				return 'Elements has been rendered';
			} else throw 'Render type incorrect';
		}
		throw 'Error in render elements';
	}

	addMachine(machine, land) {
		if(
			typeof machine.name === 'string'
			&& typeof machine.img === 'string'
			&& typeof machine.data === typeof []
			&& typeof machine.buttonText === 'string'
			&& typeof machine.render === 'boolean'
			&& Object.keys(machine).length === 5
		)
		{
			const updatedMachine = {
				...machine,
				machines: [],
				html: `
					<div class="box" data-${land.name.split(' ').join('')}>
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

			if(render) this.render(this.lands.filter(el => el.render !== false).map(el => el.html), 'land', 'lands');

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
		})();

		const slotIndex = this.slots.findIndex(el => el.name === slot);
		const itemIndex = updated.item.findIndex(el => el.name === item);

		if(slotIndex < 0) throw `Incorrect slotName value: ${item}`;
		if(itemIndex < 0) throw `Incorrect itemName value: ${item}`;

		this.slots[slotIndex].html = updated.item.filter(el => el.name === item)[0].html;
		this.render(this.slots.map(el => el.html), type, updated.output);

		return `Land added in slot ${slot}`;

	}

	addSlot(slotName, itemName, type) {
		if(this.slots.filter(el => el.name === slotName).length) throw 'Slot name already exists';
		if(this.slots.filter(el => el.itemName === itemName).length) throw 'Land name already exists';
		if(slotName && typeof slotName !== 'string') throw `Incorrect slotName type: ${typeof slotName}`;
		if(itemName && typeof itemName !== 'string') throw 'Land name already exists';

			this.slots.push({
				name: slotName,
				html: `<div class="box addBox" data-name="${slotName}"><div>+</div></div>`,
				itemName: itemName,
				type: type
			});

			const output = (() => {
				if(type === 'land') return 'lands';
			})();

			this.render(this.slots.map(el => el.html), type, output);

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
				miners: [],
				html: `
					<div class="box" data-${land.name.split(' ').join('')}>
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

			if(land.render) this.render(this.lands.filter(el => el.render !== false).map(el => el.html), 'land', 'lands');

			return 'Land has been added';
		}
		throw 'Error in added element';
	}

}
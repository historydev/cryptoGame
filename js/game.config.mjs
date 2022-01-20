
export const gameConfig = {
	general: {
		name: 'My game',
		logo: './assets/logo.svg',
		favicon: './assets/logo.svg',
		contentElement: 'main .content',
		renderTypes: ['land', 'machine', 'slot']
	},
	lands: [
		{
			name: 'My land',
			img: 'https://d7qtdni8y4s5w.cloudfront.net/a2761b66-86e3-4cfd-9c7d-e629305efb3e/img/lands/free/common.png',
			data: [
				{
					name: 'Status',
					value: 'Active'
				}
			],
			machines: [],
			buttonText: 'Go to land',
			render: true
		},
		{
			name: 'My land 2',
			img: 'https://d7qtdni8y4s5w.cloudfront.net/a2761b66-86e3-4cfd-9c7d-e629305efb3e/img/lands/free/common.png',
			data: [
				{
					name: 'Status',
					value: 'Active'
				}
			],
			machines: [],
			buttonText: 'Go to land',
			render: true
		},
		{
			name: 'My land 3',
			img: 'https://d7qtdni8y4s5w.cloudfront.net/a2761b66-86e3-4cfd-9c7d-e629305efb3e/img/lands/free/common.png',
			data: [
				{
					name: 'Status',
					value: 'Active'
				}
			],
			machines: [],
			buttonText: 'Go to land',
			render: false
		}
	],
	machines: [
		{
			name: 'Crystal Seed',
			desc: 'Small pot',
			img: 'https://d7qtdni8y4s5w.cloudfront.net/a2761b66-86e3-4cfd-9c7d-e629305efb3e/img/financial/bee.png',
			data: [
				{
					name: 'Harvest on',
					value: '2021-12-17 23:57:08 UTC'
				}
			],
			inventory: {},
			buttonText: 'Harvest: 600',
			removeButtonText: 'Remove',
			render: true,
			land: 'My land'
		},
		{
			name: 'Crystal Seed 2',
			desc: 'Small pot',
			img: 'https://d7qtdni8y4s5w.cloudfront.net/a2761b66-86e3-4cfd-9c7d-e629305efb3e/img/financial/bee.png',
			data: [
				{
					name: 'Harvest on',
					value: '2021-12-17 23:57:08 UTC'
				}
			],
			inventory: {},
			buttonText: 'Harvest: 600',
			removeButtonText: 'Remove',
			render: false,
			land: 'My land 2'
		}
	]
}
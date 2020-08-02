import PageLayout from '../components/NAV/PageLayout.vue'

export default [
	{
		path: '',
		redirect: '/home',

	},
	{
		path: '/',
		// name: 'Home',
		component: PageLayout,
		children: [{
			path: '/home',
			name: 'home',
			component: () => import('../views/Home/Home.vue')
		}
		]
	},
]
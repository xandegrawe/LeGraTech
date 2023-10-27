import { Icon } from '@chakra-ui/react';
import { MdBarChart, MdPerson, MdHome, MdLock, MdOutlineAttachMoney, MdAccountCircle, MdSupervisorAccount } from 'react-icons/md';

// Admin Imports
import MainDashboard from 'views/admin/default';
// import NFTMarketplace from 'views/admin/marketplace';
import Profile from 'views/admin/profile';
import DataTables from 'views/admin/people_register';

// Auth Imports
import SignInCentered from 'views/auth/signIn';
import CashFlow from 'views/admin/cashFlow';
import ClientTable from 'views/admin/people_register/components/ClientTable';
import SuppliersTable from 'views/admin/people_register/components/SuppliersTable';
import { FaBoxes } from 'react-icons/fa';
import People from 'views/admin/people_register';

const routes = [
	{
		name: 'Dashboards',
		layout: '/admin',
		path: '/default',
		icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
		component: MainDashboard
	},
	{
		name: 'Financeiro',
		layout: '/admin',
		path: '/financeiro',
		icon: <Icon as={MdOutlineAttachMoney} width='20px' height='20px' color='inherit' />,
		component: CashFlow,
		secondary: true
	},
	{	
		name: 'Clientes',
		layout: '/admin',
		icon: <Icon as={MdSupervisorAccount} width='20px' height='20px' color='inherit' />,
		path: '/customers',
		component: () => <People route={{ path: '/customers' }} />
	},
	{	
		name: 'Fornecedores',
		layout: '/admin',
		icon: <Icon as={FaBoxes} width='20px' height='20px' color='inherit' />,
		path: '/suppliers',
		component: () => <People route={{ path: '/suppliers' }} />
	},
	{
		name: 'Perfil',
		layout: '/admin',
		path: '/profile',
		icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
		component: Profile
	},
	// {
	// 	name: 'Sign In',
	// 	layout: '/auth',
	// 	path: '/sign-in',
	// 	icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
	// 	component: SignInCentered
	// },
];

export default routes;

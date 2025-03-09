import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { Provider } from 'react-redux';
import { store } from '../../Quiz/src/store';
import Clinic from './Clinic';

import './index.css';

createRoot(document.getElementById('root')).render(
	<BrowserRouter
		future={{
			v7_startTransition: true,
			v7_relativeSplatPath: true,
		}}
	>
		<Clinic Provider={store} />
	</BrowserRouter>,
);

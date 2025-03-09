import { Route, Routes } from 'react-router';
import { Form, Authorization, Entries } from './pages';

import styled from 'styled-components';

const AppColumn = styled.div`
	display: flex;
	flex-direction: column;
	width: 1000px;
	min-height: 100%;
	margin: 0 auto;
`;

const Clinic = () => {
	return (
		<AppColumn>
			<Routes>
				<Route path="/" element={<Form />} />
				<Route path="/login" element={<Authorization />} />
				<Route path="/entries" element={<Entries />} />
				<Route path="*" element={<div>Такой страницы не существует</div>} />
			</Routes>
		</AppColumn>
	);
};

export default Clinic;

import { useEffect, useState } from 'react';
import { Title } from '../../components';

import styled from 'styled-components';

const EntriesContainer = ({ className }) => {
	const [entries, setEntries] = useState([]);

	useEffect(() => {
		fetch('http://localhost:5000/entries')
			.then((response) => response.json())
			.then((dataEntries) => setEntries(dataEntries))
			.catch((error) => console.log('Error fetching entries: ', error));
	}, [entries]);

	return (
		<div className={className}>
			<div className="title">
				<Title weight="normal" size="46px" margin="0 0 40px 0">
					Заявки с формы
				</Title>
				<div className="table-row">
					<table className="table">
						<thead>
							<tr>
								<th>Дата отправки</th>
								<th>ФИО</th>
								<th>Телефон</th>
								<th>Проблема</th>
							</tr>
						</thead>
						<tbody>
							{entries.map(({ _id, date, name, phone, problem }) => (
								<tr key={_id}>
									<td>{date}</td>
									<th scope="row">{name}</th>
									<td>{phone}</td>
									<td>{problem}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export const Entries = styled(EntriesContainer)`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	& .title {
		text-align: center;
	}

	& .table-row {
		width: 100%;
	}

	& .table {
		border-collapse: collapse;
		width: 100%;
		border: 1px solid #000;
	}

	& thead {
		padding: 8px;
	}

	& th,
	td {
		border: 1px solid #000;
		padding: 8px;
		text-align: center;
	}

	& th:nth-child(4),
	& td:nth-child(4) {
		width: 300px;
	}
`;

import { useState } from 'react';
import { Title, Button } from '../../components';
import styled from 'styled-components';

const FormContainer = ({ className }) => {
	const [phone, setPhone] = useState('');
	const [name, setName] = useState('');
	const [problem, setProblem] = useState('');
	const [sentFlag, setSentFlag] = useState(false);

	const formatPhoneNumber = (value) => {
		let numbers = value.replace(/\D/g, '');

		if (numbers.length > 11) numbers = numbers.slice(0, 11);

		let formatted = '+7 ';
		if (numbers.length > 1) formatted += `(${numbers.slice(1, 4)}`;
		if (numbers.length >= 5) formatted += `) ${numbers.slice(4, 7)}`;
		if (numbers.length >= 8) formatted += `-${numbers.slice(7, 9)}`;
		if (numbers.length >= 10) formatted += `-${numbers.slice(9, 11)}`;

		return formatted;
	};

	const handleInput = (e) => {
		setPhone(formatPhoneNumber(e.target.value));
	};

	const onSubmit = async (e) => {
		e.preventDefault();

		if (phone.replace(/\D/g, '').length !== 11) {
			alert('Введите корректный номер телефона');
			return;
		}

		const date = new Date().toLocaleString();

		try {
			const response = await fetch('http://localhost:5000/entries', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name, phone, problem, date }),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || 'Ошибка отправки данных');
			}
		} catch (error) {
			console.error(error);
		}
		console.log('Форма отправлена', { name, phone, problem, date });
		setName('');
		setPhone('');
		setProblem('');
		setSentFlag(!sentFlag);
	};

	const entriesSent = (
		<div className="entries-sent">
			<div>Заявка отправлена!</div>
			<Button margin="20px 0 0 0" onClick={() => setSentFlag(!sentFlag)}>
				Вернуться назад
			</Button>
		</div>
	);

	return (
		<div className={className}>
			{sentFlag ? (
				entriesSent
			) : (
				<>
					<Title size="32px" weight="normal" margin="0 0 40px 0">
						Запись к врачу
					</Title>
					<div className="container">
						<form className="form-information" onSubmit={onSubmit}>
							<div className="information">
								<label htmlFor="name">ФИО</label>
								<input
									type="text"
									name="name"
									value={name}
									onChange={(e) => setName(e.target.value)}
									required
									className="person-information"
								/>
							</div>

							<div className="information">
								<label htmlFor="phone">Номер телефона</label>
								<input
									type="tel"
									name="phone"
									value={phone}
									onChange={handleInput}
									required
									className="person-information"
									placeholder="+7 (___) ___-__-__"
								/>
							</div>

							<div className="trable">
								<p>Опишите вашу проблему</p>
								<textarea
									name="problem"
									value={problem}
									onChange={(e) => setProblem(e.target.value)}
								/>
							</div>
							<div className="button">
								<Button bghover="#00FF00" type="submit">
									Отправить
								</Button>
							</div>
						</form>
					</div>{' '}
				</>
			)}
		</div>
	);
};

export const Form = styled(FormContainer)`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 70vh;

	& .container {
		width: 350px;
		border: 1px solid #000;
		border-radius: 5px;
		padding: 20px;
	}

	& .information {
		display: flex;
		flex-direction: column;
		margin: 0 0 20px 0;
	}

	& .person-information {
		width: 310px;
		height: 30px;
	}

	& label {
		margin: 0 0 5px 0;
	}

	& input {
		font-size: 16px;
	}

	& .trable {
		height: 100px;
		width: 306px;
		margin: 0 0 60px 0;
		font-size: 18px;
	}

	& .trable p {
		margin: 0 0 10px 0;
	}

	& textarea {
		font-size: 16px;
		padding: 5px;
		resize: none;
		width: 306px;
		height: 110px;
	}

	& .button {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	& .entries-sent {
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 46px;
	}
`;

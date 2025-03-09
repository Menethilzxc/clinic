import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Title, Button } from '../../components';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import styled from 'styled-components';

const fieldsScheme = yup.object().shape({
	email: yup
		.string()
		.matches(/^[^@]+@[^@]+\.[^@]+$/, 'некорректный формат электронной почты'),
	password: yup.string(),
});

const AuthorizationContainer = ({ className }) => {
	const navigate = useNavigate();
	const [error, setError] = useState('');

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
		},
		resolver: yupResolver(fieldsScheme),
	});

	const emailError = errors.email?.message;

	const onSubmit = async (formData) => {
		try {
			const response = await fetch('http://localhost:5000/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(formData),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || 'Ошибка авторизации');
			}

			localStorage.setItem('token', data.token);
			navigate('/entries');
		} catch (error) {
			setError(error.message);
		}
	};

	return (
		<div className={className}>
			<div className="container">
				<Title margin="10px 0 20px 0">Авторизация</Title>
				<form action="" className="form-auth" onSubmit={handleSubmit(onSubmit)}>
					<div className="email">
						<label htmlFor="email">Электронная почта</label>
						<input type="email" {...register('email')} />
					</div>
					<div className="password">
						<label htmlFor="password">Пароль</label>
						<input
							type="password"
							name="password"
							{...register('password')}
						/>
					</div>
					<Button
						bghover="#69c9f5"
						width="209px"
						type="submit"
						disabled={!!emailError}
					>
						Войти
					</Button>
				</form>

				{error ? <p className="error">{error}</p> : ''}
			</div>
		</div>
	);
};

export const Authorization = styled(AuthorizationContainer)`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 80vh;

	& .container {
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 300px;
		width: 300px;
		border: none;
		border-radius: 10px;
		box-shadow: 3px 3px 15px;
	}

	& .form-auth {
		display: flex;
		flex-direction: column;
	}

	& .email {
		display: flex;
		flex-direction: column;
		margin: 0 0 20px 0;
	}

	& .password {
		display: flex;
		flex-direction: column;
		margin: 0 0 40px 0;
	}

	& label {
		margin: 0 0 5px 0;
	}

	& input {
		font-size: 16px;
		padding: 5px;
		border-radius: 7px;
		border: 1px solid #69c9f5;
	}

	& input:focus,
	input:active {
		outline: none;
		border-color: #69c9f5;
		box-shadow: 2px 2px 4px 0 #69c9f5;
	}

	& .error {
		color: red;
		font-size: 18px;
	}
`;

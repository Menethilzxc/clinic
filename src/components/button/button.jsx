import styled from 'styled-components';

const ButtonContainer = ({ className, children, disabled, ...props }) => {
	return (
		<button className={className} {...props} disabled={disabled}>
			{children}
		</button>
	);
};

export const Button = styled(ButtonContainer)`
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: ${({ bgcolor }) => bgcolor};
	width: ${({ width = '200px' }) => width};
	margin: ${({ margin = '' }) => margin};
	font-size: 18px;
	color: ${({ color = '#000' }) => color};
	padding: 10px;
	cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
	border: 1px solid #000;
	border-radius: 5px;
	opacity: ${({ disabled }) => (disabled ? '0.4' : '1')};
	&:hover {
		background-color: ${({ bghover }) => bghover};
		color: ${({ colorhover }) => colorhover};
	}
`;

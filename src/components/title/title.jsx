import styled from 'styled-components';

const TitleContainer = ({ className, children }) => {
	return <h2 className={className}>{children}</h2>;
};

export const Title = styled(TitleContainer)`
	font-size: ${({ size }) => size};
	margin: ${({ margin }) => margin};
	font-weight: ${({ weight }) => weight};
`;

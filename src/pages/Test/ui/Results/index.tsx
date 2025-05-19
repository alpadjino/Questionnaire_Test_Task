import styled from 'styled-components';
import type { TestVariant } from '../../types';

const ResultsContainer = styled.div`
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
`;

const ResultsTitle = styled.h3`
  color: #2c3e50;
  margin-bottom: 20px;
  text-align: center;
  font-size: 1.5em;
`;

const ResultsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 20px 0;
`;

const ResultItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #eee;
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.02);
  }
`;

const ResultQuestion = styled.span`
  color: #34495e;
  font-weight: 500;
`;

const ResultRating = styled.span`
  color: #e74c3c;
  font-weight: bold;
`;

const Results = ({ questions }: { questions: TestVariant[] }) => {
  return (
    <ResultsContainer>
      <ResultsTitle>Ваши результаты</ResultsTitle>
      <ResultsList>
        {questions.map(({ id, label, rating }) => (
          <ResultItem key={id}>
            <ResultQuestion>{label}</ResultQuestion>
            <ResultRating>{rating}/10</ResultRating>
          </ResultItem>
        ))}
      </ResultsList>
    </ResultsContainer>
  );
};

export { Results };

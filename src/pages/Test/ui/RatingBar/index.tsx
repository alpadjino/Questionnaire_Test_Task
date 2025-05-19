import styled from 'styled-components';
import type { TestVariant } from '../../types';

const BarBlock = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const BarContent = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const BarImage = styled.img`
  width: 170px;
  margin-right: 10px;
`;

const Stars = styled.div`
  display: flex;
  gap: 7px;
`;

const Star = styled.span<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  
  font-size: ${({ $isActive }) => ($isActive ? "20px" : "35px")};
  
  cursor: pointer;
`;

const RatingText = styled.span`
  margin-left: 8px;
  font-size: 20px;
`;

const SkipButton = styled.button`
  display: block;
  
  margin: 20px auto 0;
  margin-top: 20px;
  padding: 15px 10px;
  
  font-weight: 700;
  
  border: none;
  cursor: pointer;
`;

type IRatingBarProps = Omit<TestVariant, "id"> & { onRate?: (rate: number) => void };

const RatingBar = ({
  label,
  imageSrc,
  rating,
  onRate = () => {},
}: IRatingBarProps) => (
  <BarBlock>
    <BarContent>
      <BarImage src={imageSrc} alt={label} />
      <Stars>
        {[...Array(10)].map((_, i) => (
          <Star key={i} $isActive={i < rating} onClick={() => onRate(i + 1)}>
            {i < rating ? "⭐" : "☆"}
          </Star>
        ))}
      </Stars>
      <RatingText>{rating > 0 ? rating : "Оценки нет"}</RatingText>
    </BarContent>

    <SkipButton onClick={() => onRate(0)}>Затрудняюсь ответить</SkipButton>
  </BarBlock>
);

export { RatingBar };

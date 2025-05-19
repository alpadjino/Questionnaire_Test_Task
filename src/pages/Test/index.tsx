import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { init, nextQuestions, setTempRating } from "./ctx";
import type { TestVariant } from './types';
import { GradientBar } from './ui/GradientBar';
import { RatingBar } from './ui/RatingBar';
import { Results } from './ui/Results';
import styled from 'styled-components';
import { Share2 } from 'lucide-react';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px 20px;
  font-family: Arial, sans-serif;
  background-color: #f1f1f1;
  max-width: 900px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 0
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  background-color: white;
  padding: 25px 15px;
`;

const ContentContainer = styled.div`
  background-color: white;
  padding: 40px 20px;
`;

const FooterContainer = styled.div`
  background-color: #f1f1f1;
  border: 1px solid black;
  display: flex;
`;

const Header = styled.h3`
  font-weight: normal;
  margin: 0;
`;

const SmallText = styled.p`
  font-size: 12px;
  margin: 0;
`;

const Link = styled.a`
  display: flex;
  gap: 5px;
  font-size: 12px;
  cursor: pointer;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #ccc;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const TEST_ITEMS: TestVariant[] = [
  {
    id: "snickers",
    label: "Snickers",
    imageSrc: "https://cdn1.ozone.ru/s3/multimedia-y/6374075710.jpg",
    rating: 0,
  },
  {
    id: "mars",
    label: "Mars",
    imageSrc: "https://cdn1.ozone.ru/s3/multimedia-x/6309555033.jpg",
    rating: 0,
  },
  {
    id: "bounty",
    label: "Bounty",
    imageSrc: "https://avatars.mds.yandex.net/i?id=d63389d472cc6f65e961f990867314ba_l-4881086-images-thumbs&n=13",
    rating: 0,
  },
  {
    id: "twix",
    label: "Twix",
    imageSrc: "https://imageproxy.wolt.com/menu/menu-images/5c6c17c650c20a000c0461ac/1eb33654-689d-11ec-a999-9e77bb495cac_twix.jpeg",
    rating: 0,
  },
  {
    id: "kitkat",
    label: "KitKat",
    imageSrc: "https://img.rasset.ie/000d4faf-1600.jpg",
    rating: 0,
  },
  {
    id: "kinder",
    label: "Kinder",
    imageSrc: "https://www.lavanguardia.com/files/og_thumbnail/uploads/2024/01/26/65b3ac4fc5933.jpeg",
    rating: 0,
  },
];

export const Test = () => {
  const dispatch = useAppDispatch();
  const { questions, totalPages, currentPage, tempRatings, questionsPerPage, isCompleted } = useAppSelector((state) => state.test);

  useEffect(() => {
    dispatch(init({ questions: TEST_ITEMS, questionsPerPage: 2 }));
  }, []);

  const handleNextPage = () => {
    dispatch(nextQuestions());
  };

  const handleRate = (id: string, rating: number) => {
    dispatch(setTempRating({ id, rating }));
  };

  const getCurrentRating = (id: string, defaultRating: number) => {
    return !!tempRatings[id] ? tempRatings[id] : defaultRating;
  };

  return (
    <Container>
      <HeaderContainer>
        <SmallText>2.10.Звёзды</SmallText>
        <Link style={{ display: "flex", gap: "5px" }}>
          <Share2 size={14} /> 
          поделиться ссылкой
        </Link>
        <Header>
          Оцените, пожалуйста, насколько Вам нравится вкус каждой из марок
          шоколадных батончиков?
        </Header>
      </HeaderContainer>

      {isCompleted && <Results questions={questions} />}
      {questions.slice(currentPage * questionsPerPage, (currentPage + 1) * questionsPerPage).map(({ id, imageSrc, label, rating }) => (
        <ContentContainer key={id}>
          <RatingBar
            label={label}
            imageSrc={imageSrc}
            rating={getCurrentRating(id, rating)}
            onRate={(rate) => handleRate(id, rate)}
          />
        </ContentContainer>
      ))}

      <FooterContainer>
        <div style={{ position: "relative", flex: 1 }}>
          <div style={{ position: "absolute", width: `${(currentPage / totalPages) * 100}%`, top: 0, height: "100%" }}>
            <GradientBar />
          </div>
        </div>
        <Button onClick={handleNextPage} disabled={ Object.keys(tempRatings).length !== questionsPerPage }>Далее</Button>
      </FooterContainer>
    </Container>
  );
};

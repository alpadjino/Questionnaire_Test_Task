import styled from 'styled-components';

const GradientBar = styled.div`
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(
    45deg,
    rgb(166, 204, 167),
    rgb(166, 204, 167) 20px,
    rgb(150, 196, 149) 20px,
    rgb(150, 196, 149) 40px
  );
`;

export { GradientBar };

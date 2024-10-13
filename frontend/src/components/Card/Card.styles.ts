import styled from "styled-components";

export const StyledCard = styled.div`
  display: grid;
  grid-template-columns: 255px 65px;
  gap: 5px;
  justify-content: space-between;

  img {
    grid-area: 1 / 1 / 2 / 3;
  }

  h3 {
    grid-area: 2 / 1 / 3 / 2;
  }

  h5 {
    grid-area: 3 / 1 / 4 / 3;
  }

  small {
    grid-area: 2 / 2 / 3 / 3;
  }

  p {
    grid-area: 4 / 1 / 5 / 3;
  }
`;

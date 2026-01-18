import styled, { keyframes } from "styled-components";

export const Button = styled.button``;

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const Spinner = styled.img`
  width: 20px;
  height: 20px;
  animation: ${spin} 500ms infinite linear;
`;

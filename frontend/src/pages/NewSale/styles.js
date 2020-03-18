import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  max-width: 375px;
  margin: 30px auto 0;
  padding: 20px 0 20px;
  box-shadow: 1px 2px 2px 1px rgba(0, 0, 0, 0.3);

  a {
    margin-bottom: 20px;

    button {
      height: 30px;
      font-size: 10px;
    }
  }

  form {
    > button {
      margin: 5px 0 0;
      width: 100%;
      font-size: 14px;
    }
  }
`;

export const ProductInput = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  div {
    display: flex;
    flex-direction: column;

    label {
      margin: 6px 0;
      font-size: 16px;
    }

    > input {
      background: rgba(0, 0, 0, 0.1);
      border: 0;
      border-radius: 4px;
      height: 30px;
      padding: 0 15px;
      margin: 0 10px 10px 0;
    }
  }

  button {
    height: 30px;
    margin-top: 15px;
  }
`;

export const ProductList = styled.ul`
  li {
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: ${darken(0.3, '#f5f5f5')};
    border-radius: 5px;
    padding: 5px 0;

    & + li {
      margin-top: 4px;
    }
  }
`;

import styled from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.div`
  width: 100%;
  max-width: 315px;
  text-align: center;
  background: #3f51b5;
  padding: 30px;
  border-radius: 5px;

  form {
    display: flex;
    flex-direction: column;

    label {
      margin: 6px 0;
      font-size: 16px;
      color: #fff;
    }

    input {
      background: rgba(0, 0, 0, 0.1);
      border: 0;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      color: #fff;
      margin: 0 0 10px;
    }

    button {
      margin: 5px 0 0;
      height: 44px;
      width: 100%;
      background: #000;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 14px;
      transition: background 0.2s;

      &:hover {
        background: ${lighten(0.12, '#000')};
      }
    }
  }
`;

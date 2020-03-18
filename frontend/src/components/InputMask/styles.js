import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  label {
    margin: 6px 0;
    font-size: 16px;
  }

  input {
    background: rgba(0, 0, 0, 0.1);
    border: 0;
    border-radius: 4px;
    height: 30px;
    padding: 0 15px;
    margin: 0 0 10px;
  }
`;

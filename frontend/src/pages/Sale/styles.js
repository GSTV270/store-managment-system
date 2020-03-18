import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  max-width: 300px;
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
    button {
      margin: 5px 0 0;
      width: 100%;
      font-size: 14px;
    }
  }
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  max-width: 250px;

  div {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid rgba(0, 0, 0, 0.4);
    padding-bottom: 15px;
    margin-top: 20px;
  }

  div:nth-child(4) {
    border-bottom: 0;
  }
`;

import styled from 'styled-components';
import TableContainer from '@material-ui/core/TableContainer';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 30px auto 0;
  max-width: 1020px;
  width: 100%;

  h2 {
    margin-top: 20px;
  }
`;

export const Charts = styled.div`
  display: flex;
  padding-bottom: 30px;
  border-bottom: 1px solid #000;
`;

export const MaterialTable = styled(TableContainer)`
  max-width: 1020px;
  width: 100%;
  margin-top: 20px;
`;

export const ActionCell = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 200px;
  width: 100%;

  button {
    max-width: 100px;
  }
`;

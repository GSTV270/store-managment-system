import styled from 'styled-components';
import TableContainer from '@material-ui/core/TableContainer';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
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

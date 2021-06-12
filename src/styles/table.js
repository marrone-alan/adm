import styled from 'styled-components';
import {
  Table as TableRes,
  Thead as TheadRes,
  Tbody as TbodyRes,
  Tr as TrRes,
  Th as ThRes,
  Td as TdRes,
} from 'react-super-responsive-table';

// Variables
import { colors, screenSize } from './variables';

export const TableWrapper = styled.div`
  width: 100%;
  overflow: hidden;

  @media (min-width: ${screenSize.md}) {
    padding: 0.5rem;
  }
`;

export const Table = styled(TableRes)`
  width: 100%;
  padding: 1rem;
  border-collapse: collapse;
`;

export const Thead = styled(TheadRes)`
  @media (min-width: ${screenSize.md}) {
    border-bottom: 2px solid ${colors.primary};
  }
`;

export const Tr = styled(TrRes)``;

export const Tbody = styled(TbodyRes)`
  tr {
    td {
      border: none;
    }

    &:nth-child(odd) {
      background-color: ${colors.light};
    }
  }
`;

export const Th = styled(ThRes)`
  color: ${colors.primary};
  font-weight: 600;
  text-align: left;
  padding: 0.5rem;
`;

export const Td = styled(TdRes)`
  padding: 0.5rem;
  text-align: left;
  border: none;
  height: 40px;

  svg {
    cursor: pointer;
  }

  @media (min-width: ${screenSize.md}) {
    width: 20%;
    max-width: 200px;
  }
`;

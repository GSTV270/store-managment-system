import React from 'react';
import { MdCached } from 'react-icons/md';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function LoadingSpin({ size }) {
  return (
    <Container>
      <MdCached size={size} />
    </Container>
  );
}

LoadingSpin.propTypes = {
  size: PropTypes.number.isRequired,
};

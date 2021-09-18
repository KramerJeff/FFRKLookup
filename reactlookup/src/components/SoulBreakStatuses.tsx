import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FFRKAPI from '../types';
const Title = styled.h3`
  margin-bottom: 0;
`;

const Effects = styled.p`
  margin-bottom: 1rem;
`;

interface SBStatusProps {
  statuses: Array<FFRKAPI.Status>;
  className?: string;
}

const SoulBreakStatuses = ({statuses, className}: SBStatusProps) => {
  return (
    <>
      {statuses.map((status, i) => {
        return (
          <div className={className} key={i}>
            <Title className='sbStatusTitle'>{status.description}</Title>
            <Effects className='sbStatusEffect'>{status.effects}</Effects>
          </div>
        );
      })}
    </>
  );
};

SoulBreakStatuses.propTypes = {
  statuses: PropTypes.array.isRequired,
};

export default SoulBreakStatuses;
import React from 'react';
import PropTypes from 'prop-types';

const SoulBreakStatuses = ({statuses}) => {
  return (
    <>
      {statuses.map(status => {
        return (
          <>
            <h3>{status.description}</h3>
            <p>{status.effects}</p>
          </>
        );
      })}
    </>
  );
};

SoulBreakStatuses.propTypes = {
  statuses: PropTypes.array.isRequired,
};

export default SoulBreakStatuses;
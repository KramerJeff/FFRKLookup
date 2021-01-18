import React from 'react';
import PropTypes from 'prop-types';

const SoulBreakCommands = ({commands}) => {
  return (
    <div>
      {commands.map(function(command, index) {
        return <p key={index}>{command.effects}</p>
      })}
    </div>
  );
};

export default SoulBreakCommands;
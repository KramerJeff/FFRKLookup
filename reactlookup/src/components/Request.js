import React, {useState} from 'react';
import PropTypes from 'prop-types';

const Request = ({data}) => {
  console.log(`Request: ${data}`);
  return (
    <div>
      {data.effects && <p>Effects: {data.effects}</p>}
      {data.description && <p>Description: {data.description}</p>}
      {data.multiplier && <p>Multiplier: {data.multiplier}</p>}
    </div>
  );
};

Request.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Request;
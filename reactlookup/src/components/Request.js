import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Avatar, Typography} from '@material-ui/core';

import styled from 'styled-components';

//TODO: Should this be exported out to a component?
const SBIcon = styled(Avatar)`
  min-height: 128px;
  min-width: 128px;
  height: 128px;
  width: 128px;
`;

const Request = ({data}) => {
  console.log(`Request: ${data}`);
  return (
    <div>
      {data.description && <Typography variant='h5'>{data.description}</Typography>}
      {data.imagePath && <SBIcon src={data.imagePath.split('"')[0]} />}
      {data.effects && <p>Effects: {data.effects}</p>}
      {/** Elements */}
      {data.multiplier && <p>Multiplier: {data.multiplier}</p>}
      {data.targetType && <p>Target: {data.targetType}</p>}
      {data.damageFormulaType && <p>Type: {data.damageFormulaType}</p>}
      {data.castTime && <p>Cast Time: {data.castTime}</p>}
      {/** Statuses */}

    </div>
  );
};

Request.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Request;
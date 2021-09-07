import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { Avatar } from 'antd';
import { getElements, getDamageType, getTargetType } from '../helpers';
import styled from 'styled-components';
import SoulBreakStatuses from './SoulBreakStatuses';

//TODO: Should this be exported out to a component?
const SBIcon = styled(Avatar)`
  min-height: 64px;
  min-width: 64px;
  max-height: 128px;
  max-width: 128px;
  height: 100%;
  flex-basis: 10%;
`;

const RequestContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
`;

const TextContainer = styled.div`
  flex-basis: 90%;
  display: flex;
  flex-flow: row wrap;
`;

const Title = styled(Typography)`
  flex-basis: 100%;
`;

const Effects = styled.span`
  flex-basis: 100%;
`;

const HalfSpan = styled.span`
  flex-basis: 50%;
`;

const StyledSoulBreakStatuses = styled(SoulBreakStatuses)`
  flex-basis: 100%;
`

const Request = ({data}) => {
  if(data.title) {
    return (
      <h2>Request: {data.title}</h2>
    )
  }
  return (
    <RequestContainer>
      {data.description && <Title variant='h5'>{data.description}</Title>}
      {data.imagePath && <SBIcon src={data.imagePath.split('"')[0]} />}
      <TextContainer>
        {data.effect && <span>{data.effect}</span>}
        {data.effects && <Effects>{data.effects}</Effects>}
        
        {data.elements && <Effects><b>Elements:</b> {getElements(data.elements, 'string')}</Effects>}
        {data.multiplier && <HalfSpan><b>Multiplier:</b> {data.multiplier}</HalfSpan>}
        {data.castTime && <HalfSpan><b>Cast Time:</b> {data.castTime}</HalfSpan>}
        {data.targetType && <HalfSpan><b>Target:</b> {getTargetType(data.targetType)}</HalfSpan>}
        {data.damageFormulaType && <HalfSpan><b>Type:</b> {getDamageType(data.damageFormulaType)}</HalfSpan>}
        {/** Statuses */}
      </TextContainer>
      {data.statuses.length > 0 && <StyledSoulBreakStatuses statuses={data.statuses} />}
    </RequestContainer>
  );
};

Request.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Request;
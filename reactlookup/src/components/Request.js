import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { Avatar } from 'antd';
import { getElements, getDamageType, getTargetType } from '../helpers';
import styled from 'styled-components';
import SoulBreakStatuses from './SoulBreakStatuses';
import SoulBreakCommands from './SoulBreakCommands';

//TODO: Should this be exported out to a component?
const SBIcon = styled(Avatar)`
  min-height: 64px;
  min-width: 64px;
  height: 64px;
  width: 64px;  
  @media (min-width: 62em) {
    min-height: 128px;
    min-width: 128px;
    height: 128px;
    width: 128px;
  }
`;

const RequestContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
`;

const TextContainer = styled.div`
  flex-basis: 85%;
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

const Container = styled.div`
  display: flex;
`;

const Request = ({data}) => {
  if(data.title) {
    return (
      <h2>Request: {data.title}</h2>
    )
  }
  //console.log(data);
  return (
    <RequestContainer>
      {data.description && <Title variant='h5'>{data.description}</Title>}
      <Container>
        {data.imagePath && <SBIcon src={data.imagePath.split('"')[0]} />}
        <TextContainer>
          {'effect' in data && <span>{data.effect}</span>}
          {'effects' in data && <Effects>{data.effects}</Effects>}
          
          {'elements' in data && <Effects><b>Elements:</b> {getElements(data.elements, 'string')}</Effects>}
          {'multiplier' in data && <HalfSpan><b>Multiplier:</b> {data.multiplier}</HalfSpan>}
          {'castTime' in data && <HalfSpan><b>Cast Time:</b> {data.castTime}</HalfSpan>}
          {'targetType' in data && <HalfSpan><b>Target:</b> {getTargetType(data.targetType)}</HalfSpan>}
          {'damageFormulaType' in data && <HalfSpan><b>Type:</b> {getDamageType(data.damageFormulaType)}</HalfSpan>}
          {/** Statuses */}
        </TextContainer>
      </Container>
      {/* {data.statuses.length > 0 && <StyledSoulBreakStatuses statuses={data.statuses} />} */}
      {'commands' in data && <SoulBreakCommands commands={data.commands}/>}
    </RequestContainer>
  );
};

Request.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Request;
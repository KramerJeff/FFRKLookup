import React from 'react';
import styled from 'styled-components';
import * as consts from '../constants';
import { Avatar } from 'antd';

const Icon = styled(Avatar)`
  min-height: 32px;
  min-width: 32px;
  height: 32px;
  width: 32px;
  margin: 0 16px;
  @media (min-width: 62em) {
    min-height: 64px;
    min-width: 64px;
    height: 64px;
    width: 64px;
    margin: 0 32px;
  }
`;

const Command = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  flex-basis: 100%;
`;

const Effect = styled.p`
  flex-basis: 100%;
`;

const HalfText = styled.p`
  flex-basis: 50%;
`;

const TextContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  flex-basis: 85%;
`;

const SoulBreakCommands = ({commands}) => {
  return (
    <>
      {commands.map(function(command, index) {
        console.log(command);
        return ( 
          <Command key={index}>
            <Icon src={getImgPath(command)}/>
            <TextContainer>
              <Effect>{command.effects}</Effect>
              <HalfText><b>Element:</b> {formatElements(command)}</HalfText>
              <HalfText><b>School:</b> {consts.SCHOOLS[command.school]}</HalfText>
              
            </TextContainer>
          </Command>
        )
      })}
    </>
  );
};

function getImgPath(command) {
  return (command.synchroConditionId ? `${command.imagePath.split('"')[0]}/${command.synchroConditionId}.png` : command.imagePath.split('"')[0]);
}

/**
 * This helper function will find the element name to match the ID passed in
 * @param elementID - the element ID
 * @returns human readable element name
 */
function parseElementNumber(elementID) {
  let elementName = consts.ELEMENTS[elementID];
  if(elementName === '-') {
    return 'NE';
  }
  else {
    return elementName;
  }
}

function formatElements(command) {
  let elements = "";
  if(command.elements.length === 0) {
    return "None";
  }
  else {
    for (let j = 0; j < command.elements.length; j++) {
      elements += parseElementNumber(command.elements[j]);
      if (j !== command.elements.length - 1) {
        elements += ", ";
      }
    }
  }
  return elements;
}

function formatSchool(command) {

}

export default SoulBreakCommands;
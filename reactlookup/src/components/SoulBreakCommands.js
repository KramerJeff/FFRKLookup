import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as consts from '../constants';

const Icon = styled.img`
  min-height: 32px;
  min-width: 32px;
  height: 32px;
  width: 32px;

`;

const Command = styled.div`
  display: flex;
  align-items: center;
`;

const Effect = styled.p`
  margin-left: 0.75rem;
`;

const Row = styled.div`
  display: flex;
  margin-bottom: 0.25rem;
`;

const LeftCol = styled.span`
  margin-right: auto;
`;

const SoulBreakCommands = ({commands}) => {
  return (
    <div>
      {commands.map(function(command, index) {
        return ( 
          <Command key={index}>
            <Icon src={getImgPath(command)}/>
            <Effect>{command.effects}</Effect>
            <Row>
              <LeftCol>
                <b>Element:</b> {formatElements(command)}
              </LeftCol>
              <span>
                <b>School:</b> {consts.SCHOOLS[command.school]}
              </span>
            </Row>
          </Command>
        )
      })}
    </div>
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
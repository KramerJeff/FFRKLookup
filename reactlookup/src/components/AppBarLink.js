import React from 'react';
import {
    Link as RouterLink
} from 'react-router-dom';
import PropTypes from 'prop-types';
import Link from '@material-ui/core/Link';
import styled from 'styled-components';

const StyledLink = styled(Link)`
    color: white;
    margin: 0 4rem;
`;

const AppBarLink = ({text, route, ...props}) => {
    return (
        <React.Fragment>
            {route 
                ? <StyledLink component={RouterLink} to={route}>{text}</StyledLink>
                : <StyledLink {...props}>{text}</StyledLink>
            }   
        </React.Fragment>
    );
};

AppBarLink.propTypes = {
    text: PropTypes.string.isRequired,
    route: PropTypes.string.isRequired,
};

export default AppBarLink;
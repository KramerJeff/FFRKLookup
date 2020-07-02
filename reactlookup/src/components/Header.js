import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Link from '@material-ui/core/Link';
import reddit from '../static/images/reddit.svg';
import discord from '../static/images/discord.svg';
import {styled} from '@material-ui/core/styles';

const MyBox = styled(Box)({
    display: 'flex',
    alignItems: 'center',
});

const RedditLink = styled(Link)({
    marginLeft: 'auto',
});

const DiscordLink = styled(Link)({
    marginLeft: '0.5rem',
});

const Header = () => {
    return (
        <MyBox>
            <Typography variant='h6'>FFRK Lookup</Typography>  
            <RedditLink href='https://www.reddit.com/r/FFRecordKeeper/'><Avatar alt='Reddit' src={reddit} /></RedditLink>
            <DiscordLink href='https://discord.gg/Fv7E7Ve#%22community%22#title#faq'><Avatar alt='Discord' src={discord} /></DiscordLink>
        </MyBox>
    );
}

export default Header;
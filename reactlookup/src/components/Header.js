import React from 'react';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Link from '@material-ui/core/Link';
import reddit from '../static/images/reddit.svg';
import discord from '../static/images/discord.svg';

const Header = () => {
    return (
        <div>
            <Typography variant='h6'>FFRK Lookup</Typography>  
            <Link href='https://www.reddit.com/r/FFRecordKeeper/'><Avatar alt='Reddit' src={reddit} /></Link>
            <Link href='https://discord.gg/Fv7E7Ve#%22community%22#title#faq'><Avatar alt='Discord' src={discord} /></Link>
        </div>
    );
}

export default Header;
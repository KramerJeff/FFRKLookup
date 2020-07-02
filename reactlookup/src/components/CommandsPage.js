import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/core/styles';

const CommandTextField = styled(TextField)({
    
});
const CommandsPage = () => {
    return (
        <form autoComplete='on'>
            <CommandTextField id='commands' label='What are you looking for?' variant='outlined'/>
            <Button variant='contained' color='primary'>Search</Button>

        </form>
    );
};

export default CommandsPage;
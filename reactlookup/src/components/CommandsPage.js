import React, {useEffect, useState} from 'react';
import * as constants from '../constants.js';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/core/styles';

const CommandTextField = styled(TextField)({
    
});
const CommandsPage = () => {

    const [query, setQuery] = useState('');
    const [searchData, setSearchData] = useState();
    const [abilArr, setAbilArr] = useState([]);
    const [charArr, setCharArr] = useState([]);

    const cmdRegex = /SB|SSB|BSB|USB|CSB|chain|OSB|AOSB|ASB|UOSB|SASB|sync|GSB|GSB\+|FSB|AASB|Glint|Glint\+|LB|LBO|LBG|lm|lmr|abil|ability|rm|stat|char|rdive|ldive/gi;

    const handleChange = (event) => {
        setQuery(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('i submitted the thing ' + query);
        //process query
        let queries = parseQuery(query);
        console.log(queries);
        //process query request(s)

        //pass data to components
        fetch(`${constants.API_URL_BASE}/SoulBreaks`)
            .then(response => response.json())
            .then(
                (result) => {
                    setSearchData(result);
                }
            )
    };
    /**
     * Take the input from the search box and parses it into
     * one or multiple requests, depending on the content
     * @param query - the text from the search box
     * @param delimiter - the delimiter used to split up multiple queries
     */
    function parseQuery(query, delimiter=';') {
        let requests = [];
        if(query.includes(delimiter)) {
            let queries = query.split(delimiter);
            queries.forEach((query) => {
                query = query.trim();
                requests.push(getQueryParts(query));
            });
        }
        else {
            requests.push(getQueryParts(query));
        }
        return requests;
    }

    /**
    * Get the parts of the query and make sure it is a proper command
    * @param query - the query to split up into parts
    */
    function getQueryParts(query) {
        let parts = [];
        let words = query.trim().split(" ");
        let cmd = words.pop().toLowerCase();
        if(cmd.match(cmdRegex)) {
            parts[0] = words.join(" ").toLowerCase();
            parts[1] = cmd;
        }
        else {
            return query; //if it isn't a command, return the query
        }
        return parts;
    }

    useEffect(() => {
        fetch(`${constants.API_URL_BASE}/IdLists/Ability`) //create Ability ID array
            .then(response => response.json())
            .then(
                (result) => {
                    let abilArr = [''];
                    result.map(entry => {
                        abilArr.push(entry.Value);
                    });
                    setAbilArr(abilArr);
                    
                },
                (error) => {

                }
            );
        fetch(`${constants.API_URL_BASE}/IdLists/Character`) //create Character ID array
            .then(response => response.json())
            .then(
                (result) => {
                    let charArr = [''];
                    result.map(entry => {
                        charArr.push(entry.Value);
                    });
                    setCharArr(charArr);
                }
            );  
    }, []);

    //test function
    useEffect(() => {
        if(abilArr && abilArr.length > 0) {
            console.log(abilArr[31]);
        }
        if (charArr && charArr.length > 0) {
            console.log(charArr[31]);
        }
    }, [abilArr, charArr]);

    return (
        <form autoComplete='on' onSubmit={handleSubmit}>
            <CommandTextField id='commands' label='What are you looking for?' variant='outlined' onChange={handleChange}/>
            <Button variant='contained' color='primary' type='submit'>Search</Button>
        </form>
        //iterate through array of objects to render components 
    );
};

export default CommandsPage;
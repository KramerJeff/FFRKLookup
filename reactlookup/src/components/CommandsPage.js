import React, {useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import * as constants from '../constants.js';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Request from './Request';
import styled from 'styled-components';

const CommandTextField = styled(TextField)`
    min-width: 250px;
    margin-right: 1rem;
`;

const StyledButton = styled(Button)`
    height: 100%;
`;

function getSoulBreak(query) {
    return query;
}

/**
 * 
 * @param {*} arr 
 * @param {Array} charArr - list of characters names and their IDs
 */
function parseSBRequest(arr, charArr) {
    console.log(`arrrrrr ${arr}`);
    const charName = arr[0]; 
    const sbTier = arr[1]; //e.g. BSB, BSB1, OSB
    console.log(`parseSBRequest ${charArr}`);
    const charID = charArr.indexOf(charName);
    console.log(charID);
    return new Promise((resolve, reject) => {
        fetch(`${constants.API_URL_BASE}/SoulBreaks/Character/${charID}`)
            .then(response => response.json())
            .then((data) => {
                resolve(data);
            });
    });    
}

const CommandsPage = () => {

    const [query, setQuery] = useState('');
    const [searchData, setSearchData] = useState();
    const [abilArr, setAbilArr] = useState([]);
    const [charArr, setCharArr] = useState([]);

    const cmdRegex = /SB|SSB|BSB|USB|CSB|chain|OSB|AOSB|ASB|UOSB|SASB|sync|GSB|GSB\+|FSB|AASB|ADSB|Glint|Glint\+|LB|LBO|LBG|lm|lmr|abil|ability|rm|stat|char|rdive|ldive/gi;
    const lmRegex = /LM|LMR/gi;
    const sbRegex = /SB|SSB|BSB|USB|CSB|chain|OSB|AOSB|ASB|UOSB|SASB|sync|GSB|GSB\+|FSB|AASB|ADSB|Glint|Glint\+/gi;
    const handleChange = (event) => {
        setQuery(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('i submitted the thing ' + query);

        //process query
        const newURI = `${window.location.protocol}//${window.location.host}${window.location.pathname}?query=${query}`;    
        window.history.pushState({ path: newURI }, '', newURI);
        const queries = parseQuery(query);
        console.log(queries);
        let sequence = Promise.resolve();
        //process query request(s)
        queries.forEach((query) => { //
            sequence = sequence.then(() => {
                if(query.length > 1) {
                    const requestName = query[1];
                    if(requestName.match(sbRegex)) {
                        console.log(`it's an SB!`);
                        return parseSBRequest(query, charArr);
                    }
                }
                else {
                    return getSoulBreak(query);    
                }
            }).then((data) => {
                setSearchData(data); //currently only works for one query
                console.log(data);
            });
        });
        //setSearchData(mySearchData);
        //pass data to components
        // fetch(`${constants.API_URL_BASE}/SoulBreaks`)
        //     .then(response => response.json())
        //     .then(
        //         (result) => {
        //             setSearchData(result);
        //             console.log(result);
        //         }
        //     )
    };
    /**
     * Take the input from the search box and parses it into
     * one or multiple requests, depending on the content
     * @param query - the text from the search box
     * @param delimiter - the delimiter used to split up multiple queries
     */
    function parseQuery(query, delimiter=';') {
        const requests = [];
        if(query.includes(delimiter)) {
            const queries = query.split(delimiter);
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
        const words = query.trim().split(" ");
        const cmd = words.pop().toLowerCase();
        if(cmd.match(cmdRegex)) {
            parts[0] = words.join(" ").toLowerCase();
            parts[1] = cmd;
        }
        else {
            return query; //if it isn't a command, return the query
        }
        return parts;
    }



    //TODO store data in localStorage (?) and use HEAD to check if size of payload has changed?
    //Prevent using as much data from the API
    useEffect(() => {
        fetch(`${constants.API_URL_BASE}/IdLists/Ability`) //create Ability ID array
            .then(response => response.json())
            .then(
                (result) => {
                    let abilArr = [''];
                    result.forEach(entry => {
                        abilArr.push(entry.Value.toLowerCase());
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
                    result.forEach(entry => {
                        charArr.push(entry.Value.toLowerCase());
                    });
                    setCharArr(charArr);
                }
            );  
    }, []);

    //test function
    useEffect(() => {
        if(abilArr && abilArr.length > 0) {
            console.log(`ability 31 is ${abilArr[31]}`);
        }
        if (charArr && charArr.length > 0) {
            console.log(`character 31 is ${charArr[31]}`);
            console.log(charArr);
            console.log(`Cloud is here? ${charArr.indexOf('cloud')}`);
        }
    }, [abilArr, charArr]);

    return (
        <div>
            <form autoComplete='on' onSubmit={handleSubmit}>
                <CommandTextField id='commands' label='What are you looking for?' variant='outlined' onChange={handleChange}/>
                <StyledButton variant='contained' color='primary' type='submit'>Search</StyledButton>
            </form>
            
            {/** Iterate through array of Objects to render components e.g. for each Object, pass props to component */}
            {/** TODO: Make results component which can handle all different data types */}
            {searchData && searchData.map((datum, i) => {
                console.log(datum);
                return <Request data={datum} key={i}/>
            })}
        </div>
    );
};

export default CommandsPage;
import React, {useEffect, useState} from 'react';
import * as constants from '../constants.js';
import { handleErrors, capitalize } from '../helpers';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Request from './Request';
import styled from 'styled-components';

const CommandTextField = styled(TextField)`
    min-width: 250px;
    margin-right: 1rem;
`;

const StyledButton = styled(Button)`
    height: 56px;
`;

function getSoulBreak(query: string) {
    return query;
}

/**
 * 
 * @param {*} arr 
 * @param {Array} charArr - list of characters names and their IDs
 * TODO grab charArr from Context API (????)
 */
function parseSBRequest(arr: Array<string>, charArr: Array<string>) {
    console.log(`arrrrrr ${arr}`);
    const charName = arr[0]; 
    const sbTier = arr[1]; //e.g. BSB, BSB1, OSB
    const charID = charArr.indexOf(charName);
    return new Promise((resolve, reject) => {
        fetch(`${constants.API_URL_BASE}/SoulBreaks/Character/${charID}`)
            .then(handleErrors)
            .then(response => response.json())
            .then((data) => {
                if(sbTier) {
                    data = data.filter((sb: any) => sb.soulBreakTier === constants.SB_TIER.indexOf(sbTier.toUpperCase()));
                }
                console.log('DATA');
                data.unshift({title: `${capitalize(charName)} ${sbTier.toUpperCase()}`});
                console.log(data);
                resolve(data);
            })
            .catch(error => reject(error));
    });    
}

/**
 * TODO - COMPLETE THIS 
 * @param {*} arr 
 * @param {*} charArr 
 */
function parseLBRequest(arr: Array<string>, charArr: Array<string>) {
    console.log(`arr ${arr}`);
    const charName = arr[0];
}

function parseLMRequest(arr: Array<string>, charArr: Array<string>) {
    console.log(`LMarrrr ${arr}`);
    const charName = arr[0];
    const lmTier = arr[1];
    const charID = charArr.indexOf(charName);
    return new Promise((resolve, reject) => {
        fetch(`${constants.API_URL_BASE}/LegendMaterias/Character/${charID}`)
            .then(handleErrors)
            .then(response => response.json())
            .then((data) => {
                data.unshift({title: `${capitalize(charName)} ${lmTier.toUpperCase()}`});
                resolve(data);
            });
    });
}



const CommandsPage = () => {

    const [query, setQuery] = useState('');
    const [searchData, setSearchData] = useState<Array<Object>>([]);
    const [abilArr, setAbilArr] = useState<Array<string>>([]);
    const [charArr, setCharArr] = useState<Array<string>>([]);
    const [error, setError] = useState<Array<string>>([]);

    const cmdRegex = /SB|SSB|BSB|USB|CSB|chain|OSB|AOSB|ASB|UOSB|SASB|sync|GSB|GSB\+|FSB|AASB|ADSB|Glint|Glint\+|LB|LBO|LBG|lm|lmr|abil|ability|rm|stat|char|rdive|ldive/gi;
    const lmRegex = /LM|LMR/gi;
    const sbRegex = /SB|SSB|BSB|USB|CSB|chain|OSB|AOSB|ASB|UOSB|SASB|sync|GSB|GSB\+|FSB|AASB|ADSB|Glint|Glint\+/gi;
    const lbRegex = /LB|LBO|LBG/gi;
    const handleChange = (event: any) => {
        setQuery(event.target.value);
    }

    /**
     * 
     * @param {*} event 
     */
    const handleSubmit = (event: any) => {
        event.preventDefault();
        console.log('i submitted the thing ' + query);

        //process query
        const newURI = `${window.location.protocol}//${window.location.host}${window.location.pathname}?query=${query}`;    
        window.history.pushState({ path: newURI }, '', newURI);
        const queries = parseQuery(query);
        console.log(queries);
        let sequence = Promise.resolve();
        setSearchData([]); //reset data
        setError([]);
        queries.forEach((query) => { //process query request(s)
            console.log(query);
            sequence = sequence.then(() => {
                if(typeof(query) === 'object') { //query will be an array (object) if it has matched a cmd
                    const requestName = query[1].toLowerCase();
                    if(requestName.match(sbRegex)) {
                        console.log(`it's an SB!`);
                        return parseSBRequest(query, charArr);
                    }
                    else if(requestName.match(lmRegex)) {
                        console.log(`it's a LM!`);
                        return parseLMRequest(query, charArr);
                    }
                    else if(requestName.match(lbRegex)) {
                        console.log(`it's a LB`);
                        return parseLBRequest(query, charArr);
                    }
                    else if(requestName === 'abil' || requestName === 'ability') {
                        console.log(`it's an ability!`);
                    }
                    else {
                        //throw an error
                        console.log('throwing an error');
                        console.log(query);
                        console.log(requestName);
                        throw new Error(`${requestName} is not a recognized command`);
                    }
                }
                else {
                    //return getSoulBreak(query);    
                    throw new Error(`${query} is not a recognized command`);
                }
            }).then((data: any) => {
                if(data) {
                    setSearchData((searchData) => { return [...searchData, ...data]});
                }
            })
            .catch(newError => setError((prevState) => [...prevState, newError.toString()]));
        });
    };
    
    /**
     * Take the input from the search box and parses it into
     * one or multiple requests, depending on the content
     * @param query - the text from the search box
     * @param delimiter - the delimiter used to split up multiple queries
     */
    function parseQuery(query: string, delimiter=';') {
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
    function getQueryParts(query: string) {
        let parts = [];
        const words = query.trim().split(" ");
        const cmd = words[words.length-1].toLowerCase();
        words.pop();
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
                    result.forEach((entry: any) => {
                        abilArr.push(entry.Value.toLowerCase());
                    });
                    setAbilArr(abilArr);
                    
                },
                (newError) => {
                    setError((prevState) => [...prevState, newError.toString()]);
                }
            );
        fetch(`${constants.API_URL_BASE}/IdLists/Character`) //create Character ID array
            .then(response => response.json())
            .then(
                (result) => {
                    let charArr = [''];
                    result.forEach((entry: any) => {
                        charArr.push(entry.Value.toLowerCase());
                    });
                    setCharArr(charArr);
                }
            );  
    }, []);

    //test function
    // useEffect(() => {
    //     if(abilArr && abilArr.length > 0) {
    //         console.log(`ability 31 is ${abilArr[31]}`);
    //     }
    //     if (charArr && charArr.length > 0) {
    //         console.log(`character 31 is ${charArr[31]}`);
    //         console.log(charArr);
    //         console.log(`Cloud is here? ${charArr.indexOf('cloud')}`);
    //     }
    // }, [abilArr, charArr]);

    return (
        <div>
            <form autoComplete='on' onSubmit={handleSubmit}>
                <CommandTextField id='commands' label='What are you looking for?' variant='outlined' onChange={handleChange}/>
                <StyledButton variant='contained' color='primary' type='submit'>Search</StyledButton>
            </form>
            
            {/** Iterate through array of Objects to render components e.g. for each Object, pass props to component */}
            {/** TODO
             * Make SB index param work
             * Make other commands work like abilities, LMs, Hero Abilities, etc.
             */}
            {error.length > 0 && error.map((error, i) => {
                return <p key={i}>{error}</p>
            })}
            {searchData && searchData.map((datum, i) => {
                console.log(datum);
                return <Request data={datum} key={i}/>
            })}
        </div>
    );
};

export default CommandsPage;
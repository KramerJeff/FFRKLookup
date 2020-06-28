import React, {useEffect, useState} from 'react';
import * as constants from '../constants.js';
import SoulBreakFilter from './SoulBreakFilter';
import SoulBreakTable from './SoulBreakTable';
import {Grid} from '@material-ui/core';

const SoulBreakSearch = () => {
    const [error, setError] = useState(null);
    const [allSoulBreaks, setAllSoulBreaks] = useState([]);
    const [soulBreaks, setSoulBreaks] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [toggleTiers, setToggleAllTiers] = useState(true);
    const [toggleRealms, setToggleAllRealms] = useState(true);
    const [toggleElements, setToggleAllElements] = useState(true);

    const [tiers, setTiers] = useState({
        1: {id: 1, name: 'Default', checked: false},
        4: {id: 4, name: 'SB', checked: false},
        5: {id: 5, name: 'SSB', checked: false},
        6: {id: 6, name: 'BSB', checked: false},
        7: {id: 7, name: 'OSB', checked: false},
        8: {id: 8, name: 'USB', checked: true},
        9: {id: 9, name: 'CSB', checked: true},
        10: {id: 10, name: 'Glint', checked: true},
        11: {id: 11, name: 'Glint+', checked: true},
        12: {id: 12, name: 'AOSB', checked: true},
        13: {id: 13, name: 'AASB', checked: true},
        14: {id: 14, name: 'SASB', checked: true},
    });
    const [realms, setRealms] = useState({
        1: {id: 1, name: 'I', checked: true},
        2: {id: 2, name: 'II', checked: true},
        3: {id: 3, name: 'III', checked: true},
        4: {id: 4, name: 'IV', checked: true},
        5: {id: 5, name: 'V', checked: true},
        6: {id: 6, name: 'VI', checked: true},
        7: {id: 7, name: 'VII', checked: true},
        8: {id: 8, name: 'VIII', checked: true},
        9: {id: 19, name: 'IX', checked: true},
        10: {id: 10, name: 'X', checked: true},
        11: {id: 11, name: 'XI', checked: true},
        12: {id: 12, name: 'XII', checked: true},
        13: {id: 13, name: 'XIII', checked: true},
        14: {id: 14, name: 'XIV', checked: true},
        15: {id: 15, name: 'XV', checked: true},
        16: {id: 16, name: 'FFT', checked: true},
        17: {id: 17, name: 'Beyond', checked: true},
        18: {id: 18, name: 'Type-0', checked: true},
        19: {id: 19, name: 'KH', checked: true},
        20: {id: 20, name: 'Core', checked: true},
    });
    const [elements, setElements] = useState({
        2: { id: 2, name: 'No Element', checked: true},
        3: { id: 3, name: 'Dark', checked: true },
        4: { id: 4, name: 'Earth', checked: true },
        5: { id: 5, name: 'Fire', checked: true },
        6: { id: 6, name: 'Holy', checked: true },
        7: { id: 7, name: 'Ice', checked: true },
        8: { id: 8, name: 'Lightning', checked: true },
        9: { id: 9, name: 'NE', checked: true },
        10: { id: 10, name: 'Poison', checked: true },
        12: { id: 12, name: 'Water', checked: true },
        13: { id: 13, name: 'Wind', checked: true },
        
    });    

    const handleFilterChange = (event, state, setState) => {
        const id = event.target.name;
        setState({ ...state, [id]: {id: id, name: state[id].name, checked: !state[id].checked} });
    };

    const handleToggleAll = (state, toggleFlag, setState, setToggleState) => {
        const newState = {...state};
        Object.entries(newState).map(([key, value]) => {
            return newState[key] = {...value, checked: !toggleFlag};
        });
        setToggleState(!toggleFlag);
        setState(newState);
    }

    //initial mount useEffect, does all soul breaks need to be set in state?
    useEffect(() => {
        fetch(`${constants.API_URL_BASE}/SoulBreaks`)
            .then(response => response.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setAllSoulBreaks(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, []);  
    
    useEffect(() => {
        setSoulBreaks(allSoulBreaks.filter(soulBreak => {
            if(tiers[soulBreak.soulBreakTier] && realms[soulBreak.realm]) {
                //loop through elements
                let elementIsChecked = true;
                // let elementIsChecked = false;
                // if(soulBreak.elements.length > 0) {
                //     soulBreak.elements.forEach(function(element) { //if element is in element state object...
                //         for(const value of Object.values(elements)) {
                //             if(element === value.id && value.checked) {
                //                 elementIsChecked = true;
                //             }
                //         }
                //     });
                // }
                // else { elementIsChecked = true; } //combo this with 'No Element'

                areElementsInSB(elements, soulBreak);
                return (tiers[soulBreak.soulBreakTier].checked && realms[soulBreak.realm].checked && elementIsChecked);
            }
            else {
                return false;
            }
        }));
    }, [allSoulBreaks, tiers, realms, elements]);

    if(error) {
        return(<p>Error: {error.message}</p>);
    }
    else if(!isLoaded) {
        return (<p>Loading....</p>); //TODO add walking Tyro GIF
    }
    else {
        return (
            <React.Fragment>
                <Grid item xs={3}>
                    <SoulBreakFilter 
                        filterName='Tiers'
                        filters={tiers} 
                        toggleAll={toggleTiers} 
                        onChange={(event) => handleFilterChange(event, tiers, setTiers)} 
                        onToggleAll={() => handleToggleAll(tiers, toggleTiers, setTiers, setToggleAllTiers)}
                    />
                    <SoulBreakFilter 
                        filterName='Realms'
                        filters={realms} 
                        toggleAll={toggleRealms} 
                        onChange={(event) => handleFilterChange(event, realms, setRealms)} 
                        onAllToggle={() => handleToggleAll(realms, toggleRealms, setRealms, setToggleAllRealms)}
                    />
                    <SoulBreakFilter
                        filterName='Elements'
                        filters={elements}
                        toggleAll={toggleElements}
                        onChange={(event) => handleFilterChange(event, elements, setElements)}
                        onAllToggle={() => handleToggleAll(elements, toggleElements, setElements, setToggleAllElements)}
                    />
                    {/* Element Filters */}
                </Grid>
                <Grid item xs={9}>                
                    <SoulBreakTable soulBreaks={soulBreaks}/>
                </Grid>
            </React.Fragment>
        );
    }
};

function helloWorld() {
    console.log('hello world');
}

function areElementsInSB(elements, soulBreak) {
    soulBreak.elements.forEach(function (element) {
       console.log(`these are my elements ${element}`); 
    });
    for (const [key, value] of Object.entries(elements)) {
        console.log(`${key} ${value.id} ${value.name} ${value.checked}`);
    }
                    // if(soulBreak.elements.length > 0) {
                //     soulBreak.elements.forEach(function(element) { //if element is in element state object...
                //         for(const value of Object.values(elements)) {
                //             if(element === value.id && value.checked) {
                //                 elementIsChecked = true;
                //             }
                //         }
                //     });
                // }
                // else { elementIsChecked = true; } //combo this with 'No Element'
}

export default SoulBreakSearch;
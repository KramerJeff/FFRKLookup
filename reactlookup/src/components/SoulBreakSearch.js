import React, {useEffect, useState} from 'react';
import * as constants from '../constants.js';
import SoulBreakFilters from './SoulBreakFilters';
import SoulBreakTable from './SoulBreakTable';
import {Grid} from '@material-ui/core';

const SoulBreakSearch = () => {
    const [error, setError] = useState(null);
    const [allSoulBreaks, setAllSoulBreaks] = useState([]);
    const [soulBreaks, setSoulBreaks] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Lift state and onChange to SoulBreakSearch
    const [tiers, setTiers] = useState({
        1: false,
        4: false,
        5: false,
        6: false,
        7: false,
        8: true,
        9: true,
        10: true,
        11: true,
        12: true,
        13: true,
        14: true,
    });

    const handleTierChange = (event) => {
        setTiers({ ...tiers, [event.target.name]: event.target.checked });
    };

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
        setSoulBreaks(allSoulBreaks.filter(soulBreak => tiers[soulBreak.soulBreakTier]));
    }, [allSoulBreaks, tiers]);

    if(error) {
        return(<p>Error: {error.message}</p>);
    }
    else if(!isLoaded) {
        return (<p>Loading....</p>); //TODO add walking Tyro GIF
    }
    else {
        return (
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <SoulBreakFilters
                        tiers={tiers}
                        onTierChange={handleTierChange}
                    />
                </Grid>
                <Grid item xs={9}>                
                    <SoulBreakTable soulBreaks={soulBreaks}/>
                </Grid>
            </Grid>
        );
    }
};

export default SoulBreakSearch;
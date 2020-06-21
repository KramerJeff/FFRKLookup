import React, {useEffect, useState} from 'react';
import * as constants from '../constants.js';
import SoulBreakFilters from './SoulBreakFilters';
import SoulBreakTable from './SoulBreakTable';
import {Grid} from '@material-ui/core';

const SoulBreakSearch = () => {
    const [error, setError] = useState(null);
    const [soulBreaks, setSoulBreaks] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Lift state and onChange to SoulBreakSearch
    const [tiers, setTiers] = useState({
        Default: true,
        SB: true,
        SSB: true,
        BSB: true,
        OSB: true,
        USB: true,
        Glint: true,
        GlintP: true,
        AOSB: true,
        AASB: true,
        SASB: true,
        CSB: true,
    });

    const handleChange = (event) => {
        setTiers({ ...tiers, [event.target.name]: event.target.checked });
    };

    useEffect(() => {
        fetch(`${constants.API_URL_BASE}/SoulBreaks`)
            .then(response => response.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setSoulBreaks(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, []);   

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
                        onCheckboxChange={handleChange}
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
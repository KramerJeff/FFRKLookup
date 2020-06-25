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

    const [realms, setRealms] = useState({
        1: true,
        2: true,
        3: true,
        4: true,
        5: true,
        6: true,
        7: true,
        8: true,
        9: true,
        10: true,
        11: true,
        12: true,
        13: true,
        14: true,
        15: true,
        16: true,
        17: true,
        18: true,
        19: true,
        20: true,
    });

    const handleTierChange = (event) => {
        setTiers({ ...tiers, [event.target.name]: event.target.checked });
    };

    const handleTierAllToggle = (event) => {
        let newState = {};
        if (Object.values(tiers).includes(true)) {
            Object.keys(tiers).map(key => newState[key] = false);
        }
        else {
            Object.keys(tiers).map(key => newState[key] = true);
        }
        setTiers(newState);
    }

    const handleRealmChange = (event) => {
        setRealms({ ...realms, [event.target.name] : event.target.checked });
    }

    //TODO do I make it so if any values are selected that it unselects?
    const handleRealmAllToggle = (event) => {
        let newState = {};
        if(Object.values(realms).includes(true)) {
            Object.keys(realms).map(key => newState[key] = false);
        }
        else {
            Object.keys(realms).map(key => newState[key] = true);
        }
        setRealms(newState);
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
            return (tiers[soulBreak.soulBreakTier] && realms[soulBreak.realm]);
        }));
    }, [allSoulBreaks, tiers, realms]);

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
                    <SoulBreakFilters
                        tiers={tiers}
                        realms={realms}
                        onTierChange={handleTierChange}
                        onTierAllToggle={handleTierAllToggle}
                        onRealmChange={handleRealmChange}
                        onRealmAllToggle={handleRealmAllToggle}
                    />
                    {/* Tier Filters */}
                    {/* Realm Filters */}
                    {/* Element Filters */}
                </Grid>
                <Grid item xs={9}>                
                    <SoulBreakTable soulBreaks={soulBreaks}/>
                </Grid>
            </React.Fragment>
        );
    }
};

export default SoulBreakSearch;
import React, {useEffect, useState} from 'react';
import * as constants from '../constants.js';
import SoulBreak from './SoulBreak';

const SoulBreakSearch = () => {
    const [error, setError] = useState(null);
    const [soulBreaks, setSoulBreaks] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
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
        return (<p>Loading....</p>);
    }
    else {
        return (
            <div>
                {soulBreaks.map((soulBreak) => (
                    <SoulBreak key={soulBreak.id} soulBreak={soulBreak}/>
                ))}
            </div>
        );
    }
};

export default SoulBreakSearch;
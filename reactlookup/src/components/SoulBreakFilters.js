import React from 'react';
import PropTypes from 'prop-types';
import SoulBreakFilter from './SoulBreakFilter';

const SoulBreakFilters = ({tiers, allTierToggle, realms, allRealmToggle, onTierChange, onTierAllToggle, onRealmChange, onRealmAllToggle}) => {
    return (
        <div>
            {/* Filter Header */}
            {/* <FilterHeader 
                onClick={() => setTierOpen(!tierOpen)}
                tierOpen={tierOpen}
            /> */}
            <SoulBreakFilter 
                filterName='Tiers'
                filters={tiers} 
                allToggle={allTierToggle} 
                onChange={onTierChange} 
                onAllToggle={onTierAllToggle}
            />
            <SoulBreakFilter 
                filterName='Realms'
                filters={realms} 
                allToggle={allRealmToggle} 
                onChange={onRealmChange} 
                onAllToggle={onRealmAllToggle}
            />
            
        </div>
    );
};

SoulBreakFilters.propTypes = {
    tiers: PropTypes.object.isRequired,
    realms: PropTypes.object.isRequired,
    onTierChange: PropTypes.func.isRequired,
    onRealmChange: PropTypes.func.isRequired,
}

export default SoulBreakFilters;
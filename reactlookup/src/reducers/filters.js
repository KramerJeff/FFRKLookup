const filters = (state = [], action) => {
    switch(action.type) {
        case 'CHECK':
            return state.map(filter => 
                (filter.id === action.id) ? {...filter, checked: !filter.checked} : filter
            );
        default:
            return state;
    }
}

export default filters;
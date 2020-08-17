export const tubeLight = (state = 'OFF', action) => {
    switch (action.type) {
        case 'TURN_ON':
            return 'ON';
        case 'TURN_OFF':
            return 'OFF';
            default:
                return state;
    }
}
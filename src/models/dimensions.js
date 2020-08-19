const rawDims = [
    {id: 'leisure', name: 'Leisure'},
    {id: 'goal', name: 'Life Goal'},
    {id: 'urgent', name: 'Urgent'},
    {id: 'important', name: 'Important'},
    {id: 'work', name: 'Career/Work'},
    {id: 'finance', name: 'Finance'},
    {id: 'it', name: 'IT'},
    {id: 'jobsearch', name: 'Job Search'},
    {id: 'sustain', name: 'Life Sustaining'},
    {id: 'learn', name: 'Learning'},
    {id: 'life', name: 'Life'},
    {id: 'health', name: 'Health'},
    {id: 'phyact', name: 'Physical Activity'},
    {id: 'alleviate', name: 'Psychol. Wellbeing'},
    {id: 'emergency', name: 'Emergency'},
    {id: 'balance', name: 'Life Balance'},
    {id: 'family', name: 'Family'},
    {id: 'social', name: 'Social'}
];

const groups = [
    { id: 'type1', name: 'Default', groupUnder: ['leisure', 'work', 'life', 'family'] },
    { id: 'type2', name: 'Default', groupUnder: ['urgent', 'important', 'goal', 'emergency'] },
    { id: 'type3', name: 'Default', groupUnder: ['it', 'jobsearch', 'life', 'family'] }
];

const enhanceDimsWithGroups = (dims, groups) => { 
    const dimsWithGroups = dims.map(d => { 
        Object.assign(d, {groups: []});
        groups.forEach(g => {  
            if (g.groupUnder.find(gu => gu === d.id)){
                d.groups=[...d.groups, g.id];
            }
        });
        return d;
    });
    return dimsWithGroups;
};

export const Dimensions = [
    ...enhanceDimsWithGroups(rawDims, groups)
];

export const Groups = groups;

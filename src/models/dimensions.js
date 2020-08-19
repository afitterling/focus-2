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
    {id: 'alleviate', name: 'Psy. Wellbeing'},
    {id: 'emergency', name: 'Emergency'},
    {id: 'balance', name: 'Life Balance'},
    {id: 'family', name: 'Family'},
    {id: 'social', name: 'Social'}
];

export const groups = [
    { id: 'importance', name: 'Importance', dims: ['urgent', 'important', 'emergency', 'leisure', 'life', 'goal'] },
    { id: 'main', name: 'Well-Being', dims: ['alleviate', 'balance', 'leisure', 'life', 'social', 'family', 'health'] },
    { id: 'type3', name: 'Fields of Activities', dims: ['work', 'sustain', 'jobsearch', 'life', 'family', 'learn'] }
];

const enhanceDimsWithGroups = (dims, groups) => { 
    const dimsWithGroups = dims.map(d => { 
        Object.assign(d, {groups: []});
        groups.forEach(g => {  
            if (g.dims.find(gu => gu === d.id)){
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

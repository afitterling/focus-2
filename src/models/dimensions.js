const rawDims = [
    {id: 'leisure', name: 'Leisure', order: 0},
    {id: 'goal', name: 'Life Goal', order: 0},
    {id: 'urgent', name: 'Urgent', order: -10},
    {id: 'important', name: 'Important', order: -10},
    {id: 'work', name: 'Career/Work', order: 0},
    {id: 'finance', name: 'Finance', order: 0},
    {id: 'it', name: 'IT', order: 0},
    {id: 'jobsearch', name: 'Job Search', order: 0},
    {id: 'sustain', name: 'Life Sustaining', order: 0},
    {id: 'learn', name: 'Learning', order: 0},
    {id: 'life', name: 'Life', order: 0},
    {id: 'health', name: 'Health', order: 0},
    {id: 'phyact', name: 'Physical Activity', order: 0},
    {id: 'alleviate', name: 'Psy. Wellbeing', order: 0},
    {id: 'emergency', name: 'Emergency', order: 0},
    {id: 'balance', name: 'Life Balance', order: 0},
    {id: 'family', name: 'Family', order: 0},
    {id: 'social', name: 'Social', order: 0}
];

export const groups = [
    { id: 'importance', name: 'Importance', dims: ['urgent', 'important', 'emergency', 'leisure', 'life', 'goal'] },
    { id: 'wellbeing', name: 'Well-Being', dims: ['alleviate', 'balance', 'leisure', 'phyact', 'life', 'social', 'family', 'health'] },
    { id: 'activityFields', name: 'Fields of Activities', dims: ['work', 'sustain', 'jobsearch', 'life', 'family', 'learn'] }
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

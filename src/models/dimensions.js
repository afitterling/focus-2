const rawDims = [
    {id: 'leisure', name: 'Leisure', order: 0},
    {id: 'goal', name: 'Life Goal', order: 0},
    {id: 'urgent', name: 'Urgent', order: -10},
    {id: 'important', name: 'Important', order: -10},
    {id: 'priority', name: 'Priority', order: -12},
    {id: 'work', name: 'Career/Work', order: 0},
    {id: 'finance', name: 'Finance', order: 0},
    {id: 'it', name: 'IT', order: 0},
    {id: 'jobsearch', name: 'Job Search', order: 0},
    {id: 'sustain', name: 'Life Sustaining', order: 0},
    {id: 'learn', name: 'Learning', order: 0},
    {id: 'life', name: 'Life', order: 0},
    {id: 'health', name: 'Health Supportive', order: 0},
    {id: 'phyact', name: 'Physical Activity', order: 0},
    {id: 'alleviate', name: 'Emotional Wellbeing', order: 0},
    {id: 'spiritual', name: 'Spiritual Health', order: 0},
    {id: 'emergency', name: 'Emergency', order: 0},
    {id: 'balance', name: 'Life Balance', order: 0},
    {id: 'family', name: 'Family', order: 0},
    {id: 'social', name: 'Social', order: 0}
];

export const groups = [
    { id: 'importancy', name: 'Importancy & Balance', dims: ['priority', 'urgent', 'important', 'leisure', 'life', 'goal'] },
    { id: 'wellbeing', name: 'Well-Being & Health', dims: ['alleviate', 'balance', 'phyact', 'health'] },
    { id: 'activityFields', name: 'Life Spheres', dims: ['work', 'sustain', 'jobsearch', 'social', 'life', 'family', 'leisure', 'learn'] }
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

export const data = [
    {
        key: '1',
        order: 'You made a request for a plumber',
        time: '12 mins ago'
    }
]

const address = '13 Razaq Eletu, Lekki';
const phone = '09099433594';

export const chatList = [
    {
        key: '1',
        type: 'raven',
        body: 'Hello Sule,\nHaving a good day, are we?',
        additional: ''
    },
    {
        key: '2',
        type: 'raven',
        body: 'Who would you like to find?',
        additional: ''
    },
    {
        key: '3',
        type: 'reply',
        body: [ "No one", "Carpenters", "Electricians", "Bricklayers", "Plumbers", "Home appliance repairers" ],
        additional: ''
    },
    {
        key: '4',
        type: 'raven',
        body: 'What type of fix exactly do you do?',
        additional: ''
    },
    {
        key: '5',
        type: 'reply',
        body: ["Installation", "Servicing", "Repair"],
        additional: ''
    },
    {
        key: '6',
        type: 'raven',
        body: 'Kindly describe what needs to be fixed',
        additional: ''
    },
    {
        key: '7',
        type: 'reply',
        body: ["I don't know", "Other", "Broken shower", "Dripping fauces", "Broken pipe", "Blocked sink"],
        additional: ''
    },
    {
        key: '8',
        type: 'raven',
        body: `Your address: \n${address}`,
        additional: `Contact phone number: \n${phone}`
    },
    {
        key: '9',
        type: 'reply',
        body: ["Edit?", "Yes! Continue"],
        additional: ''
    }
];
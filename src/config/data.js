export const data = [
    {
        key: '1',
        order: 'You made a request for a plumber',
        time: '12 mins ago'
    }
];

const address = '13 Razaq Eletu, Lekki';
const phone = '09099433594';
const username = 'Sule'

export const chatList = [
    {
        key: '1',
        type: 'raven',
        body: `Hello ${username},\nHaving a good day, are we?`,
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
        body: [ "Carpenters", "Electricians", "Bricklayers", "Plumbers", "Home appliance repairers" ],
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
        body: 'Kindly select what needs to be fixed',
        additional: ''
    },
    {
        key: '7',
        type: 'reply',
        body: [
            {
                "plumber_installation": ["FIXING OF SINK", "FIXING OF WC", "FIX  WATER HEATER", "BATH TUB FIXING FIXING PUMPING MACHINE"],
                "plumber_repair": ["Sink Leakage", "Repair of Water Heater", "Blockage and Leakage"],
                "plumber_service": ["Water Treatment", "Pumping Machine", "Washing of Tanks"]
            },
            {
                "carpentry_installation": ["FURNITURE INSTALLATION AND ASSEMBLYING", "BASIC CARPENTRY FIXING", "WINDOW  FIXING", "CHANGE LOCKS", "ROOF FIXING", "POP FIXING", "BLINDS"],
                "carpentry_repair": ["FURNITURE REPAIR"],
                "carpentry_service": []
            },
            {
                "electrician_installation": ["Fan Installation", "House Wiring", "Changing of Circuit Box", "Light Bulbs and Fixing", "Installation of Chandeliers"],
                "electrician_repair": ["Repairing of Switch Box", "Fan Repairs"],
                "electrician_service": []
            },
            {
                "generator_installation": ["Petrol", "Diesel"],
                "generator_repair": ["Petrol", "Diesel"],
                "generator_service": ["Petrol", "Diesel"]
            },
        ],
        additional: ''
    },
    {
        key: '8',
        type: 'raven',
        body: 'Okay, Choose a specific issue',
        additional: ''
    },
    {
        key: '9',
        type: 'reply',
        body: [
                // AT THIS POINT, I CAN FETCH DATA ACCORDING TO WHAT THEY WANT WITH ITS PRICES e.g: "Washing Hand Basin - N2,000", "Kitchen Sink - N4,500"
        ],
        additional: ''
    },
    {
        key: '10',
        type: 'raven',
        body: `Your address: \n${address}`,
        additional: `Contact phone number: \n${phone}`
    },
    {
        key: '11',
        type: 'reply',
        body: ["Edit?", "Yes! Continue"],
        additional: ''
    }
];


export const ratingThreeFourList = [
    {
        key: '1',
        type: 'raven',
        body: `How can we improve WorkRaven?`,
        additional: ''
    },
    {
        key: '2',
        type: 'reply',
        body: [ "Get More Pro’s", "Customer Service", "App Navigation", "Reduce ETA", "Pro’s appearance" ],
        additional: ''
    },
    {
        key: '3',
        type: 'raven',
        body: 'Please tell us more about your experience?',
        additional: ''
    },
    {
        key: '4',
        type: 'reply',
        body: 'text-input',
        additional: ''
    },
    {
        key: '5',
        type: 'raven',
        body: 'Thank you for using WorkRaven',
        additional: ''
    },
];

export const ratingOneTwoList = [
    {
        key: '1',
        type: 'raven',
        body: `This is a very poor rating. What was the problem?`,
        additional: ''
    },
    {
        key: '2',
        type: 'reply',
        body: [ "Poor work done", "Pro was rude", "Bad Customer Service ", "App not easy to use", "Long wait time" ],
        additional: ''
    },
    {
        key: '3',
        type: 'raven',
        body: 'Tell me a little more about it',
        additional: ''
    },
    {
        key: '4',
        type: 'reply',
        body: 'text-input',
        additional: ''
    },
    {
        key: '5',
        type: 'raven',
        body: 'Noted. We apologize this and we hope to improve on that. Thank you for using WorkRaven',
        additional: ''
    }
];

export const ratingFiveList = [
    {
        key: '1',
        type: 'raven',
        body: `Yay! What did you like the most about Workraven?`,
        additional: ''
    },
    {
        key: '2',
        type: 'reply',
        body: [ "Excellent service", "Customer Service", "Work Done", "WR made my day", "Ease of use" ],
        additional: ''
    },
    {
        key: '3',
        type: 'raven',
        body: 'Thanks for your feedback! Please share your experience',
        additional: ''
    },
    {
        key: '4',
        type: 'reply',
        body: 'share-reply',
        additional: ''
    }
];
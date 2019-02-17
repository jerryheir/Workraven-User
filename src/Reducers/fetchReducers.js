import { 
    FETCH_USER, 
    ID_TOKEN, 
    GET_CATEGORIES, 
    SHOW_BOOKING, 
    SHOW_BOOKING_BUTTON, 
    GET_ISSUES, 
    SHOW_GOOGLE_AUTOCOMPLETE, 
    GET_CURRENT_LOCATION,
    SAVE_LOCATION
} from '../Actions/types';
import { storeItem } from '../Functions';

const initialState = {
    userData: { firstname: '', lastname: '' },
    userIdToken: { userId: '', token: '' },
    categories: [],
    bookingButton: true,
    showBooking: 'instant',
    issues: [],
    showGoogle: false,
    currentLocate: {},
    address: '',
    neighborhood: '',
    admin2: ''
}

export default function(state = initialState, action) {
    switch (action.type) {
        case FETCH_USER:
            return {
                ...state,
                userData: action.payload
            }
        case ID_TOKEN:
            return {
                ...state,
                userIdToken: action.payload
            }
        case GET_CATEGORIES:
            return {
                ...state,
                categories: action.payload
            }
        case SHOW_BOOKING:
            return {
                ...state,
                showBooking: action.payload
            }
        case SHOW_BOOKING_BUTTON:
            return {
                ...state,
                bookingButton: action.payload
            }
        case GET_ISSUES:
            return {
                ...state,
                issues: action.payload
            }
        case SHOW_GOOGLE_AUTOCOMPLETE:
            return {
                ...state,
                showGoogle: action.payload
            }
        case GET_CURRENT_LOCATION:
            storeItem('currentLocate', JSON.stringify(action.payload));
            return {
                ...state,
                currentLocate: action.payload,
                address: action.payload.address,
                neighborhood: action.payload.neighborhood,
                admin2: action.payload.admin2
            }
        case SAVE_LOCATION:
            console.log(action.payload)
            return {
                ...state,
                currentLocate: action.payload,
                address: action.payload.address
            }
        default: 
            return state;
    }
}
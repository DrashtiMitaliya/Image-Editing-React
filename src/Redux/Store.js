import { createStore } from 'redux';

const initialState = {
    selectedImages: [] ,
    chapter : [] ,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SELECTED_IMAGES':
        
            return {
                ...state,
                selectedImages: action.payload
            };

        default:
            return { ...state };
    }
};

export const store = createStore(reducer);
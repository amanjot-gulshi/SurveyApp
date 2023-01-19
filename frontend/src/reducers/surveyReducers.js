import {
    SURVEY_LIST_REQUEST,
    SURVEY_LIST_SUCCESS,
    SURVEY_LIST_FAIL,

    SURVEY_DETAILS_REQUEST,
    SURVEY_DETAILS_SUCCESS,
    SURVEY_DETAILS_FAIL,

    SURVEY_DELETE_REQUEST,
    SURVEY_DELETE_SUCCESS,
    SURVEY_DELETE_FAIL,

    SURVEY_FILL_REQUEST,
    SURVEY_FILL_SUCCESS,
    SURVEY_FILL_FAIL,

    SURVEY_CREATE_REQUEST,
    SURVEY_CREATE_SUCCESS,
    SURVEY_CREATE_FAIL,
    SURVEY_CREATE_RESET,

    SURVEY_UPDATE_REQUEST,
    SURVEY_UPDATE_SUCCESS,
    SURVEY_UPDATE_FAIL,
    SURVEY_UPDATE_RESET,

} from '../constants/surveyConstants'

export const surveyListReducer = (state = { surveys: [] }, action) => {
    switch (action.type) {
        case SURVEY_LIST_REQUEST:
            return { loading: true, surveys: [] }

        case SURVEY_LIST_SUCCESS:
            return {
                loading: false,
                surveys: action.payload.surveys,
            }

        case SURVEY_LIST_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}



export const surveyDetailsReducer = (state = { survey: {} }, action) => {
    switch (action.type) {
        case SURVEY_DETAILS_REQUEST:
            return { loading: true, ...state }

        case SURVEY_DETAILS_SUCCESS:
            return { loading: false, survey: action.payload }

        case SURVEY_DETAILS_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}


export const surveyDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case SURVEY_DELETE_REQUEST:
            return { loading: true }

        case SURVEY_DELETE_SUCCESS:
            return { loading: false, success: true }

        case SURVEY_DELETE_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}



export const surveyCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case SURVEY_CREATE_REQUEST:
            return { loading: true }

        case SURVEY_CREATE_SUCCESS:
            return { loading: false, success: true, survey: action.payload }

        case SURVEY_CREATE_FAIL:
            return { loading: false, error: action.payload }

        case SURVEY_CREATE_RESET:
            return {}

        default:
            return state
    }
}


export const surveyUpdateReducer = (state = { survey: {} }, action) => {
    switch (action.type) {
        case SURVEY_UPDATE_REQUEST:
            return { loading: true }

        case SURVEY_UPDATE_SUCCESS:
            return { loading: false, success: true, survey: action.payload }

        case SURVEY_UPDATE_FAIL:
            return { loading: false, error: action.payload }

        case SURVEY_UPDATE_RESET:
            return { survey: {} }

        default:
            return state
    }
}

export const surveyFillReducer = (state = {}, action) => {
    switch (action.type) {
        case SURVEY_FILL_REQUEST:
            return { loading: true }

        case SURVEY_FILL_SUCCESS:
            return { loading: false, success: true, survey: action.payload }

        case SURVEY_FILL_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}
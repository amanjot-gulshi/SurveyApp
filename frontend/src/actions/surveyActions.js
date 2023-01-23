import axios from 'axios'
import {
    SURVEY_LIST_REQUEST,
    SURVEY_LIST_SUCCESS,
    SURVEY_LIST_FAIL,

    MY_SURVEY_LIST_REQUEST,
    MY_SURVEY_LIST_SUCCESS,
    MY_SURVEY_LIST_FAIL,

    SURVEY_DETAILS_REQUEST,
    SURVEY_DETAILS_SUCCESS,
    SURVEY_DETAILS_FAIL,

    SURVEY_FILL_REQUEST,
    SURVEY_FILL_SUCCESS,
    SURVEY_FILL_FAIL,

    MY_FILLED_SURVEY_LIST_REQUEST,
    MY_FILLED_SURVEY_LIST_SUCCESS,
    MY_FILLED_SURVEY_LIST_FAIL,

    SURVEY_DELETE_REQUEST,
    SURVEY_DELETE_SUCCESS,
    SURVEY_DELETE_FAIL,

    SURVEY_CREATE_REQUEST,
    SURVEY_CREATE_SUCCESS,
    SURVEY_CREATE_FAIL,

    SURVEY_UPDATE_REQUEST,
    SURVEY_UPDATE_SUCCESS,
    SURVEY_UPDATE_FAIL,
} from '../constants/surveyConstants'

export const listSurveys = () => async (dispatch) => {
    try {
        dispatch({ type: SURVEY_LIST_REQUEST })

        const { data } = await axios.get(`/api/surveys/`)

        dispatch({
            type: SURVEY_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: SURVEY_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const listMySurveys = (user) => async (dispatch) => {
    try {
        dispatch({ type: MY_SURVEY_LIST_REQUEST })

        var params = new URLSearchParams();
        params.append("user", user);
        var request = {
            params: params
        }

        const { data } = await axios.get(`/api/surveys/my-surveys`, request
        )

        dispatch({
            type: MY_SURVEY_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: MY_SURVEY_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const listSurveyDetails = (id, title) => async (dispatch) => {
    try {
        dispatch({ type: SURVEY_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/surveys/${id}/${title}`)

        dispatch({
            type: SURVEY_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: SURVEY_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const deleteSurvey = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: SURVEY_DELETE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.delete(
            `/api/surveys/delete/${id}/`,
            config
        )

        dispatch({
            type: SURVEY_DELETE_SUCCESS,
        })


    } catch (error) {
        dispatch({
            type: SURVEY_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const createSurvey = (email, title, questions) => async (dispatch, getState) => {
    try {
        dispatch({
            type: SURVEY_CREATE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(
            `/api/surveys/create`,
            {
                'email': email,
                'title': title,
                'questions': questions
            },
            config
        )
        dispatch({
            type: SURVEY_CREATE_SUCCESS,
            payload: data,
        })


    } catch (error) {
        dispatch({
            type: SURVEY_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const updateSurvey = (survey) => async (dispatch, getState) => {
    try {
        dispatch({
            type: SURVEY_UPDATE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(
            `/api/surveys/update/${survey._id}/`,
            survey,
            config
        )
        dispatch({
            type: SURVEY_UPDATE_SUCCESS,
            payload: data,
        })


        dispatch({
            type: SURVEY_DETAILS_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: SURVEY_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const fillSurvey = (title, author, taker, options) => async (dispatch, getState) => {
    try {
        dispatch({
            type: SURVEY_FILL_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(
            `/api/surveys/fill`,
            {
                'author': author,
                'title': title,
                'taker': taker,
                'options': options,
            },
            config
        )
        dispatch({
            type: SURVEY_FILL_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: SURVEY_FILL_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const listFilledSurveys = (user) => async (dispatch, getState) => {
    try {
        dispatch({ type: MY_FILLED_SURVEY_LIST_REQUEST })

        var params = new URLSearchParams();
        params.append("user", user);
        var request = {
            params: params
        }

        const { data } = await axios.get(`/api/surveys/filled-surveys`, request
        )

        dispatch({
            type: MY_FILLED_SURVEY_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: MY_FILLED_SURVEY_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}
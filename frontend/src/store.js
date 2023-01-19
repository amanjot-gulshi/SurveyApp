import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import {
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userUpdateProfileReducer,
    userListReducer,
    userDeleteReducer,
    userUpdateReducer,
} from './reducers/userReducers'

import {
    surveyListReducer,
    mySurveyListReducer,
    surveyDetailsReducer,
    surveyDeleteReducer,
    surveyUpdateReducer,
    surveyCreateReducer,
    surveyFillReducer,
} from './reducers/surveyReducers'


const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,

    surveyList: surveyListReducer,
    mySurveyList: mySurveyListReducer,
    surveyDetails: surveyDetailsReducer,
    surveyDelete: surveyDeleteReducer,
    surveyUpdate: surveyUpdateReducer,
    surveyCreate: surveyCreateReducer,
    surveyFill:surveyFillReducer,

})

const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null


const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
}


const middleware = [thunk]

const store = createStore(reducer, initialState,
    composeWithDevTools(applyMiddleware(...middleware)))

export default store
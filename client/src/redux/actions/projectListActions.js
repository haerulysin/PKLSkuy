import axios from 'axios';
import {
    GET_ERRORS,
    REQUESTPROJECT_LOADING,
    SET_PROJECT_DATA,
    SET_PROPOSALIST_DATA
} from './types';


export const getProjectList = (pages,searchText,locations) => async dispatch => {
    await dispatch({
        type: REQUESTPROJECT_LOADING,
        payload:true,
    })

    await axios.get('/api/projectList/?page='+pages+'&search='+searchText+'&lat='+locations[1]+'&lng='+locations[0])
    .then(res => {
        dispatch({
            type:SET_PROJECT_DATA,
            payload:res.data,
        });
    })
    .catch(err=> dispatch({
        type:GET_ERRORS,
        payload:err,
    }))

    await dispatch({
        type: REQUESTPROJECT_LOADING,
        payload: false
    })
}

export const postProject = (projectData, history) => async dispatch => {
    await dispatch({
        type: REQUESTPROJECT_LOADING,
        payload: true
    });

    await axios.post("/api/projectList/", projectData)
        .then(res => {
            history.push("/proyek/" + res.data._id);
        })
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));

    await dispatch({
        type: REQUESTPROJECT_LOADING,
        payload: false
    })
};

export const updateProject = (projectData) => async dispatch => {
    await dispatch({
        type: REQUESTPROJECT_LOADING,
        payload: true
    })
    await axios.patch('/api/projectList/', projectData)
        .then(res => dispatch({
            type: REQUESTPROJECT_LOADING,
            payload: false
        }))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
}

export const getProjectByID = (projectID) => async dispatch => {
    await dispatch({
        type: REQUESTPROJECT_LOADING,
        payload: true
    });

    await axios.get("/api/projectList/" + projectID)
        .then(projectData => {
            dispatch({
                type: SET_PROJECT_DATA,
                payload: projectData.data
            })
        })
        .catch(err => {
            if (err.response) {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                })
            };
        });

    await dispatch({
        type: REQUESTPROJECT_LOADING,
        payload: false
    })
};


export const postProposal = (proposalData) => async dispatch => {
    await dispatch({
        type: REQUESTPROJECT_LOADING,
        payload: true
    });

    await axios.post("/api/proposal", proposalData)
        .then(res => {
            dispatch({
                type: REQUESTPROJECT_LOADING,
                payload: false
            });
        })
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err
        }));
};


export const updateProposal = (proposalData) => async dispatch => {
    await dispatch({
        type: REQUESTPROJECT_LOADING,
        payload: true
    })
    await axios.patch('/api/proposal/', proposalData)
        .then(res => dispatch({
            type: REQUESTPROJECT_LOADING,
            payload: false
        }))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
}

export const getProposalByProjectID = (projectID) => async dispatch => {
    await dispatch({
        type: REQUESTPROJECT_LOADING,
        payload: true
    })
    await axios.get('/api/proposal/id/' + projectID)
        .then(res => {
            dispatch({
                type: SET_PROPOSALIST_DATA,
                payload: res.data.data,
            });

            dispatch({
                type: REQUESTPROJECT_LOADING,
                payload: false
            })
        })
        .catch(err =>{
            if(err.response){
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                })
            }
        });
}
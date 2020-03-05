import {
  ADD_PROJECT, ADD_PROJECT_BEGIN, DELETE_PROJECT_ERROR, DELETE_PROJECT, FIND_PROJECT, ADD_RPOJECT_ERROR, LOAD_RPOJECT, LOAD_RPOJECT_SUCCESS, LOAD_RPOJECT_ERROR, CURRENT_PROJECT, LOAD_CURRENT_PROJECT,
} from '../../ActionTypes/projectsTypes/projectsTypes';

const initialState = {
  projects: [],
  addingProject: false,
  addingProjectError: null,
  loadingProjects: false,
  loadingProjectsError: null,
  loadingCurrentProjects: false,
  currentProject: null,
  deleteProjecError: false,
};

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PROJECT_BEGIN:
      return {
        ...state,
        addingProject: true,
      };
    case ADD_PROJECT:
      return {
        ...state,
        projects: [...state.projects, action.payload],
        addingProject: false,
      };
    case ADD_RPOJECT_ERROR:
      return {
        ...state,
        addingProject: false,
        addingProjectError: action.payload,
      };
    case LOAD_RPOJECT:
      return {
        ...state,
        loadingProjects: true,
      };
    case LOAD_RPOJECT_SUCCESS:
      return {
        ...state,
        projects: action.payload,
        loadingProjects: false,
      };
    case LOAD_RPOJECT_ERROR:
      return {
        ...state,
        addingProject: false,
        loadingProjectsError: action.payload,
      };
    case LOAD_CURRENT_PROJECT:
      return {
        ...state,
        loadingCurrentProjects: true,
      };
    case CURRENT_PROJECT:
      return {
        ...state,
        projects: action.payload,
        loadingCurrentProjects: false,
      };
    case FIND_PROJECT:
      return {
        ...state,
        currentProject: state.projects.find((p) => p._id === action.payload),
      };
    case DELETE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter((p) => p._id !== action.payload),
      };
    case DELETE_PROJECT_ERROR:
      return {
        ...state,
        deleteProjecError: action.payload,
      };
    default:
      return state;
  }
};

export default projectReducer;
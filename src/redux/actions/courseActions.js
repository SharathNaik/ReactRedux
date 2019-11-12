import * as types from "./actionTypes";

import * as courseApi from "../../api/courseApi";

import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadCoursesSucess(courses) {
  return { type: types.LOAD_COURSES_SUCCESS, courses: courses };
}

export function createCourseSuccess(courses) {
  return { type: types.CREATE_COURSE_SUCCESS, courses: courses };
}

export function updateCourseSuccess(courses) {
  return { type: types.UPDATE_COURSE_SUCCESS, courses: courses };
}

export function deleteCourseOptimistic(courses) {
  return { type: types.DELETE_COURSE_OPTIMISTIC, course: courses }
}

export function loadCourses() {
  //Thunk implementation
  return function (dispatch) {
    dispatch(beginApiCall())
    return courseApi
      .getCourses()
      .then(courses => {
        dispatch(loadCoursesSucess(courses));
      })
      .catch(error => {
        dispatch(apiCallError(error))
        throw error;
      });
  };
}


export function saveCourse(course) {
  //Thunk Implementation
  return function (dispatch, getState) {
    dispatch(beginApiCall())
    return courseApi
      .saveCourse(course)
      .then(savedCourse => {
        course.id
          ? dispatch(updateCourseSuccess(savedCourse))
          : dispatch(createCourseSuccess(savedCourse))
      })
      .catch(error => {
        dispatch(apiCallError(error))
        throw error;
      })
  }
}


export function deleteCourse(course) {

  return function (dispatch) {
    dispatch(deleteCourseOptimistic(course));
    return courseApi.deleteCourse(course.id);
  }

}
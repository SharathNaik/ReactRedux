import * as types from "./actionTypes";

import * as courseApi from "../../api/courseApi";

export function loadCoursesSucess(courses) {
  return { type: types.LOAD_COURSES_SUCCESS, courses: courses };
}

export function createCourseSuccess(courses) {
  return { type: types.CREATE_COURSE_SUCCESS, courses: courses };
}

export function updateCourseSuccess(courses) {
  return { type: types.UPDATE_COURSE_SUCCESS, courses: courses };
}

export function loadCourses() {
  //Thunk implementation
  return function (dispatch) {
    return courseApi
      .getCourses()
      .then(courses => {
        dispatch(loadCoursesSucess(courses));
      })
      .catch(error => {
        throw error;
      });
  };
}


export function saveCourse(course) {
  //Thunk Implementation
  return function (dispatch, getState) {
    return courseApi
      .saveCourse(course)
      .then(savedCourse => {
        course.id
          ? dispatch(updateCourseSuccess(savedCourse))
          : dispatch(createCourseSuccess(savedCourse))
      })
      .catch(error => {
        throw error;
      })
  }
}
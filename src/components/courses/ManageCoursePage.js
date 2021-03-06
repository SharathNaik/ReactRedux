import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadCourses, saveCourse } from "../../redux/actions/courseActions";
import { loadAuthors } from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import CourseForm from "./CourseForm";
import Spinner from "../common/Spinner";

import { toast } from "react-toastify";

import { newCourse } from '../../../tools/mockData';

function ManageCoursePage({
  courses,
  authors,
  loadCourses,
  loadAuthors,
  saveCourse,
  history,
  ...props //avoiding conflict with 'courses'
}) {

  const [course, setCourse] = useState({ ...props.course });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (courses.length === 0) {
      loadCourses().catch(error => {
        alert("Loading Courses Failed" + error);
      });
    } else {
      setCourse({ ...props.course });
    }

    if (authors.length === 0) {
      loadAuthors().catch(error => {
        alert("Loading Authors Failed" + error);
      });
    }
  }, [props.course]);

  function handleChange(event) {
    const { name, value } = event.target;

    setCourse(prevCourse => ({
      ...prevCourse,
      [name]: name === "authorId" ? parseInt(value, 10) : value
    })
    )
  }


  function formIsValid() {
    const { title, authorId, category } = course;
    const errors = {};

    if (!title) errors.title = "Title is required.";
    if (!authorId) errors.author = "Author is required";
    if (!category) errors.category = "Category is required";

    setErrors(errors);

    return Object.keys(errors).length === 0;

  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    saveCourse(course).then(() => {
      toast.success("Course Saved.");
      history.push("/courses");
    }).catch(error => {
      setSaving(false);
      setErrors({ onSave: error.message });
    });

  }

  return authors.length === 0 || courses.length === 0 ? (<Spinner />) :
    (
      <CourseForm
        course={course}
        authors={authors}
        errors={errors}
        onChange={handleChange}
        onSave={handleSave}
        saving={saving}
      />
    );
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  saveCourse: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};



function getCourseBySlug(courses, slug) {
  return courses.find(course => course.slug === slug) || null;
}


function mapStateToProps(state, ownProps) {

  const slug = ownProps.match.params.slug;
  const course = slug && state.courses.length > 0 ? getCourseBySlug(state.courses, slug) : newCourse;

  return {
    course: course,
    courses: state.courses,
    authors: state.authors
  }
}

// mapDispatchToProps as function
const mapDispatchToProps = {
  course: newCourse,//Empty Course
  loadCourses: loadCourses,
  loadAuthors: loadAuthors,
  saveCourse: saveCourse
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageCoursePage);

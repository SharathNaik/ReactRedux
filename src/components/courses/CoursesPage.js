import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";

import PropTypes from "prop-types";
import { bindActionCreators } from "redux";

import CourseList from "./CourseList";

class CoursePage extends React.Component {
  /*
  constructor(props) {
    super(props);

    this.state = {
      course: {
        title: ""
      }
    };

    //function bound only once
    //this.handleChange = this.handleChange.bind(this);
  }

  handleChange = event => {
    const course = { ...this.state.course, title: event.target.value };
    this.setState({ course: course });
  };

  handleSubmit = event => {
    event.preventDefault();
    //this.props.dispatch(courseActions.createCourse(this.state.course));
    this.props.actions.createCourse(this.state.course);
  };
  */

  componentDidMount() {

    const {courses,authors,actions} = this.props;

    if (courses.length === 0) {
      actions.loadCourses().catch(error => {
        alert("Loading Courses Failed" + error);
      });
    }

    if (authors.length === 0) {
      actions.loadAuthors().catch(error => {
        alert("Loading Authors Failed" + error);
      });
    }
  }

  render() {
    return (
      <>
        <h2>Courses</h2>
        <CourseList courses={this.props.courses}></CourseList>
      </>
    );
  }
}

CoursePage.propTypes = {
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  //dispatch: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    courses:
      state.authors.length == 0
        ? []
        : state.courses.map(course => {
            return {
              ...course,
              authorName: state.authors.find(a => a.id === course.authorId).name
            };
          }),
    authors: state.authors
  };
}

// mapDispatchToProps as function
function mapDispatchToProps(dispatch) {
  return {
    //createCourse: course => dispatch(courseActions.createCourse(course)) //using dispatch
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch), //using bindActionCreators
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch)
    }
  };
}

/* mapDispatchToProps as Object
const mapDispatchToProps = {
  createCourse: courseActions.createCourse
};
*/

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoursePage);

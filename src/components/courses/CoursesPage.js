import React from "react";
import { connect } from 'react-redux';
import * as courseActions from '../../redux/actions/courseActions';

import PropTypes from 'prop-types';

class CoursePage extends React.Component {

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
    const course = { ...this.state.course, title: event.target.value }
    this.setState({ course: course });
  }

  handleSubmit = (event) => {
    debugger
    event.preventDefault();
    this.props.dispatch(courseActions.createCourse(this.state.course));
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} >
        <h2>Courses</h2>
        <h3>Add Course</h3>
        <input type="text" onChange={this.handleChange} value={this.state.course.title} />
        <input type="submit" value="save" />
        {
          this.props.courses.map(course => (
            <div key={course.title}>{course.title}</div>
          ))
        }
      </form>
    );
  }
}

CoursePage.propTypes = {
  courses: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  debugger
  return {
    courses: state.courses
  }
}

export default connect(mapStateToProps)(CoursePage);

import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { CircularProgress } from '@material-ui/core';
import styles from './CourseManagement.module.sass';
import Content from '../../../common/containers/Content/Content';
import ContentHeader from '../../../common/containers/Content/ContentHeader';
import EditableGuidesLeftPanel from './components/EditableGuidesLeftPanel';
import GuideManagement from './components/GuideManagement';
import CourseInfoManagement from './components/CourseInfoManagement';

export default class CourseManagement extends Component {
  componentDidMount() {
    const { courseId, getCourse, getGuides } = this.props;
    getCourse(courseId);
    getGuides(courseId);
  }

  render() {
    const {
      course, guides, guideId, isLoadingCourseDetail, isLoadingGuides
    } = this.props;
    let guide;

    if (isLoadingCourseDetail || isLoadingGuides) {
      return (
        <div className={styles.loadingRoot}>
          <CircularProgress disableShrink />
        </div>
      );
    }
    if (!guide) {
      // TODO: 1 guia
    }

    return (
      <div className={styles.root}>
        <Grid container>

          <EditableGuidesLeftPanel
            courseId={course.courseId}
            courseName={course.name}
            guides={guides}
          />

          <Content hasLeftPanel>
            <ContentHeader>
              <CourseInfoManagement
                id={course.courseId}
                name={course.name}
                description={course.description}
              />
            </ContentHeader>
            <GuideManagement
              courseId={course.courseId}
              guideId={guideId}
            />

          </Content>

        </Grid>
      </div>
    );
  }
}

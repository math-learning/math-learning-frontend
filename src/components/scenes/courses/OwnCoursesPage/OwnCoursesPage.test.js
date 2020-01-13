import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import { CircularProgress } from '@material-ui/core';
import EmptyCoursesPage from '../EmptyCoursesPage';
import OwnCoursesPage from './OwnCoursesPage';

describe('OwnCoursesPage', () => {
  let courses;

  describe('should render properties and components', () => {
    beforeEach(() => {
      courses = [{
        courseId: 'curso-1'
      }, {
        courseId: 'curso-2'
      }];
    });

    it('when is not loading courses and courses is not an empty array should render courses', () => {
      const wrapper = shallow(<OwnCoursesPage courses={courses} />);

      const courseId1 = wrapper.find(`[id="course-${courses[0].courseId}"]`);
      const courseId2 = wrapper.find(`[id="course-${courses[1].courseId}"]`);

      expect(courseId1.exists()).to.be.equal(true);
      expect(courseId2.exists()).to.be.equal(true);
    });

    it('when is not loading courses and courses is an empty array should render the empty courses page', () => {
      const wrapper = shallow(<OwnCoursesPage courses={[]} />);
      const emptyCourses = wrapper.find(EmptyCoursesPage);

      expect(emptyCourses.exists()).to.be.equal(true);
    });

    it('when is loading courses should render the loading and call load courses', () => {
      const onLoadCourses = sandbox.stub();
      const wrapper = shallow(<OwnCoursesPage isLoadingCourses onLoadCourses={onLoadCourses} />);
      const loading = wrapper.find(CircularProgress);

      expect(loading.exists()).to.be.equal(true);
      sinon.assert.called(onLoadCourses);
    });

    it('when isProfessor', () => {
      const wrapper = shallow(<OwnCoursesPage isProfessor courses={courses} />);
      const createCourse = wrapper.find('[id="create-new-course"]');

      expect(createCourse.exists()).to.be.equal(true);
      expect(createCourse.text()).to.be.equal('Crear nuevo curso');
    });
  });
});

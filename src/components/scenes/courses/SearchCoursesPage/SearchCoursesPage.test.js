import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import { CircularProgress } from '@material-ui/core';
import SearchCoursesPage from './SearchCoursesPage';

describe('SearchCoursesPage', () => {
  let courses;

  describe('should render properties and components', () => {
    beforeEach(() => {
      courses = [{
        courseId: 'curso-1'
      }, {
        courseId: 'curso-2'
      }];
    });

    describe('when is not loading courses and courses is not an empty array', () => {
      let wrapper;

      beforeEach(() => {
        wrapper = shallow(<SearchCoursesPage courses={courses} />);
      });

      it('should render courses', () => {
        const courseId1 = wrapper.find(`[id="course-${courses[0].courseId}"]`);
        const courseId2 = wrapper.find(`[id="course-${courses[1].courseId}"]`);

        expect(courseId1.exists()).to.be.equal(true);
        expect(courseId2.exists()).to.be.equal(true);
      });

      it('should render the search courses title', () => {
        const title = wrapper.find('[id="list-courses"]');

        expect(title.exists()).to.be.equal(true);
        expect(title.text()).to.be.equal('Buscar cursos');
      });

      it('should render the search courses box', () => {
        const title = wrapper.find('[id="search-box"]');

        expect(title.exists()).to.be.equal(true);
      });
    });

    it('when is not loading courses and courses is an empty array should render the empty courses page', () => {
      const wrapper = shallow(<SearchCoursesPage courses={[]} />);
      const noCourses = wrapper.find('[id="no-courses"]');

      expect(noCourses.exists()).to.be.equal(true);
      expect(noCourses.text()).to.be.equal('No hay cursos que coincidan con la búsqueda');
    });

    it('when is loading courses should render the loading and call load courses', () => {
      const onSearchCourses = sandbox.stub();
      const wrapper = shallow(<SearchCoursesPage isLoadingCourses onSearchCourses={onSearchCourses} />);
      const loading = wrapper.find(CircularProgress);

      expect(loading.exists()).to.be.equal(true);
      sinon.assert.called(onSearchCourses);
    });
  });

  describe('when click on search course', () => {
    let onSearchCourses;

    beforeEach(() => {
      onSearchCourses = sandbox.stub();
      const wrapper = shallow(
        <SearchCoursesPage
          isLoadingCourses
          onSearchCourses={onSearchCourses}
        />
      );
      wrapper.setState({ search: 'term' });

      const searchBox = wrapper.find('[id="search-box"]');
      searchBox.props().onKeyDown({ keyCode: 13 });
    });

    it('should search courses again', () => {
      sinon.assert.calledWith(onSearchCourses, {
        search: 'term'
      });
    });
  });
});

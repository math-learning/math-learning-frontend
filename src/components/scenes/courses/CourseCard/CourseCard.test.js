import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import CourseCard from './CourseCard';

describe('CourseCard', () => {
  let course;
  let profile;

  describe('should render properties and components', () => {
    beforeEach(() => {
      profile = {
        userId: 'diego-id',
        name: 'Diego Kim'
      };
      course = {
        name: 'Analisis matematico II - Curso 2',
        description: 'Este es el curso de analisis matemático 2',
        courseStatus: 'draft',
        courseId: 'course-1',
        createdAt: '2019-11-16T20:55:28.423Z',
        professors: [
          { userId: 'diego-id', name: 'Diego Kim', role: 'creator' },
          { userId: 'lucas-id', name: 'Lucas Ludueño', role: 'student' }
        ]
      };
    });

    it('should render the course title', () => {
      const wrapper = shallow(<CourseCard course={course} profile={profile} />);
      const courseTitle = wrapper.find('[id="course-title"]');

      expect(courseTitle.exists()).to.be.equal(true);
      expect(courseTitle.text()).to.be.equal(course.name);
    });

    it('should render the course description', () => {
      const wrapper = shallow(<CourseCard course={course} profile={profile} />);
      const courseDesc = wrapper.find('[id="course-description"]');

      expect(courseDesc.exists()).to.be.equal(true);
      expect(courseDesc.text()).to.be.equal(course.description);
    });

    it('should render the course date', () => {
      const wrapper = shallow(<CourseCard course={course} profile={profile} />);
      const courseDate = wrapper.find('[id="course-date"]');

      expect(courseDate.exists()).to.be.equal(true);
      expect(
        courseDate.text() === 'Creado en: 2019-11-16'
        || courseDate.text() === 'Creado en: 11/16/2019'
      ).to.be.equal(true);
    });

    it('should render each professor label', () => {
      const wrapper = shallow(<CourseCard course={course} profile={profile} />);
      const professorKim = wrapper.find(`[id="professor-${course.professors[0].userId}"]`);
      const professorLucas = wrapper.find(`[id="professor-${course.professors[1].userId}"]`);

      expect(professorKim.exists()).to.be.equal(true);
      expect(professorLucas.exists()).to.be.equal(true);
      expect(professorKim.text()).to.be.equal('Diego Kim');
      expect(professorLucas.text()).to.be.equal('Lucas Ludueño');
    });

    it('when the course is mine should render the school icon', () => {
      const wrapper = shallow(<CourseCard isMine course={course} profile={profile} />);
      const icon = wrapper.find('[id="school-icon"]');

      expect(icon.exists()).to.be.equal(true);
      expect(icon.props().id).to.be.equal('school-icon');
    });

    it('when the course is draft should render the school icon', () => {
      const wrapper = shallow(<CourseCard isDraft course={course} profile={profile} />);
      const icon = wrapper.find('[id="draft-icon"]');

      expect(icon.exists()).to.be.equal(true);
      expect(icon.props().id).to.be.equal('draft-icon');
    });

    it('when the course is not mine should render the school icon', () => {
      const wrapper = shallow(<CourseCard course={course} profile={profile} />);
      const icon = wrapper.find('[id="school-icon"]');

      expect(icon.exists()).to.be.equal(false);
    });

    it('when the course is draft should render the school icon', () => {
      const wrapper = shallow(<CourseCard course={course} profile={profile} />);
      const icon = wrapper.find('[id="draft-icon"]');

      expect(icon.exists()).to.be.equal(false);
    });
  });
});

import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import CreateCourseModal from './CreateCourseModal';

describe('CreateCourseModal', () => {
  let onCreateCourse;
  let onClose;

  describe('should render properties and components', () => {
    it('should render the course name', () => {
      const wrapper = shallow(<CreateCourseModal />);
      const textField = wrapper.find('[id="course-name"]');

      expect(textField).to.exist;
      expect(textField.props().label).to.be.equal('Nombre');
    });

    it('should render the course description', () => {
      const wrapper = shallow(<CreateCourseModal />);
      const textField = wrapper.find('[id="course-description"]');

      expect(textField).to.exist;
      expect(textField.props().label).to.be.equal('Descripción');
    });

    it('should render the course description', () => {
      const wrapper = shallow(<CreateCourseModal />);
      const textField = wrapper.find('[id="course-password"]');

      expect(textField).to.exist;
      expect(textField.props().label).to.be.equal('Contraseña (opcional)');
    });
  });

  describe('when click on create course', () => {
    let course;

    beforeEach(() => {
      course = {
        description: 'description',
        password: 'pepe',
        name: 'nombre',
      };
      onClose = sandbox.stub();
      onCreateCourse = sandbox.stub();
    });

    it('when executes onLogin, should call the given onLogin', () => {
      const wrapper = shallow(
        <CreateCourseModal
          onClose={onClose}
          onCreateCourse={onCreateCourse}
        />
      );
      wrapper.setState(course);

      wrapper.instance().onCreateCourse();
      sinon.assert.calledWith(onCreateCourse, course);
    });
  });
});

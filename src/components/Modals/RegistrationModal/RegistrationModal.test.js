import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import RegistrationModal from './RegistrationModal';

describe('RegistrationModal', () => {
  let onJoinCourse;
  let onClose;
  let course;
  let profile;

  beforeEach(() => {
    course = { name: 'AM II' };
    profile = { userId: 'user-id' };
  });

  describe('should render properties and components', () => {
    it('should render the title', () => {
      const wrapper = shallow(<RegistrationModal course={course} />);
      const textField = wrapper.find('[id="title"]');

      expect(textField).to.exist;
      expect(textField.text()).to.be.equal('Desea matricularse en el curso ?AM II');
    });

    it('should render the course password', () => {
      const wrapper = shallow(<RegistrationModal course={course} />);
      const textField = wrapper.find('[id="course-password"]');

      expect(textField).to.exist;
      expect(textField.props().label).to.be.equal('Ingrese la contraseña del curso');
    });
  });

  describe('when click on join course', () => {
    beforeEach(() => {
      onClose = sandbox.stub();
      onJoinCourse = sandbox.stub();
    });

    it('when executes onJoinCourse, should call the given onJoinCourse function', () => {
      const wrapper = shallow(
        <RegistrationModal
          course={course}
          profile={profile}
          onClose={onClose}
          onJoinCourse={onJoinCourse}
        />
      );
      wrapper.setState({ password: 'secret' });

      const joinButton = wrapper.find('[id="join-button"]');
      joinButton.simulate('click');

      sinon.assert.calledWith(onJoinCourse, {
        course,
        password: 'secret',
        userId: profile.userId,
        role: 'student'
      });
    });
  });
});

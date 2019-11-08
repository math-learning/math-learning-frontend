import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { GoogleLogin } from 'react-google-login';

import LoginModal from './LoginModal';

describe('LoginModal', () => {
  let onGoogleLogin;
  let onGoogleSignUp;
  let googleClientId;
  let onClose;

  describe('should render properties and components', () => {
    beforeEach(() => {
      googleClientId = 'google-client';
    });

    it('should render the Google login button', () => {
      const wrapper = shallow(<LoginModal googleClientId={googleClientId} />);
      const googleLogin = wrapper.find(GoogleLogin).at(0);

      expect(googleLogin).to.exist;
      expect(googleLogin.props().buttonText).to.be.equal('Log in con Google');
      expect(googleLogin.props().clientId).to.be.equal(googleClientId);
    });

    it('should render the TextField', () => {
      const wrapper = shallow(<LoginModal />);
      const textField = wrapper.find('[id="signup-name"]');

      expect(textField).to.exist;
      expect(textField.props().label).to.be.equal('Nombre completo');
    });

    it('should render the FormControlLabels', () => {
      const wrapper = shallow(<LoginModal />);
      const studentLabel = wrapper.find('[id="student-label"]');
      const professorLabel = wrapper.find('[id="professor-label"]');

      expect(studentLabel).to.exist;
      expect(studentLabel.props().label).to.be.equal('Estudiante');
      expect(professorLabel).to.exist;
      expect(professorLabel.props().label).to.be.equal('Profesor');
    });

    it('should render the Google signup button', () => {
      const wrapper = shallow(<LoginModal googleClientId={googleClientId} />);
      const googleSignUp = wrapper.find(GoogleLogin).at(1);

      expect(googleSignUp).to.exist;
      expect(googleSignUp.props().clientId).to.be.equal(googleClientId);
    });
  });

  describe('when click on login', () => {
    beforeEach(() => {
      onClose = sandbox.stub();
      onGoogleLogin = sandbox.stub();
      onGoogleSignUp = sandbox.stub();
    });

    it('when executes onLogin, should call the given onLogin', () => {
      const wrapper = shallow(
        <LoginModal
          onClose={onClose}
          onGoogleLogin={onGoogleLogin}
          onGoogleSignUp={onGoogleSignUp}
        />
      );

      wrapper.instance().onClickLogin('token');
      sinon.assert.calledWith(onGoogleLogin, 'token');
    });
  });

  describe('when click on sign up', () => {
    beforeEach(() => {
      onClose = sandbox.stub();
      onGoogleLogin = sandbox.stub();
      onGoogleSignUp = sandbox.stub();
    });

    it('when executes onSignUp, should call the given onSignUp', () => {
      const wrapper = shallow(
        <LoginModal
          onClose={onClose}
          onGoogleLogin={onGoogleLogin}
          onGoogleSignUp={onGoogleSignUp}
        />
      );
      const userProfile = {
        name: 'Diego',
        rol: 'professor'
      };
      wrapper.setState(userProfile);

      wrapper.instance().onClickSignUp('token');
      sinon.assert.calledWith(onGoogleSignUp, 'token', userProfile);
    });
  });
});

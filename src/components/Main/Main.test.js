import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import Main from './Main';

describe('LoginModal', () => {
  describe('should render properties and components', () => {
    it('should render the content', () => {
      const wrapper = shallow(<Main />);
      const content = wrapper.find('[id="main-content"]');

      expect(content).to.exist;
      expect(content.text()).to.be.equal('Aprender matemáticanunca fue tan fácil ...');
    });

    it('should render the SignUpButton', () => {
      const wrapper = shallow(<Main />);
      const signUpButton = wrapper.find('SignUpButton');

      expect(signUpButton).to.exist;
    });
  });
});

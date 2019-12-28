import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import HelpTooltip from './HelpTooltip';

describe('HelpTooltip', () => {
  let wrapper;

  describe('should render properties and components', () => {
    beforeEach(() => {
      wrapper = shallow(<HelpTooltip
        help="ayuda"
      />);
    });

    it('should render the help icon', () => {
      const helpIcon = wrapper.find('[id="help-icon"]');

      expect(helpIcon).to.exist;
    });

    it('should render the explanation', () => {
      const popover = wrapper.find('[id="help-popover"]');

      expect(popover).to.exist;
      expect(popover.text()).to.be.equal('ayuda');
    });
  });
});

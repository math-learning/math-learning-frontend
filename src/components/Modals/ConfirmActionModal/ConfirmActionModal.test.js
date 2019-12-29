import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import ConfirmActionModal from './ConfirmActionModal';

describe('ConfirmActionModal', () => {
  let onAcceptAction;
  let onClose;
  let wrapper;

  describe('should render properties and components', () => {
    beforeEach(() => {
      wrapper = shallow(<ConfirmActionModal
        title="should?"
        explanation="explain"
        acceptButton="do it"
        onClose={onClose}
        onAcceptAction={onAcceptAction}
      />);
    });

    it('should render the modal title', () => {
      const textField = wrapper.find('[id="modal-title"]');

      expect(textField).to.exist;
      expect(textField.text()).to.be.equal('should?');
    });

    it('should render the explanation', () => {
      const textField = wrapper.find('[id="explanation"]');

      expect(textField).to.exist;
      expect(textField.text()).to.be.equal('explain');
    });

    it('should render the accept button', () => {
      const button = wrapper.find('[id="accept-action"]');

      expect(button).to.exist;
      expect(button.text()).to.be.equal('do it');
    });

    it('should render the cancel button', () => {
      const button = wrapper.find('[id="cancel-action"]');

      expect(button).to.exist;
      expect(button.text()).to.be.equal('Cancelar');
    });
  });

  describe('when click on the buttons', () => {
    beforeEach(() => {
      onClose = sandbox.stub();
      onAcceptAction = sandbox.stub();
    });

    it('when clicks on accept', () => {
      wrapper = shallow(<ConfirmActionModal
        title="should?"
        explanation="explain"
        acceptButton="do it"
        onClose={onClose}
        onAcceptAction={onAcceptAction}
      />);

      const acceptButton = wrapper.find('[id="accept-action"]');
      acceptButton.simulate('click');
      sinon.assert.calledWith(onAcceptAction);
    });

    it('when clicks on cancel', () => {
      wrapper = shallow(<ConfirmActionModal
        title="should?"
        explanation="explain"
        acceptButton="do it"
        onClose={onClose}
        onAcceptAction={onAcceptAction}
      />);

      const acceptButton = wrapper.find('[id="cancel-action"]');
      acceptButton.simulate('click');
      sinon.assert.calledWith(onClose);
    });
  });
});

import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import SignUpButton from './SignUpButton';

describe('SignUpButton', () => {
  let onClick;

  beforeEach(() => {
    onClick = sandbox.stub();
  });

  it('should render the text', () => {
    const wrapper = shallow(<SignUpButton />);

    expect(wrapper.text()).to.be.equal('Sign up');
  });

  it('should render the default size', () => {
    const wrapper = shallow(<SignUpButton />);

    expect(wrapper.props().size).to.be.equal('large');
  });

  it('should render the correct size when is given', () => {
    const wrapper = shallow(<SignUpButton size="small" />);

    expect(wrapper.props().size).to.be.equal('small');
  });

  it('when executes onClick, should call the given onClick', () => {
    const wrapper = shallow(<SignUpButton size="small" onClick={onClick} />);

    wrapper.simulate('click');
    sinon.assert.calledOnce(onClick);
  });
});

import sinon from 'sinon';
import { expect } from 'chai';
import {
  mount,
  render,
  shallow,
  configure
} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
global.expect = expect;
global.mount = mount;
global.sinon = sinon;
global.render = render;
global.shallow = shallow;

beforeEach(() => {
  global.sandbox = sinon.createSandbox();
});

afterEach(() => {
  global.sandbox.restore();
});

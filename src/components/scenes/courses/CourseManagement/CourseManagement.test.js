import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import CourseManagement from "./CourseManagement";
import LeftPanelCourseManagement from "./components/LeftPanelCourseManagement";

describe('CourseManagement', () => {
    describe('when the data is correct', () => {
        it('should render the left panel', () => {
            const wrapper = shallow(<CourseManagement/>);
            const panel = wrapper.find(LeftPanelCourseManagement).at(0);
            expect(panel).to.exist;
        });


    })
});

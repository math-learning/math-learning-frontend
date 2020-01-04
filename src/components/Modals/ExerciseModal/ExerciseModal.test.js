import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import ExerciseModal from './ExerciseModal';

describe('CreateExerciseModal', () => {
  describe('should render properties and components', () => {
    it('should render the exercise name', () => {
      const wrapper = shallow(<ExerciseModal />);
      const textField = wrapper.find('[id="exercise-name"]');

      expect(textField).to.exist;
      expect(textField.props().label).to.be.equal('Nombre');
    });

    it('should render the exercise description', () => {
      const wrapper = shallow(<ExerciseModal />);
      const textField = wrapper.find('[id="exercise-description"]');

      expect(textField).to.exist;
      expect(textField.props().label).to.be.equal('Descripción (opcional)');
    });

    it('should render the exercise', () => {
      const wrapper = shallow(<ExerciseModal />);
      const textField = wrapper.find('MathTextBox');

      expect(textField).to.exist;
    });

    it('should render the exercise type dropdown', () => {
      const wrapper = shallow(<ExerciseModal />);
      const exerciseType = wrapper.find('[id="exercise-type-selector"]');

      expect(exerciseType).to.exist;
      expect(exerciseType.props().children[0].props.value).to.be.equal('derivative');
      expect(exerciseType.props().children[1].props.value).to.be.equal('integral');
    });

    it('should render the exercise difficulty dropdown', () => {
      const wrapper = shallow(<ExerciseModal />);
      const exerciseType = wrapper.find('[id="exercise-difficulty-selector"]');

      expect(exerciseType).to.exist;
      expect(exerciseType.props().children[0].props.value).to.be.equal('easy');
      expect(exerciseType.props().children[1].props.value).to.be.equal('medium');
      expect(exerciseType.props().children[2].props.value).to.be.equal('hard');
    });
  });
});

import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import CreateExerciseModal from './CreateExerciseModal';

describe('CreateExerciseModal', () => {
  let onCreateExercise;
  let onClose;

  describe('should render properties and components', () => {
    it('should render the exercise name', () => {
      const wrapper = shallow(<CreateExerciseModal />);
      const textField = wrapper.find('[id="exercise-name"]');

      expect(textField).to.exist;
      expect(textField.props().label).to.be.equal('Nombre');
    });

    it('should render the exercise description', () => {
      const wrapper = shallow(<CreateExerciseModal />);
      const textField = wrapper.find('[id="exercise-description"]');

      expect(textField).to.exist;
      expect(textField.props().label).to.be.equal('Descripción (opcional)');
    });

    it('should render the exercise', () => {
      const wrapper = shallow(<CreateExerciseModal />);
      const textField = wrapper.find('MathTextBox');

      expect(textField).to.exist;
    });

    it('should render the exercise type dropdown', () => {
      const wrapper = shallow(<CreateExerciseModal />);
      const exerciseType = wrapper.find('[id="exercise-type-selector"]');

      expect(exerciseType).to.exist;
      expect(exerciseType.props().children[0].props.value).to.be.equal('derivative');
      expect(exerciseType.props().children[1].props.value).to.be.equal('integral');
    });

    it('should render the exercise difficulty dropdown', () => {
      const wrapper = shallow(<CreateExerciseModal />);
      const exerciseType = wrapper.find('[id="exercise-difficulty-selector"]');

      expect(exerciseType).to.exist;
      expect(exerciseType.props().children[0].props.value).to.be.equal('easy');
      expect(exerciseType.props().children[1].props.value).to.be.equal('medium');
      expect(exerciseType.props().children[2].props.value).to.be.equal('hard');
    });
  });

  describe('when click on create exercise', () => {
    let exercise;
    let courseId;
    let guideId;

    beforeEach(() => {
      courseId = 'course';
      guideId = 'guide';
      exercise = {
        description: 'description',
        difficulty: 'easy',
        exercise: 'dx',
        name: 'nombre',
        type: 'derivative'
      };
      onClose = sandbox.stub();
      onCreateExercise = sandbox.stub();
    });

    it('when executes onLogin, should call the given onLogin', () => {
      const wrapper = shallow(
        <CreateExerciseModal
          guideId={guideId}
          courseId={courseId}
          onClose={onClose}
          onCreateExercise={onCreateExercise}
        />
      );
      wrapper.setState(exercise);

      wrapper.instance().onCreateExercise();
      sinon.assert.calledWith(onCreateExercise, {
        exercise,
        courseId,
        guideId
      });
    });
  });
});

// import React from 'react';
// import { shallow } from 'enzyme';
// import { expect } from 'chai';

// import Derivative from './Derivative';

// TODO: couldnt test this class because Error: Cannot find module 'exports-loader?window.MathQuill!imports-loader?window.jQuery=jquery!mathquill/build/mathquill.js'
// describe.skip('Derivative', () => {
//   let stepList;
//   let problemInput;
//   let currentExpression;
//   let onValidateStep;
//   let onContentChange;

//   beforeEach(() => {
//     stepList = [];
//     problemInput = '2x';
//     currentExpression = '2';
//     onValidateStep = sandbox.stub();
//     onContentChange = sandbox.stub();
//   });

//   describe('should render properties and components', () => {
//     it('should render the problem input', () => {
//       const wrapper = shallow(
//         <Derivative
//           stepList={stepList}
//           problemInput={problemInput}
//           currentExpression={currentExpression}
//           onValidateStep={onValidateStep}
//           onContentChange={onContentChange}
//         />
//       );
//       const problemInputField = wrapper.find('[id="problem-input"]');

//       expect(problemInputField).to.exist;
//       expect(problemInputField.props().label).to.be.equal(problemInput);
//     });

//     it('should render the steps when steps exists', () => {
//       stepList = ['2x', '2'];
//       const wrapper = shallow(
//         <Derivative
//           stepList={stepList}
//           problemInput={problemInput}
//           currentExpression={currentExpression}
//           onValidateStep={onValidateStep}
//           onContentChange={onContentChange}
//         />
//       );
//       const step1 = wrapper.find('[id="step-1"]');
//       const step2 = wrapper.find('[id="step-2"]');

//       expect(step1).to.exist;
//       expect(step2).to.exist;
//       expect(step1.props().label).to.be.equal('2x');
//       expect(step2.props().label).to.be.equal('2');
//     });

//     it('should not render the steps when steps dont exists', () => {
//       stepList = [];
//       const wrapper = shallow(
//         <Derivative
//           stepList={stepList}
//           problemInput={problemInput}
//           currentExpression={currentExpression}
//           onValidateStep={onValidateStep}
//           onContentChange={onContentChange}
//         />
//       );
//       const step1 = wrapper.find('[id="step-1"]');

//       expect(step1).to.not.exist;
//     });

//     it('should render the current step when it is not resolved', () => {
//       const wrapper = shallow(
//         <Derivative
//           stepList={stepList}
//           problemInput={problemInput}
//           currentExpression={currentExpression}
//           onValidateStep={onValidateStep}
//           onContentChange={onContentChange}
//         />
//       );
//       const currentStep = wrapper.find('[id="current-step"]');
//       const validateStep = wrapper.find('[id="validate-step"]');

//       expect(currentStep).to.exist;
//       expect(validateStep).to.exist;
//     });

//     it('should not render the current step when it is resolved', () => {
//       const wrapper = shallow(
//         <Derivative
//           isResolved
//           stepList={stepList}
//           problemInput={problemInput}
//           currentExpression={currentExpression}
//           onValidateStep={onValidateStep}
//           onContentChange={onContentChange}
//         />
//       );
//       const currentStep = wrapper.find('[id="current-step"]');
//       const validateStep = wrapper.find('[id="validate-step"]');

//       expect(currentStep).to.not.exist;
//       expect(validateStep).to.not.exist;
//     });

//     it('should render the exercise resolved label when it has been resolved', () => {
//       const wrapper = shallow(
//         <Derivative
//           isResolved
//           stepList={stepList}
//           problemInput={problemInput}
//           currentExpression={currentExpression}
//           onValidateStep={onValidateStep}
//           onContentChange={onContentChange}
//         />
//       );
//       const exerciseResolved = wrapper.find('[id="exercise-resolved"]');

//       expect(exerciseResolved).to.exist;
//       expect(exerciseResolved.props().label).to.be.equal('Ejercicio Resuelto!');
//     });
//   });
// });

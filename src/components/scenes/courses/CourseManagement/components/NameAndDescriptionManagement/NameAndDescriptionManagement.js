import React from 'react';
import Container from '@material-ui/core/Container';
import styles from './NameAndDescriptionManagement.module.sass';
import EditableText from '../../../../../editable/EditableTitle/EditableText';

export default function NameAndDescriptionManagement(props) {
  const { course, onNameChange, onDescriptionChange } = props;

  // TODO validaciones de los campos

  return (
    <Container>
      <EditableText
        text={course.name}
        onSave={(value) => onNameChange({ courseId: course.courseId, newValue: value })}
        textFieldSettings={{ fullWidth: true }}
        textFieldClassNames={styles.courseNameTextField}
        typographyClassNames={styles.courseNameTypography}
        classNames={styles.courseName}
        variant="h4"
        dontUpdate
      />
      <EditableText
        text={course.description}
        onSave={(value) => onDescriptionChange({ courseId: course.courseId, newValue: value })}
        textFieldSettings={{ fullWidth: true, multiline: true }}
        textFieldClassNames={styles.courseDescriptionTextField}
        typographyClassNames={styles.courseDescriptionTypography}
        classNames={styles.courseDescription}
        dontUpdate
      />
    </Container>
  );
}

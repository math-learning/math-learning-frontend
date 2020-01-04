import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import styles from './CourseHeader.module.sass';
import EditableText from '../../../../../editable/EditableTitle/EditableText';
import MoreVertOptions from '../Options';

export default function CourseHeader(props) {
  const {
    course, onNameChange, onDescriptionChange, onDeleteCourse, isProfessor
  } = props;

  // TODO validaciones de los campos

  const options = [ // TODO: maybe I would use buttons instead of these actions. they are too hide
    {
      text: 'Publicar', // TODO: if published
      onClick: console.log
    },
    {
      text: 'Eliminar',
      onClick: onDeleteCourse
    }
  ];

  return (
    <Container className={styles.courseInfo}>
      <Grid container>
        <Grid item xs={isProfessor ? 11 : 12}>
          <EditableText
            editable={isProfessor}
            text={course.name}
            onSave={(value) => onNameChange({ courseId: course.courseId, newValue: value })}
            textFieldSettings={{ fullWidth: true }}
            textFieldClassNames={styles.courseNameTextField}
            typographyClassNames={styles.courseNameTypography}
            classNames={styles.courseName}
            variant="h4"
            dontUpdate
          />
        </Grid>
        { isProfessor
          && (
          <Grid item xs={1} className={styles.moreVertOptions}>
            <MoreVertOptions
              options={options}
            />
          </Grid>
          )}

      </Grid>
      <EditableText
        editable={isProfessor}
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

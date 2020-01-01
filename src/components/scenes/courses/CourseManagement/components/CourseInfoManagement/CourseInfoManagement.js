import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import styles from '../GuideManagement/GuideManagement.module.sass';
import EditableText from '../../../../../editable/EditableTitle/EditableText';
import MoreVertOptions from '../Options';

export default function CourseInfoManagement(props) {
  const { course, onNameChange, onDescriptionChange, onDeleteCourse } = props;

  // TODO validaciones de los campos

  const options = [
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
        <Grid item xs={11}>
          <EditableText
            text={course.name}
            onSave={(value) => onNameChange({ courseId: course.courseId, newValue: value })}
            textFieldClassNames={styles.courseNameTextField}
            typographyClassNames={styles.courseNameTypography}
            classNames={styles.courseName}
            variant="h4"
            dontUpdate
          />
        </Grid>
        <Grid item xs={1} className={styles.moreVertOptions}>
          <MoreVertOptions
            options={options}
          />
        </Grid>

      </Grid>
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

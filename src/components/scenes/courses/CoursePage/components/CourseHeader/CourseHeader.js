import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import styles from './CourseHeader.module.sass';
import EditableText from '../../../../../editable/EditableTitle/EditableText';

class CourseHeader extends Component {
  handleNameChange = (value) => {
    const { onNameChange, course } = this.props;

    onNameChange({ courseId: course.courseId, newValue: value });
  };

  handleDescriptionChange = (value) => {
    const { onDescriptionChange, course } = this.props;

    onDescriptionChange({ courseId: course.courseId, newValue: value });
  };

  render() {
    const {
      course, onDeleteCourse, onPublishCourse, canDelete, canEdit
    } = this.props;

    return (
      <Container className={styles.courseInfo}>
        <Grid container>
          <Grid item xs={12}>
            <EditableText
              text={course.name}
              onSave={this.handleNameChange}
              textFieldSettings={{ fullWidth: true }}
              textFieldClassNames={styles.courseNameTextField}
              typographyClassNames={styles.courseNameTypography}
              classNames={styles.courseName}
              variant="h4"
              isEditable={canEdit}
            />
            <EditableText
              text={course.description}
              onSave={this.handleDescriptionChange}
              textFieldSettings={{ fullWidth: true, multiline: true }}
              textFieldClassNames={styles.courseDescriptionTextField}
              typographyClassNames={styles.courseDescriptionTypography}
              editIconClassName={styles.editIcon}
              classNames={styles.courseDescription}
              isEditable={canEdit}
            />
          </Grid>
          <div className={styles.buttonsContainer}>
            { canDelete && (
              <Button id="delete-course" onClick={onDeleteCourse} className={styles.deleteButton} variant="outlined">
                Borrar curso
              </Button>
            )}
            { canEdit && (
              <Button id="publish-course" onClick={onPublishCourse} className={styles.publishButton} variant="outlined" color="primary">
                Publicar curso
              </Button>
            )}
          </div>
        </Grid>
      </Container>
    );
  }
}

export default CourseHeader;

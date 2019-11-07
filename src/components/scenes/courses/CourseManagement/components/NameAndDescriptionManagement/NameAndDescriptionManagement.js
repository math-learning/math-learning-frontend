import React, { Component }  from 'react';
import Container from "@material-ui/core/Container";
import styles from '../GuideManagement/GuideManagement.module.sass';
import EditableText from "../../../../../editable/EditableTitle/EditableText";

export default class NameAndDescriptionManagement extends Component {

    render() {
        let { course , onNameChange, onDescriptionChange } = this.props;

        // TODO validaciones de los campos

        return (<React.Fragment>
                <Container className={styles.courseInfo}>
                    <EditableText
                        text={course.name}
                        onSave={(value) => onNameChange({courseId: course.courseId, newValue: value}) }
                        textFieldClassNames={styles.courseNameTextField}
                        typographyClassNames={styles.courseNameTypography}
                        classNames={styles.courseName}
                        variant={"h4"}
                        dontUpdate={true}
                    />
                    <EditableText
                        text={course.description}
                        onSave={(value) => onDescriptionChange({courseId: course.courseId, newValue: value}) }
                        textFieldSettings={ { fullWidth: true, multiline: true } }
                        textFieldClassNames={styles.courseDescriptionTextField}
                        typographyClassNames={styles.courseDescriptionTypography}
                        classNames={styles.courseDescription}
                        dontUpdate={true}
                    />
                </Container>
        </React.Fragment>);
    }
}

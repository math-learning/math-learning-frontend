import React, { Component }  from 'react';
import LeftPanelTitle from "../../../../../common/containers/LeftPanel/LeftPanelTitle";
import LeftPanelEditableElements from "../../../../../common/containers/LeftPanel/LeftPanelEditableElements";
import LeftPanel from "../../../../../common/containers/LeftPanel/LeftPanel";
import styles from './EditableGuidesLeftPanel.module.sass'

export default class EditableGuidesLeftPanel extends Component {
    render() {
        const { courseId, guides, updateGuide, createGuide, selectGuide } = this.props;

        const onElementUpdate = (element) => {return (value) => updateGuide({
            courseId: courseId,
            guideId: element.id,
            guideName: value,
            guideDescription: element.description
        })};

        const createGuideWithoutDescription = (name) => createGuide({
            courseId: courseId,
            guideName: name,
            guideDescription: 'description'});

        let processedGuides;
        let onClickActionsById = {};
        if (guides) {
            processedGuides = guides.map(guide => ({ ...guide, id: guide.guideId }));
            processedGuides.forEach(guide => onClickActionsById[guide.id] = () => { selectGuide({ courseId, guideId: guide.id}) })
        }

        return (<React.Fragment>
            <LeftPanel>
                <LeftPanelTitle text={"Guias"} className={styles.guidesTitle}/>
                <LeftPanelEditableElements
                    elements={processedGuides}
                    onClickActionsById={onClickActionsById}
                    onElementUpdate={onElementUpdate}
                    addElementText={"Agregar Guia"}
                    onCreateElement={createGuideWithoutDescription}
                    className={styles.editableItems}
                />
            </LeftPanel>
        </React.Fragment>);
    }
}

import {connect} from 'react-redux'
import {selectors} from '../../../state/common'
import ProfileLinkListItem from './ProfileLinkListItem'

const currentState = (state) => ({
  profile: selectors.profile(state)
})

export default connect(
  currentState
) (ProfileLinkListItem)
import { connect } from 'react-redux'
import { submitToken } from '../modules/home'

import HomeView from '../components/HomeView'

const mapDispatchToProps = {
  submitToken
}

const mapStateToProps = (state) => (
    state.home || {}
)

export default connect(mapStateToProps, mapDispatchToProps)(HomeView)

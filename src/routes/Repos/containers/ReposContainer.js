import { connect } from 'react-redux'
import { loadRepos } from '../modules/repos'

import ReposView from '../components/ReposView'

const mapDispatchToProps = {
  loadRepos
}

const mapStateToProps = (state) => ( state.repos )

export default connect(mapStateToProps, mapDispatchToProps)(ReposView)

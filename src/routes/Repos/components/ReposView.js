import React, {PropTypes} from 'react'
import Repos from '../../../components/Repos/Repos'


export const ReposView = React.createClass({
    propTypes: {
        repos: PropTypes.array,
        loadRepos: PropTypes.func.isRequired,
    },

    componentWillMount(){
        console.log('repos', repos);
        const {repos, loadRepos} = this.props;
        if (typeof repos === 'undefined') {
            loadRepos();
        }
    },

    onRepoClick(id) {
        return (e) => {
            e.preventDefault();
            // TODO open issues
        }
    },

    render() {
        const {activeId, repos} = this.props;

        return (
            <div>
                <h1 className="text-center">Please select GitHub repository</h1>
                <Repos
                    list={repos}
                    activeId={activeId}
                    onRepoClick={this.onRepoClick}
                />
            </div>
        )
    }
})

export default ReposView

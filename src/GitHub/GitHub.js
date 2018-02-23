import React from 'react'
import Loading from '../Components/Loading';
import { withGithubRepositories } from './withGitHubRepositories';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class GitHub extends React.Component {

  constructor(props) {
    super(props)
    this.state = { selectedOption: null }
  }

  handleSelect(selectedOption) {
    this.setState({ selectedOption })
  }

  render() {
    const { loading, repositories } = this.props;
    const selectedOption = this.state.selectedOption && this.state.selectedOption.value

    repositories.sort((a, b) => a.full_name.toLocaleLowerCase() > b.full_name.toLocaleLowerCase() ? 1 : -1)
    return (
      <div className="GitHub">
        {loading ?
          <section>
            <h2>Loading...</h2>
            <Loading />
          </section>
          :
          <section>
            <Select
              value={selectedOption}
              onChange={(e) => this.handleSelect(e)}
              options={repositories.map(r => Object.assign(r, {
                value: r.full_name,
                label: r.full_name,
              }))}
            />
          </section>
        }
      </div>
    )
  }
}

export default withGithubRepositories(GitHub)
import React from 'react'
import Loading from '../Components/Loading';
import { withGithubRepositories } from './withGitHubRepositories';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import LABELS_TO_ADD from '../Labels';
import invertColor from '../invertColor';
import './GitHub.css';

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
            <div className="row select-group">
              <div className="col-md-10">
                <Select
                  value={selectedOption}
                  onChange={(e) => this.handleSelect(e)}
                  options={repositories.map(r => Object.assign(r, {
                    value: r.full_name,
                    label: r.full_name,
                  }))}
                />
              </div>
              <div className="col-md-2">
                <button className="btn btn-apply-labels btn-primary">Apply</button>
              </div>
            </div>
            <div className="row labels">
              {LABELS_TO_ADD.map(({ name, color }) => (
                <div key={name} className="col-md-4">
                  <label alt={name} className="label-item"
                    style={{ backgroundColor: '#' + color, color: invertColor('#' + color, true) }}
                  >
                    <input disabled type="checkbox" />
                    {name}
                  </label>
                </div>
              ))}
            </div>
          </section>
        }
      </div>
    )
  }
}

export default withGithubRepositories(GitHub)
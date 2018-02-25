import React from 'react'
import { Alert } from 'reactstrap';
import Loading from '../Components/Loading';
import ProjectListSelector from '../Components/ProjectListSelector';
import { withGithubRepositories, fetchGitHub } from './withGitHubRepositories';
import LABELS_TO_ADD from '../Labels';
import invertColor from '../invertColor';
import './GitHub.css';

const LABELS_TO_REMOVE = [
  { name: "bug", color: "d73a4a" },
  { name: "duplicate", color: "cfd3d7" },
  { name: "enhancement", color: "a2eeef" },
  { name: "good first issue", color: "7057ff" },
  { name: "help wanted", color: "008672" },
  { name: "invalid", color: "e4e669" },
  { name: "question", color: "d876e3" },
  { name: "wontfix", color: "ffffff" }
];

const LabelList = ({ header, labels, className, applyedLabels }) => (
  <div className={`row labels ${className}`}>
    <h2 className="col-md-12">{header}</h2>
    {labels.map(({ name, color }) => (
      <div key={name} className="col-md-4">
        <label alt={name} className="label-item"
          style={{ backgroundColor: '#' + color, color: invertColor('#' + color) }}
        >
          <i className="material-icons label-icon">
            {applyedLabels.indexOf(name) > -1 ? 'check_box' : 'check_box_outline_blank'}
          </i>
          <span className="label-name" children={name} />
        </label>
      </div>
    ))}
  </div>
)

class GitHub extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedOption: null,
      applying: false,
      applyedLabels: [],
      applyingStatus: null,
      alert: null,
    }
  }

  handleApply(selectedOption) {
    this.setState({ selectedOption, applying: true })
    this.applyChangesToRepository(selectedOption.value)
  }

  async applyChangesToRepository(repoName) {
    this.setState({
      applyedLabels: [],
      alert: null
    })

    const createLabelsPromices = LABELS_TO_ADD.map(l => this.createLabel(repoName, l))
    const removeLabelPromices = LABELS_TO_REMOVE.map(l => this.removeLabel(repoName, l))
    try {

      await Promise.all([...createLabelsPromices, ...removeLabelPromices])
      this.setState({
        applying: false,
        alert: { type: 'success', message: 'Setup completed !' }
      });
    } catch (error) {
      this.setState({
        applying: false,
        alert: { type: 'danger', message: error.message }
      });
    }
  }

  async removeLabel(repoName, { name }) {
    await fetchGitHub(
      `https://api.github.com/repos/${repoName}/labels/${name}`,
      'DELETE'
    );

    this.setState(({ applyedLabels }) => ({
      applyedLabels: [...applyedLabels, name],
      applyingStatus: `${name} removed`,
    }))
  }

  async createLabel(repoName, { name, color }) {
    const resp = await fetchGitHub(
      `https://api.github.com/repos/${repoName}/labels`,
      'POST',
      { name, color }
    );

    if (resp.status === 422) {
      const message = await resp.json();
      if (!message.errors.find(({ code }) => code === 'already_exists')) {
        throw new Error(JSON.stringify(message.errors));
      }
    }

    this.setState(({ applyedLabels }) => ({
      applyedLabels: [...applyedLabels, name],
      applyingStatus: `${name} created`,
    }))
  }

  render() {
    const { loading, repositories } = this.props;

    return (
      <div className="GitHub">
        {loading ?
          <section>
            <h2>Loading...</h2>
            <Loading />
          </section>
          :
          <section>
            <ProjectListSelector className="select-group"
              disabled={this.state.applying}
              selected={this.state.selectedOption}
              projects={repositories.map(r => Object.assign(r, {
                value: r.full_name,
                label: r.full_name,
              }))}
              onApply={(selected) => this.handleApply(selected)}
            />
            {!this.state.alert ? null :
              <Alert
                color={this.state.alert.type}
                children={this.state.alert.message}
              />
            }
            {!this.state.applying ? null :
              <div className="row applying-status">
                <div className="col-md-12"><Loading status={this.state.applyingStatus} /></div>
              </div>
            }
            <LabelList
              header="Labels to Remove:"
              className="labels-to-remove"
              labels={LABELS_TO_REMOVE}
              applyedLabels={this.state.applyedLabels}
            />
            <LabelList
              header="Labels to Add:"
              className="labels-to-add"
              labels={LABELS_TO_ADD}
              applyedLabels={this.state.applyedLabels}
            />
          </section>
        }
      </div>
    )
  }
}

export default withGithubRepositories(GitHub)
import React from 'react'
import LABELS_TO_ADD from '../Labels';
import ProjectListApplyer from '../Components/ProjectListApplyer';
import GitLabLogo from '../assets/images/gitlab.svg'
import Loading from '../Components/Loading'
import './helper.css'

const LABELS_TO_REMOVE = [
  { name: "bug", color: "d9534f" },
  { name: "confirmed", color: "d9534f" },
  { name: "critical", color: "d9534f" },
  { name: "discussion", color: "428bca" },
  { name: "documentation", color: "f0ad4e" },
  { name: "enhancement", color: "5cb85c" },
  { name: "suggestion", color: "428bca" },
  { name: "support", color: "f0ad4e" }
];

class GitLab extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      projects: [],
      selectedOption: null,
      applying: false,
      applyedLabels: [],
      applyingStatus: null,
      alert: null,
    }
  }

  fetch(url, method, body) {
    return fetch(url, {
      method: method || 'GET',
      body: body,
      headers: new Headers({
        Authorization: `Bearer ${sessionStorage.getItem('gitlab-token')}`,
        Accept: 'application/json',
      })
    })
  }

  async componentDidMount() {
    window.coisa = this.fetch
    const resp = await this.fetch(`https://gitlab.com/api/v3/projects`);
    const projects = await resp.json();

    this.setState({
      loading: false,
      projects: projects,
    })
  }

  handleApply(selectedOption) {
    this.setState({ selectedOption, applying: true })
    this.applyChangesToProject(selectedOption.value)
  }

  async applyChangesToProject(projectId) {
    this.setState({
      applyedLabels: [],
      alert: null
    })

    try {
      const createLabelsPromices = LABELS_TO_ADD.map(l => this.createLabel(projectId, l))
      const removeLabelPromices = LABELS_TO_REMOVE.map(l => this.removeLabel(projectId, l))

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

  async removeLabel(projectId, { name }) {
    await this.fetch(
      `https://gitLab.com/api/v4/projects/${projectId}/labels?name=${name}`,
      'DELETE'
    );

    this.setState(({ applyedLabels }) => ({
      applyedLabels: [...applyedLabels, name],
      applyingStatus: `${name} removed`,
    }))
  }

  async createLabel(projectId, { name, color, priority }) {
    let formData = new FormData()
    formData.append('name', name);
    formData.append('color', `#${color}`);
    if (priority) {
      formData.append('priority', priority);
    }

    const resp = await this.fetch(
      `https://gitLab.com/api/v4/projects/${projectId}/labels`,
      'POST',
      formData
    );

    if (resp.status !== 201 && resp.status !== 409) {
      const content = await resp.json();
      if (!content.message.toLowerCase() !== 'label already exists') {
        throw new Error(content.message);
      }
    }

    this.setState(({ applyedLabels }) => ({
      applyedLabels: [...applyedLabels, name],
      applyingStatus: `${name} created`,
    }))
  }

  render() {
    const { loading, projects, selectedOption, applyedLabels, applying, applyingStatus, alert } = this.state;

    if (loading) {
      return <section>
        <h2>Loading GitLab...</h2>
        <Loading />
      </section>
    }
    return (
      <div className="GitLab">
        <section className="origin-header">
          <h1>
            <span className="origin-logo"><GitLabLogo /></span>
            <span className="origin-name">GitLab</span>
          </h1>
        </section>
        <ProjectListApplyer
          projects={projects.map(r => Object.assign(r, {
            value: r.id,
            label: r.path_with_namespace,
          }))}
          selectedPreject={selectedOption}

          labelsToRemove={LABELS_TO_REMOVE}

          onApply={(selected) => this.handleApply(selected)}

          applyedLabels={applyedLabels}
          applying={applying}
          applyingStatus={applyingStatus}
          alert={alert}
        />
      </div>
    )
  }
}

export default GitLab
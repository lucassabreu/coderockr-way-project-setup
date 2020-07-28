import React from 'react'
import LABELS_TO_ADD from '../Labels';
import ProjectListApplyer from '../Components/ProjectListApplyer';
import Loading from '../Components/Loading'
import GitHubLogo from '../assets/images/github.svg'

import './helper.css';

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


class GitHub extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      repositories: [],
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
      body: JSON.stringify(body),
      headers: new Headers({
        Authorization: `token ${sessionStorage.getItem('github-token')}`,
        Accept: 'application/json',
      })
    })
  }

  async componentDidMount() {
     await this.fetchNextPage();
  }

  async fetchNextPage(page) {
    const paging = page ? `?page=${page}` : '';
    const resp = await this.fetch(`https://api.github.com/user/repos${paging}`);

    let repos = await resp.json();
    if (repos.length === 0) {
      return repos;
    }

    this.setState(prevState => ({
      loading: false,
      repositories: [...prevState.repositories, ...repos],
    }))

     this.fetchNextPage(page ? page + 1 : 2);
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

    try {
      const createLabelsPromices = LABELS_TO_ADD.map(l => this.createLabel(repoName, l))
      const removeLabelPromices = LABELS_TO_REMOVE.map(l => this.removeLabel(repoName, l))

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
    await this.fetch(
      `https://api.github.com/repos/${repoName}/labels/${name}`,
      'DELETE'
    );

    this.setState(({ applyedLabels }) => ({
      applyedLabels: [...applyedLabels, name],
      applyingStatus: `${name} removed`,
    }))
  }

  async createLabel(repoName, { name, color }) {
    const resp = await this.fetch(
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
    const { loading, repositories, selectedOption, applyedLabels, applying, applyingStatus, alert } = this.state;

    if (loading) {
      return <section>
        <h2>Loading GitHub...</h2>
        <Loading />
      </section>
    }

    return (
      <div className="GitHub">
        <section className="origin-header">
          <h1>
            <span className="origin-logo"><GitHubLogo /></span>
            <span className="origin-name">GitHub</span>
          </h1>
        </section>
        <ProjectListApplyer
          projects={repositories.map(r => Object.assign(r, {
            value: r.full_name,
            label: r.full_name,
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

export default GitHub

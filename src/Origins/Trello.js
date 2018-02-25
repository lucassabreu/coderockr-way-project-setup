import React from 'react'
import LABELS_TO_ADD from '../Labels';
import ProjectListApplyer from '../Components/ProjectListApplyer';
import TrelloLogo from '../assets/images/trello.svg'
import { API_KEY } from './trelloConstants'
import Loading from '../Components/Loading'
import { proximity } from 'colour-proximity'
import './helper.css'

const COLORS = [
  { name: 'yellow', color: 'f2d600' },
  { name: 'green', color: '61bd4f' },
  { name: 'purple', color: 'c377e0' },
  { name: 'blue', color: '0079bf' },
  { name: 'red', color: 'eb5a46' },
  { name: 'orange', color: 'ffab4a' },
  { name: 'black', color: '4d4d4d' },
  { name: 'sky', color: '00c2e0' },
  { name: 'pink', color: 'ff80ce' },
  { name: 'lime', color: '51e898' },
]

window.p = proximity;
window.cs = COLORS

const mustNear = (color) => {
  return COLORS
    .map(c => Object.assign({}, c, { proximity: proximity('#' + color, '#' + c.color) }))
    .sort((a, b) => a.proximity < b.proximity ? 1 : -1)
    .pop()
}

const TRELLO_LABELS = LABELS_TO_ADD.map(l => {
  const color = mustNear(l.color)
  return Object.assign({}, l, { color: color.color, trelloColor: color.name })
})

class Trello extends React.Component {

  constructor(props) {
    super(props);

    const { location } = props
    const token = new URLSearchParams(location.hash.substr(1)).get('token')

    this.state = {
      token,
      loading: true,
      boards: [],
      selectedOption: null,
      applying: false,
      applyedLabels: [],
      applyingStatus: null,
      alert: null,
    }
  }

  fetch({ path, method, query, body }) {
    const queryStr = (query && Object.keys(query).reduce((c, key) => `${c}&${key}=${query[key]}`, '')) || ''
    return fetch(`https://api.trello.com/1/${path}?key=${API_KEY}&token=${this.state.token}${queryStr}`, {
      method: method || 'GET',
      body: body,
    })
  }

  async componentDidMount() {
    const resp = await this.fetch({
      path: 'members/me/boards',
      query: { filter: 'open', organizations: true },
    });
    const boards = await resp.json();

    this.setState({
      loading: false,
      boards: boards,
    })

    boards.map(b => b.idOrganization)
      .reduce((c, id) => c.indexOf(id) > -1 ? c : [...c, id], [])
      .filter(id => id !== null)
      .map(id => this.showOrganizationName(id));
  }

  async showOrganizationName(id) {
    const resp = await this.fetch({ path: `organizations/${id}`, query: { fields: 'id,displayName' } })
    const org = await resp.json()

    this.setState(prevState => ({
      boards: prevState.boards.map(board => {
        if (board.idOrganization !== id) {
          return board;
        }

        return Object.assign(board, {
          organization: org,
          name: `${board.name} (${org.displayName})`
        })
      })
    }))
  }

  handleApply(selectedOption) {
    this.setState({ selectedOption, applying: true })
    this.applyChangesToBoard(selectedOption.value)
  }

  async applyChangesToBoard(boardId) {
    this.setState({
      applyedLabels: [],
      alert: null
    })


    try {
      const currentLabels = (await (await this.fetch({ path: `boards/${boardId}/labels`, query: { fields: 'name,color' } })).json())
      const createLabelsPromices = TRELLO_LABELS.map(l => this.createLabel(boardId, l, currentLabels))
      const removeLabelPromices = COLORS.map(l => this.removeLabel(boardId, l, currentLabels))

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

  async createLabel(boardId, { name, trelloColor }, currentLabels) {
    if (currentLabels.find(cl => cl.name === name)) {
      this.addApplyedLabel(name);
      return;
    }

    let formData = new FormData()
    formData.append('idBoard', boardId);
    formData.append('name', name);
    formData.append('color', trelloColor);

    const resp = await this.fetch({ path: `labels`, method: 'POST', body: formData });

    if (resp.status !== 200) {
      const content = await resp.json();
      throw new Error(content.message);
    }

    this.addApplyedLabel(name);
  }

  addApplyedLabel(name) {
    this.setState(({ applyedLabels }) => ({
      applyedLabels: [...applyedLabels, name],
      applyingStatus: `${name} created`,
    }))
  }

  async removeLabel(boardId, { name }, currentLabels) {
    const cl = currentLabels.filter(cl => cl.color === name && cl.name === "").pop();

    if (!cl) {
      this.addApplyedLabel(name);
      return;
    }

    await this.fetch({ path: `labels/${cl.id}`, method: 'DELETE' });

    this.setState(({ applyedLabels }) => ({
      applyedLabels: [...applyedLabels, name],
      applyingStatus: `${name} removed`,
    }))
  }

  render() {
    const { loading, boards, selectedOption, applyedLabels, applying, applyingStatus, alert } = this.state;

    if (loading) {
      return <section>
        <h2>Loading Trello...</h2>
        <Loading />
      </section>
    }
    return (
      <div className="Trello">
        <section className="origin-header">
          <h1>
            <span className="origin-logo"><TrelloLogo /></span>
            <span className="origin-name">Trello</span>
          </h1>
        </section>
        <ProjectListApplyer
          projects={boards.map(r => Object.assign(r, {
            value: r.id,
            label: r.name,
          }))}
          selectedPreject={selectedOption}

          labelsToAdd={TRELLO_LABELS}
          labelsToRemove={COLORS}

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

export default Trello
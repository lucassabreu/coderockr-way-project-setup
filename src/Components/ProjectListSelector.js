import React from 'react'
import PropTypes from 'prop-types'

import Select from 'react-select';
import 'react-select/dist/react-select.css';

import './ProjectListSelector.css';

const projectShape = PropTypes.shape({
  value: PropTypes.any.isRequired,
  label: PropTypes.string.isRequired,
});

export default class ProjectListSelector extends React.Component {
  static propTypes = {
    onApply: PropTypes.func.isRequired,
    projects: PropTypes.arrayOf(projectShape),
    selected: projectShape,
    disabled: PropTypes.bool,
  }

  static defaultProps = {
    selected: null,
    disabled: false
  }

  constructor(props) {
    super(props);
    this.state = {
      selectedOption: this.props.selected
    };
  }

  componentWillReceiveProps({ selected }) {
    this.setState({ selectedOption: selected });
  }

  handleSelect(selectedOption) {
    this.setState({ selectedOption })
  }

  handleClick() {
    this.props.onApply(this.state.selectedOption)
  }

  render() {
    const { projects, disabled, className } = this.props;

    const selectedOption = this.state.selectedOption && this.state.selectedOption.value
    const sortedProjects = projects.slice().sort((a, b) => a.label.toLocaleLowerCase() > b.label.toLocaleLowerCase() ? 1 : -1);

    return (
      <div className={`ProjectListSelector row ${className}`}>
        <div className="col-md-10">
          <Select
            value={selectedOption}
            onChange={(e) => this.handleSelect(e)}
            options={sortedProjects}
            disabled={disabled}
          />
        </div>
        <div className="col-md-2">
          <button className="btn btn-apply-labels btn-primary"
            disabled={selectedOption === null || disabled}
            onClick={() => this.handleClick()}
          >
            Apply
          </button>
        </div>
      </div>
    );
  }
}
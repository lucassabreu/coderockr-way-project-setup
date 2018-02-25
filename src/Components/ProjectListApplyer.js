import React from 'react'
import PropTypes from 'prop-types'
import { Alert } from 'reactstrap'
import Loading from '../Components/Loading'
import ProjectListSelector from './ProjectListSelector'
import LABELS_TO_ADD from '../Labels'
import invertColor from '../invertColor'
import projectShape from './projectShape'

import './ProjectListApplyer.css'

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

const ProjectListApplyer = ({
  className,
  projects,
  selectedPreject,
  applying,
  applyedLabels,
  applyingStatus,
  onApply,
  labelsToRemove,
  alert
}) => (
    <div className={`ProjectListApplyer ${className}`}>
      <section>
        <ProjectListSelector className="select-group"
          disabled={applying}
          selected={selectedPreject}
          projects={projects}
          onApply={(selected) => onApply(selected)}
        />

        {!alert ? null :
          <Alert
            color={alert.type}
            children={alert.message}
          />
        }
        {!applying ? null :
          <div className="row applying-status">
            <div className="col-md-12"><Loading status={applyingStatus} /></div>
          </div>
        }
        <LabelList
          header="Labels to Add:"
          className="labels-to-add"
          labels={LABELS_TO_ADD}
          applyedLabels={applyedLabels}
        />
        {labelsToRemove.length === 0 ? null :
          <LabelList
            header="Labels to Remove:"
            className="labels-to-remove"
            labels={labelsToRemove}
            applyedLabels={applyedLabels}
          />
        }
      </section>
    </div>
  );

ProjectListApplyer.propTypes = {
  className: PropTypes.string,

  applying: PropTypes.bool,
  applyingStatus: PropTypes.string,
  applyedLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
  alert: PropTypes.shape({
    type: PropTypes.oneOf(['success', 'danger']).isRequired,
    message: PropTypes.string.isRequired
  }),
  onApply: PropTypes.func.isRequired,

  projects: PropTypes.arrayOf(projectShape).isRequired,
  selectedPreject: projectShape,

  labelsToRemove: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  })).isRequired,
}

ProjectListApplyer.defaultProps = {
  className: "",
  applying: false,
  applyedLabels: [],
  labelsToRemove: [],
}

export default ProjectListApplyer
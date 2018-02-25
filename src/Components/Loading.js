import React from 'react';
import { Progress } from 'reactstrap'

const Loading = ({ status }) => (
  <Progress animated color="primary" striped value={100} children={status} />
);

export default Loading
import React from 'react';
import { Progress } from 'reactstrap'

const Loading = () => (
  <Progress animated color="primary" striped value={100} />
);

export default Loading
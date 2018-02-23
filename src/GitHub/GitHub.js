import React from 'react'
import Loading from '../Components/Loading';

class GitHub extends React.Component {
  constructor(props) {
    super(props);

    const params = new URLSearchParams(props.location.search);

    this.state = {
      loading: true,
      code: params.get('code')
    };
  }

  render() {
    const { loading } = this.state;
    return (
      <div className="GitHub">
        {loading ?
          <section>
            <h2>Loading...</h2>
            <Loading />
          </section>
          :
          <section>
          </section>
        }
      </div>
    )
  }
}

export default GitHub
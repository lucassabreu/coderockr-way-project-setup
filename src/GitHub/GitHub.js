import React from 'react'
import Loading from '../Components/Loading';
import { githubAccessTokenUrl } from './constants'

class GitHub extends React.Component {
  constructor(props) {
    super(props);

    const params = new URLSearchParams(props.location.search);

    this.state = {
      loading: true,
      code: params.get('code')
    };
  }

  async componentDidMount() {
    fetch(new Request(
      'https://api.github.com/users/lucassabreu',
      {
        method: "GET",
        headers: new Headers({ accept: 'application/json' })
      })
    )
      .then(r => r.json())
      .then(console.log)

    fetch(new Request(
      githubAccessTokenUrl(this.state.code),
      {
        method: 'POST',
        headers: new Headers({ Accept: 'application/json' })
      }
    ))
      .then(r => {
        if (r.ok === false) {
          throw new Error(`${r.status} - ${r.statusText}`)
        }
        return r.json()
      })
      .then(console.log())
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
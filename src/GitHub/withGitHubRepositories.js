import React from 'react';

export function withGithubRepositories(Component) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: true,
        repositories: [],
      }
    }

    async componentDidMount() {
      const repositories = await this.fetchNextPage();
      this.setState({
        loading: false,
        repositories: repositories,
      })
    }

    async fetchNextPage(page) {
      const paging = page ? `?page=${page}` : '';

      const resp = await fetch(new Request(
        `https://api.github.com/user/repos${paging}`,
        {
          headers: new Headers({
            Authorization: `token ${sessionStorage.getItem('github-token')}`,
            Accept: 'application/json',
          })
        }
      ));

      let repos = await resp.json();
      if (repos.length === 0) {
        return repos;
      }

      return repos.concat(await this.fetchNextPage(page ? page + 1 : 2));
    }

    render() {
      return <Component {...this.props}
        loading={this.state.loading}
        repositories={this.state.repositories}
      />
    }
  }
}
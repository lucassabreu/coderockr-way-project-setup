const GITHUB_CLIENT_ID = '0e8a63320fba47de145c';
const GITHUB_CLIENT_SECRET = '<it will not work anyway>';

const githubAccessTokenUrl = (code) => (
  `https://github.com/login/oauth/access_token?client_id=${GITHUB_CLIENT_ID}&client_secret=${GITHUB_CLIENT_SECRET}&code=${code}`
);

const githubAuthorizeUrl = (callback) => (
  `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=repos&redirect_uri=${callback}`
)

export {
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  githubAccessTokenUrl,
  githubAuthorizeUrl,
}




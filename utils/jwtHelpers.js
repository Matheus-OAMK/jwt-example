const jwt = require('jsonwebtoken');

function jwtTokens({id,username}) {
  const user = {id,username};
  const access_token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'});
  const refresh_token = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '5m'});
  return({access_token, refresh_token});
}

module.exports = {jwtTokens};
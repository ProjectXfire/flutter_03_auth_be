const { OAuth2Client } = require("google-auth-library");

const webClientId = process.env.WEB_CLIENT_ID;
const androidClientId = process.env.ANDROID_CLIENT_ID;
const client = new OAuth2Client(androidClientId);

const validateGoogleIdToken = async (token) => {
  return client
    .verifyIdToken({
      idToken: token,
      audience: [webClientId, androidClientId],
    })
    .then((resp) => {
      const payload = resp.getPayload();
      return {
        user: {
          sub: payload.sub,
          email: payload.email,
          picture: payload.picture,
          name: payload.given_name,
        },
        message: "Valid token",
      };
    })
    .catch((err) => {
      return {
        user: null,
        message: "Invalid token",
      };
    });
};

module.exports = {
  validateGoogleIdToken,
};

const { response, json } = require("express");
const { validateGoogleIdToken } = require("../services/auth");

const googleAuth = async (req, res = response) => {
  //--> Get token
  const token = req.body.token;

  if (!token)
    return res.json({
      ok: false,
      token: null,
      message: "No token found",
    });

  //--> Validate token
  const googleUser = await validateGoogleIdToken(token);

  if (!googleUser.user)
    return res.json({
      ok: false,
      user: googleUser.user,
      message: googleUser.message,
    });
  res.json({
    ok: true,
    user: googleUser.user,
    message: googleUser.message,
  });
};

module.exports = {
  googleAuth,
};

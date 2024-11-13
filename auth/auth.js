import jwt from "jsonwebtoken";
const secrete =
  "b68ee129cf264880659fa6eca2eb95326ec6bec54543b1d3f3f332a587e1ea60";
const auth = {
  validateToken: function (token) {
    try {
      return jwt.verify(token, secrete);
    } catch (error) {
      console.info(`Invalid token or expired token found.${error}`);
      return null;
    }
  },
  generateToken: function (user) {
    let jwtUser = {
      id: user.id,
      email: user.email,
      gender: user.gender,
      name: user.name,
      role: user.role.name,
    };
    return jwt.sign(
      {
        data: jwtUser,
      },
      secrete,
      { expiresIn: "1h" }
    );
  },
};
export default auth;

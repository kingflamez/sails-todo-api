module.exports = async function (req, res, next) {
  try {
    if (!req.headers && !req.headers.authorization) {
      return res.status(401).send({
        status: false,
        message: 'Unauthorized User',
      });
    }


    const token = req.headers.authorization;

    // DECODE USER DETAILS
    const decodedUser = await sails.helpers.user.decodeUser.with({
      token,
    });

    const user = await User.findOne({
      id: decodedUser.id,
    });

    if (!user) {
      return res.status(401).send({
        status: false,
        message: 'Unauthorized User',
      });
    }

    req.user = user;
    next();
    return;
  } catch (error) {
    return res.status(401).send({
      status: false,
      message: 'Unauthorized User',
    });
  }
};

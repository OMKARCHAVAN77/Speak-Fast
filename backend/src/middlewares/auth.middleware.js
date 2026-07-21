const isAdmin = (req, res, next) => {
  if (
    req.session &&
    req.session.admin &&
    req.session.admin.role === "admin"
  ) {
    next(); // User is authenticated and is an admin
  } else {
    return res.status(401).json({
      message: "Unauthorized. Please login first.",
    });
  }
};

export default isAdmin;
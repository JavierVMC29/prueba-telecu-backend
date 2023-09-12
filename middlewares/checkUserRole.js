const checkUserRole = (allowedRoles) => {
  return (req, res, next) => {
    if (req.user && allowedRoles.includes(req.user.role)) {
      // User has one of the allowed roles, allow access
      next();
    } else {
      // User doesn't have an allowed role, deny access
      return res.status(403).json({ message: 'Unauthorized' });
    }
  };
};

const roles = {
  RECEPCION: 'RECEPCION',
  SUPERVISOR: 'SUPERVISOR'
};

module.exports = { checkUserRole, roles };

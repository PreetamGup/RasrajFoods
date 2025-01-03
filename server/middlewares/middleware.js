import jwt from 'jsonwebtoken';

export const authMiddlware =  (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'No token provided, please log in again.', success: false });
  }

    try {
        const decoded =  jwt.verify(token, process.env.JWT_SCRERT);
        req.user = decoded.user;
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired, please log in again.', success: false });
        }
        
        return res.status(401).json({ message: 'Invalid token, please log in again.', success: false });
    }

};


export const authorization = (req, res, next) => {

  // check if user is authenticated (has a token)
  console.log("Authorization")
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized', success:false });
  }

  // check if user has the required role
  if (req.user.role!== 'Admin') {
    
    return res.status(403).json({ message: 'Forbidden', sucess:false });
  }

  next();

}


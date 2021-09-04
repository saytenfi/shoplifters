const isAdmin = async (req, res, next) => {
    try {
        console.log("ISADMIN ---> START");
        if (req.user.role === 'admin') {
            next();
        }
    } catch (e) {
        next(e);
    }
 };

 module.exports = {
     isAdmin
 };

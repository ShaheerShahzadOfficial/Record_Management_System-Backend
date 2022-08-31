import jsonwebtoken from "jsonwebtoken"


function checkToken(req, res, next) {
    //get authcookie from request
    const { authToken } = req.cookies

    if (!authToken) {
        return res.status(401).json({
            meg: "Please Login to access this resource"
        })
    }

    //verify token which is in cookie value
    const decoded = jsonwebtoken.verify(authToken, "Hello World", (err, decoded) => {
        if (err) {
            res.status(403).json({
                Message: "You Are Not Authenticated"
            }
            )
            console.log(err)

        }
        else if (decoded) {
            console.log(decoded)
            req.user = decoded
            console.log(decoded)
            next()
        }
    }
    )
}

export default checkToken
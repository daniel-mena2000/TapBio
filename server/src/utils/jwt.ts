import  jwt, { JwtPayload }  from "jsonwebtoken"

//expiresIn: Cuanto queremos iniciada la sesioón
//JwtPayload: Es un tipo que ya trae jsonwebtoken
export const generateJWT = (payload: JwtPayload) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '180d'
    })

    return token
}

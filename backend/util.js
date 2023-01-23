import jwt from 'jsonwebtoken';
import config from './config';

const getToken = (user) => {
    return jwt.sign({
        _id: user._id,
        nom: user.nom || user.nomPharmacie,
        email: user.email || user.emailPharmacie,
        isAdmin: user.isAdmin,
    }, config.JWT_SECRET, {
        expiresIn: '48h'
    })
}

 const getTokenPharm = (user) => {
    return jwt.sign({
        _id: user._id,
        nomPharmacie: user.nomPharmacie,
        nomPharmacien: user.nomPharmacien,
        adresse: user.adresse,
        emailPharmacie: user.emailPharmacie,
        ville: user.ville,
        longitude: user.longitude,
        latitude: user.latitude,
        isAdminPharm: user.isAdminPharm,
    }, config.JWT_SECRET, {
        expiresIn: '48h'
    })
} 

const isAuth = (req, res, next) => {
    const token = req.headers.authorization;
    if(token){
        const onlyToken = token.slice(7, token.length);
        jwt.verify(onlyToken, config.JWT_SECRET, (err, decode) =>{
            if (err){
                return res.status(401).send({ msg: 'Token invalide' });
            }
            req.user = token;
            next();
            return
        });
    }
    return res.status(401).send({ msg: 'Token inconnu' });
}

const isAdmin = (req, res, next) => {
    if(req.user && req.user.isAdmin){
        return next();
    }
    return res.status(401).send({ msg: 'Token Admin invalide'});
}
export {
    getToken, getTokenPharm, isAuth, isAdmin
}
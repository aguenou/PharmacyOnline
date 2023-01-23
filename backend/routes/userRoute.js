import express from 'express';
import { getToken, getTokenPharm } from '../util';

const router = express.Router();

router.post("/register",(req,res)=>{
    let nom = req.body.nom;
    let prenom = req.body.prenom;
    let email = req.body.email;
    let motDePasse1 = req.body.password;
    let motDePasse2 = req.body.rePassword;

    let userExist = "SELECT * FROM Clients WHERE email='"+ email +"' ";
    let userInsert = "INSERT INTO Clients(nom,prenom,email,motDePasse) VALUES ('"+ nom+"','"+ prenom +"','"+ email +"','"+ motDePasse1 +"')";
    bdd.query(userExist,(err,result)=>{
        if(err) throw err;
        if(result.length > 0){
            res.status(401).send({msg:' Email déjà utilisé'});
        }else if( motDePasse1 !== motDePasse2){
            res.status(401).send({msg:' Les mots de passe doivent correspondre'});
        }else{
            bdd.query(userInsert,(err,result)=>{
                if(err) throw err;
                console.log(result);
                res.send("Row inserted");
            })
        }

        
    })
})
router.post("/api/users/signin",(req,res)=>{
    let emailSign = req.body.email;
    let passwordSign = req.body.password;

    let userSign = "SELECT * FROM Clients WHERE email='"+ emailSign +"' AND motDePasse='"+ passwordSign +"'";
    
    bdd.query(userSign,(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            console.log(result);
            res.send({
                nom:result.nomClient,
                prenom:result.prenomClient
            })
        }else{
            res.status(401).send({msg:' Email ou mot de passe invalide'});
        }
    })
})

 /*  router.post("/signin", async (req, res) =>{

    const signinUser = await User.findOne({
        email: req.body.email,
        password: req.body.password
    });
    
    const signinPharm = await Pharm.findOne({
        emailPharmacie:req.body.email,
        passwordPharmacie: req.body.password
    })

    if(signinUser){
        res.send({
            _id: signinUser.id,
            nom: signinUser.nom,
            email: signinUser.email,
            isAdmin: signinUser.isAdmin,
            token: getToken(signinUser)
        })

    }else if(signinPharm){
        res.send({
            _id: signinPharm.id,
            nomPharmacie: signinPharm.nomPharmacie,
            email: signinPharm.emailPharmacie,
            longitude: signinPharm.longitude,
            latitude: signinPharm.latitude,
            isAdmin: signinPharm.isAdmin,
            token: getTokenPharm(signinPharm)
        })
       
    }else {
        res.status(401).send({msg:' Email ou mot de passe invalide.'});
    }
    
})

router.post("/register", async (req, res) =>{

    const user = new User({
        nom: req.body.nom,
        email: req.body.email,
        password: req.body.password,
    });

    const newUser = await user.save();

    const pharm = new Pharm({
        nomPharmacie: req.body.nomPharmacie,
        nomPharmacien: req.body.nomPharm,
        adresse: req.body.adresse,
        emailPharmacie: req.body.emailPharmacie,
        passwordPharmacie: req.body.passwordPharmacie,
        ville: req.body.ville,
        longitude: req.body.longitude,
        latitude: req.body.latitude,
    });

    const newPharm = await pharm.save();

    if(newUser){
        res.send({
            _id: newUser.id,
            nom: newUser.nom,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            token: getToken(newUser)
        })
    }else if(newPharm){
        res.send({
            _id: newPharm.id,
            nomPharmacie: newPharm.nomPharmacie,
            nomPharmacien: newPharm.nomPharmacien,
            adresse: newPharm.adresse,
            emailPharmacie: newPharm.emailPharmacie,
            ville: newPharm.ville,
            longitude: newPharm.longitude,
            latitude: newPharm.latitude,
            isAdminPharm: newPharm.isAdminPharm,
            token: getTokenPharm(newPharm)
        }) 
    }else {
        res.status(401).send({msg:' Informations invalides.'})
    }
}); 

router.get("/createadmin", async (req, res)=>{
    try {
        const user = new User({
            nom: 'Yannick',
            email: 'aguenouy96@gmail.com',
            password : '1234',
            isAdmin: true
        });
    
        const newUser = await user.save();//sauvegarder nouvel user
        res.send(newUser);
    } catch (error) {
        res.send({ msg: error.message });
    }
    
});

router.get("/createpharm", async (req, res)=>{
    try {
        const pharm = new Pharm({
            nomPharmacie: 'Koutongbé' ,
            nomPharmacien: 'Alexandre KOTEGNI',
            adresse: 'Non loin du Parc Oloyé',
            emailPharmacie: 'koutongbepharm@gmail.com',
            passwordPharmacie: 'koutongbe',
            ville: 'Porto-novo',
            longitude: 21,
            latitude: 22,
            isAdminPharm: false
        });
    
        const newPharm = await pharm.save();//sauvegarder nouvel user
        res.send(newPharm);
    } catch (error) {
        res.send({ msg: error.message });
    }
    
});
 */
export default router;
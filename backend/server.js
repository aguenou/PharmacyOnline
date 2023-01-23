import express from 'express';
import data from './data';
import mysql from 'mysql';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import userRoute from './routes/userRoute';
import dotenv from 'dotenv';
import config from './config';
const getDistance = require('../frontend/src/localisation/localisation');/* 
import { getDistance } from '../frontend/src/localisation/localisation'; */

dotenv.config();

const bdd = mysql.createConnection({
    host : config.host,
    user : config.user,
    password : config.password,
    database : 'pharmacie'
    /*socketPath: '/opt/lampp/var/mysql/mysql.sock'*/
});

bdd.connect((err)=>{
    if(err){
        throw err;
    }
    console.log("Connexion à la base de donnée réussie");
}) 

/* const mongodbUrl = config.MONGODB_URL;
mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true
}).catch(error =>console.log(error.reason)) */

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
// Database

app.get('/createdb',(req,res)=>{
    let sql = 'CREATE DATABASE Pharmacie';
    bdd.query(sql,(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send('Database connected')
    })
})

app.get('/createClient',(req,res)=>{
    let sql = 'CREATE TABLE Clients(email varchar(255) PRIMARY KEY,nomClient varchar(255) NOT NULL,prenomClient varchar(255) NOT NULL,motDePasse varchar(255),dateIns datetime)';
    bdd.query(sql,(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send('Table Client created')
    })
})

app.get('/createVille',(req,res)=>{
    let sql = 'CREATE TABLE Ville(idVille int AUTO_INCREMENT PRIMARY KEY, nomVille varchar(255))';
    bdd.query(sql,(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send('Table ville created') 
    })
})

app.get('/createPharmacie',(req,res)=>{
    let sql = 'CREATE TABLE Pharmacy(emailPharmacie varchar(255) PRIMARY KEY, nomPharmacie varchar(255) NOT NULL, nomPharmacien varchar(255) NOT NULL, adresse varchar(255) NOT NULL,longitude float NOT NULL,latitude float NOT NULL,idVille int,motDePasse varchar(255) NOT NULL,dateIns datetime,FOREIGN KEY(idVille) REFERENCES Ville(idVille))';
    bdd.query(sql,(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send('Table Pharmacy created')
    })
})



app.post("/api/users/register",(req,res)=>{
    // For Clients
    let nom = req.body.nom;
    let prenom = req.body.prenom;
    let email = req.body.email;
    let motDePasse1 = req.body.password;
    let motDePasse2 = req.body.rePassword;

    let clientExist = "SELECT * FROM Clients WHERE email='"+ email +"' ";
    let clientInsert = "INSERT INTO Clients(nomClient,prenomClient,email,motDePasse,dateIns) VALUES ('"+ nom+"','"+ prenom +"','"+ email +"','"+ motDePasse1 +"','"+ new Date().toISOString().slice(0, 19).replace('T', ' ') +"')";
    bdd.query(clientExist,(err,result)=>{
        if(err) throw err;
        if(result.length > 0){
            res.status(401).send({msg:' Email déjà utilisé'});
        }else if( motDePasse1 !== motDePasse2){
            res.status(401).send({msg:' Les mots de passe doivent correspondre'});
        }else{
            bdd.query(clientInsert,(err,result)=>{
                if(err) throw err;
                console.log(result);
                res.send({
                    nom: nom,
                    prenom: prenom,
                    email:email
                });
            })
        }

        
    })
})

app.get("/api/ville",(req,res)=>{
    let sql = "SELECT * FROM Ville";
    bdd.query(sql,(err,result)=>{
        if (err) throw err;
        console.log(result);
        res.send(result); 
    })
})

app.get("/api/medicaments",(req,res)=>{
    let sql = "SELECT * FROM Medicaments";
    bdd.query(sql,(err,result)=>{
        if (err) throw err;
        console.log(result);
        res.send(result); 
    })
})

app.get("/api/createMedicament",(req,res)=>{
    let sql = "CREATE TABLE Medicaments(idMedicament int AUTO_INCREMENT PRIMARY KEY,nomMedicament varchar(255) NOT NULL,prix int NOT NULL,nombreDisponible int NOT NULL,description text NOT NULL,image BLOB NOT NULL,emailPharmacie varchar(255) NOT NULL, FOREIGN KEY(emailPharmacie) REFERENCES Pharmacy(emailPharmacie))";
    bdd.query(sql,(err,result)=>{ 
        if(err) throw err;
        console.log(result);
        res.send('Table medicament created');
    })
})
app.post("/api/users/registerPharm",(req,res)=>{
    // For Pharmacy
    let nom = req.body.nomPharmacie;
    let nomPharmacien = req.body.nomPharm; 
    let adresse = req.body.adresse;
    let email = req.body.emailPharmacie;
    let motDePasse1 = req.body.passwordPharmacie;
    let motDePasse2 = req.body.rePasswordPharmacie;
    let ville = req.body.villeIn;
    let longitude = req.body.longitude;
    let latitude = req.body.latitude; 

    let pharmExist = "SELECT * FROM Pharmacy WHERE emailPharmacie='"+ email +"' ";
    let pharmInsert = "INSERT INTO Pharmacy(emailPharmacie,nomPharmacie,nomPharmacien,adresse,longitude,latitude,idVille,motDePasse,dateIns) VALUES ('"+ email+"','"+ nom +"','"+ nomPharmacien +"','"+ adresse +"','"+ longitude +"','"+ latitude +"','"+ ville +"','"+ motDePasse1 +"','"+ new Date().toISOString().slice(0, 19).replace('T', ' ') +"')";
    bdd.query(pharmExist,(err,result)=>{
        if(err) throw err;
        if(result.length > 0){
            res.status(401).send({msg:' Email déjà utilisé'});
        }else if( motDePasse1 !== motDePasse2){
            res.status(401).send({msg:' Les mots de passe doivent correspondre'});
        }else{
            bdd.query(pharmInsert,(err,result)=>{
                if(err) throw err;
                console.log(result);
                res.send({ 
                    nom: nom,
                    nomPharmacien: nomPharmacien,
                    email:email
                });
            })
        }

        
    })
})
 app.post("/api/listMedicamentPharm",(req,res)=>{
     let email = req.body.emal;
     
     let sql = "SELECT * FROM Medicaments WHERE emailPharmacie='"+email+"' ";
     bdd.query(sql,(err,resultat)=>{
         if(err) throw err;
         console.log(resultat);
         res.send(
             resultat
         )
     })
 })
app.post("/api/users/signin",(req,res)=>{
    let emailSign = req.body.email;
    let passwordSign = req.body.password;

    let userSign = "SELECT nomClient,prenomClient,email FROM Clients WHERE email='"+ emailSign +"' AND motDePasse='"+ passwordSign +"'";
    bdd.query(userSign,(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            console.log(JSON.stringify(result));
            res.send({
                nom: result[0].nomClient,
                prenom:result[0].prenomClient,
                email: result[0].email
            })
        }else{
            res.status(401).send({msg:' Email ou mot de passe invalide'});
        }
    })

})

app.post("/api/users/signinPharm",(req,res)=>{
    let emailSign = req.body.email;
    let passwordSign = req.body.password;

    let pharmSign = "SELECT nomPharmacie,nomPharmacien FROM Pharmacy WHERE emailPharmacie='"+ emailSign +"' AND motDePasse='"+ passwordSign +"'";
    
    bdd.query(pharmSign,(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            console.log(JSON.stringify(result));
            res.send({
                nom: result[0].nomPharmacie,
                nomPharmacien: result[0].nomPharmacien,
                email:emailSign
            })
        }else{
            res.status(401).send({msg:' Email ou mot de passe invalide'});
        }
    })
})

app.post("/api/medicaments",(req,res)=>{
    let nom = req.body.nom;
    let prix = req.body.prix;
    let nombreDisponible = req.body.nombreDisponible; 
    let description = req.body.description;
    let image = req.body.image;
    let email = req.body.email;

    let sql = "INSERT INTO Medicaments(nomMedicament, prix, nombreDisponible, description, image, emailPharmacie) VALUES('"+ nom+"','"+ prix +"','"+ nombreDisponible +"','"+ description +"','"+ image +"','"+ email +"')";
    bdd.query(sql,(err,resultat)=>{
        if (err) throw err;
        console.log(resultat);
        res.send("Medicament créé")
    })
}) 

app.put("/api/medicaments/:id",(req,res)=>{
    let id = req.params.id;

    let nom = req.body.nom;
    let prix = req.body.prix;
    let nombreDisponible = req.body.nombreDisponible; 
    let description = req.body.description;
    let image = req.body.image;
    let email = req.body.email;

    let sql = "UPDATE Medicaments SET nomMedicament = '"+nom+"',prix = '"+prix+"',nombreDisponible = '"+nombreDisponible+"',image = '"+image+"',emailPharmacie = '"+email+"' WHERE idMedicament='"+id+"'";
    bdd.query(sql,(err,resultat)=>{
        if (err) throw err;
        console.log(resultat);
        res.send("Medicament modifié")
    })
}) 

app.delete("/api/medicaments/:id",(req,res)=>{
    let id = req.params.id;
    
    let sql = "DELETE FROM Medicaments WHERE idMedicament='"+id+"'";
    bdd.query(sql,(err,resultat)=>{
        if (err) throw err;
        console.log(resultat);
        res.send("Medicament supprimé")
    })
})

app.post("/api/reservation/",(req,res)=>{
    let id = req.body.id;
    let qte = req.body.qte;
    let idMed = req.body.idMed;
    let nombre = req.body.nombre;
console.log('oui '+id);
    let sqlDelete = "DELETE FROM Reservation WHERE idAchat='"+id+"'";
    let sqlUpdateQte = "UPDATE Medicaments SET nombreDisponible='"+(qte+nombre)+"' WHERE idMedicament='"+idMed+"' ";
    bdd.query(sqlDelete,(err,resultat)=>{
        if (err) throw err;
        console.log(resultat);
        if (resultat){
            bdd.query(sqlUpdateQte,(err,resultat)=>{
                if(err) throw err;
                console.log(resultat);
                res.send("Réservation annulée");
            })
        }
    })
})

app.post("/api/recherche",(req,res)=>{
    let medicament = req.body.medicament;
    let ville = req.body.villeIn;

    let sql = "SELECT nomMedicament,image,prix,nomPharmacie,adresse FROM Medicaments,Pharmacy WHERE Pharmacy.emailPharmacie=Medicaments.emailPharmacie AND idVille='"+ ville +"' AND nomMedicament='"+ medicament +"'";

    bdd.query(sql,(err,resultat)=>{
        if (err) throw err;
        console.log(resultat);
        
            return res.send({
                nomPharmacie:resultat.nomPharmacie, 
            }
            )
        
        
    })
})

app.post("/api/recherche/resultat/",(req, res) =>{
    
    let ville = req.body.id;
    let medicament = req.body.medicament;

    console.log(ville);

    let sql = "SELECT image,idMedicament,nomMedicament,prix,nomPharmacie,adresse FROM Medicaments,Pharmacy WHERE Pharmacy.emailPharmacie=Medicaments.emailPharmacie AND idVille='"+ ville +"' AND nomMedicament='"+ medicament +"'";
    
    bdd.query(sql,(err,resultat)=>{
        if (err) throw err;
        console.log(resultat);
        return res.send(
            resultat );
    })

});

app.get("/api/detailmedicament/:id",(req, res) =>{
    let detail = req.params.id;

    let sql = "SELECT * FROM Medicaments WHERE idMedicament='"+ detail +"'";

    bdd.query(sql,(err,resultat)=>{
        if (err) throw err;
        console.log(resultat);
        return res.send(resultat);
    })
});

app.get("/api/panier/:id",(req,res)=>{ 
    let medicament = req.params.id;
    let i=0;
    let qte = req.body.qte; 
    let sql = "SELECT * FROM Medicaments,Pharmacy WHERE idMedicament='"+ medicament +"' AND Medicaments.emailPharmacie=Pharmacy.emailPharmacie";

    bdd.query(sql,(err,resultat)=>{
        if (err) throw err; 
        if(i>=0){
            console.log(resultat[i]); 

            return res.send(
                resultat[i]
                /* {
                nomPharmacie:resultat.nomPharmacie,
                nomMedicament:resultat.nomMedicament,
                idMedicament:resultat.idMedicament,
                nombreDisponible:resultat.nombreDisponible,
                prix:resultat.nombreDisponible,
                image:resultat.image
            } */);
        }
        i++;
    })
})

app.post("/api/panierConfirm",(req,res)=>{
    let email = req.body.user;
    let prix = req.body.prix;
    let medicamentId = req.body.id;
    let qte = req.body.qte;
    let nombreDisponible = req.body.nombreDisponible;

    console.log(medicamentId);
    console.log(prix); 
    let sqlInsert = "INSERT INTO Achat(Client,Medicament,Quantite,Prix,dateAchat) VALUES('"+email+"','"+medicamentId+"','"+qte+"','"+prix*qte+"','"+ new Date().toISOString().slice(0, 19).replace('T', ' ') +"')";
    let sqlUpdate = "UPDATE Medicaments SET nombreDisponible = '"+(nombreDisponible-qte)+"' WHERE idMedicament='"+medicamentId+"'";

    bdd.query(sqlInsert,(err,resultat)=>{ 
        if(err) throw err; 
        console.log(resultat);
        if (resultat){
            bdd.query(sqlUpdate,(err,resultat)=>{
                if(err) throw err;
                console.log(resultat);
                return res.send(resultat);
            })
        }
    })

    
})

app.post("/api/profil",(req,res)=>{
    let user = req.body.user;

    let sql = "SELECT nomMedicament,nomPharmacie,Quantite,Achat.Prix FROM Medicaments,Pharmacy,Achat WHERE Medicaments.emailPharmacie=Pharmacy.emailPharmacie AND Medicaments.idMedicament=Achat.Medicament AND Client='"+user+"'";

    bdd.query(sql,(err,resultat)=>{
        if(err) throw err;
        console.log(resultat);
        res.send(resultat);
    })
})

app.post("/api/profilReserv",(req,res)=>{
    let user = req.body.user;

    let sql = "SELECT Reservation.idAchat,Reservation.Client,nomMedicament,idMedicament,nombreDisponible,nomPharmacie,Quantite,Reservation.Prix FROM Medicaments,Pharmacy,Reservation WHERE Medicaments.emailPharmacie=Pharmacy.emailPharmacie AND Medicaments.idMedicament=Reservation.Medicament AND Client='"+user+"'";

    bdd.query(sql,(err,resultat)=>{ 
        if(err) throw err;
        console.log(resultat);
        res.send(resultat); 
    })
})

app.post("/api/panierReserv",(req,res)=>{
    let email = req.body.user;
    let prix = req.body.prix; 
    let medicamentId = req.body.id;
    let qte = req.body.qte;
    let nombreDisponible = req.body.nombreDisponible;

    console.log(medicamentId);
    console.log(prix); 
    let sqlInsert = "INSERT INTO Reservation(Client,Medicament,Quantite,Prix,dateReservation) VALUES('"+email+"','"+medicamentId+"','"+qte+"','"+prix*qte+"','"+ new Date().toISOString().slice(0, 19).replace('T', ' ') +"')";
    let sqlUpdate = "UPDATE Medicaments SET nombreDisponible = '"+(nombreDisponible-qte)+"' WHERE idMedicament='"+medicamentId+"'";

    bdd.query(sqlInsert,(err,resultat)=>{ 
        if(err) throw err; 
        console.log(resultat);
        if (resultat){
            bdd.query(sqlUpdate,(err,resultat)=>{
                if(err) throw err;
                console.log(resultat);
                return res.send(resultat);
            })
        }
    })

    
})

app.post("/api/reservationConfirm/",(req,res)=>{
    let id = req.body.id;
    let qte = req.body.qte;
    let idMed = req.body.idMed;
    let nombre = req.body.nombre;
    let prix = req.body.prix;
    let client = req.body.client;

    let sqlDelete = "DELETE FROM Reservation WHERE idAchat='"+id+"'";
    let sqlInsert = "INSERT INTO Achat(Client,Medicament,Quantite,Prix) VALUES('"+client+"','"+idMed+"','"+qte+"','"+prix+"')";
    bdd.query(sqlInsert,(err,resultat)=>{
        if (err) throw err;
        console.log(resultat);
        if (resultat){
            bdd.query(sqlDelete,(err,resultat)=>{
                if(err) throw err;
                console.log(resultat);
                res.send("Réservation confirmée");
            })
        }
    })
})

app.post("/api/achatFinal",(req,res)=>{
    let pharmacie = req.body.pharmacie;

    let sql = "SELECT AchatFinal.Quantite,AchatFinal.Prix,AchatFinal.idAchatFinal,idMedicament,nombreDisponible,nomMedicament,nomClient,prenomClient,dateAchatFinal FROM Clients,AchatFinal,Medicaments WHERE Clients.email=AchatFinal.Client AND AchatFinal.Medicament=Medicaments.idMedicament AND emailPharmacie='"+pharmacie+"'";

    bdd.query(sql,(err,resultat)=>{
        if(err) throw err;
        console.log(resultat);
        res.send(resultat);
    })
})

app.post("/api/achatConsult",(req,res)=>{
    let pharmacie = req.body.pharmacie;

    let sql = "SELECT Achat.Quantite,Achat.Client,Achat.Prix,Achat.idAchat,idMedicament,nombreDisponible,nomMedicament,nomClient,prenomClient,dateAchat FROM Clients,Achat,Medicaments WHERE Clients.email=Achat.Client AND Achat.Medicament=Medicaments.idMedicament AND emailPharmacie='"+pharmacie+"'";

    bdd.query(sql,(err,resultat)=>{
        if(err) throw err;
        console.log(resultat);
        res.send(resultat);
    })
})

app.post("/api/reservConsult",(req,res)=>{
    let pharmacie = req.body.pharmacie;

    let sql = "SELECT Reservation.Quantite,Reservation.Prix,Reservation.idAchat,idMedicament,nombreDisponible,nomMedicament,nomClient,prenomClient,dateReservation FROM Clients,Reservation,Medicaments WHERE Clients.email=Reservation.Client AND Reservation.Medicament=Medicaments.idMedicament AND emailPharmacie='"+pharmacie+"'";

    bdd.query(sql,(err,resultat)=>{
        if(err) throw err;
        console.log(resultat);
        res.send(resultat);
    })
})

app.post("/api/achatConfirmPharm",(req,res)=>{
    let id = req.body.id;
    let qte = req.body.qte;
    let idMed = req.body.idMed;
    let nombre = req.body.nombre;
    let prix = req.body.prix;
    let client = req.body.client; 

    let sqlDelete = "DELETE FROM Achat WHERE idAchat='"+id+"'";
    let sqlInsert = "INSERT INTO AchatFinal(Client,Medicament,Quantite,Prix,dateAchatFinal) VALUES('"+client+"','"+idMed+"','"+qte+"','"+prix+"','"+ new Date().toISOString().slice(0, 19).replace('T', ' ') +"')";
    bdd.query(sqlInsert,(err,resultat)=>{
        if (err) throw err;
        console.log(resultat);
        if (resultat){
            bdd.query(sqlDelete,(err,resultat)=>{
                if(err) throw err;
                console.log(resultat);
                res.send("Achat finalisé");
            })
        }
    })
})

app.post("/api/deleteAchatPharm",(req,res)=>{
    let id = req.body.id;
    let qte = req.body.qte;
    let idMed = req.body.idMed;
    let nombre = req.body.nombre;
    let prix = req.body.prix;
    let client = req.body.client;

    
    console.log(prix); 
    let sqlDelete = "DELETE FROM Achat WHERE idAchat='"+id+"'";
    let sqlUpdate = "UPDATE Medicaments SET nombreDisponible = '"+(nombre+qte)+"' WHERE idMedicament='"+idMed+"'";

    bdd.query(sqlUpdate,(err,resultat)=>{ 
        if(err) throw err; 
        console.log(resultat);
        if (resultat){
            bdd.query(sqlDelete,(err,resultat)=>{
                if(err) throw err;
                console.log(resultat);
                res.send("Achat annulé");
            }) 
        }
    })

    
})

app.post("/api/rechercheLocal",(req,res)=>{
    let medicament = req.body.medicament;
    let latClient = req.body.lat;
    let lonClient = req.body.lon;
    let positionIn = req.body.positionIn;
    let i = 0;

    
    let sqlPosition = "SELECT emailPharmacie,longitude,latitude FROM Pharmacy";
    bdd.query(sqlPosition,(err,result)=>{
        if (err) throw err;
        console.log(result);
        for(i=0;i<result.length;i++){
            let distance = getDistance(latClient,lonClient,result[i].latitude,result[i].longitude);
            console.log(distance);
            if(distance <= positionIn){
                let sqlResultat = "SELECT nomMedicament,idMedicament,adresse,prix,image,nomPharmacie FROM Medicaments,Pharmacy WHERE Pharmacy.emailPharmacie=Medicaments.emailPharmacie AND nomMedicament='"+ medicament +"' AND Medicaments.emailPharmacie='"+ result[i].emailPharmacie +"'";
                bdd.query(sqlResultat,(err,resultat)=>{
                    if (err) throw err;
                    console.log(resultat);
                    return res.send(resultat); 
                })
            }else{
                return res.status(401).send({msg:' Pharmacie introuvable dans le rayon'});
            }
        }
    })
})
app.listen(5000, () => {console.log("Server started at http://localhost:5000")});

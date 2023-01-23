import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import {consultAchatFinal,consultAchat,consultReserv,deleteAchat,confirmAchet, signout} from '../actions/userActions';

function ConsultOperationScreen(props) {
  /* const [cookies,setCookie] = useCookies('userInfoSigninPharm');
  const emal = cookies.userInfoSigninPharm.email;
  console.log(emal);

  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState('');
  const [nom, setNom] = useState('');
  const [prix, setPrix] = useState('');
  const [image, setImage] = useState(''); 
  const [nombreDisponible, setNombreDisponible] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  
  console.log(prix); */
    const pharmSignin = useSelector(state=>state.pharmSignin);
    const {userInfoSigninPharm} = pharmSignin;
  
    console.log(userInfoSigninPharm);
    const pharmRegister = useSelector(state=>state.pharmRegister);
    const {userInfoPharm} = pharmRegister;
  
    const pharmacie = userInfoSigninPharm ? userInfoSigninPharm.email : userInfoPharm.email;

    console.log(userInfoSigninPharm.email);

    const finalAchat = useSelector(state=>state.finalAchat);
    const {achatFinal} = finalAchat;

    const nonFinal = useSelector(state=>state.nonFinal);
    const {achat} = nonFinal;

    const reservAchat = useSelector((state) => state.reservAchat);
    const {reservConsult} = reservAchat;
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(consultAchatFinal(pharmacie));
    dispatch(consultAchat(pharmacie));
    dispatch(consultReserv(pharmacie));
  }, []);
  
  const annulerAchat = (achat)=>{
    dispatch(deleteAchat(achat.idAchat,achat.Quantite,achat.idMedicament,achat.nombreDisponible));
    window.history.go(0);
  }
  
  const confirmerAchet = (achat)=>{
    dispatch(confirmAchet(achat.idAchat,achat.Quantite,achat.idMedicament,achat.Prix,achat.Client));
    window.history.go(0);
  }

  const gooff = ()=>{
      dispatch(signout())
  }
  /* const openModal = (medicament) => {
    setModalVisible(true);
    /* setId(product._id); *
    setId(medicament.idMedicament);
    setNom(medicament.nomMedicament);
    setPrix(medicament.prix);
    setDescription(medicament.description);
    setImage(medicament.image);
    setNombreDisponible(medicament.nombreDisponible);
    setEmail(medicament.emailPharmacie);
  };
console.log(id);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveMedicament(id,nom, prix, nombreDisponible, description,image,email)
    );
    window.history.go(0);
  };
  
  const deleteHandler = (medicament)=>{
    dispatch(deleteMedicament(medicament.idMedicament));
  } */
  /* const getMail = ()=>{
    if(document.querySelector('#email')){
        document.querySelector('#email').value = emal;
    }
}
if(document.addEventListener('DOMContentLoaded',getMail)){
  console.log('ready');
}else{
  console.log('not rady');
}; */

/* setTimeout( ()=>{
    document.querySelector('#email').value = emal;
},1500);
 */
/* console.log(document.querySelector('#email').value); */

  return (
    <div className="content content-margined">
      <div className="product-header">
        <h3>Historique des achats terminés</h3>
        <button className="button primary" onClick={() => gooff({})}>
          Se déconnecter
        </button>
      </div>
  {/*     {modalVisible  && (
        <div className="form">
          <form onSubmit={submitHandler}>
            <ul className="form-container">
              <li>
                <h2>Ajouter Médicament</h2>
              </li>
              <li>
                {loadingSave && <div>Loading...</div>}
                {errorSave && <div>{errorSave}</div>}
              </li>

              <li>
                <label htmlFor="nom">Nom</label>
                <input
                  type="text"
                  name="nom"
                  value={nom || ''}
                  id="nom"
                  onChange={(e) => setNom(e.target.value)}
                ></input>
                
              </li>
              <li>
                <label htmlFor="prix">Prix</label>
                <input
                  type="text"
                  name="prix"
                  value={prix || ''}
                  id="prix"
                  onChange={(e) => setPrix(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="image">Image</label>
                <input
                  type="file"
                  name="image"
                  
                  id="image"
                  onChange={(e) => setImage(e.target.value)}
                ></input>
              </li>
              
              <li>
                <label htmlFor="nombreDisponible">Nombre disponible</label>
                <input
                  type="text"
                  name="nombreDisponible"
                  value={nombreDisponible || ''}
                  id="nombreDisponible"
                  onChange={(e) => setNombreDisponible(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="description">Description</label>
                <textarea
                  name="description"
                  value={description || ''}
                  id="description"
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </li>
              {
                setTimeout( ()=>{
                  if(document.querySelector('#email')){
                    document.querySelector('#email').value = emal;
                  console.log('aze: '+document.querySelector('#email').value+' ready ready');
                  }
              },1000) &&(
              <li>
              <input
                  type="text"
                  name="email"
                  value={email || ''}
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
              </li>
              )
              }
              
              <li>
                <button type="submit" className="button primary">
                {id?"Modifier":"Ajouter"}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setModalVisible(false)}
                  className="button secondary"
                >
                  Retour
                </button>
              </li>
            </ul>
          </form>
        </div>
      )} */}

      <div className="product-list">
        <table className="table">
          <thead>
            <tr>
              <th>Client</th>
              <th>Medicament</th>
              <th>Quantité</th>
              <th>Prix</th>
              <th>Date</th>{/* 
              <th>Action</th> */}
            </tr>
          </thead>
          <tbody>
            {
              achatFinal.length ==0 ? 
              <div>Vide</div>:
            achatFinal.map((final) => (
              <tr key={final.idAchatFinal}>
                <td>{final.nomClient+' '+final.prenomClient}</td>
                <td>{final.nomMedicament}</td>
                <td>{final.Quantite}</td>
                <td>{final.Prix}</td>
                <td>{new Date(final.dateAchatFinal).toISOString().slice(0, 19).replace('T', ' ')}</td> 
                {/* <td>
                  <button className="button" onClick={() => openModal(medicament)}>
                    Modifier
                  </button>
                  <button className="button" onClick={() => deleteHandler(medicament)}>
                    Supprimer
                  </button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="product-list">
      <h3>Historique des achats en cours</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Client</th>
              <th>Medicament</th>
              <th>Quantité</th>
              <th>Prix</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
            achat.length ==0 ?
            <div>Vide</div> :
            achat.map((achat) => (
              <tr key={achat.idAchat}>
                <td>{achat.nomClient+' '+achat.prenomClient}</td>
                <td>{achat.nomMedicament}</td>
                <td>{achat.Quantite}</td>
                <td>{achat.Prix}</td>
                <td>{new Date(achat.dateAchat).toISOString().slice(0, 19).replace('T', ' ')}</td>
                <td>
                  <button className="button" onClick={() => annulerAchat(achat)}>
                    Annuler
                  </button>
                  <button className="button" onClick={() => confirmerAchet(achat)}>
                    Confirmer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="product-list">
      <h3>Historique des réservations en cours</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Client</th>
              <th>Medicament</th>
              <th>Quantité</th>
              <th>Prix</th>
              <th>Date</th>{/* 
              <th>Action</th> */}
            </tr>
          </thead>
          <tbody>
            {
            reservConsult.length == 0 ?
            <div>Vide</div> :
            reservConsult.map((reserv) => (
              <tr key={reserv.idAchat}>
                <td>{reserv.nomClient+' '+reserv.prenomClient}</td>
                <td>{reserv.nomMedicament}</td>
                <td>{reserv.Quantite}</td>
                <td>{reserv.Prix}</td>
                <td>{new Date(reserv.dateAchat).toISOString().slice(0, 19).replace('T', ' ')}</td>
                {/* <td>
                  <button className="button" onClick={() => annulerReser(achat)}>
                    Annuler
                  </button>
                  <button className="button" onClick={() => confirmerAchet(achat)}>
                    Confirmer
                  </button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default ConsultOperationScreen;
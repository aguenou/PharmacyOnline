import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import {profil,profilReserv,deleteReserv,confirmReserv, signout} from '../actions/userActions';

function ProfileScreen(props) {
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
    const userSignin = useSelector(state=>state.userSignin);
    const {userInfoSignin} = userSignin;
  
    const userRegister = useSelector(state=>state.userRegister);
    const {userInfo} = userRegister;
  
    const user =userInfoSignin ? userInfoSignin.email : userInfo.email;

    const profilUser = useSelector(state=>state.profilUser);
    const {profile} = profilUser;

    const profilReservUser = useSelector(state=>state.profilReservUser);
    const {profileReserv} = profilReservUser;

    const medicamentReserv = useSelector((state) => state.medicamentReserv);
    const {reserv} = medicamentReserv;

    const medicamentReservConfirm = useSelector((state) => state.medicamentReservConfirm);
    const {reserve} = medicamentReservConfirm;
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(profil(user));
    dispatch(profilReserv(user));
  }, []);
  
  const annulerReserv = (reservation)=>{
    dispatch(deleteReserv(reservation.idAchat,reservation.Quantite,reservation.idMedicament,reservation.nombreDisponible));
    window.history.go(0);
  }
  
  const confirmerReservation = (reservation)=>{
    dispatch(confirmReserv(reservation.idAchat,reservation.Quantite,reservation.idMedicament,reservation.nombreDisponible,reservation.Prix,reservation.Client));
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
        <h3>Historique des achats</h3>
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
              <th>Médicament</th>
              <th>Pharmacie</th>
              <th>Quantité</th>
              <th>Prix</th>{/* 
              <th>Action</th> */}
            </tr>
          </thead>
          <tbody>
            {
              profile.length == 0 ?
              <div>Vide</div> :
            profile.map((historique) => (
              <tr key={historique.idAchat}>
                <td>{historique.nomMedicament}</td>
                <td>{historique.nomPharmacie}</td>
                <td>{historique.Quantite}</td>
                <td>{historique.Prix}</td> 
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
      <h3>Historique des réservations</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Médicament</th>
              <th>Pharmacie</th>
              <th>Quantité</th>
              <th>Prix</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              profileReserv.length ==0 ?
              <div>Vide</div> :
            profileReserv.map((reservation) => (
              <tr key={reservation.idAchat}>
                <td>{reservation.nomMedicament}</td>
                <td>{reservation.nomPharmacie}</td>
                <td>{reservation.Quantite}</td>
                <td>{reservation.Prix}</td>
                <td>
                  <button className="button" onClick={() => annulerReserv(reservation)}>
                    Annuler
                  </button>
                  <button className="button" onClick={() => confirmerReservation(reservation)}>
                    Confirmer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default ProfileScreen;
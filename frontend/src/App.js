import React from 'react';
import { withCookies, useCookies } from 'react-cookie';
import {BrowserRouter,Route,Link} from 'react-router-dom';
import './index.css';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import ResultScreen from './screens/ResultScreen';
import MedicamentScreen from './screens/MedicamentScreen';
import PanierScreen from './screens/PanierScreen';
import ScreenSignin from './screens/ScreenSignin';
import ScreenRegister from './screens/ScreenRegister';
import SigninScreenPharm from './screens/SigninScreenPharm';
import SigninScreen from './screens/SigninScreen';
import { useSelector } from 'react-redux';
import RegisterScreen from './screens/RegisterScreen';
import RegisterScreenPharm from './screens/RegisterScreenPharm';
import MedicamentsScreen from './screens/MedicamentsScreen';
import ConfirmScreen from './screens/ConfirmScreen';
import ProfileScreen from './screens/ProfileScreen';
import ReservationScreen from './screens/ReservationScreen';
import ConsultOperationScreen from './screens/ConsultOperationScreen';
import SearchLocalScreen from './screens/SearchLocalScreen';
import ResulLocScreen from './screens/ResulLocScreen';

function App() {
  
  const userSignin = useSelector(state=>state.userSignin);
  const pharmSignin = useSelector(state=>state.pharmSignin);
  const {userInfoSignin} = userSignin ? userSignin : null;
  const {userInfoSigninPharm} = pharmSignin ? pharmSignin : null;
  console.log(userInfoSigninPharm);
  console.log(userInfoSignin);
  const pharmRegister = useSelector(state=>state.pharmRegister);
  const {userInfoPharm} = pharmRegister ? pharmRegister : null;

  const userRegister = useSelector(state=>state.userRegister);
  const {userInfo} = userRegister ? userRegister : null;

  const panier = useSelector(state => state.panier);
  const { panierItems } = panier;
  return (
    <BrowserRouter>
      <div>
        <nav className="navbar navbar-expand-md navbar-light bg-mycolor">
            <div className="brand">
              <Link to="/">Pharmacy<span>Online</span></Link>
            </div>
            <button id="toggler" className="switch-menu navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#menu" aria-controls="menu" aria-expanded="false" aria-label="Toggle navigation">
                &#9776;
            </button>
            <div className="navbar-collapse collapse" id="menu" data-parent="#toggler">
                <ul className="navbar-nav ml-auto">
                  {
                    userInfoPharm ? userInfoPharm  : userInfoSigninPharm
                    ?
                    <div style={{display:"flex"}}>
                        <li className="nav-item">
                          <Link className="nav-link" to="/consult">Consulter</Link>
                        </li>
                        
                        <li className="nav-item">
                            <Link className="nav-link" to="/medicaments">Ajouter</Link>
                        </li>
                    </div>
                    :
                    <div style={{display:"flex"}}>
                        <li className="nav-item">
                          <Link className="nav-link" to="/recherche">Recherche</Link>
                        </li>
                        
                        <li className="nav-item">
                            <Link className="nav-link" to="/panier/:id?">Panier</Link>
                        </li>
                    </div>
                       
                  }
                    
                    {
                      userInfo ? 
                      <li className="nav-item">
                          <Link className="nav-link" to="/profil">{userInfo.nom}</Link>
                          
                      </li>
                      :
                      userInfoSignin ?
                      <li className="nav-item">
                          <Link className="nav-link" to="/profil">{userInfoSignin.nom}</Link>   
                      </li>
                      :
                      userInfoPharm ?
                      <li className="nav-item">
                          <Link className="nav-link" to="/">{userInfoPharm.nom}</Link>   
                      </li>
                      :
                      userInfoSigninPharm ?
                      <li className="nav-item">
                          <Link className="nav-link" to="/">{userInfoSigninPharm.nom}</Link>   
                      </li>
                      :
                      <li className="nav-item">
                        <Link className="nav-link" to="/signin/2">Se connecter</Link>
                      </li>
                    }     
                </ul>
            </div>
        </nav>
        <div className="grid-container">
          <main className="main">
            <Route path="/" exact={true} component={HomeScreen} />
            <Route path="/recherche" exact={true} component={SearchScreen} />
            <Route path="/recherche/resultat/:id?" exact={true} component={ResultScreen} />
            <Route path="/detailmedicament/:id" exact={true} component={MedicamentScreen} />
            <Route path="/medicaments" component={MedicamentsScreen} />
            <Route path="/shipping" component={ConfirmScreen} />
            <Route path="/reservation" component={ReservationScreen} />
            <Route path="/consult" component={ConsultOperationScreen} />
            <Route path="/panier/:id?" component={PanierScreen} />
            <Route path="/signin/1" component={SigninScreen} />
            <Route path="/signin/2" component={SigninScreenPharm} />
            <Route path="/register/1" component={RegisterScreen} />
            <Route path="/register/2" component={RegisterScreenPharm} />
            <Route path="/profil" component={ProfileScreen} />
            <Route path="/rechercheLocal" component={SearchLocalScreen} />
            <Route path="/rechercheLocal/resultat/:id?"  component={ResulLocScreen} />
            {/* 
            <Route path="/registerPharmacie" component={RegisterScreenPharm} /> */}
          </main>
          <footer className="footer">
            PharmacyOnline - Copyright
          </footer>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App ;

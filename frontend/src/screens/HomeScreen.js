import React from 'react';
import {Link} from 'react-router-dom';

function HomeScreen(props){
  
    return <div>
        <div className="section-1">
              <div className="sous-section-1">
                <h2>Bienvenue sur PharmacyOnline</h2>
                <p>Gagnez du temps en effectuant vos opérations en pharmacie à distance.<br/> Tout commence par une recherche.</p>
                <Link className="" to="/recherche"><button>Lancez une recherche</button></Link>
              </div>
            </div>
            <div className="container-fluid section-2">
              <h2>Comment ça marche?</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus et enim cursus, tempor eros id, faucibus velit. Aliquam gravida,
                urna nec gravida tincidunt, nibh lectus elementum nulla, sit amet luctus dolor lacus sed orci. Ut non varius augue, ut cursus turpis
              </p>
              <div className="row">
                <div className="col-md-3">
                  <div className="card">
                    <img src="img/rechercher.png" alt="i-pharmacie-1" className="card-image-top"/>
                    <div className="card-body">
                      <h4 className="card-title">Rechercher</h4>
                      <p className="card-text">
                        Donec pellentesque sem libero, efficitur commodo leo venenatis vitae. Mauris ut sem bibendum purus malesuada interdum.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card">
                    <img src="img/choisir.png" alt="i-pharmacie-1" className="card-image-top"/>
                    <div className="card-body">
                      <h4 className="card-title">Faire un choix</h4>
                      <p className="card-text">
                        Donec pellentesque sem libero, efficitur commodo leo venenatis vitae. Mauris ut sem bibendum purus malesuada interdum.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card">
                    <img src="img/payement.png" alt="i-pharmacie-1" className="card-image-top"/>
                    <div className="card-body"></div>
                      <h4 className="card-title">Payer ou réserver</h4>
                      <p className="card-text">
                        Donec pellentesque sem libero, efficitur commodo leo venenatis vitae. Mauris ut sem bibendum purus malesuada interdum.
                      </p>
                    </div>
                  </div>
                  <div className="col-md-3">
                  <div className="card">
                    <img src="img/retrait.png" alt="i-pharmacie-1" className="card-image-top"/>
                    <div className="card-body">
                      <h4 className="card-title">Retirer</h4>
                      <p className="card-text">
                        Donec pellentesque sem libero, efficitur commodo leo venenatis vitae. Mauris ut sem bibendum purus malesuada interdum.
                      </p>
                    </div>
                  </div>
                </div>
                </div>
                
              </div>
            <div className="container-fluid section-3">
              <h2>Pourquoi nous faire confiance?</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus et enim cursus, tempor eros id, faucibus velit. Aliquam gravida,
                urna nec gravida tincidunt, nibh lectus elementum nulla, sit amet luctus dolor lacus sed orci. Ut non varius augue, ut cursus turpis
              </p>
                <div className="row">
                  <div className="col-md-4">
                    <div className="d-flex flex-row">
                      <i className="fas fa-thumbs-up fa-3x m-2"></i>
                      <div className="d-flex flex-column">
                        <h3 className="m-2">Qualité</h3>
                        <p className="m-2">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus et enim cursus, tempor eros id,
                          faucibus velit. Aliquam gravida, urna nec gravida tincidunt, nibh lectus elementum nulla, sit 
                          amet luctus dolor lacus sed orci. Ut non varius augue, ut cursus turpis.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="d-flex flex-row">
                      <i className="fas fa-user-shield fa-3x m-2"></i>
                      <div className="d-flex flex-column">
                        <h3 className="m-2">Fiabilité</h3>
                        <p className="m-2">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus et enim cursus, tempor eros id,
                          faucibus velit. Aliquam gravida, urna nec gravida tincidunt, nibh lectus elementum nulla, sit 
                          amet luctus dolor lacus sed orci. Ut non varius augue, ut cursus turpis.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="d-flex flex-row">
                      <i className="fas fa-rocket fa-3x m-2"></i>
                      <div className="d-flex flex-column">
                        <h3 className="m-2">Rapidité</h3>
                        <p className="m-2">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus et enim cursus, tempor eros id,
                          faucibus velit. Aliquam gravida, urna nec gravida tincidunt, nibh lectus elementum nulla, sit 
                          amet luctus dolor lacus sed orci. Ut non varius augue, ut cursus turpis.
                        </p>
                      </div>
                    </div>
                  </div>

                </div>

            </div>
    </div>
}
export default HomeScreen;
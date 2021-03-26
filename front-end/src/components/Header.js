import {
  IonButton,
  IonToolbar,
  IonButtons,
  IonTitle,
  IonBadge,
  IonHeader,
  IonIcon,
  IonBackButton,
} from "@ionic/react";

import { 
  hourglassOutline,
} from 'ionicons/icons';

import { useLocation } from 'react-router-dom';
import routes from "./../shared/routes";
import { maxDebt } from './../shared/constants'; 

export default ({ debts, retrieveDebts }) => {
  const location = useLocation();

  console.log(location.pathname);
  let title = '';
  let backBtn = true; 
  switch (location.pathname) {
    case routes.habits: title = 'UnHabit'; backBtn = false; break;
    case routes.roulette: title = 'Рулетка'; break; 
    case routes.newHabit: title = 'Новая Привычка'; break;
    case routes.debt: title = 'Долги'; break;
  }

  return (
    <IonHeader>
      <IonToolbar>
        {
          backBtn ? 
            <IonButtons slot="start">
              <IonBackButton defaultHref={routes.habits} />
            </IonButtons>
          : <></>
        }
        <IonTitle>{title}</IonTitle>
        <IonButtons slot="end">
          <IonButton routerLink={routes.debt}>
            <IonIcon icon={hourglassOutline} style={{marginRight: '0.4rem'}} />
            <IonBadge color={ debts.length >= maxDebt ? "danger" : "primary" } style={{position: 'absolute', right: '-0.3rem', top: '-0.05rem'}}>{debts.length}</IonBadge>
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  )
}
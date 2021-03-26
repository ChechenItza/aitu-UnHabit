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
  import routes from "./../../../shared/routes";
  
  export default ({ debts, retrieveDebts, saveNewHabit }) => {
    const location = useLocation();
  
    console.log(location.pathname);
    let title = '';
    let backBtn = true; 
    switch (location.pathname) {
      case routes.habits: title = 'Unhabit'; backBtn = false; break;
      case routes.roulette: title = 'Рулетка'; break; 
      case routes.newHabit: title = 'Новая Привычка'; break;
      case routes.debt: title = 'Долги'; break;
    }
  
    return (
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref={routes.habits} />
          </IonButtons>
          <IonTitle>{title}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={saveNewHabit}>
              Создать
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
    )
  }
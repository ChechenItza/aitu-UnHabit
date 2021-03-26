import { useEffect, useRef, useState } from "react";
import {
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonPage,
  IonAlert,
  IonText,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import { 
  time,
} from 'ionicons/icons';

import Header from './../../components/Header';
import { removeDebt } from './../../shared/api';

export default ({ debts, retrieveDebts, aituId }) => {
  const [showDoneAlert, setShowDoneAlert] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(0);

  const onDone = async () => {
    try {
      setShowDoneAlert(false);
      await removeDebt(aituId, debts[selectedIdx].id);
      retrieveDebts();
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <IonPage>
      <Header debts={debts} retrieveDebts={retrieveDebts} />
      <IonContent>
      <IonGrid>
        <IonRow>        
          {debts.map((debt, index) => {
            return (
              <IonCol size="6">
                <IonCard key={index} button onClick={() => { setSelectedIdx(index); setShowDoneAlert(true) }}>
                  <IonCardHeader>
                    <IonCardSubtitle><IonIcon icon={time} /> {new Date(debt.date).toDateString()}</IonCardSubtitle>
                    <IonCardTitle>{debt.action.name}</IonCardTitle>
                  </IonCardHeader>

                  <IonCardContent>{`Добавлено из-за '${debt.deck.name}'`}</IonCardContent>
                </IonCard>
              </IonCol>
            )
          })}
          </IonRow>
        </IonGrid>
        <IonAlert
          isOpen={showDoneAlert}
          onDidDismiss={() => setShowDoneAlert(false)}
          header={`Подтверждение`}
          message={`Вы выполнили это действие?`}
          buttons={[
            'Еще нет',
            {
              text: 'Да',
              handler: onDone
            }
          ]}
        />
      </IonContent>
    </IonPage>
  )
}

const defaultDebt = [
  {
    name: '10 приседаний',
    shortName: '10 при...',
  },
  {
    name: '10 отжиманий',
    shortName: '10 отжим...',
  },
  {
    name: 'Выкурить 1 сигарету',
    shortName: 'Мостик...',
  },
  {
    name: 'Леденец',
    shortName: 'Леден...',
  },
]
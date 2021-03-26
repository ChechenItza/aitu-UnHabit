import { useEffect, useRef, useState } from "react";
import {
  IonContent,
  IonButton,
  IonList,
  IonItem,
  IonIcon,
  IonPage,
  IonItemDivider,
  IonInput,
  IonItemGroup,
} from "@ionic/react";
import { 
  addCircle
} from 'ionicons/icons';

import Header from './components/NewHabHeader';
import routes from './../../shared/routes';
import { addDeck } from './../../shared/api'; 

export default ({ debts, retrieveDebts, history, aituId, retrieveDecks }) => {
  const [badAction, setBadAction] = useState('');
  const [goodActions, setGoodActions] = useState(['']);

  const saveNewHabit = async () => {
    const actions = goodActions.map(action => ({ name: action }));
    actions.push({ name: badAction, bad: true });

    const newHabit = { name: badAction, actions };

    try {
      await addDeck(aituId, newHabit);
      retrieveDecks();
      history.push(routes.habits);
    } catch (e) {
      console.log(e);
    }
  }

  const onActionChange = (newAction, i) => {
    setGoodActions(goodActions.map((action, index) => i !== index ? action : newAction))
  }

  return (
    <IonPage>
      <Header debts={debts} retrieveDebts={retrieveDebts} saveNewHabit={saveNewHabit} />
      <IonContent>
        <IonList >
          <IonItemGroup>
            <IonItemDivider>Ваша вредная привычка</IonItemDivider>
            <IonItem>
              <IonInput value={badAction} placeholder={`"Покурить", "Поесть фастфуд", и т.д.`} onIonChange={e => setBadAction(e.detail.value)}></IonInput>
            </IonItem>
          </IonItemGroup>
          <IonItemGroup>
            <IonItemDivider>Полезные Действия</IonItemDivider>
            {goodActions.map((action, index) => (
              <IonItem>
                <IonInput value={action} placeholder={`"10 отжиманий", "Прогуляться", и т.д.`} onIonChange={e => onActionChange(e.detail.value, index)}></IonInput>
              </IonItem>
            ))}
          </IonItemGroup>
          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <IonButton slot="end" fill="clear" onClick={() => setGoodActions([...goodActions, ''])}>
              <IonIcon icon={addCircle} size="large"/>
            </IonButton>
          </div>
        </IonList>
      </IonContent>
    </IonPage>
  )
}

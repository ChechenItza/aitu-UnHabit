import { useEffect, useRef, useState } from "react";
import {
  IonApp,
  IonSlides,
  IonSlide,
  IonContent,
  IonButton,
  IonText,
  IonList,
  IonItem,
  IonLabel,
  IonItemOptions,
  IonItemOption, 
  IonItemSliding,
  IonFab,
  IonFabButton,
  IonIcon,
  IonPage,
  IonListHeader,
} from "@ionic/react";
import { 
  add,
  ellipsisVertical,
  archive
} from 'ionicons/icons';

import styled from 'styled-components';

import Header from './../../components/Header';
import routes from './../../shared/routes';
import { getDecks, archiveDeck } from './../../shared/api'; 

export default ({ debts, retrieveDebts, setDeck, history, aituId, decks, retrieveDecks }) => {
  const chooseDeck = (index) => {
    setDeck(decks[index]);
    //change page to wheel
    history.push(routes.roulette);
  }

  const removeDeck = async (index) => {
    await archiveDeck(aituId, decks[index].id);
    await document.querySelector("ion-item-sliding").closeOpened();
    retrieveDecks();
  }

  return (
    <IonPage>
      <Header debts={debts} retrieveDebts={retrieveDebts} />
      <IonContent>
        <IonList inset="true" >
          <IonListHeader>
            <IonLabel>{decks.length === 0 ? "Нажмите на кнопку снизу чтобы начать!" : "Ваши вредные привычки"}</IonLabel>
          </IonListHeader>
          {decks.map((deck, index) => {
            return (
              <IonItemSliding>
                <IonItem key={index} button onClick={() => chooseDeck(index)}>
                  <IonLabel>
                    {deck.name}
                    <p></p>
                  </IonLabel>
                </IonItem>
                <IonItemOptions onClick={(e) => removeDeck(index)}>
                  <IonItemOption color="danger">
                    <IonIcon slot="top" icon={archive} />
                  </IonItemOption>
                </IonItemOptions>
              </IonItemSliding>
            )
          })}
        </IonList>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton routerLink={routes.newHabit}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  )
}

const defaultDecks = [
  {
    id: 's',
    name: 'Курение',
    actions: [
      {
        name: 'Выкурить сигарету',
        bad: true, 
      },
      {
        name: '10 приседаний',
      },
      {
        name: '10 отжиманий',
      },
      {
        name: 'Мостик, 10 секунд',
      },
      {
        name: 'Леденец',
      },
    ]
  },
  {
    id: 'ss',
    name: 'Заказывать доставку',
    actions: [
      {
        name: 'Заказать доставку',
        bad: true, 
      },
      {
        name: '10 приседаний',
      },
      {
        name: '10 отжиманий',
      },
      {
        name: 'Мостик, 10 секунд',
      },
      {
        name: 'Леденец',
      },
    ]
},
]
import { useEffect, useRef, useState } from "react";
import {
  IonApp,
  IonSlides,
  IonSlide,
  IonContent,
  IonButton,
  IonText,
  IonPage,
  IonAlert,
} from "@ionic/react";

import Header from './../../components/Header';
import { addDebt } from './../../shared/api';
import { maxDebt } from './../../shared/constants'; 
import routes from './../../shared/routes';

import { Wheel } from 'react-custom-roulette'

import styled from 'styled-components';

const FlexRoot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
` 

export default ({ debts, retrieveDebts, history, deck, aituId, aituBridge }) => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [showGoodAlert, setShowGoodAlert] = useState(false);
  const [showBadAlert, setShowBadAlert] = useState(false);

  const data = mapDeck(deck);

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * data.length)
    setPrizeNumber(newPrizeNumber)
    setMustSpin(true)
  }

  const onStopSpinning = async () => {
    setMustSpin(false);

    if (aituBridge.isSupported()) {
      await aituBridge.vibrate([300]);
    }

    if (deck.actions[prizeNumber].bad) {
      setShowBadAlert(true);
    } else {
      setShowGoodAlert(true);
      await addDebt(aituId, deck.id, deck.actions[prizeNumber]._id);
      retrieveDebts();
    }
  }

  return (
    <IonPage>
      <Header debts={debts} retrieveDebts={retrieveDebts} />
      <IonContent>
        <FlexRoot>
          <Wheel
            mustStartSpinning={mustSpin}
            prizeNumber={prizeNumber}
            data={data}
            onStopSpinning={onStopSpinning}
            innerRadius={10}
            outerBorderWidth={3}
            outerBorderColor={"#eeeeee"}
            innerBorderColor={"#eeeeee"}
            radiusLineColor={"#eeeeee"}
            radiusLineWidth={3}
          />
          <IonButton disabled={mustSpin || showGoodAlert || showBadAlert} onClick={handleSpinClick} style={{marginTop: '3rem'}}>
            {'Вращать!'}
          </IonButton>
          <IonAlert
            isOpen={showGoodAlert}
            onDidDismiss={() => setShowGoodAlert(false)}
            header={`'${deck.actions[prizeNumber].name}'`}
            message={`Это действие было добавлено в список долгов. Вы можете выполнить его сейчас или позже.`}
            buttons={['Хорошо']}
          />
          <IonAlert
            isOpen={showBadAlert}
            onDidDismiss={() => setShowBadAlert(false)}
            header={`'${deck.actions[prizeNumber].name}'`}
            message={`Вам попалась вредная привычка. Это действие не будет добавлено в долги, поэтому выполните его сейчас.`}
            buttons={['Хорошо']}
          />
          <IonAlert
            isOpen={debts.length >= maxDebt}
            onDidDismiss={() => history.goBack()}
            header={'Слишком много долгов'}
            message={`Разрешено иметь только ${maxDebt} долга. Выполните действия из списка долгов, чтобы продолжить.`}
            buttons={['Хорошо']}
          />
        </FlexRoot>
      </IonContent>
    </IonPage>
  )
}

const defaultData = [
  { option: '0', style: { backgroundColor: '#00e676', textColor: 'black' } },
  { option: '1', style: { backgroundColor: 'white' } },
  { option: '2' },
  { option: 'YOooooooooooooooooooooooooooooooooooooo' }
]

const mapDeck = (deck) => {
  const data = deck.actions.map((item, index) => {
    return { 
      option: item.name, 
      style: { 
        backgroundColor: `${item.bad ? '#f44336' : '#4caf50'}`, 
        textColor: 'white' 
      }
    }
  });

  return data;
}
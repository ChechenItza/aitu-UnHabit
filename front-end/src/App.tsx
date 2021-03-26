import { useEffect, useRef, useState } from "react";
import aituBridge from "@btsd/aitu-bridge";
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonRouterOutlet,
} from "@ionic/react";
import { IonReactRouter } from '@ionic/react-router';

import "./App.css";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

import routes from './shared/routes';
import Header from './components/Header';
import HabitsPage from './pages/Habits/HabitsPage';
import RoulettePage from './pages/Roulette/RoulettePage';
import DebtPage from './pages/Debt/DebtPage';
import NewHabitPage from './pages/NewHabit/NewHabitPage';

import { getDebts, getDecks } from './shared/api';

const App: React.FC = () => {
  const [deck, setDeck] = useState({});
  const [debts, setDebts] = useState([]);
  const [aituId, setAituId] = useState('testId');
  const [decks, setDecks] = useState([]);

  const retrieveDecks = async () => {
    try {
      const newDecks = await getDecks(aituId);
      setDecks(newDecks);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    retrieveDecks();
  }, [aituId]);

  async function getMe() {
    try {
      const data = await aituBridge.getMe();
      console.log(data.id);
      setAituId(data.id);
    } catch (e) {
      // handle error
      console.log(e);
    }
  }

  async function retrieveDebts() {
    try {
      const newDebts = await getDebts(aituId);
      console.log(newDebts);
      setDebts(newDebts);
    } catch (e) {
      // handle error
      console.log(e);
    }
  }

  useEffect(() => {
    if (aituBridge.isSupported()) {
      getMe();
    }
  }, []);

  useEffect(() => {
    retrieveDebts();
  }, [aituId])

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path={routes.habits} render={props => <HabitsPage retrieveDecks={retrieveDecks} decks={decks} debts={debts} retrieveDebts={retrieveDebts} aituId={aituId} setDeck={setDeck} {...props} />} />
          <Route path={routes.roulette} render={props => <RoulettePage aituBridge={aituBridge} debts={debts} retrieveDebts={retrieveDebts} aituId={aituId} deck={deck} {...props} />} />
          <Route path={routes.debt} render={props => <DebtPage debts={debts} retrieveDebts={retrieveDebts} aituId={aituId} {...props} />} />
          <Route path={routes.newHabit} render={props => <NewHabitPage retrieveDecks={retrieveDecks} debts={debts} retrieveDebts={retrieveDebts} aituId={aituId} {...props} />} />
          <Route exact path="/" render={() => <Redirect to={routes.habits} />} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;

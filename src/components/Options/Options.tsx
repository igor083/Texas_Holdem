import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MainState } from "../../store/main";
import { mainActions } from "../../store/main";
import { pokerActions } from "../../store/poker";

import GearIcon from "../../assets/GearIcon";
import Button from "../UI/Button/Button";

import styles from "./Options.module.scss";

const Options = () => {
  const dispatch = useDispatch();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { amountOfPlayers, speed, initialBalance } = useSelector((state: { main: MainState }) => state.main);

  const submitHandler = (e: any) => {
    e.preventDefault();
    const [amountOfPlayers, initialBalance, speed] = e.target;

    dispatch(
      mainActions.changeOptions({
        amountOfPlayers: +amountOfPlayers.value,
        initialBalance: +initialBalance.value,
        speed: +speed.value,
      })
    );

    setIsMenuOpen(false);
    dispatch(pokerActions.restartGame());
  };

  return (
    <div className={styles.options}>
      <button onClick={() => setIsMenuOpen((prevState) => !prevState)}>
        <img src={`${process.env.PUBLIC_URL}/assets/settings.png`} alt="configurações icone" />
      </button>
      {isMenuOpen && (
        <form onSubmit={submitHandler}>
          <div>
            <label htmlFor="players">Qtd. de players</label>
            <input type="number" id="players" defaultValue={amountOfPlayers} min={4} max={8} />
          </div>
          <div>
            <label htmlFor="balance">Dinheiro inicial</label>
            <input type="number" id="balance" defaultValue={initialBalance} min={100} max={2500} step={50} />
          </div>
          <div>
            <label htmlFor="speed">Velocidade</label>
            <input type="number" id="speed" defaultValue={speed} min={200} max={5000} step={100} />
          </div>
          <Button text="Reiniciar"></Button>
        </form>
      )}
    </div>
  );
};

export default Options;

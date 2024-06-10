import React, { useState } from 'react';
import styles from "@/styles/Dice.module.css";

const DiceGame = () => {
  const [betAmount, setBetAmount] = useState('');
  const [winRange, setWinRange] = useState(50);
  const [result, setResult] = useState("");

  const rollDice = () => {
    const diceRoll = Math.floor(Math.random() * 100) + 1;
    if (diceRoll <= winRange) {
      setResult(`Gagné! Le dé a roulé: ${diceRoll}`);
    } else {
      setResult(`Perdu! Le dé a roulé: ${diceRoll}`);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Jeu de Dice</h1>
      <div className={styles.inputContainer}>
        <label className={styles.label}>Montant du pari:</label>
        <input
          type="number"
          value={betAmount}
          onChange={(e) => setBetAmount(e.target.value)}
          className={styles.input}
        />
      </div>
      <div className={styles.sliderContainer}>
        <label className={styles.label}>Intervalle de victoire: {winRange}%</label>
        <input
          type="range"
          min="1"
          max="100"
          value={winRange}
          onChange={(e) => setWinRange(Number(e.target.value))}
          className={styles.slider}
        />
      </div>
      <button onClick={rollDice} className={styles.button}>Lancer le dé</button>
      {result && <div className={styles.result}>{result}</div>}
    </div>
  );
};

export default DiceGame;

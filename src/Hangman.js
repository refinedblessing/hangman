import React, { Component } from 'react';
import './Hangman.css';
import img0 from './0.jpg';
import img1 from './1.jpg';
import img2 from './2.jpg';
import img3 from './3.jpg';
import img4 from './4.jpg';
import img5 from './5.jpg';
import img6 from './6.jpg';

class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6],
  };

  constructor(props) {
    super(props);
    this.state = {
      gameWon: false,
      gameOver: false,
      nWrong: 0,
      guessed: new Set(),
      answer: 'apple',
    };
    this.handleGuess = this.handleGuess.bind(this);
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
    const { answer, guessed, gameOver } = this.state;
    return answer.split('').map((ltr) => (
      (guessed.has(ltr) || gameOver) ? ltr : '_'
    ));
  }

  /** handleGuess: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(e) {
    const char = e.target.value;
    this.setState((oldState) => {
      const { guessed, nWrong, answer } = oldState;
      const newGuessed = guessed.add(char)
      // check if all answers have been provided
      const gameWon = answer.split('').every((char) => guessed.has(char));
  
      const newNWrong = nWrong + (answer.includes(char) ? 0 : 1);
      const gameOver = newNWrong === this.props.maxWrong;
      return {
        guessed: newGuessed,
        nWrong: newNWrong,
        gameOver,
        gameWon,
      };
    });
  }

  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    return 'abcdefghijklmnopqrstuvwxyz'.split('').map((char) => (
      <button
        key={char}
        value={char}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(char)}
      >
        {char}
      </button>
    ));
  }

  /** render: render game */
  render() {
    const { nWrong, gameOver, gameWon } = this.state;
    return (
      <div className="Hangman">
        <h1>Hangman</h1>
        {!gameOver && !gameWon && (
          <img
            alt={`${nWrong} wrong guesses`}
            src={this.props.images[nWrong]}
          />
        )}
        <p>
          You have {nWrong} wrong {nWrong !== 1 ? 'guesses' : 'guess'}
        </p>
        <p className="Hangman-word">{this.guessedWord()}</p>
        {(gameOver && !gameWon) && <p>You Lost!!! <span aria-label='loser' role='img'>🤪</span></p>}
        {gameWon && <p>You Won <span aria-label='gameWon' role='img'>🏆</span></p>}
        {(!gameOver && !gameWon) && <p className="Hangman-btns">{this.generateButtons()}</p>}
      </div>
    );
  }
}

export default Hangman;

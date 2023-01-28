import React, { Component } from 'react';
import './Hangman.css';
import img0 from './0.jpg';
import img1 from './1.jpg';
import img2 from './2.jpg';
import img3 from './3.jpg';
import img4 from './4.jpg';
import img5 from './5.jpg';
import img6 from './6.jpg';
import { randomWord } from './words';
import AlphaButtons from './AlphaButtons'

class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6],
  };

  constructor(props) {
    super(props);
    this.state = {
      answer: randomWord(),
      gameWon: false,
      gameOver: false,
      nWrong: 0,
      guessed: new Set(),
    };
    this.handleGuess = this.handleGuess.bind(this);
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
    const { guessed, answer } = this.state;
    return answer.split('').map((ltr) => (guessed.has(ltr) ? ltr : '_'));
  }

  /** handleGuess: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(e) {
    const char = e.target.value;
    this.setState((oldState) => {
      const { guessed, nWrong, answer } = oldState;
      const newGuessed = guessed.add(char);
      // check if all chars have been provided
      const gameWon = this.guessedWord().join('') === answer;

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

  handleRestart = () => {
    this.setState({
      answer: randomWord(),
      gameWon: false,
      gameOver: false,
      nWrong: 0,
      guessed: new Set(),
    });
  };

  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    const chars = 'abcdefghijklmnopqrstuvwxyz';
    return <AlphaButtons guessed={this.state.guessed} chars={chars} handleGuess={this.handleGuess}/>
  }

  /** render: render game */
  render() {
    const { nWrong, gameOver, gameWon, answer } = this.state;
    return (
      <div className="Hangman">
        <h1>Hangman</h1>
        {!gameOver && !gameWon && (
          <img
            alt={`${nWrong}/${this.props.maxWrong} wrong guesses`}
            src={this.props.images[nWrong]}
          />
        )}
        <div className='restart-container'>
          <p>
            You have {nWrong} wrong {nWrong !== 1 ? 'guesses' : 'guess'}!
          </p>
          <button className="restart" onClick={this.handleRestart}>
            Restart
          </button>
        </div>
        <p className="Hangman-word">{gameOver ? answer : this.guessedWord()}</p>
        {gameOver && !gameWon && (
          <p>
            You Lost!!!{' '}
            <span aria-label="loser" role="img">
              🤪
            </span>
          </p>
        )}
        {gameWon && (
          <p>
            You Won{' '}
            <span aria-label="gameWon" role="img">
              🏆
            </span>
          </p>
        )}
        {!gameOver && !gameWon && (
          <p className="Hangman-btns">{this.generateButtons()}</p>
        )}
      </div>
    );
  }
}

export default Hangman;

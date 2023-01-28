import React, { Component } from 'react';

class AlphaButtons extends Component {
  render() {
    const { chars, handleGuess, guessed } = this.props;
    return chars.split('').map((char) => (
      <button
        key={char}
        value={char}
        onClick={handleGuess}
        disabled={guessed.has(char)}
      >
        {char}
      </button>
    ));
  }
}

export default AlphaButtons

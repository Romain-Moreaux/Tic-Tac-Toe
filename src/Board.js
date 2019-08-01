import React, { Component } from "react";

class Board extends Component {
  state = {
    case11: null,
    case12: null,
    case13: null,
    case21: null,
    case22: null,
    case23: null,
    case31: null,
    case32: null,
    case33: null,
    turn: 1,
    winner: null,
    player: "o"
  };

  check4Winner() {
    let winner;
    // check rows
    [
      ["case11", "case12", "case13"],
      ["case21", "case22", "case23"],
      ["case31", "case32", "case33"]
    ].forEach(row => {
      let sum = "";
      row.forEach(element => {
        sum += this.state[element];
      });
      if (sum === "xxx") winner = "X";
      else if (sum === "ooo") winner = "O";
    });

    // check columns
    [
      ["case11", "case21", "case31"],
      ["case12", "case22", "case32"],
      ["case13", "case23", "case33"]
    ].forEach(column => {
      let sum = "";
      column.forEach(element => {
        sum += this.state[element];
      });

      if (sum === "xxx") winner = "X a gagné";
      else if (sum === "ooo") winner = "O a gagné";
    });

    // check diagonals
    [["case11", "case22", "case33"], ["case31", "case22", "case13"]].forEach(
      diagonal => {
        let sum = "";
        diagonal.forEach(element => {
          sum += this.state[element];
        });

        if (sum === "xxx") winner = "X a gagné";
        else if (sum === "ooo") winner = "O a gagné";
      }
    );

    return winner;
  }

  board() {
    const cells = [
      "case11",
      "case12",
      "case13",
      "case21",
      "case22",
      "case23",
      "case31",
      "case32",
      "case33"
    ];

    if (!this.state.winner) {
      return cells.map((cell, index) => {
        return (
          <div
            key={index}
            className={
              "cell " + (this.state[cell] === null ? "" : this.state[cell])
            }
            onClick={() => {
              this.setState(
                {
                  [cell]: this.state.player,
                  player: this.state.player === "o" ? "x" : "o"
                },
                () => {
                  let isWinner = this.check4Winner();
                  if (isWinner) this.setState({ winner: isWinner });
                }
              );
              this.setState({ turn: this.state.turn + 1 });
            }}
          >
            {cell}
          </div>
        );
      });
    } else if (this.state.turn >= 9) {
      return <span className="winner">This is a draw game !</span>;
    } else {
      return <span className="winner">winner is {this.state.winner}.</span>;
    }
  }
  render() {
    return (
      <React.Fragment>
        <div className="player">
          c'est au joueur <span>{this.state.player}</span>
        </div>
        <div className="Board">{this.board()}</div>
      </React.Fragment>
    );
  }
}
export default Board;

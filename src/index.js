import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    return (
        <button className="square" onClick={ props.onClick } >
            {props.value}
        </button>
    );
}

function NewGame(props) {
    return (
        <button className="reset" onClick={ props.onClick } >
            New Game
        </button>
    );
}
  
class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square
                value = { this.props.squares[i] }
                onClick = { () => this.props.onClick(i) }
            />
        );
    }

    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}
  
class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null)
            }],
            xIsNext: true
        }
    }

    reset() {
        this.setState ({
            history: [{
                squares: Array(9).fill(null)
            }],
            xIsNext: true
        });
    }

    handleClick(i) {
        const history = this.state.history;
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (this.calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState ({
            history: history.concat([{
                squares: squares
            }]),
            xIsNext: !this.state.xIsNext
        });
    }

    renderNewGame(winner) {
        if (winner) {
            return (
                <NewGame
                    onClick = { () => this.reset() }
                />
            );
        } else {
            return null;
        }
    }
  
    calculateWinner(squares) {
        const lines = [
            [0, 1, 2],  // horizontal
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],  // vertical
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],  // diagonal
            [2, 4, 6]
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && 
                squares[a] === squares[b] &&
                squares[a] === squares[c]) {
                    return squares[a];
                }
        }
        return null;
    }
    
    render() {
        const history = this.state.history;
        const current = history[history.length - 1];
        const winner = this.calculateWinner(current.squares);
        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board 
                        squares = { current.squares }
                        onClick = { (i) => this.handleClick(i)}
                    />
                    <div>
                        {this.renderNewGame(winner)}
                    </div>
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);

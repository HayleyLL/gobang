import React, {Component} from "react";
import Drawer from "../utils/draw";
import Cookies from "js-cookies/src/cookies";

class ChessBoard extends Component {
    constructor(props) {
        super(props);
        this.drawer = new Drawer(this.props.meta);
        this.boardRef = React.createRef();
        this.chessDropRef = React.createRef();
        this.movCvsRef = React.createRef();
        this.feedBRef = React.createRef();
        this.playerId = Cookies.getItem("playerId");
        this.state={
            feedback:null
        }
    }

    handleMouseMove = (e) => {
        const movCvs = this.movCvsRef.current;
        const{drawer}=this;
        const { blackHolder} = this.props.roomInfo;
        const mousePos = drawer.calcMouseCoords(movCvs, e);
        const {x, y} = mousePos;
        const role = blackHolder === this.playerId ? "black" : "white";
        const isMoveEligible = this.props.isMoveEligible();
        if (isMoveEligible && drawer.isMouseWithinBoard(x, y)) {
            drawer.movChess(movCvs, x, y, role);
        } else {
            drawer.clearChess(movCvs);
        }
    };


    feedBackOnWin = (winner) => {
        const feedBackArea = this.feedBRef.current;
        const feedback = (
            <span className="win-feedback-content"> {`${winner}胜！`}</span>
        );
        this.setState({feedback});
        feedBackArea.className = "win-feedback";
    };

    refreshChessOnBoard = () => {
        const {chessData, winner} = this.props.roomInfo;
        const chessDropCvs = this.chessDropRef.current;
        this.drawer.clearChess(chessDropCvs);
        this.drawer.drawAllChess(chessData, chessDropCvs);

        if (winner) {
            this.feedBackOnWin(winner);
        }

    }

    componentDidUpdate(prevProps) {
        if (this.props.roomInfo !== prevProps.roomInfo) {
                this.refreshChessOnBoard();
        }
    }

    componentDidMount() {
        this.drawer.drawBoard(this.boardRef.current);
    }

    render() {
        const size = this.drawer.size;
        const movCvs = this.movCvsRef.current;
        const chessDropRef=this.chessDropRef.current;

        return (
            <div style={this.props.style}>
                <div
                    className="game-drawer"
                    style={{position: "relative", width: size, height: size}}
                >
                    <div
                        className="feedback"
                        ref={this.feedBRef}
                    >
                        {this.state.feedback}
                    </div>
                    <canvas id="drawer" ref={this.boardRef} width={size} height={size}>
                        您的浏览器版本过低，请升级游览器！
                    </canvas>
                    <canvas
                        id="chess-dropping"
                        ref={this.chessDropRef}
                        width={size}
                        height={size}
                        style={{position: "absolute", top: 0, left: 0, zIndex: 1}}
                    />
                    <canvas
                        id="chess-moving"
                        ref={this.movCvsRef}
                        width={size}
                        height={size}
                        style={{position: "absolute", top: 0, left: 0, zIndex: 2}}
                        onClick={(e)=>this.props.handleCvsClick(e,movCvs,chessDropRef)}
                        onMouseMove={this.handleMouseMove}
                    />
                </div>
            </div>
        );
    }
}

export default ChessBoard;

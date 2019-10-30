import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import BattlePiece from "./BattlePiece";
import { BATTLE_POPUP_IMAGES } from "../styleConstants";
import { battlePopupMinimize, battlePieceClick, targetPieceClick, enemyBattlePieceClick, confirmBattleSelections, clearOldBattle} from "../../redux/actions";

const battlePopupStyle = {
	position: "absolute",
	display: "block",
	width: "80%",
	height: "80%",
	top: "10%",
	right: "10%",
	backgroundColor: "white",
	border: "2px solid black",
	zIndex: 4
};

const battlePopupMinimizeStyle = {
	position: "absolute",
	display: "block",
	width: "7%",
	height: "12%",
	top: "50%",
	right: "98%",
	backgroundColor: "white",
	border: "2px solid black",
	zIndex: 4,
	backgroundImage: BATTLE_POPUP_IMAGES.minIcon,
	backgroundPosition: "center",
	backgroundSize: "cover"
}

const leftBattleStyle = {
	position: "relative",
	overflow: "scroll",
	float: "left",
	backgroundColor: "grey",
	height: "96%",
	width: "48%",
	margin: "1%"
};

const rightBattleStyle = {
	position: "relative",
	overflow: "scroll",
	backgroundColor: "grey",
	height: "96%",
	width: "48%",
	float: "right",
	margin: "1%"
};

const battleButtonStyle = {
	position: "absolute",
	bottom: "-7%",
	right: "2%"
};

const battlePopupMinimizeButtonStyle = {
	position: "absolute",
	top: "-5%",
	right: "0%",
	margin: "0%"
}

const invisibleStyle = {
	display: "none"
};

class BattlePopup extends Component {
	render() {
		const { battlePieceClick, enemyBattlePieceClick, targetPieceClick, confirmBattleSelections, battle, clearOldBattle, battlePopupMinimize} = this.props;
		const { selectedBattlePiece, friendlyPieces, enemyPieces } = battle;

		const friendlyBattlePieces = friendlyPieces.map((battlePiece, index) => (
			<BattlePiece
				isFriendly={true} //indicates left side battle piece functionality
				battlePieceClick={battlePieceClick}
				targetPieceClick={targetPieceClick}
				enemyBattlePieceClick={enemyBattlePieceClick}
				isSelected={battlePiece.piece.pieceId === selectedBattlePiece}
				key={index}
				battlePiece={battlePiece}
				battlePieceIndex={index}
			/>
		));

		const enemyBattlePieces = enemyPieces.map((battlePiece, index) => (
			<BattlePiece
				isFriendly={false} //indicates right side battle piece functionality
				battlePieceClick={battlePieceClick}
				targetPieceClick={targetPieceClick}
				enemyBattlePieceClick={enemyBattlePieceClick}
				isSelected={false} //never selected
				key={index}
				battlePiece={battlePiece}
				battlePieceIndex={index}
			/>
		));

		return (
			<div>
				<div style={battle.active && !battle.isMinimized ? battlePopupStyle : invisibleStyle}>
					<div style={leftBattleStyle}>Friend{friendlyBattlePieces}</div>
					<div style={rightBattleStyle}>Foe{enemyBattlePieces}</div>
					<button
						onClick={event => {
							event.preventDefault();
							if (battle.masterRecord != null) {
								clearOldBattle();
							} else {
								confirmBattleSelections();
							}
							event.stopPropagation();
						}}
						style={battleButtonStyle}
					>
						{battle.masterRecord == null ? "Confirm Selections" : "ack"}
					</button>
					<button
						onClick={event => {
							event.preventDefault();
							battlePopupMinimize();
							event.stopPropagation();
						}}
						style={battlePopupMinimizeButtonStyle}
					>
						{"Minimize"}
					</button>
				</div>
				<div style={battle.active && battle.isMinimized ? battlePopupMinimizeStyle : invisibleStyle}>
					<button
						onClick={event => {
							event.preventDefault();
							battlePopupMinimize();
							event.stopPropagation();
						}}
						style={battlePopupMinimizeButtonStyle}
					>
						{"Restore"}
					</button>
				</div>
			</div>
		);
	}
}

BattlePopup.propTypes = {
	battle: PropTypes.object.isRequired,
	battlePieceClick: PropTypes.func.isRequired,
	enemyBattlePieceClick: PropTypes.func.isRequired,
	targetPieceClick: PropTypes.func.isRequired,
	confirmBattleSelections: PropTypes.func.isRequired,
	clearOldBattle: PropTypes.func.isRequired,
	battlePopupMinimize: PropTypes.func.isRequired
};

const mapStateToProps = ({ gameboardMeta }) => ({
	battle: gameboardMeta.battle
});

const mapActionsToProps = {
	battlePieceClick,
	enemyBattlePieceClick,
	targetPieceClick,
	confirmBattleSelections,
	clearOldBattle,
	battlePopupMinimize
};

export default connect(
	mapStateToProps,
	mapActionsToProps
)(BattlePopup);

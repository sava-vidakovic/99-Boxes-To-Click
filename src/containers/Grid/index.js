import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './Grid';
import Cell from '../../components/Cell';

class Grid extends Component {

  onCellClick(cell) {
    console.log(cell)
  }

  renderCells() {
    const { grid } = this.props;
    return grid.map((row, index) => {
      return (
        <div className={styles['grid-row']} key={index}>
          {
            row.map(cell => {
              return (
                <Cell key={cell.key} cell={cell} onCellClick={this.onCellClick} />
              )
            })
          }
        </div>
      )
    })
  }
  
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.grid}>
          {this.renderCells()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { 
    grid: state.game.grid
  };
}

export default connect(mapStateToProps, null)(Grid);


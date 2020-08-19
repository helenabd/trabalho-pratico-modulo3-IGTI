import React, { Component } from 'react';
import css from './input.module.css';

export default class InputFullSalary extends Component {
  handleInput = (event) => {
    const newValue = event.target.value;
    this.props.onChange(newValue);
  };

  render() {
    const { title, value } = this.props;

    return (
      <div className={css.flexRow}>
        <span>{title}</span>
        <input
          placeholder="Insira seu salário"
          type="number"
          value={value}
          min={1045}
          max={999999}
          step={25}
          onChange={this.handleInput}
        />
      </div>
    );
  }
}

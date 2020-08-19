import React, { Component } from 'react';
import InputFullSalary from './components/input-salary/InputFullSalary';
import InputReadOnly from './components/input-salary/InputReadOnly';
import {
  formatNumber,
  getPercent,
  formatToBrl,
} from './helpers/formatHelpers.js';
import { calculateSalaryFrom } from './helpers/salary.js';
import ColorBar from './components/input-salary/ColorBar';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      baseINSS: 0,
      discountINSS: 0,
      percentINSS: 0,
      baseIRPF: 0,
      discountIRPF: 0,
      percentIRPF: 0,
      netSalary: 0,
      percentNetSalary: 0,
      bar1: 0,
      bar2: 0,
      bar3: 0,
    };
  }

  handleChangeInput = (newValue) => {
    const finalValue = calculateSalaryFrom(newValue);
    formatNumber(finalValue);

    this.setState({
      baseINSS: formatToBrl(finalValue.baseINSS),
      discountINSS: formatToBrl(finalValue.discountINSS),
      percentINSS: getPercent(finalValue.discountINSS, finalValue.baseINSS),
      baseIRPF: formatToBrl(finalValue.baseIRPF),
      discountIRPF: formatToBrl(finalValue.discountIRPF),
      percentIRPF: getPercent(finalValue.discountIRPF, finalValue.baseINSS),
      netSalary: formatToBrl(finalValue.netSalary),
      percentNetSalary: getPercent(finalValue.netSalary, finalValue.baseINSS),
      bar1: finalValue.discountINSS,
      bar2: finalValue.discountIRPF,
      bar3: finalValue.netSalary,
    });
  };

  render() {
    const {
      baseINSS,
      discountINSS,
      percentINSS,
      baseIRPF,
      discountIRPF,
      percentIRPF,
      netSalary,
      percentNetSalary,
      bar1,
      bar2,
      bar3,
    } = this.state;

    return (
      <div>
        <h1 style={styles.centeredTitle}>React Salary</h1>
        <div>
          <InputFullSalary
            title={'Salário Bruto:'}
            onChange={this.handleChangeInput}
          />
        </div>
        <div>
          <div style={styles.readInput}>
            <InputReadOnly value={baseINSS} title={'Base INSS:'} />

            <InputReadOnly
              color={'#e67e22'}
              value={`${discountINSS} (${
                isNaN(percentINSS) ? 0 : percentINSS
              }%)`}
              title={'Desconto INSS:'}
            />

            <InputReadOnly value={baseIRPF} title={'Base IRPF:'} />

            <InputReadOnly
              color={'#c0392b'}
              value={`${discountIRPF} (${
                isNaN(percentIRPF) ? 0 : percentIRPF
              }%)`}
              title={'Desconto IRPF:'}
            />
          </div>
          <InputReadOnly
            color={'#16a085'}
            value={`${netSalary} (${
              isNaN(percentNetSalary) ? 0 : percentNetSalary
            }%)`}
            title={'Salário Líquido:'}
          />
        </div>

        <div style={styles.bars}>
          <ColorBar value={bar1} color={'#e67e22'} />
          <ColorBar value={bar2} color={'#c0392b'} />
          <ColorBar value={bar3} color={'#16a085'} />
        </div>
      </div>
    );
  }
}

const styles = {
  centeredTitle: {
    textAlign: 'center',
  },
  readInput: {
    display: 'flex',
  },
  bars: {
    display: 'flex',
    flexDirection: 'row',
    padding: '0 70px',
  },
};

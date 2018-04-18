/**
 * Imports
 */
import React from 'react';
import PropTypes from 'prop-types';

// Required components
import Text from '../typography/Text';

/**
 * Component
 */
class Table extends React.Component {
  componentDidMount() {
    // Component styles
    require('./Table.scss');
  }

  // Template
  render() {
    // Headings size
    let headingsSize = 'medium';
    if (['small', 'large'].indexOf(this.props.headingsSize) !== -1) {
      headingsSize = this.props.headingsSize;
    }

    return (
      <div className="table">
        <table className="table__table">
          <thead>
            <tr className="table__row">
              {this.props.headings.map((heading, idx) => {
                return (
                  <th className="table__heading" key={heading.id || idx}>
                    <Text size={headingsSize} weight="bold">{heading}</Text>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="table__body">
            {this.props.rows.map((row, idx) => {
              let rowClass = 'table__row';
              if (['info', 'success', 'warning', 'error'].indexOf(row.highlight) !== -1) {
                rowClass += ` table__row--${row.highlight}`;
              }
              return (
                <tr className={rowClass} key={row.id || idx}>
                  {row.data.map((data, idx) => {
                    return <td className="table__data" key={data.id || data._id || idx}>{data}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

Table.defaultProps = {
  headingsSize: 'medium',
  headings: undefined,
  rows: undefined,
};

Table.propTypes = {
  headingsSize: PropTypes.string,
  headings: PropTypes.any,
  rows: PropTypes.any,
};

/**
 * Exports
 */
export default Table;

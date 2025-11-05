import React, { useState } from 'react';

const SortableTable = ({ data, columns }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const sortedData = [...data];
  if (sortConfig.key) {
    sortedData.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;

      if (typeof aValue === 'string') {
        return sortConfig.direction === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
    });
  }

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIndicator = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'asc' ? ' 🔼' : ' 🔽';
    }
    return ' 🔼';
  };

  return (
    <table className="crypto-table">
      {/* Column widths based on content */}
      <colgroup>
        <col style={{ width: '40px' }} />   
        <col style={{ width: '180px' }} />  
        <col style={{ width: '120px' }} />  
        <col style={{ width: '100px' }} />  
        <col style={{ width: '140px' }} />  
        <col style={{ width: '160px' }} />  
      </colgroup>

      <thead>
        <tr>
          {columns.map((col) => (
            <th
              key={col.key}
              onClick={() => handleSort(col.key)}
              style={{ cursor: 'pointer' }}
            >
              {col.label}
              <span>{getSortIndicator(col.key)}</span>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((item, index) => (
          <tr key={item.id || index}>
            {columns.map((col) => {
              const value = col.key === 'index' ? index + 1 : item[col.key];
              const displayValue = col.format ? col.format(value, item) : value;
              const className =
                col.key === 'price_change_percentage_24h'
                  ? item.price_change_percentage_24h >= 0
                    ? 'positive'
                    : 'negative'
                  : '';
              return (
                <td key={col.key} className={className}>
                  {displayValue}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SortableTable;

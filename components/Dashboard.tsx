import React from 'react';

export default function Dashboard() {
  const statuses: {
    [key in 'num_days' | 'time_remaining' | 'date']: string | number;
  } = {
    num_days: 14,
    time_remaining: '13:14:26',
    date: new Date().toDateString(),
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="grid grid-cols-1 sm:grid-cols-3">
        {(Object.keys(statuses) as Array<keyof typeof statuses>).map(
          (status, index) => {
            return (
              <div key={index}>
                <p>{status}</p>
                <p>{statuses[status]}</p>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}

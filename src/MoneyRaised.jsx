import React from "react";
import "./styles/moneyRaised.css"

function MoneyRaised() {
  const mockData = {
    totalRaised: 2500,
    contributors: [
      { name: "John Doe", amount: 500 },
      { name: "Jane Smith", amount: 1000 },
      { name: "Emily Davis", amount: 1000 },
    ],
  };

  return (
    <div className="money-raised">
      <h2>Total Money Raised</h2>
      <p className="total">${mockData.totalRaised}</p>
      <h3>Contributors</h3>
      <ul>
        {mockData.contributors.map((contributor, index) => (
          <li key={index}>
            {contributor.name} - ${contributor.amount}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MoneyRaised;

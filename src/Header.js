import React from 'react';
import './styles.css';

export default function Header() {
  return (
    <header>
      <div className="header-container">
        <div className="logo">Verif Clone</div>
        <button className="login-button">Login</button>
      </div>
    </header>
  );
}

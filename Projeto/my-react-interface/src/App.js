import React, { useState } from 'react';
import './App.css';
import UserComponent from './userComponent';
import ReminderComponent from './reminderComponent';
import CalendarComponent from './calendarComponent';

function App() {
  const [activeScreen, setActiveScreen] = useState('user');

  const handleMenuClick = (screen) => {
    setActiveScreen(screen);
  };

  return (
    <div className="App">
      <header className="App-header">
        <nav>
          <ul>
            <li
              className={activeScreen === 'user' ? 'active' : ''}
              onClick={() => handleMenuClick('user')}
            >
              Usuários
            </li>
            <li
              className={activeScreen === 'reminder' ? 'active' : ''}
              onClick={() => handleMenuClick('reminder')}
            >
              Lembretes
            </li>
            <li
              className={activeScreen === 'calendar' ? 'active' : ''}
              onClick={() => handleMenuClick('calendar')}
            >
              Calendário
            </li>
          </ul>
        </nav>
        <div className="content">
          {activeScreen === 'user' && <UserComponent />}
          {activeScreen === 'reminder' && <ReminderComponent />}
          {activeScreen === 'calendar' && <CalendarComponent />}
        </div>
      </header>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';

const Timer = () => {
  const [timers, setTimers] = useState([]);
  const [name, setName] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  useEffect(() => {
    const intervals = timers.map(timer => {
      if (timer.isRunning) {
        return setInterval(() => {
          setTimers(prevTimers => 
            prevTimers.map(t => 
              t.id === timer.id 
                ? { ...t, time: t.time + 1 }
                : t
            )
          );
        }, 1000);
      }
      return null;
    });

    return () => intervals.forEach(interval => interval && clearInterval(interval));
  }, [timers]);

  const formatNumber = (number) => {
    return number.toString().padStart(2, '0');
  };

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(seconds)}`;
  };

  const handleStartNewTimer = () => {
    if (name.trim() === '') {
      alert('Please enter your name first');
      return;
    }

    setTimers(prevTimers => {
      const updatedTimers = prevTimers.map(timer => ({ ...timer, isRunning: false }));
      
      const newTimer = {
        id: Date.now(),
        name,
        time: 0,
        isRunning: true,
        startTime: new Date().toLocaleTimeString(),
        date: selectedDate
      };

      return [...updatedTimers, newTimer];
    });
    setName('');
  };

  const toggleTimer = (timerId) => {
    setTimers(prevTimers => 
      prevTimers.map(timer => {
        if (timer.id === timerId) {
          return { ...timer, isRunning: !timer.isRunning };
        }
        return { ...timer, isRunning: false };
      })
    );
  };

  const deleteTimer = (timerId) => {
    setTimers(prevTimers => prevTimers.filter(timer => timer.id !== timerId));
  };

  const filteredTimers = timers.filter(timer => timer.date === selectedDate);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Timer Dashboard</h1>
          <p className="text-xl text-gray-600">{currentDate}</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="w-full md:w-auto">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div className="flex-grow">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={handleStartNewTimer}
              className="w-full md:w-auto px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 whitespace-nowrap"
            >
              Start New Timer
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {filteredTimers.length === 0 ? (
            <div className="bg-white rounded-lg shadow-lg p-6 text-center text-gray-500">
              No timers found for this date
            </div>
          ) : (
            filteredTimers.map((timer) => (
              <div key={timer.id} className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold">{timer.name}</h2>
                    <p className="text-gray-500">Started at: {timer.startTime}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-4xl font-mono">
                      {formatTime(timer.time)}
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => toggleTimer(timer.id)}
                        className={`px-4 py-2 rounded-lg font-semibold ${
                          timer.isRunning
                            ? 'bg-red-500 hover:bg-red-600 text-white'
                            : 'bg-green-500 hover:bg-green-600 text-white'
                        }`}
                      >
                        {timer.isRunning ? 'Stop' : 'Start'}
                      </button>
                      <button
                        onClick={() => deleteTimer(timer.id)}
                        className="px-4 py-2 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Timer; 
import { useState } from 'react';
import './CinemaHall.css'; 

function CinemaHall({ movieId }) {
  const totalSeats = 50;
  const [selectedSeats, setSelectedSeats] = useState([]);

  const toggleSeat = (index) => {
    setSelectedSeats((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="hall-container">
      <div className="cinema-grid">
        {Array.from({ length: totalSeats }, (_, i) => (
          <div
            key={i}
            className={`seat ${selectedSeats.includes(i) ? 'selected' : ''}`}
            onClick={() => toggleSeat(i)}
          ></div>
        ))}
      </div>
      <div className="selected-info">
        Вибрані місця: {selectedSeats.join(', ') || 'немає'}
      </div>
    </div>
  );
}

export default CinemaHall;
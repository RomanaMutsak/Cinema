import { useState } from 'react';
import './CinemaHall.css';

function CinemaHall({ movieId }) {
  const totalSeats = 50;
  const seatsPerRow = 10; 
  const [selectedSeats, setSelectedSeats] = useState([]);

  const toggleSeat = (index) => {
    setSelectedSeats((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const formatSeats = (seats) => {
    const groupedSeats = [];
    let currentGroup = [];

    seats.forEach((seat) => {
      const row = Math.floor(seat / seatsPerRow);
      if (currentGroup.length === 0 || Math.floor(currentGroup[0] / seatsPerRow) === row) {
        currentGroup.push(seat);
      } else {
        groupedSeats.push(currentGroup);
        currentGroup = [seat];
      }
    });

    if (currentGroup.length > 0) {
      groupedSeats.push(currentGroup);
    }

    return groupedSeats.map((group, index) => {
      const row = Math.floor(group[0] / seatsPerRow) + 1;
      const seatNumbers = group.map(seat => (seat % seatsPerRow) + 1).join(', ');
      return `Ряд ${row}: Місце ${seatNumbers}`;
    }).join(' | ');
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
        Вибрані місця: {selectedSeats.length > 0 ? formatSeats(selectedSeats) : 'немає'}
      </div>
    </div>
  );
}

export default CinemaHall;

import { useState, useEffect } from 'react';
import './CinemaHall.css';
import BookingService from '../services/BookingService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CinemaHall({ movieId }) {
  const totalSeats = 50;
  const seatsPerRow = 10;

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const existing = BookingService.getBookedSeats(movieId);
    setBookedSeats(existing);
  }, [movieId]);

  const toggleSeat = (index) => {
    if (bookedSeats.includes(index)) return;
    setSelectedSeats((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Імʼя обовʼязкове';
    if (!formData.phone.trim()) errors.phone = 'Телефон обовʼязковий';
    if (!formData.email.trim()) {
      errors.email = 'Email обовʼязковий';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Некоректний email';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleBooking = () => {
    if (!validateForm()) {
      toast.error('Будь ласка, виправте помилки у формі');
      return;
    }

    BookingService.bookSeats(movieId, selectedSeats);
    toast.success('Бронювання успішне!');
    setBookedSeats((prev) => [...prev, ...selectedSeats]);
    setSelectedSeats([]);
    setFormData({ name: '', phone: '', email: '' });
    setFormErrors({});
  };

  const formatSelectedSeats = () => {
    if (selectedSeats.length === 0) return 'немає';

    const seatsByRow = {};
    selectedSeats.forEach((index) => {
      const row = Math.floor(index / seatsPerRow) + 1;
      const seat = (index % seatsPerRow) + 1;
      if (!seatsByRow[row]) seatsByRow[row] = [];
      seatsByRow[row].push(seat);
    });

    return Object.entries(seatsByRow)
      .map(([row, seats]) => `Ряд ${row}: Місце ${seats.sort((a, b) => a - b).join(', ')}`)
      .join('; ');
  };

  return (
    <div className="hall-container">
      <div className="cinema-grid">
        {Array.from({ length: totalSeats }, (_, i) => (
          <div
            key={i}
            className={`seat 
              ${bookedSeats.includes(i) ? 'booked' : ''} 
              ${selectedSeats.includes(i) ? 'selected' : ''}`}
            onClick={() => toggleSeat(i)}
          ></div>
        ))}
      </div>

      <div className="selected-info">
        Вибрані місця: {formatSelectedSeats()}
      </div>

      {selectedSeats.length > 0 && (
        <div className="booking-form">
          <input
            type="text"
            name="name"
            placeholder="Імʼя"
            value={formData.name}
            onChange={handleInputChange}
          />
          {formErrors.name && <p className="error">{formErrors.name}</p>}

          <input
            type="text"
            name="phone"
            placeholder="Телефон"
            value={formData.phone}
            onChange={handleInputChange}
          />
          {formErrors.phone && <p className="error">{formErrors.phone}</p>}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
          />
          {formErrors.email && <p className="error">{formErrors.email}</p>}

          <button onClick={handleBooking}>Забронювати</button>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}

export default CinemaHall;

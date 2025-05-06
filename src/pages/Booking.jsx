import { useParams } from 'react-router-dom';
import CinemaHall from '../components/CinemaHall';
import './Booking.css';

function Booking() {
  const { id } = useParams();
  return (
    <div className="booking-page">
      <h2 className="booking-title">Бронювання місць</h2>
      <CinemaHall movieId={id} />
    </div>
  );
}

export default Booking;

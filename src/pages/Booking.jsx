import { useParams } from 'react-router-dom';
import CinemaHall from '../components/CinemaHall';

function Booking() {
  const { id } = useParams();
  return (
    <div>
      <h2 style={{ textAlign: 'center', color: '#ff69b4' }}>Бронювання місць</h2>
      <CinemaHall movieId={id} />
    </div>
  );
}

export default Booking;
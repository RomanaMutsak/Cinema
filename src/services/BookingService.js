const BOOKING_KEY = 'bookings';

export const saveBooking = (movieId, userData, selectedSeats) => {
  const current = JSON.parse(localStorage.getItem(BOOKING_KEY)) || {};
  if (!current[movieId]) current[movieId] = [];

  const newBooking = {
    ...userData,
    seats: selectedSeats
  };

  current[movieId].push(newBooking);
  localStorage.setItem(BOOKING_KEY, JSON.stringify(current));
};

export const getBookedSeats = (movieId) => {
  const data = JSON.parse(localStorage.getItem(BOOKING_KEY)) || {};
  const bookings = data[movieId] || [];
  return bookings.flatMap(b => b.seats);
};

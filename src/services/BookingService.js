const BookingService = {
  getBookedSeats: (movieId) => {
    const bookings = JSON.parse(localStorage.getItem('bookings')) || {};
    return bookings[movieId] || [];
  },

  bookSeats: (movieId, seats) => {
    const bookings = JSON.parse(localStorage.getItem('bookings')) || {};
    bookings[movieId] = [...(bookings[movieId] || []), ...seats];
    localStorage.setItem('bookings', JSON.stringify(bookings));
  }
};

export default BookingService;

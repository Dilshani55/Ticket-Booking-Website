import { useEffect, useState } from "react";
import { getMyBookings, cancelBooking } from "../services/bookingService"; // ⚡ You'll need to implement cancelBooking in service

function Profile() {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const data = await getMyBookings();
      setBookings(data);
    } catch (err) {
      console.error("Failed to fetch bookings:", err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancel = async (id) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      try {
        await cancelBooking(id); // new API call
        fetchBookings();
      } catch (err) {
        console.error("Failed to cancel:", err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-[#0b0b0b] text-white px-25 mt-25 py-12">
      {/* Heading */}
      <h1 className="text-4xl font-bold text-center mb-10">
        👤 My <span className="text-pink-500">Bookings</span>
      </h1>

      {bookings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bookings.map((b) => (
            <div
              key={b._id}
              className="bg-[#161616] rounded-xl shadow-lg hover:shadow-pink-500/20 transition-all p-6 flex flex-col justify-between"
            >
              {/* Movie Poster + Title */}
              <div className="mb-4">
                {b.movie.poster && (
                  <img
                    src={b.movie.poster}
                    alt={b.movie.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )}
                <h2 className="text-xl font-semibold">{b.movie.title}</h2>
                <p className="text-gray-400 text-sm">{b.movie.genre}</p>
              </div>

              {/* Booking details */}
              <div className="space-y-2">
                <p>
                  <span className="font-semibold text-pink-400">🎟 Seats:</span>{" "}
                  {b.seats.join(", ")}
                </p>
                <p>
                  <span className="font-semibold text-pink-400">💰 Total Price:</span>{" "}
                  {b.totalPrice} LKR
                </p>
                <p>
                  <span className="font-semibold text-pink-400">📅 Date:</span>{" "}
                  {new Date(b.createdAt).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-semibold text-pink-400">✅ Status:</span>{" "}
                  <span
                    className={`px-2 py-1 text-sm rounded ${
                      b.paymentStatus === "paid"
                        ? "bg-green-600 text-white"
                        : "bg-yellow-600 text-white"
                    }`}
                  >
                    {b.paymentStatus}
                  </span>
                </p>
              </div>

              {/* Actions */}
              <div className="mt-4 flex gap-3">
                {b.paymentStatus === "paid" ? (
                  <button className="w-full bg-pink-600 hover:bg-pink-700 rounded-lg py-2 font-medium transition">
                    Download Ticket 🎫
                  </button>
                ) : (
                  <button
                    onClick={() => handleCancel(b._id)}
                    className="w-full bg-red-600 hover:bg-red-700 rounded-lg py-2 font-medium transition"
                  >
                    Cancel Booking 🗑
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center mt-20">
          <p className="text-lg text-gray-400">🚫 No bookings found</p>
        </div>
      )}
    </div>
  );
}

export default Profile;
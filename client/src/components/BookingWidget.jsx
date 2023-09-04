import { useState, useContext, useEffect } from "react";
import { differenceInCalendarDays } from "date-fns";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

import axios from "axios";

export default function BookingWidget({ place }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [guests, setGuests] = useState(1);
  const [redirect, setRedirect] = useState("");
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  let numOfDays = 0;

  if (checkIn && checkOut) {
    numOfDays = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
  }

  async function bookThisPlace() {
    const response = await axios.post("/bookings", {
      place: place._id,
      checkIn,
      checkOut,
      name,
      phone,
      guests,
      price: numOfDays * place.price,
    });

    const bookingId = response.data._id;
    console.log(bookingId);
    setRedirect(`/account/bookings/${bookingId}}`);
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="bg-white shadow p-4 rounded-2xl">
      <div className="text-2xl text-center">
        Price: ${place.price}/ per night
      </div>
      <div className="border rounded-2xl mt-4">
        <div className="flex">
          <div className="py-3 px-4">
            <label>Check in:</label>
            <input
              type="date"
              value={checkIn}
              onChange={(ev) => setCheckIn(ev.target.value)}
            />
          </div>

          <div className="py-3 px-4 border-l">
            <label>Check out:</label>
            <input
              type="date"
              value={checkOut}
              onChange={(ev) => setCheckOut(ev.target.value)}
            />
          </div>
        </div>

        <div className="py-3 px-4 border-l">
          <label>Number of guests</label>
          <input
            type="number"
            placeholder="1"
            value={guests}
            onChange={(ev) => setGuests(ev.target.value)}
          />
        </div>
        {numOfDays > 0 && (
          <div className="py-3 px-4 border-l">
            <label>Your full name: </label>

            <input
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
            />

            <label>Phone number: </label>

            <input
              type="tel"
              placeholder=""
              value={phone}
              onChange={(ev) => setPhone(ev.target.value)}
            />
          </div>
        )}
      </div>
      <button onClick={bookThisPlace} className="primary mt-4 ">
        Book this place
        {numOfDays > 0 && <span> for ${numOfDays * place.price}</span>}
      </button>
    </div>
  );
}

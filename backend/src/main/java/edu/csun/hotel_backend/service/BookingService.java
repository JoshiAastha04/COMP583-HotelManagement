package edu.csun.hotel_backend.service;

import edu.csun.hotel_backend.dto.BookingRequest;
import edu.csun.hotel_backend.model.Booking;
import edu.csun.hotel_backend.model.Room;
import edu.csun.hotel_backend.repository.BookingRepo;
import edu.csun.hotel_backend.repository.RoomRepo;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class BookingService {

    private final BookingRepo bookingRepo;
    private final RoomRepo roomRepo;
    private final RestTemplate restTemplate;

    public BookingService(BookingRepo bookingRepo, RoomRepo roomRepo) {
        this.bookingRepo = bookingRepo;
        this.roomRepo = roomRepo;
        this.restTemplate = new RestTemplate();
    }

    public Booking createBooking(BookingRequest req, String userId, String guestName, String guestEmail) {
        if (!req.getCheckOut().isAfter(req.getCheckIn())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Check-out must be after check-in.");
        }
        if (req.getCheckIn().isBefore(LocalDate.now())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Check-in cannot be in the past.");
        }

        Room room = roomRepo.findById(req.getRoomId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Room not found."));

        if (!room.getAvailable()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Room is not available.");
        }

        List<Booking> conflicts = bookingRepo.findByRoomIdAndStatusIn(
                room.getId(),
                List.of(Booking.Status.CONFIRMED, Booking.Status.CHECKED_IN)
        );

        boolean hasConflict = conflicts.stream().anyMatch(b ->
                !(b.getCheckOut().compareTo(req.getCheckIn()) <= 0 ||
                        b.getCheckIn().compareTo(req.getCheckOut()) >= 0)
        );

        if (hasConflict) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Room is already booked for those dates.");
        }

        long nights = ChronoUnit.DAYS.between(req.getCheckIn(), req.getCheckOut());
        double subtotal = nights * room.getPricePerNight();
        double taxes = Math.round(subtotal * 0.12);
        double totalPrice = subtotal + taxes;

        Booking booking = new Booking();
        booking.setUserId(userId);
        booking.setGuestName(guestName);
        booking.setGuestEmail(guestEmail);
        booking.setRoom(room);
        booking.setCheckIn(req.getCheckIn());
        booking.setCheckOut(req.getCheckOut());
        booking.setGuests(req.getGuests());
        booking.setSpecialRequests(req.getSpecialRequests());
        booking.setTotalPrice(totalPrice);
        booking.setStatus(Booking.Status.CONFIRMED);

        Booking saved = bookingRepo.save(booking);

        try {
            Map<String, String> notifRequest = new HashMap<>();
            notifRequest.put("guestEmail", guestEmail);
            notifRequest.put("guestName", guestName);
            notifRequest.put("bookingId", String.valueOf(saved.getId()));
            notifRequest.put("checkInDate", saved.getCheckIn().toString());
            notifRequest.put("selfCheckInCode", saved.getConfirmationCode());

            restTemplate.postForObject(
                    "http://localhost:8082/api/notify/booking",
                    notifRequest,
                    String.class
            );
            System.out.println("✅ Notification sent for booking: " + saved.getId());
        } catch (Exception e) {
            System.err.println("Failed to send notification: " + e.getMessage());
        }

        return saved;
    }

    public List<Booking> getBookingsByUser(String userId) {
        return bookingRepo.findByUserIdOrderByCreatedAtDesc(userId);
    }

    public Booking getBookingById(Long id, String userId) {
        Booking b = bookingRepo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Booking not found."));
        if (!b.getUserId().equals(userId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Access denied.");
        }
        return b;
    }

    public Booking cancelBooking(Long id, String userId) {
        Booking b = getBookingById(id, userId);
        if (b.getStatus() == Booking.Status.CHECKED_IN || b.getStatus() == Booking.Status.CHECKED_OUT) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cannot cancel a booking that has already started.");
        }
        b.setStatus(Booking.Status.CANCELLED);
        return bookingRepo.save(b);
    }

    public Booking checkIn(String confirmationCode) {
        Booking b = bookingRepo.findByConfirmationCode(confirmationCode)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Confirmation code not found."));
        if (b.getStatus() != Booking.Status.CONFIRMED) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Booking is not in a valid state for check-in. Status: " + b.getStatus());
        }
        b.setStatus(Booking.Status.CHECKED_IN);
        b.setCheckedInAt(LocalDateTime.now());
        return bookingRepo.save(b);
    }

    public Booking checkOut(String confirmationCode) {
        Booking b = bookingRepo.findByConfirmationCode(confirmationCode)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Confirmation code not found."));
        if (b.getStatus() != Booking.Status.CHECKED_IN) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Cannot check out — guest is not currently checked in. Status: " + b.getStatus());
        }
        b.setStatus(Booking.Status.CHECKED_OUT);
        b.setCheckedOutAt(LocalDateTime.now());
        return bookingRepo.save(b);
    }
}
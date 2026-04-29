package edu.csun.hotel_backend.controller;

import edu.csun.hotel_backend.dto.BookingRequest;
import edu.csun.hotel_backend.model.Booking;
import edu.csun.hotel_backend.service.BookingService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    // POST /api/bookings
    @PostMapping
    public ResponseEntity<Booking> createBooking(
            @RequestBody BookingRequest request,
            Authentication auth
    ) {
        Map<String, Object> details = getDetails(auth);
        String uid = (String) details.get("uid");
        String name = (String) details.getOrDefault("name", "");
        String email = (String) details.getOrDefault("email", "");
        Booking booking = bookingService.createBooking(request, uid, name, email);
        return ResponseEntity.ok(booking);
    }

    // GET /api/bookings/my
    @GetMapping("/my")
    public List<Booking> getMyBookings(Authentication auth) {
        return bookingService.getBookingsByUser(getUid(auth));
    }

    // GET /api/bookings/{id}
    @GetMapping("/{id}")
    public ResponseEntity<Booking> getBookingById(@PathVariable Long id, Authentication auth) {
        return ResponseEntity.ok(bookingService.getBookingById(id, getUid(auth)));
    }

    // PUT /api/bookings/{id}/cancel
    @PutMapping("/{id}/cancel")
    public ResponseEntity<Booking> cancelBooking(@PathVariable Long id, Authentication auth) {
        return ResponseEntity.ok(bookingService.cancelBooking(id, getUid(auth)));
    }

    // PUT /api/bookings/checkin/{code}
    @PutMapping("/checkin/{code}")
    public ResponseEntity<Booking> checkIn(@PathVariable String code) {
        return ResponseEntity.ok(bookingService.checkIn(code));
    }

    // PUT /api/bookings/checkout/{code}
    @PutMapping("/checkout/{code}")
    public ResponseEntity<Booking> checkOut(@PathVariable String code) {
        return ResponseEntity.ok(bookingService.checkOut(code));
    }

    @SuppressWarnings("unchecked")
    private Map<String, Object> getDetails(Authentication auth) {
        return (Map<String, Object>) auth.getDetails();
    }

    private String getUid(Authentication auth) {
        return (String) getDetails(auth).get("uid");
    }
}
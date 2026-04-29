package edu.csun.hotel_backend.repository;

import edu.csun.hotel_backend.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BookingRepo extends JpaRepository<Booking, Long> {

    List<Booking> findByUserIdOrderByCreatedAtDesc(String userId);

    Optional<Booking> findByConfirmationCode(String confirmationCode);

    List<Booking> findByRoomIdAndStatusIn(Long roomId, List<Booking.Status> statuses);
}
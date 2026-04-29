package edu.csun.hotel_backend.repository;

import edu.csun.hotel_backend.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface RoomRepo extends JpaRepository<Room, Long> {

    Optional<Room> findByRoomNumber(String roomNumber);

    List<Room> findByType(String type);

    List<Room> findByAvailable(Boolean available);

    List<Room> findByCapacityGreaterThanEqual(Integer capacity);

    /**
     * Find rooms NOT booked (CONFIRMED or CHECKED_IN) for the given date range.
     */
    @Query("""
        SELECT r FROM Room r
        WHERE r.available = true
        AND r.capacity >= :guests
        AND r.id NOT IN (
            SELECT b.room.id FROM Booking b
            WHERE b.status IN ('CONFIRMED', 'CHECKED_IN')
            AND NOT (b.checkOut <= :checkIn OR b.checkIn >= :checkOut)
        )
    """)
    List<Room> findAvailableRooms(
            @Param("checkIn") LocalDate checkIn,
            @Param("checkOut") LocalDate checkOut,
            @Param("guests") Integer guests
    );
}
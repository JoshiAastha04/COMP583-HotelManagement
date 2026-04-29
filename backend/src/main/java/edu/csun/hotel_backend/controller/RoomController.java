package edu.csun.hotel_backend.controller;

import edu.csun.hotel_backend.model.Room;
import edu.csun.hotel_backend.service.RoomService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/rooms")
public class RoomController {

    private final RoomService roomService;

    public RoomController(RoomService roomService) {
        this.roomService = roomService;
    }

    // GET /api/rooms — all rooms (optionally filter by type)
    @GetMapping
    public List<Room> getAllRooms(@RequestParam(required = false) String type) {
        if (type != null && !type.isBlank()) {
            return roomService.getRoomsByType(type);
        }
        return roomService.getAllRooms();
    }

    // GET /api/rooms/{id}
    @GetMapping("/{id}")
    public ResponseEntity<Room> getRoomById(@PathVariable Long id) {
        return roomService.getRoomById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // GET /api/rooms/available?checkIn=2026-04-01&checkOut=2026-04-05&guests=2
    @GetMapping("/available")
    public List<Room> getAvailableRooms(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkIn,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkOut,
            @RequestParam(defaultValue = "1") Integer guests
    ) {
        return roomService.getAvailableRooms(checkIn, checkOut, guests);
    }
}
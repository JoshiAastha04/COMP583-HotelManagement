package edu.csun.hotel_backend.service;

import edu.csun.hotel_backend.model.Room;
import edu.csun.hotel_backend.repository.RoomRepo;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class RoomService {

    private final RoomRepo roomRepo;

    public RoomService(RoomRepo roomRepo) {
        this.roomRepo = roomRepo;
    }

    public List<Room> getAllRooms() {
        return roomRepo.findAll();
    }

    public Optional<Room> getRoomById(Long id) {
        return roomRepo.findById(id);
    }

    public List<Room> getAvailableRooms(LocalDate checkIn, LocalDate checkOut, Integer guests) {
        return roomRepo.findAvailableRooms(checkIn, checkOut, guests);
    }

    public List<Room> getRoomsByType(String type) {
        return roomRepo.findByType(type);
    }

    public Room saveRoom(Room room) {
        return roomRepo.save(room);
    }

    public void deleteRoom(Long id) {
        roomRepo.deleteById(id);
    }
}
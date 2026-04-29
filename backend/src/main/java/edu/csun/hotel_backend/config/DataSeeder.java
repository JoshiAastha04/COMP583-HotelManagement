package edu.csun.hotel_backend.config;

import edu.csun.hotel_backend.model.Room;
import edu.csun.hotel_backend.repository.RoomRepo;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    private final RoomRepo roomRepo;

    public DataSeeder(RoomRepo roomRepo) {
        this.roomRepo = roomRepo;
    }

    @Override
    public void run(String... args) {
        if (roomRepo.count() > 0) return; // Already seeded

        List<Room> rooms = List.of(
                new Room("101", "Standard", 89.0, 2,
                        "Cozy standard room with a queen bed, modern amenities, and garden view.",
                        320, List.of("WiFi", "TV", "AC")),

                new Room("102", "Standard", 89.0, 2,
                        "Quiet standard room on the ground floor with easy pool access.",
                        320, List.of("WiFi", "TV", "AC")),

                new Room("103", "Standard", 99.0, 2,
                        "Corner standard room with extra natural light and city-facing windows.",
                        350, List.of("WiFi", "TV", "AC", "Gym")),

                new Room("201", "Deluxe", 149.0, 3,
                        "Spacious deluxe room with a king bed, sitting area, and private balcony.",
                        480, List.of("WiFi", "TV", "AC", "Balcony")),

                new Room("202", "Deluxe", 159.0, 3,
                        "Sea-facing deluxe room with breathtaking ocean views.",
                        480, List.of("WiFi", "TV", "AC", "Balcony", "Sea View")),

                new Room("203", "Deluxe", 149.0, 3,
                        "Garden deluxe room with a large soaking tub and premium bath amenities.",
                        500, List.of("WiFi", "TV", "AC", "Spa")),

                new Room("301", "Suite", 249.0, 4,
                        "Luxurious suite with a separate living room, dining area, and premium minibar.",
                        750, List.of("WiFi", "TV", "AC", "Bar", "Spa", "Balcony")),

                new Room("302", "Suite", 279.0, 4,
                        "Corner suite with panoramic views, a jacuzzi, and butler service.",
                        820, List.of("WiFi", "TV", "AC", "Bar", "Spa", "Balcony", "Sea View")),

                new Room("401", "Presidential", 499.0, 6,
                        "The ultimate VIP experience. Full-floor suite with private rooftop terrace.",
                        1800, List.of("WiFi", "TV", "AC", "Bar", "Spa", "Pool", "Gym", "Balcony", "Kitchen"))
        );

        roomRepo.saveAll(rooms);
        System.out.println("✅ Seeded " + rooms.size() + " rooms.");
    }
}
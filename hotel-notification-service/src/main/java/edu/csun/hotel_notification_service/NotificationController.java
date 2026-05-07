package edu.csun.hotel_notification_service;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/notify")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    @PostMapping("/booking")
    public ResponseEntity<String> sendBookingConfirmation(
            @RequestBody BookingNotificationRequest request) {
        notificationService.sendBookingConfirmation(request);
        return ResponseEntity.ok("Notification sent successfully");
    }
}
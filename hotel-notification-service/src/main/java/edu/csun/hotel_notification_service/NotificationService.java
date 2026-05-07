package edu.csun.hotel_notification_service;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final JavaMailSender mailSender;

    public void sendBookingConfirmation(BookingNotificationRequest request) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(request.getGuestEmail());
        message.setSubject("Booking Confirmation - " + request.getBookingId());
        message.setText(
                "Dear " + request.getGuestName() + ",\n\n" +
                        "Your booking has been confirmed!\n\n" +
                        "Booking ID: " + request.getBookingId() + "\n" +
                        "Check-in Date: " + request.getCheckInDate() + "\n" +
                        "Self Check-in Code: " + request.getSelfCheckInCode() + "\n\n" +
                        "Please keep your check-in code safe. You will need it to self check-in on arrival.\n\n" +
                        "Thank you for choosing us!\n" +
                        "Hotel Hollywood Team"
        );
        mailSender.send(message);
    }
}
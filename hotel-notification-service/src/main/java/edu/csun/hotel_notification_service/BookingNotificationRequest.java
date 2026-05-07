package edu.csun.hotel_notification_service;

import lombok.Data;

@Data
public class BookingNotificationRequest {
    private String guestEmail;
    private String guestName;
    private String bookingId;
    private String checkInDate;
    private String selfCheckInCode;
}
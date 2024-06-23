package br.com.emiteai.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class NotificationController {

    @Autowired
    private SimpMessagingTemplate template;

    @MessageMapping("/generateReport")
    @SendTo("/topic/reportStatus")
    public String sendReportStatus(String message) {
        return message;
    }

    public void notifyFrontend(String message) {
        this.template.convertAndSend("/topic/reportStatus", message);
    }
}

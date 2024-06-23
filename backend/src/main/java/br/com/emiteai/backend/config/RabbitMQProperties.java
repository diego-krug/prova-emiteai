package br.com.emiteai.backend.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import java.util.Map;

@Setter
@Getter
@Configuration
@ConfigurationProperties(prefix = "spring.rabbitmq")
public class RabbitMQProperties {

    private Map<String, String> queues;

}

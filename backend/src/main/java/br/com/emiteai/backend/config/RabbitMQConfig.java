package br.com.emiteai.backend.config;

import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {

    @Bean
    public Queue cadastroQueue() {
        return new Queue("emiteai-cadastro", true);
    }

    @Bean
    public Queue relatorioQueue() {
        return new Queue("emiteai-relatorio", true);
    }

    @Bean
    public DirectExchange exchange() {
        return new DirectExchange("default.exchange");
    }

    @Bean
    public Binding cadastroBinding(Queue cadastroQueue, DirectExchange exchange) {
        return BindingBuilder.bind(cadastroQueue).to(exchange).with("emiteai-cadastro");
    }

    @Bean
    public Binding relatorioBinding(Queue relatorioQueue, DirectExchange exchange) {
        return BindingBuilder.bind(relatorioQueue).to(exchange).with("emiteai-relatorio");
    }

    @Bean
    public MessageConverter jsonMessageConverter() {
        return new Jackson2JsonMessageConverter();
    }

    @Bean
    public RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory) {
        RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory);
        rabbitTemplate.setMessageConverter(jsonMessageConverter());
        return rabbitTemplate;
    }
}

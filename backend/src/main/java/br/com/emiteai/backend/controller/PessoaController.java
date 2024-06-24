package br.com.emiteai.backend.controller;

import br.com.emiteai.backend.dto.PessoaDTO;
import br.com.emiteai.backend.service.PessoaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/pessoa")
@RequiredArgsConstructor
public class PessoaController {

    private final RabbitTemplate rabbitTemplate;
    private final PessoaService pessoaService;
    private static final String EXCHANGE_NAME = "default.exchange";
    private static final String QUEUE_NAME = "emiteai-cadastro";

    @PostMapping
    public void cadastrar(@RequestBody @Valid PessoaDTO dto) {
        rabbitTemplate.convertAndSend(EXCHANGE_NAME, QUEUE_NAME, dto);
    }

    @GetMapping
    public List<PessoaDTO> buscarTodos() {
        return pessoaService.buscarTodos();
    }
}

package br.com.emiteai.backend.controller;

import br.com.emiteai.backend.dto.PessoaDTO;
import br.com.emiteai.backend.service.PessoaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/pessoa")
@RequiredArgsConstructor
public class PessoaController {

    private final PessoaService pessoaService;

    @PostMapping
    public void cadastrar(@RequestBody @Valid PessoaDTO dto){
        pessoaService.criarPessoa(dto);
    }

    @GetMapping
    public List<PessoaDTO> buscarTodos(){
        return pessoaService.buscarTodos();
    }
}

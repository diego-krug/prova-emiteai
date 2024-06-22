package br.com.emiteai.backend.pessoa;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PessoaService {

    private final PessoaRepository pessoaRepository;

    private final ModelMapper modelMapper;

    public PessoaDTO criarPessoa(PessoaDTO dto) {
        Pessoa pessoa = modelMapper.map(dto, Pessoa.class);
        pessoaRepository.save(pessoa);

        return modelMapper.map(pessoa, PessoaDTO.class);
    }

    public List<PessoaDTO> buscarTodos() {
        return pessoaRepository.findAll().stream().map(p -> modelMapper.map(p, PessoaDTO.class)).collect(Collectors.toList());
    }
}

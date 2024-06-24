package br.com.emiteai.backend.service;

import br.com.emiteai.backend.dto.PessoaDTO;
import br.com.emiteai.backend.model.Pessoa;
import br.com.emiteai.backend.repository.PessoaRepository;
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

    public void criarPessoa(PessoaDTO dto) {
        Pessoa pessoa = new Pessoa();
        pessoa.setBairro(dto.getBairro());
        pessoa.setCep(dto.getCep());
        pessoa.setCidade(dto.getCidade());
        pessoa.setComplemento(dto.getComplemento());
        pessoa.setCpf(dto.getCpf());
        pessoa.setEndereco(dto.getEndereco());
        pessoa.setNome(dto.getNome());
        pessoa.setNumero(dto.getNumero());
        pessoa.setTelefone(dto.getTelefone());
        pessoa.setUf(dto.getUf());

        pessoaRepository.save(pessoa);
    }

    public List<PessoaDTO> buscarTodos() {
        return pessoaRepository.findAll().stream().map(p -> modelMapper.map(p, PessoaDTO.class)).collect(Collectors.toList());
    }
}

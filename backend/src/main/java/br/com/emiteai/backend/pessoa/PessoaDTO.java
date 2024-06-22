package br.com.emiteai.backend.pessoa;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.br.CPF;

@Getter
@Setter
public class PessoaDTO {

    @NotBlank
    private String nome;
    private String telefone;
    @CPF
    private String cpf;
    private String endereco;
    @Positive
    private String numero;
    private String complemento;
    private String cep;
    private String bairro;
    private String cidade;
    private String uf;
}

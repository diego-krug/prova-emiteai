package br.com.emiteai.backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Table(name = "Pessoa")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Pessoa {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private UUID id;
    private String nome;
    private String telefone;
    private String cpf;
    private String endereco;
    private String numero;
    private String complemento;
    private String cep;
    private String bairro;
    private String cidade;
    private String uf;

    @PrePersist
    public void prePersist() {
        if (id == null) {
            id = UUID.randomUUID();
        }
    }
}

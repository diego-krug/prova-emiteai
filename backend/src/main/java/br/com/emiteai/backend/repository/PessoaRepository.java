package br.com.emiteai.backend.repository;

import br.com.emiteai.backend.model.Pessoa;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface PessoaRepository extends JpaRepository<Pessoa, UUID> {
}

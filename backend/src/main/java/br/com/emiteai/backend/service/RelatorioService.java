package br.com.emiteai.backend.service;

import br.com.emiteai.backend.model.Pessoa;
import br.com.emiteai.backend.repository.PessoaRepository;
import lombok.Getter;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.Writer;
import java.util.List;

@Service
public class RelatorioService {

    @Autowired
    private PessoaRepository pessoaRepository;

    @Autowired
    private RabbitTemplate rabbitTemplate;

    @Getter
    private String caminhoArquivoRelatorio;

    public String solicitarGeracaoRelatorioCSV() {
        String queueName = "emiteai-relatorio";
        System.out.println("Enviando mensagem para a fila: " + queueName);
        rabbitTemplate.convertAndSend("default.exchange", queueName, "Solicitação de geração de relatório");
        return "Relatório está sendo gerado. Por favor, aguarde.";
    }

    public File gerarRelatorioCSV() throws IOException {
        List<Pessoa> pessoas = pessoaRepository.findAll();

        File tempFile = File.createTempFile("relatorio_pessoas", ".csv");
        try (Writer writer = new FileWriter(tempFile)) {
            writer.write("ID, Nome, Telefone, CPF, Endereco, Numero, Complemento, CEP, Bairro, Cidade, UF\n");
            for (Pessoa pessoa : pessoas) {
                writer.write(pessoa.getId() + "," + pessoa.getNome() + "," + pessoa.getTelefone() + "," + pessoa.getCpf() + "," + pessoa.getEndereco() + "," + pessoa.getNumero() + "," + pessoa.getComplemento() +
                        "," + pessoa.getCep() + "," + pessoa.getBairro() + "," + pessoa.getCidade() + "," + pessoa.getUf() + "\n");
            }
        }
        System.out.println("Arquivo CSV gerado em: " + tempFile.getAbsolutePath());
        this.caminhoArquivoRelatorio = tempFile.getAbsolutePath();
        return tempFile;
    }

}

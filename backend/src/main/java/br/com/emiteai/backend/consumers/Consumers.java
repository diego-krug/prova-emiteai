package br.com.emiteai.backend.consumers;

import br.com.emiteai.backend.dto.PessoaDTO;
import br.com.emiteai.backend.model.Pessoa;
import br.com.emiteai.backend.service.PessoaService;
import br.com.emiteai.backend.service.RelatorioService;
import br.com.emiteai.backend.controller.NotificationController;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.IOException;

@Component
public class Consumers {

    @Autowired
    private PessoaService pessoaService;

    @Autowired
    private RelatorioService relatorioService;

    @Autowired
    private NotificationController notificationController;

    @RabbitListener(queues = "emiteai-cadastro")
    public void listenCadastro(PessoaDTO pessoaDTO) {
        Pessoa pessoa = new Pessoa();
        BeanUtils.copyProperties(pessoaDTO, pessoa);
        pessoaService.criarPessoa(pessoaDTO);
        System.out.println("Pessoa Criada com sucesso! Nome: " + pessoaDTO.getNome());
    }

    @RabbitListener(queues = "emiteai-relatorio")
    public void receiveMessage(String message) {
        System.out.println("Recebido: " + message);
        try {
            File csvFile = relatorioService.gerarRelatorioCSV();
            System.out.println("Relatório gerado: " + csvFile.getAbsolutePath());
            notificationController.notifyFrontend(relatorioService.getCaminhoArquivoRelatorio());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

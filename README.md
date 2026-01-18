# Projeto de automação de testes utilizando cypress 

## requisitos para rodar o projeto

### Instalar cypress 15.9.0 ou maior (garantia)
- `npm install cypress --save-dev`

### Cucumber preprocessor
- `npm install -D cypress-cucumber-preprocessor`
  
### Instalar lib mochawesome para relatórios no reports/ ( tem dois relatorios meus de quando executei no npx cypress run )
- `npm install --save-dev mochawesome mochawesome-merge mochawesome-report-generator`

### Instalar lib faker para gerar nome e email dinâmico, não precisando usar file .env
- `npm install --save-dev @faker-js/faker`
  
### VSCode extensões
- Cucumber (Gherkin) Full Suport

### NodeJs
- após instalar tudo no terminal do projeto no vscode e a extensão, ele estará apto a rodar devidamente.

---

# Sobre o projeto

## Esse projeto executa testes no site: [Coffee Cart](https://coffee-cart.app/)
 com os seguintes objetivos: 
- Escolher 3 tipos de café diferentes  
- Validar a aparição do modal de oferta (mocha por 4 reais) e aceitar a oferta  
- Validar que os 4 itens (3 iniciais e 1 brinde com oferta) estão presentes com os valores corretos  
- Remover 1 item do carrinho  
- Realizar validar a mensagem de sucesso final  

---

# O que meu código tem
- O projeto tem validações em praticamente tudo, confirmando que cada coisa está funcionando devidamente, inclusive os preços quando algo é adicionado / removido usando a comapração da soma esperada  
- Todas as opções de escolha (escolher café, remover café, botões para apertar, email, nome) são escolhidos aleatoriamente, reforçando a reutilização do código.  
- Nome e Email são gerados usando a Lib Faker, a cada vez que iniciar o cypress, o cache irá se perder e na próxima vez que iniciar, irá gerar um novo nome e email para o teste.  
- Relatórios gerados na pasta `report` com o Mochawesome sempre que usar o comando no terminal: `npx cypress run`  
- Const reaproveitada em toda a page, algumas até sendo exportadas para outras pages  
- Toda const contém o id / data-test, a não ser que realmente não exista disponibilidade no HTML do site
- Uso de BaseUrl  
- Livre de `cy.await` e outras esperas  
- Separação clara de page, step e features.  
- Comentários no código para melhor entendimento no fluxo  
- Features com cucumber / gherkin
  
---

### Nota
- Nesse site, há duas formas de acessar o carrinho:  
  - Uma clicando em **cart**  
  - Outra colocando o mouse em cima da janela de preços localizada no canto inferior esquerdo após escolher no mínimo 1 café.  

Eu escolhi fazer esse projeto usando o **mosshover** para tentar me aventurar um pouco mais no cypress ao invés de configurar um simples click para a página de cart, sendo o fluxo executado todo na página principal de venda dos cafés.

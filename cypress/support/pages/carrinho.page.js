import { PRECO_CAFES, BOTAO_CHECKOUT } from './selecao.page';
const BOTAO_REMOVER_CAFE = 'button[aria-label^="Remove one"]'; // sem id ou data-test no HTML

class CarrinhoSistema {
  
  checarCarrinho() {
    cy.get(BOTAO_CHECKOUT)
      .should('be.visible')
      .invoke('text')
      .then(texto => {
        const totalExibido = parseFloat(texto.replace(/[^0-9.]/g, ''));
        expect(totalExibido).to.be.a('number'); 
      });
  }

  // valida se o total do carrinho corresponde à soma do preço atual
  validarTotalCarrinho(cafesSelecionados = []) {
    if (!cafesSelecionados.length) throw new Error('Lista de cafés vazia.');

    const somaEsperada = cafesSelecionados.reduce(
      (acc, cafe) => acc + (PRECO_CAFES[cafe] || 0),
      0
    );

    cy.get(BOTAO_CHECKOUT)
      .should('be.visible')
      .invoke('text')
      .then(texto => {
        const totalExibido = parseFloat(texto.replace(/[^0-9.]/g, ''));
        cy.log(`Soma esperada: ${somaEsperada} | Total exibido: ${totalExibido}`);
        expect(totalExibido).to.eq(somaEsperada);
      });
  }

  // remove um café aleatório do carrinho e atualiza a lista de cafés disponíveis
  removerCafeAleatorio(cafesSelecionados = []) {
  cy.get(BOTAO_CHECKOUT)
    .should('exist')
    .should('be.visible')
    .trigger('mouseover');

  cy.get(BOTAO_REMOVER_CAFE)
    .should('exist')
    .then($botoes => {
      if ($botoes.length === 0) throw new Error('Carrinho vazio.');

      const indiceAleatorio = Cypress._.random(0, $botoes.length - 1);

      cy.wrap($botoes)
        .eq(indiceAleatorio)
        .should('be.visible')
        .and('be.enabled')
        .invoke('attr', 'aria-label')
        .should('not.be.empty')
        .then(label => {
          const nomeCafe = label.replace('Remove one ', '').trim();

          cy.wrap($botoes).eq(indiceAleatorio).click();

          const idx = cafesSelecionados.indexOf(nomeCafe);
          if (idx > -1) cafesSelecionados.splice(idx, 1);

          expect(cafesSelecionados).not.to.include(nomeCafe);

          const somaEsperada = cafesSelecionados.reduce(
            (acc, cafe) => acc + (PRECO_CAFES[cafe] || 0),
            0
          );

          cy.get(BOTAO_CHECKOUT)
            .should('be.visible')
            .invoke('text')
            .should('not.be.empty')
            .then(texto => {
              const totalExibido = parseFloat(texto.replace(/[^0-9.]/g, ''));
              expect(totalExibido).to.eq(somaEsperada);
            });
        });
    });
}


  // clica no botão de checkout/carrinho
  clicarCarrinho() {
    cy.get(BOTAO_CHECKOUT)
      .scrollIntoView()
      .should('be.visible')
      .and('be.enabled')
      .click({ force: true });
  }
}

export default new CarrinhoSistema();

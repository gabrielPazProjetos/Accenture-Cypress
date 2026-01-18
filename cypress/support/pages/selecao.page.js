export const BOTAO_CHECKOUT = '[data-test="checkout"]';
export const BOTAO_ACEITAR_PROMOCAO = 'button.yes'; // sem id ou data-test no HTML

// seletor de cafés disponíveis
export const CAFES = {
  'Espresso': '[data-test="Espresso"]',
  'Espresso Macchiato': '[data-test="Espresso_Macchiato"]',
  'Cappuccino': '[data-test="Cappuccino"]',
  'Mocha': '[data-test="Mocha"]',
  'Flat White': '[data-test="Flat_White"]',
  'Americano': '[data-test="Americano"]',
  'Cafe Latte': '[data-test="Cafe_Latte"]',
  'Espresso Con Panna': '[data-test="Espresso_Con Panna"]',
  'Cafe Breve': '[data-test="Cafe_Breve"]',
};

// Preços correspondentes a cada café à venda
export const PRECO_CAFES = {
  'Espresso': 10.00,
  'Espresso Macchiato': 12.00,
  'Cappuccino': 19.00,
  'Mocha': 8.00,
  '(Discounted) Mocha': 4.00,
  'Flat White': 18.00,
  'Americano': 7.00,
  'Cafe Latte': 16.00,
  'Espresso Con Panna': 14.00,
  'Cafe Breve': 15.00,
};

class SelecaoPage {
  // seleciona cafés com base na lista e valida o total
  selecionarCafes(cafes) {
    const somaEsperada = cafes.reduce((acc, cafe) => acc + PRECO_CAFES[cafe], 0);

    // itera sobre cada um dos cafés e clica no botão correspondente
    cafes.forEach(cafe => {
      const selector = CAFES[cafe];
      if (!selector) throw new Error(`Café "${cafe}" não encontrado.`);
      cy.get(selector)
        .should('exist')
        .should('be.visible')
        .click();
    });

    // validação do preço total corresponde à soma esperada
    cy.get(BOTAO_CHECKOUT)
      .should('exist')
      .invoke('text')
      .should('not.be.empty')
      .then(texto => {
        const totalExibido = parseFloat(texto.replace(/[^0-9.]/g, ''));
        expect(totalExibido).to.eq(somaEsperada);
      });

    return cafes;
  }

  // seleciona três cafés disponíveis para a venda de forma aleatória
  selecionarTresAleatorios() {
    const nomes = Object.keys(CAFES).filter(nome => nome !== '(Discounted) Mocha');
    const selecionados = Cypress._.sampleSize(nomes, 3);

    cy.wrap(selecionados).should('have.length', 3);
    cy.log(`Selecionando cafés: ${selecionados.join(', ')}`);

    return this.selecionarCafes(selecionados);
  }

  // aceita a promoção e adiciona o mocha promocional desconto ao carrinho
  aceitarPromocao(cafesSelecionados = []) {
    cy.get(BOTAO_ACEITAR_PROMOCAO)
      .should('exist') 
      .should('be.visible')
      .and('contain.text', 'Yes, of course!')
      .click()
      .should('not.exist');

    // atualiza a lista de cafés locais com o mocha promocional
    cafesSelecionados.push('(Discounted) Mocha');
    cy.wrap(cafesSelecionados).should('include', '(Discounted) Mocha');

    return cafesSelecionados;
  }
}

export default new SelecaoPage();

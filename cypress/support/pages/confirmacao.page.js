const CAMPO_NOME = '#name';
const CAMPO_EMAIL = '#email';
const CHECKBOX_PROMOCAO_E_UPDATES = '#promotion'; 
const BOTAO_SUBMIT = '#submit-payment';
const SUCESSO = '.snackbar.success'; // sem id ou data-test no HTML

class ConfirmacaoStep {

  // preenche o email/nome com od dados do FakerJs
  preencherDados(nome, email) {
    cy.get(CAMPO_NOME)
      .should('be.visible')
      .clear()
      .type(nome)
      .should('have.value', nome);

    cy.get(CAMPO_EMAIL)
      .should('be.visible')
      .clear()
      .type(email)
      .should('have.value', email);
  }

  // clica no botão submit e envia os dados para prosseguir com a compra
  confirmarCheckout() {
    cy.get(BOTAO_SUBMIT)
      .should('be.enabled')
      .click();
  }

  // faz o fluxo completo com opção de aceitar receber emails de promoção e updates no checkout
  checkout(nome, email, aceitarPromo = true) {
    this.preencherDados(nome, email);
    if (aceitarPromo) {
      this.marcarPromocao();
    }
    this.confirmarCheckout();
  }

  // marca o checkbox de promoção e updates
  marcarPromocao() {
    cy.get(CHECKBOX_PROMOCAO_E_UPDATES)
      .should('be.visible')
      .check()
      .should('be.checked');
  }

  // confirma a mensagem de sucesso
  validarMensagemSucesso() {
    cy.get(SUCESSO)
      .should('be.visible')
      .and('contain.text', 'Thanks for your purchase. Please check your email for payment.');
  }
}

export default new ConfirmacaoStep();

import { Given, When, And, Then } from 'cypress-cucumber-preprocessor/steps';
import SelecaoPage from "../pages/selecao.page";
import CarrinhoSistema from "../pages/carrinho.page";
import ConfirmacaoStep from '../pages/confirmacao.page';

let cafesSelecionados = [];

Given('que o usuário está na página inicial', () => {
  cy.visit('/');
});

And('o usuário escolhe 3 tipos de café diferentes', () => {
  cafesSelecionados = SelecaoPage.selecionarTresAleatorios();
});

And('o usuário aceita a oferta promocional', () => {
  cafesSelecionados = SelecaoPage.aceitarPromocao(cafesSelecionados);
});

When('o usuário for checar o carrinho', () => {
  CarrinhoSistema.validarTotalCarrinho(cafesSelecionados);
});

And('o usuário remove 1 item do carrinho', () => {
  CarrinhoSistema.removerCafeAleatorio(cafesSelecionados);
});

And('o usuário clica no carrinho', () => {
  CarrinhoSistema.clicarCarrinho();
});

And('o usuário coloca seus dados para confirmar compra', () => {
  ConfirmacaoStep.checkout(
    Cypress.env('nome'),
    Cypress.env('email')
  );
});

Then('o usuário deve ver a mensagem de agradecimento pelo pedido', () => {
   ConfirmacaoStep.validarMensagemSucesso(); 
});

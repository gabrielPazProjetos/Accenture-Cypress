#utf-8
#language: pt

Funcionalidade: Compra de cafés e promoção de Mocha

  Cenário: Usuário realiza compra de cafés com oferta promocional 
    Dado que o usuário está na página inicial
    E o usuário escolhe 3 tipos de café diferentes
    E o usuário aceita a oferta promocional
    Quando o usuário for checar o carrinho
    E o usuário remove 1 item do carrinho
    E o usuário clica no carrinho
    E o usuário coloca seus dados para confirmar compra
    Então o usuário deve ver a mensagem de agradecimento pelo pedido
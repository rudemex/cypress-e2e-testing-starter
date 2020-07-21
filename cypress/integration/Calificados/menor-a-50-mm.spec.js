describe("Calificados - Menor a 50MM", () => {
  /* eslint-disable */
  before(() => {
    cy.log("Comienzo la suite de test");
    cy.fixture('user-calificado-menor-a-50-mm.json').as('userData');
  });

  beforeEach( () => {
    cy.loginNavigate('@userData');
  });

  it("Get Store Redux", () => {

    cy.window().its('store').invoke('getState').then((store) => {
      console.log(store); // Return obj
    });

    cy.get('#sarasa').should('be.visible');

    /*cy.get('.content-gui-loading').then((loading) => {
      if(cy.wrap(loading).should('be.visible')){
        console.log("Cargando");
        cy.wait(30000);
        console.log("after wait");
      }
    });*/
    /*cy.wait(15000).then( () => {
      console.log("wait");
    })*/

  });

  it('another test', () => {
    cy.get('#sarasa').should('be.visible');
  });

});


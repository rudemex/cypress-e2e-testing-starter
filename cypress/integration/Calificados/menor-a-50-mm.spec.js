describe("Calificados - Menor a 50MM", () => {
  /* eslint-disable */
  before(() => {
    cy.log("Comienzo la suite de test");
    cy.fixture('user-calificado-menor-a-50-mm.json').as('userData');
  });

  beforeEach( () => {
    cy.loginNavigate('@userData');
  });

  /*it("Login en Office Banking", () => {
    cy.loginNavigate('@userData');
  });*/

  it("Get Store Redux", () => {
    cy.wait(15000).window().its('store').invoke('getState').then((store) => {
      console.log(store); // Return obj
    })
  });


});


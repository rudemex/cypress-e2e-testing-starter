const addContext = require("mochawesome/addContext");

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })


/*
# =============================================================================================================
# -- COMMAND ADD CONTEXT TO TEST REPORT --
# IMPLEMENTATION: cy.addContextTestReport(title, value);
# =============================================================================================================
*/
Cypress.Commands.add("addContextTestReport", (type, title, value) => {
  cy.once("test:after:run", (test, runnable) => {
    console.log('[i] ADD CONTEXT TEST REPORT');
    //console.log("TEST: ", test);
    //console.log("RUNNABLE: ", runnable);
    //console.log("TYPE: ",type);

    //value = (type === "url") ? "<a href='"+value+"' target='_blank'>"+value+"</a>":value;

    //addContext({ test }, { title, value });
    addContext({ test }, { title: title, value: value });
  });
});

/*
# =============================================================================================================
# -- COMMAND UPLOAD FILE IN INPUT FILE --
# IMPLEMENTATION: cy.upload_file('Balance-685kb.pdf', 'application/pdf', 'input[name="balance"]');
# =============================================================================================================
*/
Cypress.Commands.add("upload_file", (fileName, type, selector) => {
  cy.get(selector).then(subject => {
    cy.fixture(fileName, "base64").then(content => {
      const el = subject[0];
      const blob = b64toBlob(content, type);
      cy.window().then(win => {
        const testFile = new win.File([blob], fileName, { type });
        const dataTransfer = new DataTransfer();

        dataTransfer.items.add(testFile);
        el.files = dataTransfer.files;
      });
    });
  });

  cy.get(selector).trigger("change", { force: true });
});

const b64toBlob = (b64Data, contentType = "", sliceSize = 512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });
  blob.lastModifiedDate = new Date();
  return blob;
}

/*
# =============================================================================================================
# -- COMMAND LOGIN AND NAVIGATE TO SPA --
# IMPLEMENTATION: cy.loginNavigate('@userData');
# =============================================================================================================
*/
Cypress.Commands.add( "loginNavigate", (fixtureData) => {
  cy.visit("");

  cy.get(fixtureData).then((data) => {
    //console.log("DATA:", data);
    cy.get('input[name="UserID"]').type(data.username);
    cy.get('input[name="Password"]').click({force: true}).type(data.password);
    cy.get('#submitButton').click();
  });

  cy.url().should('eq', `${Cypress.config().baseUrl}/Balance/ConsultarSaldos`).then( () => {
    cy.visit(`${Cypress.config().baseUrl}/Navigation/MenuLink/2509`);
  });
});
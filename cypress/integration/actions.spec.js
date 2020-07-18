describe("Pruebas funcionales", () => {
  /* eslint-disable */
  before(() => {
    cy.log("Comienzo la suite de test");
  });

  it("Se debe mostrar la pantalla de home", () => {
    cy.visit("");
    var screenShotFileName = "show-home-page";
    cy.screenshot(screenShotFileName);
    cy.addContextTestReport("image", "Image Home Page", "../cypress/screenshots/Qualification/actions.spec.js/" + screenShotFileName + ".png");
  });

  it("should add context", () => {

    // context can be a simple string
    cy.addContextTestReport("text", "Text example", "simple string");

    // context can be a url and the report will create a link
    cy.addContextTestReport("url", "Localhost:3000", "http://localhost:3000");

    // context can be an image url and the report will show it inline
    cy.addContextTestReport("image", "this is fine", "http://i.imgur.com/c4jt321.png");

    // context can be an video url and the report will show it inline
    cy.addContextTestReport(
      "video",
      "Big Buck Bunny",
      "https://www.sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4"
    );

    // context can be an object with title and value properties
    cy.addContextTestReport("response", "Response request to api", {
      title: "expected output",
      value: {
        a: 1,
        b: "2",
        c: "d"
      }
    });
  });

  it( "should add context when failed test", () => {
    cy.visit("");
    // FAIL
    cy.get('[data-cy="mainHome-btn-calificacions"]').should("be.visible").click();
  });
});


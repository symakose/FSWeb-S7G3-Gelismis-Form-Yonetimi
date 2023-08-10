describe("Form Tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("should validate form with valid inputs", () => {
    cy.get("#firstname").type("Şeyma");
    cy.get("#surname").type("Köse");
    cy.get("#email").type("seyma@example.com");
    cy.get("#password").type("password123");
    cy.get("#age").select("18-21");
    cy.get("#checkbox").check();

    cy.get("#submit").should("not.be.disabled");
  });

  it("should display errors for invalid inputs", () => {
    cy.get("#submit").should("be.disabled");

    cy.get("#firstname").type("Şeyma");
    cy.get("#surname").type("Köse");
    cy.get("#email").type("invalid-email");
    cy.get("#password").type("short");
    cy.get("#age").select("");
    cy.get("#checkbox").should("not.be.checked");

    cy.get("#error-email").should("contain.text", "Bu email geçersiz!");
    cy.get("#error-password").should(
      "contain.text",
      "Şifreniz en az 6 karakterden uzun olmalıdır."
    );
    cy.get("#submit");
    cy.get("#submit").should("be.disabled");
  });

  it("should submit form and display result", () => {
    cy.get("#firstname").type("Şeyma");
    cy.get("#surname").type("Köse");
    cy.get("#email").type("seyma@example.com");
    cy.get("#password").type("password123");
    cy.get("#age").select("18-21");
    cy.get("#checkbox").check();
    cy.get("input[name=password]").type("12345").should("have.value", "12345");

    cy.get(".data").should("contain.text", "Name: Şeyma");
    cy.get(".data").should("contain.text", "Surname: Köse");
    cy.get(".data").should("contain.text", "Email: seyma@example.com");
    cy.get(".data").should("contain.text", "Age: 18-21");
  });
});

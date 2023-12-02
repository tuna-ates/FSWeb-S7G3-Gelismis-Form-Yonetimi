/* eslint-disable no-undef */

describe("form denemtimi",()=>{
    beforeEach(()=>{
    cy.visit("http://localhost:3000/");
})
    it("isim input girilen değer kontrolü",()=>{

        cy.get("[data-cy=test_name]").type("tuna").should("have.value","tuna")
        
    })
    it("isim input 3 karakterden az girilen hata mesaj  kontrolü",()=>{
        cy.get("[data-cy=test_name").type("12")
        cy.contains("İsim uzunluğu 3 karakterden az olmaz")
        
        cy.get("[data-cy=test_name").clear()
        cy.contains("İsim Soyisim alanı boş bırakılamaz.")
        
        cy.get("[type=sumbit]").should("be.disabled")

    })

    it("email input girilen değer kontrolü",()=>{
        cy.get("[data-cy=test_email]").type("tuna@gmail.com").should("have.value","tuna@gmail.com");

        cy.get("[data-cy=test_email").clear()
        cy.contains("e-mail alanı boş bırakılamaz.")
        
        cy.get("[type=sumbit]").should("be.disabled")

    })

    it("password input girilen değer kontrolü",()=>{
        cy.get("[data-cy=test_password]").type("123456")

        cy.get("[data-cy=test_password").clear()
        cy.contains("password alanı boş bırakılamaz.")
        
        cy.get("[type=sumbit]").should("be.disabled")
    })

    it("check box tıklama kontrolü",()=>{
        cy.get("[data-cy=test_tos]").check()
        
        cy.get("[data-cy=test_tos").uncheck()
        cy.contains("Kullanım şartlarını onaylamanınız gerekmektedir.")
        
        cy.get("[type=sumbit]").should("be.disabled")

    })
    it("select kontrol testi",()=>{
        cy.get("[data-cy=test_select]").select("Mühendis")
     
    })
    it("Kullanıcı kaydetme testi",()=>{
        cy.get("[data-cy=test_name]").type("tuna")
        cy.get("[data-cy=test_email]").type("tuna@gmail.com")
        cy.get("[data-cy=test_password]").type("123456")
        cy.get("[data-cy=test_tos]").check()
        cy.get("[data-cy=test_select]").select("Mühendis")
        cy.get("[type=sumbit]").click();
    })
    
})
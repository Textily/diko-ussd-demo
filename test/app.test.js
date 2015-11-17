var vumigo = require('vumigo_v02');
var fixtures = require('./fixtures');
var AppTester = vumigo.AppTester;


describe("app", function() {
    describe("DikoApp", function() {
        var app;
        var tester;

        beforeEach(function() {
            app = new go.app.GoApp();

            tester = new AppTester(app);

            tester
                .setup.config.app({
                    name: 'test_app'
                })
                .setup(function(api) {
                    fixtures().forEach(api.http.fixtures.add);
                });
        });

        describe("when the user starts a session", function() {
            it("should present diko main menu", function() {
                return tester
                    .start()
                    .check.interaction({
                        state: 'states:main',
                        reply: [
                            'DIKO AGRI-GROUP',
                            '1. Buy Cow',
                            '2. Buy Sheep/Goat',
                            '3. Special',
                            '4. Delivery',
                            '5. Current Competition',
                            '6. Rate Us',
                            '7. About Diko',
                            '8. Exit'
                        ].join('\n')
                    })
                    .run();
            });
        });

        describe("when the user asks to delivery menu", function() {
            it("should present the delivery menu", function() {
                return tester
                    .setup.user.state('states:main')
                    .input('4')
                    .check.interaction({
                        state: 'states:delivery',
                        reply: [
                            'DIKO AGRI-GROUP\n\nWe offer free delivery\nanywhere around MAP\n',
                            '1. Back to Main',
                            '2. Exit'
                            ].join('\n')
                    })
                    .run();
            });
        });

        describe("when the user asks to see competitions menu", function() {
            it("should present the competition menu", function() {
                return tester
                    .setup.user.state('states:main')
                    .input('5')
                    .check.interaction({
                        state: 'states:competitions',
                        reply: [
                            'DIKO AGRI-GROUP\n2015 Festive Competition\nRefer anyone to us and\nwin your self a sheep worth R1000.00 :)\nAsk at our kraals for more info',
                            '1. Back to Main',
                            '2. Exit'
                            ].join('\n')
                    })
                    .run();
            });
        });

        describe("when the user asks to see the aboutus menu", function() {
            it("should present the aboutus menu", function() {
                return tester
                    .setup.user.state('states:main')
                    .input('7')
                    .check.interaction({
                        state: 'states:aboutus',
                        reply: [
                            'About DIKO AGRI-GROUP\nMission Statement\nVision & Values',
                            '1. Back to Main',
                            '2. Exit'
                            ].join('\n')
                    })
                    .run();
            });
        });


        describe("when the user asks to exit", function() {
            it("should say thank you and end the session", function() {
                return tester
                    .setup.user.state('states:main')
                    .input('8')
                    .check.interaction({
                        state: 'states:exit',
                        reply: 'Thank you! Demo ended.\nCreated by Textily (Pty.) Ltd'
                    })
                    .check.reply.ends_session()
                    .run();
            });
        });
    });
});

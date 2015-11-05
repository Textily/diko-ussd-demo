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
            it("should present the main menu", function() {
                return tester
                    .start()
                    .check.interaction({
                        state: 'states:main',
                        reply: [
                            'DIKO AGRI-GROUP',
                            '1. Get Cow',
                            '2. Get Sheep/Goat',
                            '3. Special',
                            '4. About Diko',
                            '5. Exit'
                        ].join('\n')
                    })
                    .run();
            });
        });

        describe("when the user asks to exit", function() {
            it("should say thank you and end the session", function() {
                return tester
                    .setup.user.state('states:main')
                    .input('5')
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

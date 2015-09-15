go.app = function() {
    var vumigo = require('vumigo_v02');
    var App = vumigo.App;
    var Choice = vumigo.states.Choice;
    var ChoiceState = vumigo.states.ChoiceState;
    var EndState = vumigo.states.EndState;
    var FreeText = vumigo.states.FreeText;

    var GoApp = App.extend(function(self) {
        App.call(self, 'states:main');

        self.states.add('states:main', function(name) {
            return new ChoiceState(name, {
                question: 'DIKO AGRI-GROUP',

                choices: [
                    new Choice('states:order', 'Order livesotck'),
                    new Choice('states:competition', 'Current Competition(s)'),
                    new Choice('states:special', 'Current Specials'),
                    new Choice('states:about', 'About Diko'),
                    new Choice('states:exit', 'Exit')],

                next: function(choice) {
                    return choice.value;
                }
            });
        });

        self.states.add('states:order', function(name){
            return new FreeText(name,{
                question: 'Enter you name, a consultant will call you back shortly: ',
                next: function(content){

                    self.contact.extra.join = content;

                    return self.im.contacts.save(self.contact).then(function(){
                        return "states:exit";
                    });
                }
            });
        });

        self.states.add('states:exit', function(name) {
            return new EndState(name, {
                text: 'Thank you! Demo ended. Created by Textily',
                next: 'states:main'
            });
        });
    });

    return {
        GoApp: GoApp
    };
}();
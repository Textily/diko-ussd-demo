// WARNING: This is a generated file.
//          If you edit it you will be sad.
//          Edit src/app.js instead.

var go = {};
go;

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
                    new Choice('states:cow', 'Get Cow'),
                    new Choice('states:sheep_goat', 'Get Sheep/Goat'),
                    new Choice('states:special', 'Special'),
                    new Choice('states:about', 'About Diko'),
                    new Choice('states:exit', 'Exit')],

                next: function(choice) {
                    return choice.value;
                }
            });
        });

        self.states.add('states:cow', function(name){
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

        self.states.add('states:sheep_goat', function(name){
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
                text: 'Thank you! Demo ended.\nCreated by Textily (Pty.) Ltd',
                next: 'states:main'
            });
        });
    });

    return {
        GoApp: GoApp
    };
}();
go.init = function() {
    var vumigo = require('vumigo_v02');
    var InteractionMachine = vumigo.InteractionMachine;
    var GoApp = go.app.GoApp;


    return {
        im: new InteractionMachine(api, new GoApp())
    };
}();

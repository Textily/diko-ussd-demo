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
                    new Choice('states:cow', 'Buy Cow'),
                    new Choice('states:sheep_goat', 'Buy Sheep/Goat'),
                    new Choice('states:special', 'Special'),
                    new Choice('states:delivery','Delivery'),
                    new Choice('states:competitions','Current Competition'),
                    new Choice('states:rateus','Rate Us'),
                    new Choice('states:aboutus', 'About Diko'),
                    new Choice('states:exit', 'Exit')],

                next: function(choice) {
                    return choice.value;
                }
            });
        });

        self.states.add('states:delivery', function(name) {
            return new ChoiceState(name, {
                question: 'DIKO AGRI-GROUP\n\nWe offer free delivery\nanywhere around MAP\n',

                choices: [
                    new Choice('states:main','Back to Main'),
                    new Choice('states:exit', 'Exit')],

                next: function(choice) {
                    return choice.value;
                }
            });
        });

        self.states.add('states:competitions', function(name) {
            return new ChoiceState(name, {
                question: 'DIKO AGRI-GROUP\n2015 Festive Competition\nRefer anyone to us and\nwin your self a sheep worth R1000.00 :)\nAsk at our kraals for more info',

                choices: [
                    new Choice('states:main','Back to Main'),
                    new Choice('states:exit', 'Exit')],

                next: function(choice) {
                    return choice.value;
                }
            });
        });

        self.states.add('states:aboutus', function(name) {
            return new ChoiceState(name, {
                question: 'About DIKO AGRI-GROUP\nMission Statement\nVision & Values',

                choices: [
                    new Choice('states:main','Back to Main'),
                    new Choice('states:exit', 'Exit')],

                next: function(choice) {
                    return choice.value;
                }
            });
        });

        self.states.add('states:rateus', function(name){
            return new FreeText(name,{
                question: 'On a scale of 1 to 10, how would you rate us?',
                next: function(content){

                    self.contact.extra.join = content;

                    return self.im.contacts.save(self.contact).then(function(){
                        return "states:exit";
                    });
                }
            });
        });

        self.states.add('states:cow', function(name){
            return new FreeText(name,{
                question: 'Enter your name, one of our kraals representative will call you back shortly:',
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
                question: 'Enter your name, one of our kraals representative will call you back shortly:',
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

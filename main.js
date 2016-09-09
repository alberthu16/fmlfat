/* *     Copyright (C) 2010-2016 Marvell International Ltd. *     Copyright (C) 2002-2010 Kinoma, Inc. * *     Licensed under the Apache License, Version 2.0 (the "License"); *     you may not use this file except in compliance with the License. *     You may obtain a copy of the License at * *      http://www.apache.org/licenses/LICENSE-2.0 * *     Unless required by applicable law or agreed to in writing, software *     distributed under the License is distributed on an "AS IS" BASIS, *     WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. *     See the License for the specific language governing permissions and *     limitations under the License. */import {    FieldScrollerBehavior,    FieldLabelBehavior} from 'field';import {    SystemKeyboard} from 'keyboard';
import {    HorizontalSlider, HorizontalSliderBehavior} from 'sliders';

import {    VerticalScroller,    VerticalScrollbar,    TopScrollerShadow,    BottomScrollerShadow} from 'scroller';

import {
	Button,
	ButtonBehavior
} from 'buttons';

import {     RadioGroup,     RadioGroupBehavior} from 'buttons';

var foodCalorieIndex = { 
	"Plate of Spaghetti":600, 
	"Banana":105,
	"Pop Tart":200,
	"Big Mac":563,
	"Medium Fries":365,
	"Taco":189,
	"Slice of bread":79,
	"Chocolate Cake":350,
	"Plate of Pad Thai":899,
	"IHOP Chorizo Fiesta Omelette":199,
	"Harmless Coconut Water (1 bottle)":120,
	"Boba milk tea with grass jelly":316,
	"Cup of black coffee":5,
	"Grande Caramel Frappucino":420
	};

var userSelectedFood;
var numCaloriesWanted;
var currInput = 0;
var finalQuantity = 0;
/**quantity control.*/
let nameInputSkin = new Skin({ borders: { left: 2, right: 2, top: 2, bottom: 2 }, stroke: 'gray' });let fieldStyle = new Style({ color: 'black', font: 'bold 24px', horizontal: 'center',    vertical: 'middle', left: 5, right: 40, top: 5, bottom: 5 });let fieldHintStyle = new Style({ color: '#aaa', font: '20px', horizontal: 'center',    vertical: 'middle', left: 5, right: 5, top: 5, bottom: 5 });let whiteSkin = new Skin({ fill: "white" });let fieldLabelSkin = new Skin({ fill: ['transparent', 'transparent', '#C0C0C0', '#acd473'] });let MyField = Container.template($ => ({     width: 150, height: 72, top: 0, contents: [        Scroller($, {             left: 4, right: 4, top: 4, bottom: 4, active: true,             Behavior: FieldScrollerBehavior, clip: true,             contents: [                Label($, {                     left: 0, top: 0, bottom: 0, skin: fieldLabelSkin,                     style: fieldStyle, anchor: 'NAME',                    editable: true, string: $.name,                    Behavior: class extends FieldLabelBehavior {                        onEdited(label) {                            let data = this.data;                            data.name = label.string;                            label.container.hint.visible = (data.name.length == 0);
                            currInput = data.name;                            trace("currInput" + currInput+"\n");                        }                    },                }),                Label($, {                    left: 4, right: 4, top: 4, bottom: 4, style: fieldHintStyle,                    string: "Enter quantity", name: "hint"                }),            ]        })    ]}));let quantityTemplate = Container.template($ => ({    left: 0, right: 0, top: 0, bottom: 0,     skin: whiteSkin, active: true,    contents: [        new MyField({name: ""})    ],    Behavior: class extends Behavior {        onTouchEnded(content) {            SystemKeyboard.hide();            content.focus();        }    }}));//let quantityContainer = new quantityTemplate();

/**var amountText = new Text({	height: 25, width: 100,
	left: 150, right: 40, top: 30,	skin: whiteSkin,	string: 'Hello World'});amountText.name = "amountText"; */


//let MySlider = HorizontalSlider.template($ => ({  //  height: 50, left: 50, right: 50, top: 50,    //Behavior: class extends HorizontalSliderBehavior {      //  onValueChanged(container) {        //	var amount = Math.round(this.data.value)          //  trace("Value is: " + amount + "\n");            //amountText.string = amount;        //}    //}//}));/**item radio.*/
let foodRadioStyle = new Style({ color: '#aaa', font: '10px',});

let MyRadioGroup = RadioGroup.template($ => ({    top: 20, bottom: 10, left: 20, right: 50,
    style:foodRadioStyle,    Behavior: class extends RadioGroupBehavior {        onRadioButtonSelected(buttonName) {
        	trace(buttonName+"\n");            trace("Radio button with name " + buttonName + " " + foodCalorieIndex[buttonName] + " was selected.\n");
            userSelectedFood = buttonName;
            numCaloriesWanted = foodCalorieIndex[userSelectedFood];
            if (currInput != null) {
            	numCaloriesWanted = currInput * numCaloriesWanted;
            }
			amountText.string = numCaloriesWanted + " calories total";        }    }}));



/**slider screen*//**let graySkin = new Skin({ fill: "gray" });let mainContainer = new Container({    left: 0, right: 0, top: 0, bottom: 0,    contents: [        //new MySlider({ min: 0, max: 10, value: 5 }),        //amountText    ]});*/

/**make scrollable*/
let scrollContainer = Container.template($ => ({    left: 0, right: 0, top: 0, bottom: 0,    contents: [        VerticalScroller($, {             active: true, top: 25, bottom: 0,            contents: [                $.pickAndChoose,                VerticalScrollbar(),                 ]                             }),        new Container({             top: 0, height: 0, left: 0, right: 0,            contents: [                new Label({ string: "Vertical Scroller Example" }),            ]        })    ],
    Behavior: class extends Behavior {        onTouchEnded(content) {            SystemKeyboard.hide();            content.focus();        }    }}));


/*button stuff*/
let addButtonTemplate = Button.template($ => ({
	top: 10, bottom: 10, left: 220, right: 65,
	contents: [
		Label( $, {left: 0, right: 0, height: 30, width: 20, string: ">>", skin: buttonSkin, style: buttonStyle})
	],
	Behavior: class extends ButtonBehavior {
		onTap(button) {
			trace("button tapped\n");
			application.remove(currentScreen);
		} 
	}
}));
let buttonSkin = new Skin({ fill: "#BF3100" });
let buttonStyle = new Style({color: 'white'});
let addButtonContainer = new Container({    left: 0, right: 0, top: 0, bottom: 0,    contents: [        new addButtonTemplate({ textForLabel: "Click Me!" })    ]});

/**adding first screen*/
let pickAndChoose = new Column({     top: 0, left: 0, right: 0, 
    skin: new Skin({ fill: '#EC9F05' }),
    style: foodRadioStyle,    contents: [
    	new quantityTemplate(),        new MyRadioGroup({buttonNames: "Plate of Spaghetti,Banana,Pop Tart,Big Mac,Medium Fries,Taco,Slice of bread,Chocolate Cake,Plate of Pad Thai,IHOP Chorizo Fiesta Omelette,Harmless Coconut Water (1 bottle),Boba milk tea with grass jelly,Cup of black coffee,Grande Caramel Frappuccino"}),
        new addButtonTemplate({ textForLabel: "Click Me!" })    ]});

//do not delete!!//var firstScreen = new scrollContainer({ pickAndChoose });//application.add(firstScreen);
//starting second screen


var amountText = new Text({	height: 25, width: 100,
	left: 40, right: 40, bottom: 150,	skin: whiteSkin,	string: '0 calories total'});amountText.name = "lalala";
var resultDisplay = new Column({
	contents: [
		amountText,
	]
});
application.add(resultDisplay);

//table goes here
let darkGraySkin = new Skin({ fill: "#202020" });let titleStyle = new Style({ font: "20px", color: "white" });let MainContainer = Container.template($ => ({    left: 0, right: 0, top: 0, bottom: 0,    contents: [        VerticalScroller($, {             active: true, top: 25, bottom: 0,            contents: [                $.contentToScrollVertically,                VerticalScrollbar(),                 TopScrollerShadow(),                 BottomScrollerShadow(),                ]                             }),        new Container({             top: 0, height: 25, left: 0, right: 0, skin: darkGraySkin,             style: titleStyle,             contents: [                new Label({ string: amountText.string }),            ]        })    ]}));

let contentToScrollVertically = new Column({     top: 0, left: 0, right: 0,     contents: [        ['#8EA604', '#F5BB00', '#EC9F05', '#D76A03', '#BF3100', '#8EA604', '#F5BB00', '#EC9F05', '#D76A03', '#BF3100', '#8EA604', '#F5BB00', '#EC9F05', '#D76A03'].map(color =>             new Container({ top: 0, height: 120, left: 0, right: 0,             skin: new Skin({ fill: color }) }))    ]})

let scrollerExample = new MainContainer({ contentToScrollVertically });application.add(scrollerExample);
//let MySlider = HorizontalSlider.template($ => ({  //  height: 50, left: 50, right: 50, top: 50,    //Behavior: class extends HorizontalSliderBehavior {      //  onValueChanged(container) {        //	var amount = Math.round(this.data.value)          //  trace("Value is: " + amount + "\n");            //amountText.string = amount;        //}    //}//}));
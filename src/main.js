/* *     Copyright (C) 2010-2016 Marvell International Ltd. *     Copyright (C) 2002-2010 Kinoma, Inc. * *     Licensed under the Apache License, Version 2.0 (the "License"); *     you may not use this file except in compliance with the License. *     You may obtain a copy of the License at * *      http://www.apache.org/licenses/LICENSE-2.0 * *     Unless required by applicable law or agreed to in writing, software *     distributed under the License is distributed on an "AS IS" BASIS, *     WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. *     See the License for the specific language governing permissions and *     limitations under the License. */import {    FieldScrollerBehavior,    FieldLabelBehavior} from 'field';import {    SystemKeyboard} from 'keyboard';
import {    HorizontalSlider, HorizontalSliderBehavior} from 'sliders';

import {    VerticalScroller,    VerticalScrollbar,    TopScrollerShadow,    BottomScrollerShadow} from 'scroller';

import {
	Button,
	ButtonBehavior
} from 'buttons';

import {    RadioGroup,    RadioGroupBehavior} from 'buttons';

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
var tableOfFood;
var currInput;
var finalQuantity = 0;
/**quantity control.*/
let nameInputSkin = new Skin({ borders: { left: 2, right: 2, top: 2, bottom: 2 }, stroke: 'gray' });let fieldStyle = new Style({ color: 'black', font: 'bold 24px', horizontal: 'center',    vertical: 'middle', left: 5, right: 40, top: 5, bottom: 5 });let fieldHintStyle = new Style({ color: '#aaa', font: '20px', horizontal: 'center',    vertical: 'middle', left: 5, right: 5, top: 5, bottom: 5 });let whiteSkin = new Skin({ fill: "white" });let fieldLabelSkin = new Skin({ fill: ['transparent', 'transparent', '#C0C0C0', '#acd473'] });let MyField = Container.template($ => ({    width: 150, height: 72, top: 0, contents: [        Scroller($, {            left: 4, right: 4, top: 4, bottom: 4, active: true,            Behavior: FieldScrollerBehavior, clip: true,            contents: [                Label($, {                    left: 0, top: 0, bottom: 0, skin: fieldLabelSkin,                    style: fieldStyle, anchor: 'NAME',                    editable: true, string: $.name,                    Behavior: class extends FieldLabelBehavior {                        onEdited(label) {                            let data = this.data;                            data.name = label.string;                            label.container.hint.visible = (data.name.length == 0);
                            currInput = data.name;                            trace("currInput 95:" + currInput+"\n");                        }                    },                }),                Label($, {                    left: 4, right: 4, top: 4, bottom: 4, style: fieldHintStyle,                    string: "Enter quantity", name: "hint"                }),            ]        })    ]}));let quantityTemplate = Container.template($ => ({    left: 0, right: 0, top: 0, bottom: 0,    skin: whiteSkin, active: true,    contents: [        new MyField({name: ""})    ],    Behavior: class extends Behavior {        onTouchEnded(content) {            SystemKeyboard.hide();            content.focus();        }    }}));/**item radio.*/
let foodRadioStyle = new Style({ color: '#aaa', font: '10px',});

let MyRadioGroup = RadioGroup.template($ => ({    top: 20, bottom: 10, left: 20, right: 50,
    style:foodRadioStyle,    Behavior: class extends RadioGroupBehavior {        onRadioButtonSelected(buttonName) {
        	trace(buttonName+"\n");            trace("Radio button with name " + buttonName + " " + foodCalorieIndex[buttonName] + " was selected.\n");
            userSelectedFood = buttonName;
            numCaloriesWanted = foodCalorieIndex[buttonName];
            if (currInput != null) {
  				trace("currInput 160 " + currInput + "\n");
            	numCaloriesWanted = currInput * foodCalorieIndex[buttonName];
            }
	//		amountText.string = numCaloriesWanted + " calories total";
			trace("calories wanted: " + numCaloriesWanted + "\n");
	//		amountText.string = numCaloriesWanted;
	//		trace("line 164"+ amountText.string + "\n");        }    }}));

/**make scrollable*/
let scrollContainer = Container.template($ => ({    left: 0, right: 0, top: 0, bottom: 0,    contents: [        VerticalScroller($, {            active: true, top: 25, bottom: 0,            contents: [                $.pickAndChoose,                VerticalScrollbar(),            ]        }),        new Container({            top: 0, height: 0, left: 0, right: 0,            contents: [                new Label({ string: "Vertical Scroller Example" }),            ]        })    ],
    Behavior: class extends Behavior {        onTouchEnded(content) {            SystemKeyboard.hide();            content.focus();        }    }}));

//table goes here
let darkGraySkin = new Skin({ fill: "#202020" });let titleStyle = new Style({ font: "20px", color: "white" });let mainSecond = Container.template($ => ({    left: 0, right: 0, top: 0, bottom: 0,    contents: [        VerticalScroller($, {            active: true, top: 25, bottom: 0,            contents: [                $.tableOfFood,            ]        }),        new Container({            top: 0, height: 25, left: 0, right: 0, skin: darkGraySkin,            style: titleStyle,            contents: [                new Label({ string: numCaloriesWanted + " calories total" }),            ]        })    ]}));

/*button stuff*/
let addButtonTemplate = Button.template($ => ({
	top: 10, bottom: 10, left: 220, right: 65,
	contents: [
		Label( $, {left: 0, right: 0, height: 30, width: 20, string: ">>", skin: buttonSkin, style: buttonStyle})
	],
	Behavior: class extends ButtonBehavior {
		onTap(button) {
			trace("button tapped\n");
			tableOfFood = new Column({			    top: 0, left: 0, right: 0,			    contents: [			        [['#1ACC45', 'Plate of Spaghetti', Math.round(numCaloriesWanted / foodCalorieIndex['Plate of Spaghetti'] * 100)/100],
			        ['#79FFBF', 'Banana', Math.round(numCaloriesWanted / foodCalorieIndex['Banana']* 100)/100],
			        ['#FF6F3A', 'Pop Tart', Math.round(numCaloriesWanted / foodCalorieIndex['Pop Tart']* 100)/100],
			        ['#998060', 'Big Mac', Math.round(numCaloriesWanted / foodCalorieIndex['Big Mac']* 100)/100],
			        ['#CC7E1A', 'Medium Fries', Math.round(numCaloriesWanted / foodCalorieIndex['Medium Fries']* 100)/100],
			        ['#1ACC45', 'Taco', Math.round(numCaloriesWanted / foodCalorieIndex['Taco']* 100)/100],
			        ['#79FFBF', 'Slice of bread', Math.round(numCaloriesWanted / foodCalorieIndex['Slice of bread']* 100)/100],
			        ['#FF6F3A','Chocolate Cake', Math.round(numCaloriesWanted / foodCalorieIndex['Chocolate Cake']* 100)/100],
			        ['#998060', 'Plate of Pad Thai', Math.round(numCaloriesWanted / foodCalorieIndex['Plate of Pad Thai']* 100)/100],
			        ['#CC7E1A', 'IHOP Chorizo Fiesta Omelette', Math.round(numCaloriesWanted / foodCalorieIndex['IHOP Chorizo Fiesta Omelette']* 100)/100],
			        ['#1ACC45', 'Harmless Coconut Water (1 bottle)', Math.round(numCaloriesWanted / foodCalorieIndex['Harmless Coconut Water (1 bottle)']* 100)/100],			        ['#79FFBF', 'Boba milk tea with grass jelly', Math.round(numCaloriesWanted / foodCalorieIndex['Boba milk tea with grass jelly']* 100)/100],			        ['#FF6F3A', 'Cup of black coffee', Math.round(numCaloriesWanted / foodCalorieIndex['Cup of black coffee']* 100)/100],			        ['#998060', 'Grande Caramel Frappuccino', Math.round(numCaloriesWanted / foodCalorieIndex['Grande Caramel Frappucino'], -2)],].map(color => 			            new Container({ top: 0, height: 60, left: 0, right: 0,			            skin: new Skin({ fill: color[0] }),
			            contents: [
			            	new Text({ top: 20, bottom: 0, left: 50, right: 150, string: color[2] }), //quantity			                new Text({ top: 20, bottom: 0, left: 150, right: 50, string: color[1] }) //item name			            ]
			             })),			    ]			});
			var secondPage = new mainSecond({ tableOfFood });
			application.remove(firstScreen);
			application.add(secondPage);
		}
	}
}));
let buttonSkin = new Skin({ fill: "#BF3100" });
let buttonStyle = new Style({color: 'white'});
let addButtonContainer = new Container({    left: 0, right: 0, top: 0, bottom: 0,    contents: [        new addButtonTemplate({ textForLabel: "Click Me!" })    ]});

/**adding first screen*/
let pickAndChoose = new Column({    top: 0, left: 0, right: 0,
    skin: new Skin({ fill: '#EC9F05' }),
    style: foodRadioStyle,    contents: [
    	new quantityTemplate(),        new MyRadioGroup({buttonNames: "Plate of Spaghetti,Banana,Pop Tart,Big Mac,Medium Fries,Taco,Slice of bread,Chocolate Cake,Plate of Pad Thai,IHOP Chorizo Fiesta Omelette,Harmless Coconut Water (1 bottle),Boba milk tea with grass jelly,Cup of black coffee,Grande Caramel Frappuccino"}),
        new addButtonTemplate({ textForLabel: "Click Me!" })    ]});

//do not delete!!var firstScreen = new scrollContainer({ pickAndChoose });application.add(firstScreen);
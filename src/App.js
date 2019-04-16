import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import DisplayField from "./DisplayField.js";
import NumberInputField from "./NumberInputField.js";
import SelectInputField from "./SelectInputField.js";
import InputTextField from "./InputTextField.js";

class DynamicForm extends React.Component {
    constructor(props) {
        super(props);
        const bmiReferenceProps = {
            id: "bmi",
            observationName: "BMI - Body mass index",
            dataElements: [
                {
                    id: "name",
                    displayName: "Name",
                    type: "textInput",
                    display: true,
                    isRequired: true
                },
                {
                    id: "gender",
                    displayName: "Gender",
                    type: "select",
                    options: [
                        {
                            id: 1,
                            name: "Male",
                            isDefault: true,
                            sortOrder: 1
                        },
                        {
                            id: 2,
                            name: "Female",
                            isDefault: false,
                            sortOrder: 2
                        }
                    ],
                    display: true,
                    isRequired: false
                },
                {
                    id: "weight",
                    displayName: "Weight",
                    unitOfMeasure: "kg",
                    type: "numberInput",
                    bounds: {
                        upperLimit: 1000
                    },
                    display: true,
                    isRequired: true
                },
                {
                    id: "height",
                    displayName: "Height",
                    unitOfMeasure: "cm",
                    type: "numberInput",
                    bounds: {
                        upperLimit: 300
                    },
                    display: true,
                    isRequired: true
                },
                {
                    id: "bmi",
                    displayName: "BMI",
                    unitOfMeasure: "kg/m2",

                    type: "numberInput",
                    bounds: {
                        upperLimit: 100
                    },
                    display: false,
                    isRequired: false
                }
            ]
        };

        const headCircumferenceReferenceProps = {
            id: "head-circumference",
            observationName: "Head Circumference",
            dataElements: [
                {
                    id: "name",
                    displayName: "Name",
                    type: "textInput",
                    display: true,
                    isRequired: true
                },
                {
                    id: "gender",
                    displayName: "Gender",
                    type: "select",
                    options: [
                        {
                            id: 1,
                            name: "Male",
                            isDefault: true,
                            sortOrder: 1
                        },
                        {
                            id: 2,
                            name: "Female",
                            isDefault: false,
                            sortOrder: 2
                        }
                    ],
                    display: true,
                    isRequired: false
                },
                {
                    id: "head-circumference",
                    displayName: "Head Circumference",
                    unitOfMeasure: "cm",
                    type: "numberInput",
                    bounds: {
                        upperLimit: 1000
                    },
                    display: true,
                    isRequired: true
                }
            ]
        };

        this.state = headCircumferenceReferenceProps; //Choose the sample set you would like to use
        this.state = {
            dataElements: this.state.dataElements
        };
        this.submitForm = event => {
            const { dataElements, ...inputFields } = this.state;

            console.log(inputFields);
            event.preventDefault();
        };

        this._handleChange = event => {
            this.state = {
                ...this.state,
                [event.currentTarget.id]: event.currentTarget.value
            };
        };

        this.updateBMI = event => {
            this.state = {
                ...this.state
            };
        };
    }

    render() {
        const { dataElements } = this.state;
        return (
            <form onSubmit={this.submitForm}>
                {dataElements.map(form => {
                    if (!form.display) {
                        return (
                            <DisplayField
                                id={form.id}
                                displayName={form.displayName}
                                unitOfMeasure={form.unitOfMeasure}
                                value={
                                    this.state.weight
                                    //Math.pow(this.state.height / 100, 2)
                                }
                                _handleChange={this.updateBMI}
                                //value={
                                //     this.state.weight /
                                //     Math.pow(this.state.height / 100, 2)
                                // }
                            />
                        );
                    } else {
                        if (form.type === "textInput") {
                            var pattern;
                            var errorMessage;
                            if (form.id === "name") {
                                pattern = "(\\w.+\\s).+";
                                errorMessage =
                                    "Please type in your first and last name, your first name must be at least two letters long.";
                            }
                            return (
                                <InputTextField
                                    id={form.id}
                                    displayName={form.displayName}
                                    isRequired={form.isRequired}
                                    key={form.displayName}
                                    _handleChange={this._handleChange}
                                    unitOfMeasure={form.unitOfMeasure}
                                    pattern={pattern}
                                    errorMessage={errorMessage}
                                />
                            );
                        }
                        if (form.type === "select") {
                            return (
                                <SelectInputField
                                    id={form.id}
                                    displayName={form.displayName}
                                    isRequired={form.isRequired}
                                    val={form.options}
                                    key={form.displayName}
                                    _handleChange={this._handleChange}
                                />
                            );
                        }
                        if (form.type === "numberInput") {
                            return (
                                <NumberInputField
                                    id={form.id}
                                    displayName={form.displayName}
                                    isRequired={form.isRequired}
                                    minInput={form.bounds.lowerLimit}
                                    maxInput={form.bounds.upperLimit}
                                    _handleChange={this._handleChange}
                                    unitOfMeasure={form.unitOfMeasure}
                                />
                            );
                        }
                    }
                })}

                <input type="submit" />
            </form>
        );
    }
}

export default DynamicForm;

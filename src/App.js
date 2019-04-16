import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class DynamicForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
        dataElements: [
          {
          displayName: "purpose of loan",
          id: "testFieldName",
          type: "textInput",
          isRequired: true,
        },
        {
         displayName: "select your gender",
         id: "Gender",
         type: "select",
         isRequired: true,
         options: [
             "male",
          "female",
         ]
        }
      ]
    }
    
    this.submitForm = event => {
        const {dataElements, ...inputFields} = this.state;
      console.log(inputFields);
      event.preventDefault();
    }
    
    this._handleChange = event => {
      this.state = {
          ...this.state,
          [event.currentTarget.id]: event.currentTarget.value
      }
    };
  }

  render() {
    const InputTextField = ({id, displayName, isRequired, _handleChange}) => (
      <div>
        <input
          type = "text"
          id = {id}
          required = {isRequired}
          autoComplete = "off"
          placeholder = {displayName}
          onChange = {_handleChange}
          />
      </div>
    );
    
  const SelectInputField = ({id, displayName, isRequired, val, _handleChange}) => (
  
  <div >
  <label>{displayName}</label>
    <select id = {id} required = {isRequired} onChange = {_handleChange}>
      <option value = "" selected disabled hidden>Choose here</option>
      {val.map(options =><option value = {options} key = {options}> {options}</option>)}
    </select>
  </div>
  );
  
  const NumberInputField = ({id, displayName, isRequired, val, _handleChange}) => (
    <div>
    <input 
      type="number"
      id="tentacles"
      name="tentacles"
      min="10"
      max="100"
      />
      </div>
  );
  
  const DisplayField = ({id, displayName, isRequired, value}) => (
    <div>
      <label>{displayName}: {value}</label>
      <input
        type = "number"
        id = {id}
        placeholder = "0"
        disabled
      />
    </div>
  );

  const {dataElements} = this.state
    return (
        <form onSubmit = {this.submitForm}>
          {dataElements.map(form => {
            if(form.type === "textInput") {
              return (
                <InputTextField
                id = {form.id}
                displayName = {form.displayName}
                isRequired = {form.isRequired}
                key = {form.displayName}
                _handleChange = {this._handleChange}
              />
            );
          }
          if(form.type === "select") {
              return (
                <SelectInputField
                id = {form.id}
                displayName = {form.displayName}
                isRequired = {form.isRequired}
                val = {form.options}
                key = {form.displayName}
                _handleChange = {this._handleChange}
              />
            );
          }
          if(form.display === "false") {
            return (
              <DisplayField
                id = {form.id}
                displayName = {form.displayName}
              />
            )
          }
        })}
        <NumberInputField 
        //id = {form.id}
        />
        <input type = "submit" />
      </form>
    )
  }
}
//ReactDOM.render(<DynamicForm />, document.querySelector("#app"))

export default DynamicForm;
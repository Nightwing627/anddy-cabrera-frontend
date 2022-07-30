import React, { useState, Fragment, useRef, useEffect } from "react";
import { Form } from "react-bootstrap";
import "../App.css";

const SelectAutocomplete = ({
  suggestions,
  setSelection,
  requiredField,
  value,
  isEditable = false,
}) => {
  const [isDisabled, setIsDisabled] = useState(isEditable);
  // The active selection's index
  const [activeSuggestion, setActiveSuggestion] = useState(0)
  // The suggestions that match the user's input
  const [filteredSuggestions, setFilteredSuggestions] = useState([])
  // Whether or not the suggestion list is shown
  const [showSuggestions, setShowSuggestions] = useState(false)
  // What the user has entered
  const [userInput, setUserInput] = useState(value || "");

  const inputRef = useRef();

  const onFocus = (e) => {
    e.preventDefault()
    setFilteredSuggestions(suggestions)
    setShowSuggestions(true)
  };

  useEffect(() => {
    if(value){
      setUserInput(value);
    }else{ 
      setUserInput('');
    }
  },[value]);

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setShowSuggestions(false)
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const onChange = (e) => {
    const userInput = e.currentTarget.value;

    // Filter our suggestions that don't contain the user's input
    const filteredSuggestions = suggestions.filter(
      (suggestion) =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );
    suggestions.filter((suggestion, index) => {
      if (suggestion === e.currentTarget.value) {
        setActiveSuggestion(index)
      }
    })
    setFilteredSuggestions(filteredSuggestions)
    setShowSuggestions(true)
    setUserInput(e.currentTarget.value)
    setSelection && setSelection(e.currentTarget.value);
  };

  const onClick = (e) => {
    e.preventDefault()
    suggestions.filter((suggestion, index) => {
      if(suggestion === e.currentTarget.innerText) {
        setActiveSuggestion(index)
      }
    })
    setFilteredSuggestions([])
    setShowSuggestions(false)
    setUserInput(e.currentTarget.innerText)
    setSelection && setSelection(e.currentTarget.innerText);
  };

  const onKeyDown = (e) => {
    // User pressed the enter key
    if (e.keyCode === 13) {
      e.preventDefault()

      setActiveSuggestion(0)
      setShowSuggestions(false)
      setUserInput(filteredSuggestions[activeSuggestion])
      setSelection && setSelection(filteredSuggestions[activeSuggestion]);
    }
    // User pressed the up arrow
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }

      setActiveSuggestion(activeSuggestion - 1)
    }
    // User pressed the down arrow
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }

      setActiveSuggestion(activeSuggestion + 1)
    }
  };

  const onPress = () => {
    if (!isDisabled) {
      setFilteredSuggestions(suggestions)
      setShowSuggestions(!showSuggestions)
    }
  };

  const handleEdit = () => {
    setIsDisabled(false)
  };

  const suggestionsListComponent = () => {
    if (showSuggestions) {
      if (filteredSuggestions.length) {
        return (
          <ul className="suggestions w-100 mb-0">
            {filteredSuggestions.map((suggestion, index) => {
              let className;

              // Flag the active suggestion with a class
              if (index === activeSuggestion) {
                className = "suggestion-active";
              }

              return (
                <li className={className} key={suggestion} onClick={onClick}>
                  {suggestion}
                </li>
              );
            })}
          </ul>
        );
      } else {
        return (
          <div className="no-suggestions w-100">
            <em>No Options</em>
          </div>
        );
      }
    }
  };

  return (
    <Fragment>
      <Form
        id="form-validation"
        noValidate
        validated={!userInput && requiredField}
      >
        <div ref={inputRef}>
          <Form.Group>
            <div className="d-flex w-100 align-items-center">
              <div className={`picker-con w-100 ${isDisabled && 'opacity-50' }`}>
                <Form.Control
                  type="text"
                  className="form-control background-remove"
                  name="full-name"
                  required
                  autofocus
                  placeholder="Select..."
                  onChange={onChange}
                  onFocus={onFocus}
                  onKeyDown={onKeyDown}
                  value={userInput}
                  disabled={isDisabled}
                />
                <div className="divider-con" onClick={onPress}>
                  <span className="divider"></span>
                  <div className="dropdown-sign">&#709;</div>
                </div>
              </div>
              {isEditable && (
                <a
                  className={`btn btn-sm ${
                    !isDisabled ? "ml-2 btn-icon-split" : "px-2 py-1"
                  }`}
                  onClick={() => handleEdit()}
                >
                  <span className={!isDisabled ? "icon text-black-50" : ""}>
                    <i className="fas fa-pencil" />
                  </span>
                </a>
              )}
            </div>
            <Form.Control.Feedback
              type="invalid"
              className={!userInput && requiredField ? "d-block" : ""}
            >
              Required.
            </Form.Control.Feedback>
          </Form.Group>
          <div className="d-flex w-100">
            {suggestionsListComponent()}
            {isEditable && showSuggestions && (
              <div
                className={`btn btn-icon-split btn-sm invisible ${
                  !isDisabled ? "ml-2" : "px-2 py-1"
                }`}
              >
                <span className={!isDisabled ? "icon text-black-50" : ""}>
                  <i className="fas fa-pencil" />
                </span>
              </div>
            )}
          </div>
        </div>
      </Form>
    </Fragment>
  );
};

export default SelectAutocomplete;

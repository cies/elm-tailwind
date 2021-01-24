module Tailwind.CustomFormClasses exposing (..)

import Tailwind.Types exposing (TailwindClass(..))

{-

# Classes and their definitions

@docs form_checkbox, form_input, form_multiselect, form_radio, form_select, form_textarea

-}


{-| Maps to the "form-checkbox" Tailwind class, defined as:

    .form-checkbox {
    -webkit-appearance: none;
       -moz-appearance: none;
            appearance: none;
    -webkit-print-color-adjust: exact;
            color-adjust: exact;
    display: inline-block;
    vertical-align: middle;
    background-origin: border-box;
    -webkit-user-select: none;
       -moz-user-select: none;
        -ms-user-select: none;
            user-select: none;
    flex-shrink: 0;
    height: 1em;
    width: 1em;
    color: #4299e1;
    background-color: #fff;
    border-color: #e2e8f0;
    border-width: 1px;
    border-radius: 0.25rem;
    }
    .form-checkbox:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
      border-color: #63b3ed;
    }

-}
form_checkbox : TailwindClass
form_checkbox =
    TailwindClass "form-checkbox"


{-| Maps to the "form-input" Tailwind class, defined as:

    .form-input {
    -webkit-appearance: none;
       -moz-appearance: none;
            appearance: none;
    background-color: #fff;
    border-color: #e2e8f0;
    border-width: 1px;
    border-radius: 0.25rem;
    padding-top: 0.5rem;
    padding-right: 0.75rem;
    padding-bottom: 0.5rem;
    padding-left: 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    }
    .form-input:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
      border-color: #63b3ed;
    }

-}
form_input : TailwindClass
form_input =
    TailwindClass "form-input"


{-| Maps to the "form-multiselect" Tailwind class, defined as:

    .form-multiselect {
    -webkit-appearance: none;
       -moz-appearance: none;
            appearance: none;
    background-color: #fff;
    border-color: #e2e8f0;
    border-width: 1px;
    border-radius: 0.25rem;
    padding-top: 0.5rem;
    padding-right: 0.75rem;
    padding-bottom: 0.5rem;
    padding-left: 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    }
    .form-multiselect:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
      border-color: #63b3ed;
    }

-}
form_multiselect : TailwindClass
form_multiselect =
    TailwindClass "form-multiselect"


{-| Maps to the "form-radio" Tailwind class, defined as:

    .form-radio {
    -webkit-appearance: none;
       -moz-appearance: none;
            appearance: none;
    -webkit-print-color-adjust: exact;
            color-adjust: exact;
    display: inline-block;
    vertical-align: middle;
    background-origin: border-box;
    -webkit-user-select: none;
       -moz-user-select: none;
        -ms-user-select: none;
            user-select: none;
    flex-shrink: 0;
    border-radius: 100%;
    height: 1em;
    width: 1em;
    color: #4299e1;
    background-color: #fff;
    border-color: #e2e8f0;
    border-width: 1px;
    }
    .form-radio:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
      border-color: #63b3ed;
    }

-}
form_radio : TailwindClass
form_radio =
    TailwindClass "form-radio"


{-| Maps to the "form-select" Tailwind class, defined as:

    .form-select {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23a0aec0'%3e%3cpath d='M15.3 9.3a1 1 0 0 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 1.4-1.4l3.3 3.29 3.3-3.3z'/%3e%3c/svg%3e");
    -webkit-appearance: none;
       -moz-appearance: none;
            appearance: none;
    -webkit-print-color-adjust: exact;
            color-adjust: exact;
    background-repeat: no-repeat;
    background-color: #fff;
    border-color: #e2e8f0;
    border-width: 1px;
    border-radius: 0.25rem;
    padding-top: 0.5rem;
    padding-right: 2.5rem;
    padding-bottom: 0.5rem;
    padding-left: 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    background-position: right 0.5rem center;
    background-size: 1.5em 1.5em;
    }
    .form-select {
      padding-right: 0.75rem;
    }
    .form-select:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
      border-color: #63b3ed;
    }

-}
form_select : TailwindClass
form_select =
    TailwindClass "form-select"


{-| Maps to the "form-textarea" Tailwind class, defined as:

    .form-textarea {
    -webkit-appearance: none;
       -moz-appearance: none;
            appearance: none;
    background-color: #fff;
    border-color: #e2e8f0;
    border-width: 1px;
    border-radius: 0.25rem;
    padding-top: 0.5rem;
    padding-right: 0.75rem;
    padding-bottom: 0.5rem;
    padding-left: 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    }
    .form-textarea:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
      border-color: #63b3ed;
    }

-}
form_textarea : TailwindClass
form_textarea =
    TailwindClass "form-textarea"


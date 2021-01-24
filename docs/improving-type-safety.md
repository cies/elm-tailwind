# Ideas for Improvement

This library is mostly for autocomplete and avoiding spelling errors at the moment.

More type safety could be added to the API, for instance by adding type safety to [Tailwinds spacing rules](https://tailwindcss.com/docs/spacing/#app):

    spacing : SpacingFlavor -> Side -> SpacingLength -> String

    type SpacingFlavor
        = Padding
        | Margin
        | NegMargin

    type Side
        = All
        | Top
        | Left
        | Right
        | Bottom
        | X
        | Y

    type SpacingLength
        = S0
        | S1
        | S2
        | S3
        | S4
        | S5
        | S6
        | S7
        | S8
        | Spx
        | Sauto

And a vertical padding could be expressed as:

`padding Y S2`


module Tailwind exposing (tailwindCustomFormsCssCdn, tailwindWithDarkCssCdn, tailwind, withClasses, asClasses)

{-| A small library that makes using [tailwind.css](https://tailwindcss.com/docs/what-is-tailwind/) a little easier and a little safer to use within Elm.

You'll find classes responding to Tailwind rules in Tailwind.Classes.

In there you'll also find functions for appending responsive qualifiers to those classes. Here's an example of what a div using tailwind might look like:

        div
            [ tailwind
                <| withClasses [ "__login_page" ] -- __login_page is not a tailwind class, it's just for marking the div's purpose.
                <| [ m_1, lg m_6 ]
            ]

@docs stylesheet, tailwind, withClasses, asClasses

-}

import Html
import Html.Attributes exposing (href, rel)
import Tailwind.Types exposing (TailwindClass(..))


{-| An HTML "link" tag refering to an unpurged (huge) minified version of the Tailwind (including dark) 2.0.2 stylesheet on the JSDelivr CDN.
-}
tailwindWithDarkCssCdn : Html.Html msg
tailwindWithDarkCssCdn =
    Html.node "link" [ rel "stylesheet", href "https://cdn.jsdelivr.net/npm/tailwindcss@2.0.2/dist/tailwind-dark.min.css" ] []

{-| An HTML "link" tag refering to a minified version of the Tailwind Custom Forms 0.2.1 stylesheet on the JSDelivr CDN.
-}
tailwindCustomFormsCssCdn : Html.Html msg
tailwindCustomFormsCssCdn =
    Html.node "link" [ rel "stylesheet", href "https://cdn.jsdelivr.net/npm/@tailwindcss/custom-forms@0.2.1/dist/custom-forms.min.css" ] []

{-| A convenience function for specifying classes as a list of strings
-}
tailwind : List TailwindClass -> Html.Attribute msg
tailwind cs =
    let
        folder (TailwindClass c) memo =
            memo ++ " " ++ c
    in
    Html.Attributes.class <| String.trimLeft <| List.foldl folder "" cs


{-| A convenience function for adding non-tailwind classes to an element alongside other tailwind classes.
Could be used like this:

    div
        [ tailwind
            <| withClasses [ "superfunclass" ]
            <| [ sm mt_1 ]
        ]

-}
withClasses : List String -> List TailwindClass -> List TailwindClass
withClasses cs twCs =
    twCs ++ List.map TailwindClass cs


{-| Turns tailwind classes into normal strings, for when you just want a list of strings instead of an Html.Attribute.
-}
asClasses : List TailwindClass -> List String
asClasses twCs =
    List.map (\(TailwindClass c) -> c) twCs

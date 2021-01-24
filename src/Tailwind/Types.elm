module Tailwind.Types exposing (TailwindClass(..))

{-| By this type only Tailwind classes are allowed to be passed to the classes function, and not classes for some other CSS utility library. (Can help with refactoring) -}
type TailwindClass = TailwindClass String


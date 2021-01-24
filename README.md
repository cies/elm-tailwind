<p>
    <a href="https://tailwindcss.com/" target="_blank">
      <img alt="Tailwind CSS" width="350" src="https://refactoringui.nyc3.cdn.digitaloceanspaces.com/tailwind-logo.svg">
    </a><br>
    A utility-first CSS framework for rapidly building custom user interfaces.
</p>

------

elm-tailwind
============

Elm bindings to [Tailwind](https://tailwindcss.com) **2.0.2** and [Tailwind Custom Forms](https://tailwindcss-custom-forms.netlify.app) **0.2.1**.

Makes using these in your Elm app a little easier. A bit more type safe than referring to Tailwind CSS classes with strings and helps with auto complete. 

**Note:** this is a fork of splodingsocks/elm-tailwind with incrementally new added features.

Classes corresponding to Tailwind rules, and functions for appending responsive qualifiers, in `Tailwind.Classes`.

Custom Forms classes in `Tailwind.CustomForms`.


### Tailwind CSS rules as strings VS elm-tailwind

Here an example of how the developer experience changes when using **elm-tailwind**.

Tailwind rules as strings:

    view model : Model -> Html Msg
    view model =
        div
            -- `__login_page` is regular (not Tailwind) CSS class
            [ class "__login_page m_1 lg:m_6" ] 
            [ text "content" ]

Using elm-tailwind:

    view model : Model -> Html Msg
    view model =
        div
            [ tailwind
                <| withClasses [ "__login_page" ]
                <| [ m_1, lg m_6 ]
            ]
            [ text "content" ]


### Conversion rules

Valid CSS class names are not valid names in Elm.
For instance `px-4` is not a valid function name in Elm.

The following conversion rules are applied (top to bottom) to avoid illegal names:

* `:` becomes `__`, for instance `hover:bg-red-50` becomes `hover__bg_red_50`
* `-m` becomes `neg_m`, for instance `-my-3` becomes `neg_my_3`
* `-` becomes `neg`, for instance `-space-x-6` becomes `negspace_x_6`
* `-` becomes `_`, for instance `x-3` becomes `x_3`
* `.` (in decimals) becomes `dot`, for instance `x-0.5` becomes `x_0dot5`
* `/` (in fractions) becomes `over`, for instance `w-2/6` becomes `w_2over6`
* `2xl` (only the responsive variation) becomes `xxl`, for instance `2xl:w-32` becomes `xxl__w_32`


### Usage in production

Tailwind provides a lot of classes, it's CSS files are big, and usually only a small part of the CSS classes are actually used.
It is therefor common for projects using Tailwind to process their CSS with [PurgeCSS](https://purgecss.com) in combination with [PostCSS](https://postcss.org) when making production builds.

How to set this up with Elm is beyond the scope of this README. A contribution by documentation or a starter project would be greatly appreciated.


### Development

To improve this library (like creating a new version in line with a new version of Tailwind CSS) look into the `./script/` directory.
There you find `generate-elm.js`, the script to re-generate the `./src/Tailwind/*.elm` files, and an accompanying `package.json` which specifies the Tailwind version.

To generate run:

    cd scripts
    npm install
    npm run generate


### Release notes

* `2.0.0` — Generated from **Tailwind v2.0.2**, added **Tailwind Custom Forms v0.2.1**, improved docs, dependencies in `./scripts/package.json`
* `1.0.0` — Generated from an unknown version of Tailwind


### License

This project is [ISC licensed](https://en.wikipedia.org/wiki/ISC_license):

> Copyright 2017 Murphy Randle
>
> Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.
>
> THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

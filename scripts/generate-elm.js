// Copyright 2007 Gage Peterson
// Copyright 2007 Murphy Randle

const postcss = require('postcss');
const _ = require('lodash');

fs = require('fs');
const read = (fn) => fs.readFileSync(fn, 'utf8');
const tailwindBaseWithDarkPath = './node_modules/tailwindcss/dist/tailwind-dark.css';
const tailwindCustomFormsPath = './node_modules/@tailwindcss/custom-forms/dist/custom-forms.css';


const objToElmTailwindClassFunction = obj => `
{-| Maps to the "${obj.name}" Tailwind class, defined as:

    ${obj.def}

-}
${obj.elmName} : TailwindClass
${obj.elmName} =
    TailwindClass "${obj.name}"

`;


const elmTailwindBaseWithDarkTemplate = objects =>
`module Tailwind.Classes exposing (..)

import Tailwind.Types exposing (TailwindClass(..))

{-|

These functions correspond to classes in Tailwind. __NOTE__: this file is generated \`scripts/generate-elm.js\`

# Responsive variant helpers

@docs sm, md, lg, xl, xxl

# group-hover variant helper

@docs groupHover

# Dark variant helper

@docs dark

# Using these docs

To use this library you probably want to refer mostly to the [tailwind docs](https://tailwindcss.com).

On top of that the conversion rules as explained in this project's __README__ are helpful in translating the Tailwind CSS class names to the names explosed by the module.

# Classes and their definitions

@docs ${objects.map(({ elmName }) => elmName).join(', ')}

-}

{-| Add a size prefix to the tailwind rule, making it only apply to that screen size and above.
  Notice, doesn't make sure the class being passed in is going to work with a responsive prefix: not all tailwind rules are responsive-capable.
-}
sm : TailwindClass -> TailwindClass
sm (TailwindClass c) =
  TailwindClass ("sm:" ++ c)

{-| Add a size prefix to the tailwind rule, making it only apply to that screen size and above.
  Notice, doesn't make sure the class being passed in is going to work with a responsive prefix: not all tailwind rules are responsive-capable.
-}
md : TailwindClass -> TailwindClass
md (TailwindClass c) =
  TailwindClass ("md:" ++ c)

{-| Add a size prefix to the tailwind rule, making it only apply to that screen size and above.
  Notice, doesn't make sure the class being passed in is going to work with a responsive prefix: not all tailwind rules are responsive-capable.
-}
lg : TailwindClass -> TailwindClass
lg (TailwindClass c) =
  TailwindClass ("lg:" ++ c)

{-| Add a size prefix to the tailwind rule, making it only apply to that screen size and above.
  Notice, doesn't make sure the class being passed in is going to work with a responsive prefix: not all tailwind rules are responsive-capable.
-}
xl : TailwindClass -> TailwindClass
xl (TailwindClass c) =
  TailwindClass ("xl:" ++ c)

{-| Add a size prefix to the tailwind rule, making it only apply to that screen size and above.
  Notice, doesn't make sure the class being passed in is going to work with a responsive prefix: not all tailwind rules are responsive-capable.
-}
xxl : TailwindClass -> TailwindClass
xxl (TailwindClass c) =
  TailwindClass ("2xl:" ++ c)

{-| Add a focus-within variant prefix to the Tailwind rule, rules tagged by this variant only apply when inside element has focus.
  Notice, doesn't make sure the class being passed in is going to work with a dark prefix: not all tailwind rules are dark capable.
-}
focusWithin : TailwindClass -> TailwindClass
focusWithin (TailwindClass c) =
  TailwindClass ("focus-within:" ++ c)

{-| Add a hover variant prefix to the Tailwind rule, rules tagged by this variant only apply when hovered.
  Notice, doesn't make sure the class being passed in is going to work with a dark prefix: not all tailwind rules are dark capable.
-}
hover : TailwindClass -> TailwindClass
hover (TailwindClass c) =
  TailwindClass ("hover:" ++ c)

{-| Add a focus variant prefix to the Tailwind rule, rules tagged by this variant only apply when focused.
  Notice, doesn't make sure the class being passed in is going to work with a dark prefix: not all tailwind rules are dark capable.
-}
focus : TailwindClass -> TailwindClass
focus (TailwindClass c) =
  TailwindClass ("focus:" ++ c)

{-| Add a group-hover variant prefix to the Tailwind rule, rules tagged by this variant only apply when a marked ancestor element in hovered.
  Notice, doesn't make sure the class being passed in is going to work with a group-hover prefix: not all tailwind rules are group-hover capable.
-}
groupHover : TailwindClass -> TailwindClass
groupHover (TailwindClass c) =
  TailwindClass ("group-hover:" ++ c)

{-| The group CSS class work together with the groupHover variant. With group the parent is marked hover triggers are started from.
-}
group : TailwindClass
group =
  TailwindClass "group"

{-| Add a dark variant prefix to the Tailwind rule, rules tagged by this variant only apply when the dark mode is on or the darkClass is provided.
  Notice, doesn't make sure the class being passed in is going to work with a dark prefix: not all tailwind rules are dark capable.
-}
dark : TailwindClass -> TailwindClass
dark (TailwindClass c) =
  TailwindClass ("dark:" ++ c)

{-| The dark CSS class works together with the dark variant.
-}
darkClass : TailwindClass
darkClass =
  TailwindClass "dark"

${objects.map(objToElmTailwindClassFunction).join('')}`;



const elmTailwindCustomFormsTemplate = objects =>
`module Tailwind.CustomFormClasses exposing (..)

import Tailwind.Types exposing (TailwindClass(..))

{-|

# Classes and their definitions

@docs ${objects.map(({ elmName }) => elmName).join(', ')}

-}

${objects.map(objToElmTailwindClassFunction).join('')}`;

// minified css introduces problems with compound selectors
const contexts = {
  'dark': {
    'cssIn': postcss.parse(read(tailwindBaseWithDarkPath)),
    'template': elmTailwindBaseWithDarkTemplate,
    'objects': {},
    'elmOut': '../src/Tailwind/Classes.elm',
  },
  'custom-forms': {
    'cssIn': postcss.parse(read(tailwindCustomFormsPath)),
    'template': elmTailwindCustomFormsTemplate,
    'objects': {},
    'elmOut': '../src/Tailwind/CustomFormClasses.elm',
  },
}

const ruleFormatter = (rule) => {
  let def = rule.toString().replace('{-', '{ -');
  def = setCorrectIndentation(def);
  return def;
};

const defaultIndentation = ' '.repeat(4);

const setCorrectIndentation = (text) => {
  // normalize indentation
  if (/ {4}/.test(text)) {
    text = text.replace(/\n {2}/g, '\n');
  }
  // set indentation
  text = text.replace(/\n/g, `\n${defaultIndentation}`);
  return text;
};

/**
 * This will walk through each of the css rules in tailwind
 * and pull out the relevant information.
 */
_.forOwn(contexts, ((ctx, ctxId) => { ctx.cssIn.walkRules((rule) => {
  //
  // Ignore anything that's not a class
  //
  if (!rule.selector.startsWith('.')) return;

  //
  // Ignore responsive variations in favor of using utility classes for that
  //
  if (rule.selector.startsWith('.sm\\:')) return;
  if (rule.selector.startsWith('.md\\:')) return;
  if (rule.selector.startsWith('.lg\\:')) return;
  if (rule.selector.startsWith('.xl\\:')) return;
  if (rule.selector.startsWith('.\\32xl\\:')) return; // '\32' denotes the '2' in '2xl'

  //
  // Ignore group-hover variants
  //
  if (rule.selector.startsWith('.group:hover ')) return;
  if (rule.selector.startsWith('.group-hover\\:')) return;

  //
  // Ignore hover and focus variants
  //
  if (rule.selector.startsWith('.hover\\:')) return;
  if (rule.selector.startsWith('.focus\\:')) return;

  //
  // Ignore dark variants
  //
  if (rule.selector.startsWith('.dark ')) return;
  if (rule.selector.search(/dark\\:/) !== -1) return;  // -1 indicates no match

  //
  // Ignore rules that select an :after or :before
  //
  if (rule.selector.indexOf(':after') != -1 || rule.selector.indexOf(':before') != -1) {
    return;
  }

  //
  // Ignore rules with :: modifies (for custom-forms)
  //
  if (rule.selector.search(/::/) !== -1) return;  // -1 indicates no match

  //
  // Ignore rules that select :checked or modifiers starting with -ms- (for custom-forms)
  //
  if (rule.selector.indexOf(':checked') != -1 || rule.selector.indexOf(':-ms') != -1) {
    return;
  }


  let name = rule.selector;

  //
  // Remove the leading dot including leading whitespace
  //
  name = name.replace(/^\s*\./, '');

  //
  // Throw away anything after a comma or a space
  //
  name = name.split(/[, ]/)[0];

  let elmName = name;
  //
  // Replace the \: with a __
  //
  elmName = elmName.split('\\:').join('__');

  //
  // Replace the negative margin with a 'neg'
  //
  elmName = elmName.replace(/-m([lrtbxy])/g, 'neg_m$1');

  //
  // Change a leading dash to a 'neg'
  //
  elmName = elmName.replace(/^-/, 'neg');
  elmName = elmName.replace(/__-/, ':neg');  // : is already replaced by __

  //
  // Replace dashes with underscores
  //
  elmName = elmName.replace(/-/g, '_');

  //
  // Change decimal dot (only in .5) to 'dot'
  //
  elmName = elmName.replace(/(\d+)\\\.(\d)/, '$1dot$2');

  //
  // Change the \/ in fractions to `over`
  //
  elmName = elmName.replace(/\\\//g, 'over');

  //
  // Remove :focus
  //
  elmName = elmName.replace(':focus', '');

  //
  // Remove :hover
  //
  elmName = elmName.replace(':hover', '');

  //
  // Before using "name", but after basing elmName on it, do the following:
  //

  //
  // Escape the backslash in the Elm string
  //
  name = name.replace(/\\\//g, '/');
  name = name.replace(/\\/g, '\\\\');

  //
  // Replace focus\\: with focus:
  //
  name = name.replace('focus\\\\:', 'focus:');

  //
  // Remove :focus
  //
  name = name.replace(':focus', '');

  //
  // Replace hover\\: with hover:
  //
  name = name.replace('hover\\\\:', 'hover:')

  //
  // Remove :hover
  //
  name = name.replace(':hover', '');

  const obj = {
    name,
    elmName,
    def: ruleFormatter(rule),
  };

  console.log(obj);

  if (name in contexts[ctxId]['objects']) { contexts[ctxId]['objects'][name].def += `\n${defaultIndentation}${obj.def}`; } // class has been already registered, only append new def
  else contexts[ctxId]['objects'][name] = obj;
})}));


// sort the output alphabetically
_.forOwn(contexts, ((ctx, ctxId) => { contexts[ctxId]['objects'] = _.sortBy(ctx['objects'], 'name'); }));


// render templates and write files
_.forOwn(contexts, ((ctx, ctxId) => {
  fs.writeFile(ctx['elmOut'], ctx['template'](ctx['objects']), (err) => {
    if (err) return console.log(err);
    console.log('\nSuccessfully generated Elm file: ', ctx['elmOut']);
  })
}));

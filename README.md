# React Better Containers

<h6 align="center">About</h6>
<p align="center">
    <a href="https://github.com/Kushuh/react-better-containers">
        <img src="https://img.shields.io/npm/v/react-better-containers" alt="version"/>
    </a>
    <a href="https://github.com/Kushuh/react-better-containers/blob/master/LICENSE">
        <img src="https://img.shields.io/npm/l/react-better-containers" alt="license"/>
    </a>
    <a href="https://github.com/Kushuh/react-better-containers/issues">
        <img src="https://img.shields.io/github/issues-raw/kushuh/react-better-containers" alt="open issues"/>
    </a>
    <a href="https://github.com/Kushuh/react-better-containers">
        <img src="https://img.shields.io/github/last-commit/Kushuh/react-better-containers" alt="activity"/>
    </a>
    <a href="https://github.com/Kushuh/react-better-containers/graphs/contributors">
        <img src="https://img.shields.io/github/contributors/Kushuh/react-better-containers" alt="contributors"/>
    </a>
</p>

<h6 align="center">More</h6>
<p align="center">
    <a href="https://github.com/Kushuh/react-better-containers">
        <img src="https://img.shields.io/github/repo-size/kushuh/react-better-containers" alt="repo size"/>
    </a>
    <a href="https://github.com/facebook/react">
        <img src="https://img.shields.io/github/package-json/dependency-version/Kushuh/react-better-containers/react" alt="react version"/>
    </a>
    <a href="https://github.com/facebook/react/tree/master/packages/react-dom">
        <img src="https://img.shields.io/github/package-json/dependency-version/Kushuh/react-better-containers/react-dom" alt="react version"/>
    </a>
    <a href="https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/react-dom">
        <img src="https://img.shields.io/github/package-json/dependency-version/Kushuh/react-better-containers/@types/react-dom" alt="react version"/>
    </a>
    <a href="https://github.com/Kushuh/kushuh-react-utils">
        <img src="https://img.shields.io/github/package-json/dependency-version/Kushuh/react-better-containers/kushuh-react-utils" alt="react version"/>
    </a>
</p>

## About

React Better Containers contains miscellaneous React Component to write faster with better results.

## Components

+ **[Text Components](#text-components)**
    + [Text](#text)
    + [Spanner](#spanner)
+ **[Copyright](#copyright)**

## Text Components

### Text

Text wraps some textual data and allows more control over it.

```jsx
<Text>My text.</Text>
```

Now with all parameters:

```jsx
<Text
  tag='p'
  placeholder='lines'
  placeholderOptions={{
    color: '#eaeaea',
    linesHeight: 0.4
  }}
  forcePlaceholder={false}
>My text.</Text>
```

ℹ If a ref is passed as an argument, it will automatically be applied to the rendered element.
Both static and functional ref works.

#### Props

ℹ️ No parameters are required.

| name | default | description |
| :--- | :--- | :--- |
| tag | 'p' | Render the component with a custom tag. Every HTML component is supported. |
| placeholder | 'lines' | Determine the placeholder to render when text font isn't fully loaded. **(1)** |
| placeholderOptions | - | Control the behavior of the placeholder. |
| placeholderOptions.color | inherit | Color to render the placeholder effect. |
| placeholderOptions.linesHeight | 0.4 | Height in em of the replacement line. Only has effect with placeholder set to 'lines'. |
| forcePlaceholder | false | Force placeholder to render while set to true. |

**(1)** Possible values are 'lines', 'blurry' and 'none'. Null or undefined is equivalent to 'lines'.

![placeholder demo](https://github.com/Kushuh/react-better-containers/blob/master/resources/gifs/Demo-Text-Placeholders.gif)

### Spanner

Wraps each character of child textNodes in a custom span.

```jsx
<Spanner>
  <div>A Text Node.</div>
  Some more text.
</Spanner>
```

This will result in the following rendered HTML:
```html
<div>
    <span class="spanned">A</span>
    <span class="spanned"> </span>
    <span class="spanned">T</span>
    <span class="spanned">e</span>
    <span class="spanned">x</span>
    <span class="spanned">t</span>
    <span class="spanned"> </span>
    <span class="spanned">N</span>
    <span class="spanned">o</span>
    <span class="spanned">d</span>
    <span class="spanned">e</span>
    <span class="spanned">.</span>
</div>
<span class="spanned">S</span>
<span class="spanned">o</span>
<span class="spanned">m</span>
<span class="spanned">e</span>
<!-- etc. -->
```

It can be useful for some dynamic and quick manipulation.

#### Props

ℹ️ No parameters are required.

| name | default | description |
| :--- | :--- | :--- |
| ignore | - | Defines an Array of characters to ignore. |
| spannerClass | 'spanned' | A custom className to use for the spans. |

## Copyright
2020 Kushuh - MIT license
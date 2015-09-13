# &#9762; my app starter &#9762;

my starter repo for an app. don't worry this will all be irrelevant in seven
months anyway.

## before you do anything

    npm install # or even `npm isntall`

## start the dev server

    npm run dev

## build into the `./dist` directory

    npm run build

## check the size of the minified, gzip'd output

    npm run build-stats

# what's in the box

## [react][], [redux][], [webpack][], [react-router][], and [basscss][]

i'm using redux's `createStore` and reducers approach to managing page state,
but i'm not using its bindings to react, instead i'm just using [a singleton][]

at the time of creation, i'm using the 1.0 release candidate for react-router,
so that should probably be updated

## `Promise` and `fetch` usage

this currently relies on `Promise` and `fetch` being present, BUT i still need
to get them polyfilled.

## server-side rendering

&hellip;or at least build-time rendering. this presents the user with a loading
indicator while the js is downloading and react is bootstrapping. it should
also make server-side rerendering a bit easier.

## [csp][]

the dev server uses [csp][]! this prevents certain types of source maps, but it
allows you to test your policy in development.

## optimized production build

the production build use of environment variables + dead-code elimination to
ensure assets are as small as possible.

## login logic and mocked api

this is just to get going, but it should make it easier to integrate with a
real api.

## modular css with shared variables

it's not as elaborate as [css-modules][], but each css file is treated as a
separate module via webpack's standard [css-loader][]. all of the css is
extracted into a single css file, and postcss plugins are applied _after_ the
css is extracted. this allows you to resolve css variables across different
files, which is especially important for modular css frameworks like basscss,
suitcss, tachyons, etc.

# why did you&hellip;

## &hellip;not use the webpack dev server or hmr?

the dev server doesn't currently allow me to set headers, and i really wanted
csp. a better approach probably involves starting up a separate
`webpack-dev-server` process, but the webpack dev middleware seemed easier
since i didn't have to manage another process and/or port.

## &hellip;[roll your own plugin to render `index.html`][]

other plugins are available:

- https://github.com/ampedandwired/html-webpack-plugin
- https://github.com/markdalgleish/react-to-html-webpack-plugin

and they're much better written than mine, but i don't think the first lets me
render react components, and the second doesn't seem to handle css chunks.

## &hellip;not use css-modules to resolve css `@import`'s?

this repo takes a more traditional approach to css which is less modules and
has less overhead than css modules. as a result we can avoid exporting the css
class names as JS modules.

[react]: http://facebook.github.io/react/
[redux]: http://rackt.github.io/redux/
[webpack]: http://webpack.github.io
[react-router]: http://rackt.github.io/react-router/
[basscss]: http://www.basscss.com
[a singleton]: /aaronj1335/my-app-starter/blob/master/src/data/store.js
[csp][]: /aaronj1335/my-app-starter/blob/master/config.js#L9
[css-modules]: https://github.com/css-modules/css-modules
[css-loader]: https://github.com/webpack/css-loader
[roll your own plugin to render `index.html`]: /aaronj1335/my-app-starter/blob/master/lib/html.js

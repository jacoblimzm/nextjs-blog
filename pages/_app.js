// this is for loading/importing GLOBAL CSS FILES.
// CANNOT be done anywhere else
// you can place the global .css file anywhere and use any name
// App is the top level component that is common across all the pages.
// thus this top level component can keep STATE when naivgating between pages

// IMPT: Restart the DEV server when _app.js is created. 

import "../styles/global.css"

export default function App({ Component, pageProps }) {
    return <Component {...pageProps} />
  }
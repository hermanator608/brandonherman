const React = require("react")

exports.onRenderBody = ({ setPreBodyComponents }) => {
  setPreBodyComponents([
    React.createElement("script", {
      dangerouslySetInnerHTML: {
        __html: `
          (() => {    
            window.__onThemeChange = function() {};      

            function setTheme(newTheme) {                  
              window.__theme = newTheme;                  
              preferredTheme = newTheme;                  
              document.body.className = newTheme;
              document.body.dataset.theme = newTheme;                 
              window.__onThemeChange(newTheme);                
            }

            let preferredTheme

            try {
              preferredTheme = localStorage.getItem('theme')
            } catch (err) {}

            window.__setPreferredTheme = newTheme => {
              setTheme(newTheme)

              try {
                localStorage.setItem('theme', newTheme)
              } catch (err) {}
            }

            // let lightQuery = window.matchMedia('(prefers-color-scheme: light)')
            // console.log(lightQuery);

            // lightQuery.addEventListener('change', e => {
            //   window.__setPreferredTheme(e.matches ? 'light' : 'dark')
            // })

            setTheme(preferredTheme || 'dark')//(lightQuery.matches ? 'light' : 'dark'))
          })()
        `,
      },
    }),
  ])
}

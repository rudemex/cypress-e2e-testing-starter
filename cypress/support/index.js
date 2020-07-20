// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************


// Import commands.js using ES2015 syntax:
import './commands';
import addContext from 'mochawesome/addContext';

// Alternatively you can use CommonJS syntax:
// require('./commands')
require('cypress-commands'); // https://github.com/Lakitna/cypress-commands
import 'cypress-file-upload'; // https://github.com/abramenal/cypress-file-upload
import 'cypress-wait-until'; // https://github.com/NoriSte/cypress-wait-until


/*
# =============================================================================================================
# -- ADD IMAGE AND VIDEO CONTEXT WHEN FAILED TEST --
# =============================================================================================================
*/
Cypress.on('test:after:run', (test, runnable) => {

    if (test.state === 'failed') {
        console.log('[i] TEST AFTER RUN - SCREENSHOT & VIDEO WHEN FAILED TEST');

        const fileName = `${runnable.parent.title} -- ${test.title}`;

        //cypress-fecreditoempresas/cypress/screenshots/Calificados/menor-a-50-mm.spec.js/Calificados_-_Menor_a_50MM_--_Get_Store_Redux_--_before_each_hook_(failed).png
        //cypress-fecreditoempresas/cypress/screenshots/Calificados/menor-a-50-mm.spec.js/Calificados_-_Menor_a_50MM_--_Get_Store_Redux_(failed).png

        // Screenshot
        const screenshotFileName = (`${fileName} (failed).png`).replace(/\s/g, '_');
        const pathScreenshot = `../cypress/screenshots/${Cypress.spec.name}/${screenshotFileName}`.replace(/[\\"]/g, '/');
        const titleScreenshot = 'Screenshot | Failed Test';
        // Video
        const pathVideo = `../cypress/videos/${Cypress.spec.name}.mp4`.replace(/[\\"]/g, '/');
        const titleVideo = `Video | ${test.title}`;

        console.log("===============================");
        console.log("TEST: ",test);
        console.log("RUNNABLE: ",runnable);
        console.log("TITLE: ",fileName);
        console.log("FILENAME: ",screenshotFileName);
        console.log("PATH: ",pathScreenshot);
        console.log("VIDEO: ",pathVideo);
        console.log("===============================");

        addContext({ test }, { title: titleScreenshot, value: pathScreenshot });
        addContext({ test }, { title: titleVideo, value: pathVideo });
    }
});

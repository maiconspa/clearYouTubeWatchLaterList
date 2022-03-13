// Hi, just copy and paste the code below into
// console area in Developer Tools

let navigatorLanguage = navigator.language || navigator.userLanguage
let formattedLanguage = navigatorLanguage.slice(0, 2)
let languageErrorMessage = '/!\\ Something is wrong... verify if YouTube language is the same of your browser'

const lang = {
    'en': { actionMenu: 'Action menu', removeFrom: 'Remove from' },
    'pt': { actionMenu: 'Menu de ações', removeFrom: 'Remover de' }
}

let actionButtonQuerySelector = `#primary button[aria-label="${lang[formattedLanguage].actionMenu}"]`
let spanRemoveFrom = `//span[contains(text(),"${lang[formattedLanguage].removeFrom}")]`

setInterval(function () {
    try {
        document.querySelector(actionButtonQuerySelector).click();

        let spanList = document.evaluate(
            spanRemoveFrom,
            document,
            null,
            XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
            null
        );

        for (var i = 0; i < spanList.snapshotLength; i++)
            spanList.snapshotItem(i).click();
    } catch (error) {
        if (error.message.includes("Cannot read properties of null (reading 'click')"))
            console.error(languageErrorMessage)
    }
}, 500);
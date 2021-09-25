const defaultStrings = require("../intl/en.json")
const languageMetadata = require("../data/translations.json")

const supportedLanguages = Object.keys(languageMetadata)

const consoleError = (message) => {
    const { NODE_ENV } = process.env
    if (NODE_ENV === "development") {
        console.error(message)
    }
}

function toAbsoluteSlug(slug) {
    for (const lang of supportedLanguages) {
        if (slug.indexOf(`/${lang}`) === 0) {
            return slug.replace(`/${lang}`, '')
        }
    }
    return slug
}

// Returns the en.json value
function getDefaultMessage(key) {
    const defaultMessage = defaultStrings[key]
    if (defaultMessage === undefined) {
        consoleError(
            `No key "${key}" in en.json. Cannot provide a default message.`
        )
    }
    return defaultMessage || ""
}

function translateMessageId(id, intl) {
    if (!id) {
        consoleError(`No id provided for translation.`)
        return ""
    }
    if (!intl || !intl.formatMessage) {
        consoleError(`Invalid/no intl provided for translation id ${id}`)
        return ""
    }
    const translation = intl.formatMessage({
        id,
        defaultMessage: getDefaultMessage(id),
    })
    if (translation === id) {
        consoleError(
            `Intl ID string "${id}" has no match. Default message of "" returned.`
        )
        return ""
    }
    return translation
}

module.exports.toAbsoluteSlug = toAbsoluteSlug
module.exports.languageMetadata = languageMetadata
module.exports.supportedLanguages = supportedLanguages
module.exports.translateMessageId = translateMessageId

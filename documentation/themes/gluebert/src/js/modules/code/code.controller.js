import { ControllerAbstract } from 'gluebert/controller';

const LNG_PREFIX = 'language-';

const LNG_SIGNATURES = {
    json: () => import('prismjs/components/prism-json'),
    asciidoc: () => import('prismjs/components/prism-asciidoc'),
    apacheconf: () => import('prismjs/components/prism-apacheconf'),
    bash: () => import('prismjs/components/prism-bash'),
    batch: () => import('prismjs/components/prism-batch'),
    dart: () => import('prismjs/components/prism-dart'),
    diff: () => import('prismjs/components/prism-diff'),
    go: () => import('prismjs/components/prism-go'),
    graphql: () => import('prismjs/components/prism-graphql'),
    haml: () => import('prismjs/components/prism-haml'),
    ini: () => import('prismjs/components/prism-ini'),
    less: () => import('prismjs/components/prism-less'),
    sass: () => import('prismjs/components/prism-sass'),
    php: () => import('prismjs/components/prism-php'),
    powershell: () => import('prismjs/components/prism-powershell'),
    rest: () => import('prismjs/components/prism-rest'),
    sql: () => import('prismjs/components/prism-sql'),
    twig: () => import('prismjs/components/prism-twig'),
    vim: () => import('prismjs/components/prism-vim'),
};

/**
 * Class represents CodeController
 * @extends ControllerAbstract
 */
class CodeController extends ControllerAbstract {

    /**
     * creates a new CodeController instance
     * @param {HTMLElement} element
     * @param {DataObserver} data
     * @param {ElementBuilder} elements
     */
    constructor(element = null, data, elements) {
        super(element, data, elements);
        this._language = this._extractLanguage();
        if(this._language) {
            try {
                this._paint().catch((err) => {
                    console.log(err);
                });
            } catch(err) {
                console.log(err);
            }
        }
    }

    async _paint() {
        const Prism = await import('prismjs');

        if(
            typeof Prism.languages[this._language] === 'undefined' &&
            typeof LNG_SIGNATURES[this._language] !== 'undefined'
        ) {
            Prism.languages.extend(
                await LNG_SIGNATURES[this._language](),
            );
        }

        Prism.highlightElement(this._element);
    }

    _extractLanguage() {
        return Array
            .from(this._element.classList)
            .filter((cls) => {
                return cls.startsWith(LNG_PREFIX);
            })[0]
            .substr(LNG_PREFIX.length)
            .toLowerCase();
    }

}

export {
    CodeController,
};
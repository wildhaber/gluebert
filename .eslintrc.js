module.exports = {
    'env': {
        'browser': true,
        'es6': true,
        'jasmine': true,
    },
    'extends': 'eslint:recommended',
    'parserOptions': {
        'sourceType': 'module',
        'ecmaVersion': 8,
    },
    'globals': {
        'global': false,
        'console': false,
    },
    'rules': {
        'no-bitwise': 0,
        'camelcase': 2,
        'curly': 2,
        'eqeqeq': 2,
        'guard-for-in': 2,
        'no-extend-native': 2,
        'wrap-iife': [
            2,
            'any',
        ],
        'indent': [
            2,
            4,
            {
                'SwitchCase': 1,
            },
        ],
        'no-use-before-define': [
            2,
            {
                'functions': false,
            },
        ],
        'new-cap': 0,
        'no-caller': 2,
        'no-empty': 2,
        'no-irregular-whitespace': 2,
        'no-new': 2,
        'no-plusplus': 0,
        'quotes': [
            2,
            'single',
            {
                'allowTemplateLiterals': true,
            },
        ],
        'no-undef': 2,
        'no-unused-vars': 0,
        'strict': [
            2,
            'global',
        ],
        'max-params': [
            2,
            10,
        ],
        'max-depth': [
            2,
            5,
        ],
        'max-statements': [
            2,
            300,
        ],
        'complexity': [
            2,
            8,
        ],
        'max-len': [
            2,
            {
                'code': 120,
                'ignoreComments': true,
            },
        ],
        'semi': [
            2,
            'always',
        ],
        'no-cond-assign': 0,
        'no-debugger': 2,
        'no-eq-null': 2,
        'no-eval': 0,
        'keyword-spacing': [
            2,
            {
                'before': true,
                'overrides': {
                    'if': {
                        'after': false,
                    },
                    'for': {
                        'after': false,
                    },
                    'while': {
                        'after': false,
                    },
                },
            },
        ],
        'space-before-function-paren': [
            2,
            {
                'anonymous': 'never',
                'named': 'never',
                'asyncArrow': 'always',
            },
        ],
        'space-in-parens': [
            2,
            'never',
        ],
        'array-bracket-spacing': [
            2,
            'never',
        ],
        'object-curly-spacing': [
            2,
            'always',
        ],
        'arrow-spacing': 2,
        'no-unused-expressions': 0,
        'block-scoped-var': 0,
        'block-spacing': 2,
        'no-iterator': 0,
        'linebreak-style': 0,
        'comma-dangle': [
            'error',
            'always-multiline',
        ],
        'brace-style': [
            2,
            '1tbs',
            {
                'allowSingleLine': true,
            },
        ],
        'comma-style': [
            2,
            'last',
        ],
        'no-loop-func': 2,
        'no-multi-str': 0,
        'valid-typeof': 0,
        'no-proto': 0,
        'no-script-url': 0,
        'no-shadow': 2,
        'dot-notation': 0,
        'no-new-func': 0,
        'no-new-wrappers': 0,
        'no-invalid-this': 0,
        'require-yield': 0,
    },
};

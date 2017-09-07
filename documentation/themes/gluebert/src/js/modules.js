import { BODY_MODULE } from './modules/body/body.module';
import { JUMBO_MODULE } from './modules/jumbo/jumbo.module';
import { NAVIGATION_MODULE } from './modules/navigation/navigation.module';
import { TEASERBOXGRID_MODULE } from './modules/teaserboxgrid/teaserboxgrid.module';
import { TEASERBOX_MODULE } from './modules/teaserbox/teaserbox.module';
import { BUTTON_MODULE } from './modules/button/button.module';
import { LOGO_MODULE } from './modules/logo/logo.module';

/**
 * List of registered Modules
 * @type {ModuleSignature[]}
 */
const MODULES = [
    BODY_MODULE,
    JUMBO_MODULE,
    NAVIGATION_MODULE,
    TEASERBOXGRID_MODULE,
    TEASERBOX_MODULE,
    BUTTON_MODULE,
    LOGO_MODULE,
];

export {
    MODULES,
};
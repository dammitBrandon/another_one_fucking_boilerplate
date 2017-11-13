// This Foundation loader file was built from the following source file:
// - foundation-sites/dist/js/npm.js

// The 'foundation_sites' path alias is configured in the following config file:
// - build/webpack.base.conf.js

// Foundation core and utils - Best to import all of these
import jQuery from 'jquery';
import { Foundation } from 'foundation_sites/foundation.core';
import { rtl, GetYoDigits, transitionend } from 'foundation_sites/foundation.util.core';
import { Box } from 'foundation_sites/foundation.util.box';
import { onImagesLoaded } from 'foundation_sites/foundation.util.imageLoader';
import { Keyboard } from 'foundation_sites/foundation.util.keyboard';
import { MediaQuery } from 'foundation_sites/foundation.util.mediaQuery';
import { Motion, Move } from 'foundation_sites/foundation.util.motion';
import { Nest } from 'foundation_sites/foundation.util.nest';
import { Timer } from 'foundation_sites/foundation.util.timer';
import { Touch } from 'foundation_sites/foundation.util.touch';
import { Triggers } from 'foundation_sites/foundation.util.triggers';

// Foundation plugins - Pick and choose your plugins here!
// If you comment out a plugin you will need to comment out
// the corresponding Foundation.plugin line also.
// This is a template project so they have all been imported.
import { Abide } from 'foundation_sites/foundation.abide';
import { Accordion } from 'foundation_sites/foundation.accordion';
import { AccordionMenu } from 'foundation_sites/foundation.accordionMenu';
import { Drilldown } from 'foundation_sites/foundation.drilldown';
import { Dropdown } from 'foundation_sites/foundation.dropdown';
import { DropdownMenu } from 'foundation_sites/foundation.dropdownMenu';
import { Equalizer } from 'foundation_sites/foundation.equalizer';
import { Interchange } from 'foundation_sites/foundation.interchange';
import { Magellan } from 'foundation_sites/foundation.magellan';
import { OffCanvas } from 'foundation_sites/foundation.offcanvas';
import { Orbit } from 'foundation_sites/foundation.orbit';
import { ResponsiveMenu } from 'foundation_sites/foundation.responsiveMenu';
import { ResponsiveToggle } from 'foundation_sites/foundation.responsiveToggle';
import { Reveal } from 'foundation_sites/foundation.reveal';
import { Slider } from 'foundation_sites/foundation.slider';
import { SmoothScroll } from 'foundation_sites/foundation.smoothScroll';
import { Sticky } from 'foundation_sites/foundation.sticky';
import { Tabs } from 'foundation_sites/foundation.tabs';
import { Toggler } from 'foundation_sites/foundation.toggler';
import { Tooltip } from 'foundation_sites/foundation.tooltip';
import { ResponsiveAccordionTabs } from 'foundation_sites/foundation.responsiveAccordionTabs';

// Add jQuery to the window object
window.$ = jQuery;
window.jQuery = jQuery;

// Require non-modular scripts
require('motion-ui');
require('what-input');

Foundation.addToJquery(jQuery);

// Add Foundation Utils to Foundation global namespace for backwards
// compatibility.
Foundation.rtl = rtl;
Foundation.GetYoDigits = GetYoDigits;
Foundation.transitionend = transitionend;
Foundation.Box = Box;
Foundation.onImagesLoaded = onImagesLoaded;
Foundation.Keyboard = Keyboard;
Foundation.MediaQuery = MediaQuery;
Foundation.Motion = Motion;
Foundation.Move = Move;
Foundation.Nest = Nest;
Foundation.Timer = Timer;

// Touch and Triggers previously were almost purely sede effect driven,
// so nfoundation_sites// need to add it to Foundation, just init them.
Touch.init(jQuery);
Triggers.init(jQuery, Foundation);
Foundation.plugin(Abide, 'Abide');
Foundation.plugin(Accordion, 'Accordion');
Foundation.plugin(AccordionMenu, 'AccordionMenu');
Foundation.plugin(Drilldown, 'Drilldown');
Foundation.plugin(Dropdown, 'Dropdown');
Foundation.plugin(DropdownMenu, 'DropdownMenu');
Foundation.plugin(Equalizer, 'Equalizer');
Foundation.plugin(Interchange, 'Interchange');
Foundation.plugin(Magellan, 'Magellan');
Foundation.plugin(OffCanvas, 'OffCanvas');
Foundation.plugin(Orbit, 'Orbit');
Foundation.plugin(ResponsiveMenu, 'ResponsiveMenu');
Foundation.plugin(ResponsiveToggle, 'ResponsiveToggle');
Foundation.plugin(Reveal, 'Reveal');
Foundation.plugin(Slider, 'Slider');
Foundation.plugin(SmoothScroll, 'SmoothScroll');
Foundation.plugin(Sticky, 'Sticky');
Foundation.plugin(Tabs, 'Tabs');
Foundation.plugin(Toggler, 'Toggler');
Foundation.plugin(Tooltip, 'Tooltip');
Foundation.plugin(ResponsiveAccordionTabs, 'ResponsiveAccordionTabs');

export default Foundation;

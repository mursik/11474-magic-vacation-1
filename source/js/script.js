// modules
import mobileHeight from './modules/mobile-height-adjust.js';
import slider from './modules/slider.js';
import menu from './modules/menu.js';
import footer from './modules/footer.js';
import chat from './modules/chat.js';
import result from './modules/result.js';
import form from './modules/form.js';
import social from './modules/social.js';
import FullPageScroll from './modules/full-page-scroll';
import FontAnimate from './modules/font-animate';
import bodyLoad from './modules/body-load';

// init modules
mobileHeight();
slider();
menu();
footer();
chat();
result();
form();
social();
bodyLoad();

const fullPageScroll = new FullPageScroll();
fullPageScroll.init();
const fontAnimateSlogan = new FontAnimate(`.intro__title`, 500, `active`, `transform`);
setTimeout(()=>{
  fontAnimateSlogan.runAnimation();
}, 500);
const fontAnimateDate = new FontAnimate(`.intro__date`, 500, `active`, `transform`);
setTimeout(()=>{
  fontAnimateDate.runAnimation();
}, 1000);

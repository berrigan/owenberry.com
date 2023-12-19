import { commonInit } from 'js/common_init.js';
/**
 * @type {{ isPdfBuild: boolean }}
 */
const initResults = commonInit();

const homePdfContentTweaks = () => {
    const rcl = document.getElementById('resume-content-left');
    const rcr = document.getElementById('resume-content-right');
    const resumeListSections = Array.from(rcr.children).filter(e => e.parentNode === rcr && e.classList.contains('list-section'));
    rcl.replaceChildren(...resumeListSections);
}

const onDomContentLoadedListeners = [
    initResults.isPdfBuild ? homePdfContentTweaks : null,
]

const onReady = () => {
    for (const f of onDomContentLoadedListeners) {
        f && f();
    }
};

if (document.readyState === 'complete') {
    onReady();
} else {
    document.addEventListener('DOMContentLoaded', onReady);
}

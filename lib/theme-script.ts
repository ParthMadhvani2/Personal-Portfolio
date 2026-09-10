/**
 * Inlined in <head> and run before first paint. Without it a stored dark
 * preference renders a white page for one frame on every navigation. That is the one
 * bug that makes a theme toggle feel cheap no matter how good the transition.
 */
export const THEME_KEY = "theme";

export const themeScript = `(function(){try{var t=localStorage.getItem("${THEME_KEY}");var d=window.matchMedia("(prefers-color-scheme: dark)").matches;var v=t||(d?"dark":"light");document.documentElement.setAttribute("data-theme",v);document.documentElement.style.colorScheme=v;}catch(e){}})();`;

export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "theme";

/** Browser-chrome tint per theme; mirrors `--color-bg` in globals.css. */
export const THEME_COLOR: Record<Theme, string> = {
  dark: "#0a0a0b",
  light: "#fafaf9",
};

/**
 * Runs inline in <head> before first paint so the page never flashes the
 * wrong theme. Saved choice wins; otherwise follow the OS (and keep
 * following it live until the visitor picks one). It also owns the single
 * theme-color meta tag, so browser chrome matches the chosen theme.
 */
export const themeInitScript = `(function(){try{
var d=document.documentElement,k=${JSON.stringify(THEME_STORAGE_KEY)},c=${JSON.stringify(THEME_COLOR)};
var mq=window.matchMedia("(prefers-color-scheme: light)");
function saved(){try{var s=localStorage.getItem(k);return s==="light"||s==="dark"?s:null}catch(e){return null}}
var m=document.createElement("meta");m.name="theme-color";m.id="theme-color";document.head.appendChild(m);
function meta(t){m.setAttribute("content",c[t])}
function apply(t){d.setAttribute("data-theme",t);meta(t)}
apply(saved()||(mq.matches?"light":"dark"));
var on=function(e){if(!saved())apply(e.matches?"light":"dark")};
mq.addEventListener?mq.addEventListener("change",on):mq.addListener(on);
}catch(e){}})();`;

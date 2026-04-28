import { MotionConfig } from "framer-motion";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  defaultProjects,
  defaultSiteContent,
  defaultSiteSettings,
  defaultThemeSettings,
  mergeThemeSettings
} from "../lib/defaultSiteData.js";
import { fetchPublicSiteBundle } from "../lib/siteApi.js";

const SiteDataContext = createContext(null);

function applyTheme(theme) {
  const root = document.documentElement;
  root.style.setProperty("--theme-primary", theme.primary_color || defaultThemeSettings.primary_color);
  root.style.setProperty("--theme-accent", theme.accent_color || defaultThemeSettings.accent_color);
  root.dataset.bgStyle = theme.background_style || defaultThemeSettings.background_style;
  root.dataset.fontStyle = theme.font_style || defaultThemeSettings.font_style;
  root.dataset.buttonStyle = theme.button_style || defaultThemeSettings.button_style;
  root.dataset.grain = theme.grain_enabled ? "on" : "off";
}

export function SiteDataProvider({ children }) {
  const [state, setState] = useState({
    loading: true,
    projects: defaultProjects,
    content: defaultSiteContent,
    settings: defaultSiteSettings,
    theme: defaultThemeSettings
  });

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        const data = await fetchPublicSiteBundle();
        if (!ignore) {
          setState({
            loading: false,
            projects: data.projects,
            content: data.content,
            settings: data.settings,
            theme: mergeThemeSettings(data.theme)
          });
        }
      } catch {
        if (!ignore) {
          setState({
            loading: false,
            projects: defaultProjects,
            content: defaultSiteContent,
            settings: defaultSiteSettings,
            theme: defaultThemeSettings
          });
        }
      }
    }

    load();
    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    applyTheme(state.theme);
  }, [state.theme]);

  const value = useMemo(
    () => ({
      ...state,
      refresh: async () => {
        const data = await fetchPublicSiteBundle();
        setState({
          loading: false,
          projects: data.projects,
          content: data.content,
          settings: data.settings,
          theme: mergeThemeSettings(data.theme)
        });
      }
    }),
    [state]
  );

  return (
    <SiteDataContext.Provider value={value}>
      <MotionConfig reducedMotion={state.theme.animations_enabled ? "never" : "always"}>
        {children}
      </MotionConfig>
    </SiteDataContext.Provider>
  );
}

export function useSiteData() {
  const context = useContext(SiteDataContext);
  if (!context) throw new Error("useSiteData must be used within SiteDataProvider");
  return context;
}


import { defineStore } from 'pinia';

export const useNavigationStore = defineStore('navigation', {
  state: () => ({
    navLinks: [
      { link: "/portfolio", name: "Portfolio" },
      { link: "/sessions", name: "Sesje" },
      { link: "/prints", name: "Printy" },
    ],
    footerLinks: [
      { link: "/", name: "Strona główna" },
      { link: "/portfolio", name: "Portfolio" },
      { link: "/sessions", name: "Sesje" },
      { link: "/prints", name: "Printy" },
    ],
  }),
});
import { defineStore } from 'pinia';

export const useContentStore = defineStore('content', {
    state: () => ({
        introText: `
            Przygodę ze zdjęciami zacząłem trzy lata temu (2021). 
            Nigdy nie lubiłem robić zdjęć w ważnych i fajnych momentach mojego życia, 
            bo uważałem, że to psuje ich naturalność. Później skapnąłem się, 
            że w sumie przez to nie mam z nich za bardzo pamiątek. 
            Stwierdziłem więc, że aparat analogowy to dobry kompromis.<br>
            Wtedy zgarnąłem mój pierwszy sprzęt - Olympusa om 10. 
            Okazało się, że robienie zdjęć jest całkiem fajne no i się wciągnąłem. 
        `,
        ContactFormText: `
            Jeśli masz do mnie jakieś pytania pisz śmiało! :)<br>Zapraszam na wspólną sesję w dogodnym dla nas obu terminie lub do zakupu moich printów.
        `,
        SessionContactFormText: `
            Daj znać, jakie zdjęcią chciałxbyś wykonać! :)<br>Zapraszam na wspólną sesję w dogodnym dla nas obu terminie.
        `,
    }),
});

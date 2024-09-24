# Portfolio Fotograficzne

To repozytorium zawiera kod źródłowy portfolio fotograficznego stworzonego przy użyciu **Nuxt** i **Supabase**. Strona pozwala na przeglądanie zdjęć, umówienie się na sesję fotograficzną oraz zakup wybranych zdjęć w formie wydruków.

## Demo

[Link do wersji live portfolio](#) (soon).

## Funkcjonalności

- **Przegląd portfolio**: Użytkownicy mogą przeglądać zdjęcia podzielone na kategorie.
- **Formularz kontaktowy**: Możliwość umówienia się na sesję fotograficzną poprzez formularz.
- **Sklep z wydrukami**: Użytkownicy mogą przeglądać dostępne zdjęcia do zakupu oraz kontaktować się w sprawie transakcji.
- **Zarządzanie zawartością**: Supabase służy do przechowywania i zarządzania danymi zdjęć, klientów oraz zamówień.

## Technologie

- **[Nuxt](https://nuxtjs.org/)**: Framework do budowy aplikacji Vue z server-side rendering (SSR).
- **[Supabase](https://supabase.io/)**: Backend-as-a-Service (BaaS) do zarządzania bazą danych PostgreSQL oraz funkcji autoryzacyjnych i storage.
- **Tailwind.css**: Do stylowania strony.
- **Vercel**: do hostingu frontendu.
  
## Instalacja i uruchomienie

Aby uruchomić projekt lokalnie:

1. Sklonuj repozytorium:
    ```bash
    git clone git@github.com:filipszczech/photo_portfolio.git
    cd photo-portfolio
    ```

2. Zainstaluj zależności:
    ```bash
    npm install
    ```

3. Skonfiguruj zmienne środowiskowe:
    - Utwórz plik `.env`.
    - Dodaj klucze API i dane logowania do **Supabase**.

4. Uruchom aplikację w trybie deweloperskim:
    ```bash
    npm run dev
    ```

5. Aplikacja powinna być dostępna pod adresem: `http://localhost:3000`.


## Autor

- **Filip Szczęch** - [Twoje Portfolio]

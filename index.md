# Firebase Shop

Celem tego zadania jest wykorzystanie usług oferowanych przez serwis Firebase do
zbudowania prostego sklepu internetowego (o ile takie w ogóle istnieją :D)

W zadaniu możesz, ale nie musisz, skorzystać z paczki `react-router-dom` na potrzeby
wygodniejszej nawigacji pomiędzy kolejnymi ekranami.

## Krok 1

W projekcie z zadania 05-react-shop zainstaluje bibliotekę `firebase` (`npm i firebase`).
Załóż bazę Firestore w serwisie Firebase i upewnij się, że w regułach dostępu dajesz możliwość
odczutu danych, ale blokujesz zapis.

Dodaj do swojego projektu konfigurację połączenia z Firebasem.

Dodaj ręcznie produkty z pliku `products.json` z zadania 05-react-shop do nowej kolekcji, którą
utworzysz po stronie Firebase - nazwij ją `products`. Pomiń atrubuty `id`, bo Firebase i tak
nada nowym dokumentom unikalne identyfikatory.

## Krok 2

Spraw, żeby lista produktów w Twojej aplikacji pobierała się z Firebase, a nie z katalogu `public`.

## Krok 3

Przycisk "zamów" z poprzedniego zadania zastąpmy przyciskiem "zarejestruj się, żeby złożyć zamówienie".
Wyświetl formularz, w którym poprosisz użytkownika o e-mail, hasło oraz nazwę użytkownika,
którą będzie posługiwał się w naszym systemie (np. jakbyśmy chcieli mu wysłać życzenia świąteczne ;))
oraz nazwa miasta, z którego pochodzi.

Pamiętaj, że musisz w panelu Firebase w sekcji Auth aktywować ręcznie logowanie e-mailem i hasłem.

Niech w trakcie rejestracji w bazie Firestore pojawi się dokument użytkownika w kolekcji, którą
nazwiemy `users`. Przypilnuj, żeby id tego dokumentu było takie samo jak `uid` rejestrującego się użytkownika.
Niech przy okazji w dokumencie zostanie zapisana nazwa użytkownika oraz miasto (informacje podane w formularzu).

Firebase automatycznie zaloguje nam tego użytkownika.

## Krok 4

Jeżeli użytkownik jest zalogowany, to niech przycisk "zarejestruj się, żeby złożyć zamówienie" zostanie ukryty,
a zamiast niego pojawi się przycisk "zamów".

Niech kliknięcie przycisku "zamów" sprawi, że w podkolekcji "orders", umieszczonej pod dokumentem użytkownika,
pojawi się nowy dokument, w którym zapiszemy datę zamówienia, jego całkowitą wartość oraz tablicę identyfikatorów
zakupionych produktów.

## Krok 5

Niech pod nazwą sklepu wyświetla się przycisk "wyloguj" (gdy użytkownik jest zalogowany).
Niech pod nazwą sklepu wyświetlają się przyciski "zarejestruj" oraz "zaloguj".
Niech po kliknięciu "zaloguj" na ekranie pojawi się formularz logowania, który zawiera w sobie już tylko pola na
e-mail oraz hasło.

## Krok 6

Niech obok koszyka pojawi się przycisk: "zobacz swoje zamówienia".

Niech po jego kliknięciu na ekranie pojawi się lista zamówień, które zapisaliśmy w Firestore.

Niech na liście wyświetlają się daty złożenia zamówienia oraz ich całkowite ceny.

## Krok 7

Niech po kliknięciu w dane zamówienie wyświetli się lista produktów (emoji), które zostały w nim zamówione.

## Krok 8

Niech pod listą emoji w podglądzie zamówienia pojawi się przycisk "anuluj zamówienie".
Niech jego kliknięcie usunie zamówienie z Firestore.

## Krok 9

Wyświetl nazwę użytkownika i jego miasto obok przycisku "wyloguj".

## Krok 10

Daj użytkownikowi możliwość zmiany jego nazwy i miasta.
Niech będzie ona dostępna po kliknięciu przycisku "edytuj swoje dane".
Umieść ten przycisk pomiędzy danymi użytkownika, a przyciskiem "wyloguj".

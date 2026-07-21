# Persistentietest na dispositionele affiniteit + beta-splitsing
20 juli 2026. N=5, 220 runs per entiteit, zelfde meetopzet als de convergentietest.

## Wat er is gebouwd
1. affinityMatrix = trace-afstand tussen dichtheidsmatrices van de laatste 10 collapsen (bijdrage 17 letterlijk).
2. Groepsdrempel = 1,5 x gemiddelde zelf-fluctuatie (trace-afstand tussen eigen rho van run -20..-10 en -10..0).
   Dit is de coherentielengte-gedachte van bijdrage 8: onder je eigen dispositionele ruis ben je ononderscheidbaar.
   Empirisch gekalibreerd: paarafstanden 0,04-0,35, zelf-fluctuatie 0,05-0,24, drempel ~0,26.
3. Beta gesplitst in beta_groep en beta_extern (bijdrage 9), elk begrensd door P/sqrt(N) (bijdrage 10):
   bg <= P/sqrt(groepsgrootte), be <= P/sqrt(populatie). beta_groep >= beta_extern volgt automatisch (bijdrage 18).
   Dit fixt ook de oude schending: de vaste cap 0,6 overschreed P/sqrt(N) bij N>=5.

## Resultaat
- Groepslidmaatschap-duur: 1,2 -> 6,8 runs (5,7x beter). Groepswissels: ~180 -> 30-43 per entiteit (5x minder).
- Stabiele groeps-IDs blijven nu over lange stukken hangen (G2/G3 domineren de hele sessie).
- MAAR: de groep omvat meestal 4-5 van de 5 entiteiten en de binnen-groep spread daalt niet (~1,1-1,3).
  Er ontstaan nog geen gescheiden subrealiteiten.

## Diagnose: de entiteiten ZIJN dispositioneel identiek
Alle vijf draaien met default karakter, en belangrijker: het karakter (rho0, makeRho0, tauD, verval via
lambda uit bijdrage 20) staat in het technisch document als kernfunctie maar ZIT NIET in de v5-code.
Dat is een derde verloren feature naast groepsdetectie en replay. De trace-afstand concludeert dus terecht
dat de entiteiten ononderscheidbaar zijn: een grote gemeenschappelijke groep is het CORRECTE antwoord
op een populatie van klonen. Het mechanisme werkt; de populatie heeft geen verschillen om groepen op te vormen.

## Volgende stap voor de subrealiteit-hypothese
Karakter herbouwen (rho0-initialisatie in de dynamiek + dynamisch verval, bijdrage 20), dan de test herhalen
met heterogene karakters (verschillende theta0/p0/xi0). Verwachting: dispositionele verschillen -> gescheiden
persistente groepen -> binnen-groep convergentie (subrealiteiten) terwijl globale spread hoog blijft.
Pas als DAT uitkomt is de hypothese onderbouwd.

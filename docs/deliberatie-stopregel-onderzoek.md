# Onderzoek stopregel route B: van plateau naar klok (prototypes, 21 juli)
Aanleiding: Willems observatie dat de model-logverdeling van deliberatietijden een plateau is
waar de menselijke een klok is. Sandbox-prototypes, model zelf onaangeroerd.

## Verklaring van het plateau (mechanistisch)
De huidige stopregel wacht tot drie opeenvolgende iteraties toevallig binnen een marge liggen:
een toevalstreffer-proces met per run wisselende trefkans (de marge beweegt mee met de
geheugencoherentie). Wachttijden op toevalstreffers met wisselende kansen geven een extreem
brede, vlakke logverdeling. Menselijke beslistijden ontstaan uit bewijsaccumulatie
(eerste-doorgangstijden), die geeft de smalle klok. Het plateau is de vingerafdruk van de
stopregel, niet van de superpositie.

## Prototype 1: purificatie-stopregel (meetgeinduceerde purificatie)
Stop wanneer de rho over de laatste 10 iteraties zuiver genoeg is (doelzuiverheid = m_geheugen^tau_d).
RESULTAAT: gedegenereerd. Elke deliberatie stopt exact op het venstermimimum; de iteratierichtingen
zijn vrijwel altijd al geconcentreerd, richtingszuiverheid discrimineert niet.
LES: de dynamiek bevat geen langzaam accumulerende grootheid; elke stopregel die alleen recente
statistiek leest wordt of instant (te ruim) of toevalstreffer (plateau terug).

## Prototype 2: einselection (zelfversterkende deliberatie)
De deliberatie mengt haar eigen lopende gemiddelde met groeiend gewicht terug in de iteratie
(pointer-state-selectie door herhaalde interactie; halfwaarde 50 iteraties); oude stopregel blijft.
RESULTAAT: sd(log) 2,0 -> 1,23; ruwe skew 4,5 -> 1,3; routes intact (11/71/18); tau_d-dosis behouden
in richting (mediaan 73 bij tau 0,2 vs 7 bij tau 1,9).
PRIJS: zware staart en besluiteloosheid VOLLEDIG verdwenen (max ~275 iteraties, 0 afgebroken).

## Prototype 3: selectiesnelheid ~ interferentie-zichtbaarheid
Halfwaarde = 50/intensiteit (ambivalent = trage einselection). RESULTAAT: vrijwel gelijk aan
prototype 2 (sd 1,20); in deze populatie spreidt de intensiteit te weinig om te differentieren.

## Stand en opties
De einselection-richting werkt (klok-lichaam verschijnt, QM-verantwoord: pointer-state-selectie),
maar de huidige varianten offeren de zware staart en de besluiteloosheid op, en dat zijn
betekenisvolle modeleigenschappen (T4a, uitkomstcategorie). Beide behouden vergt dat de
selectiesnelheid VEEL sterker over runs varieert (bijv. gekoppeld aan de positie in de T-middenband
of kwadratisch in intensiteit): een echt ontwerponderzoek, geen avondklus.
OPTIE 1 (advies): huidig model handhaven voor paper v1; plateau eerlijk bespreken (staat al in
figuur en draft) en einselection als onderbouwde future work opnemen MET deze prototype-cijfers.
OPTIE 2: ontwerponderzoek nu voortzetten tot klok+staart+besluiteloosheid alle drie staan, daarna
implementeren en volledige hervalidatie (ankers, routes, kampen, inertie).
Prototype-scripts: data/empirie/proto_*.js (reproduceerbaar).

# Empirisch anker: plan voor zelfstandige validatie
21 juli 2026. Route: secundaire analyse van openbare datasets. Geen lab, geen budget, geen ethische
commissie nodig (bestaande openbare data hergebruiken vereist geen nieuwe ethiektoets, en dat is voor
een onafhankelijk onderzoeker het verschil tussen haalbaar en onhaalbaar).

## Anker 1: deliberatietijden en besluiteloosheid (voorspelling T4)
MODELVOORSPELLING: deliberatietijden zijn zwaarstaartig (lognormaal-achtig); entiteiten met hoge
beslisprecisie (lage tau_d) hebben langere, zwaarstaartiger tijden en zijn de enigen met afgebroken
beslissingen (besluiteloosheid = timeouts/omissies).
DATA: de Confidence Database (Rahnev et al. 2020, volledig open op OSF): honderden datasets met
reactietijden, keuzes en confidence van duizenden proefpersonen. Ook: English Lexicon Project (RT's).
TOETS: (1) vormvergelijking: verdeling van route B-iteraties vs RT-verdelingen (beide op log-schaal,
       lognormaal/ex-Gaussisch fitten, parameters vergelijken);
      (2) individuele verschillen: personen met tragere gemiddelde RT's horen zwaardere staarten en
       meer omissies te hebben (het tau_d-continuum);
      (3) schaalfactor iteraties->ms is 1 vrije kalibratie, eerlijk rapporteren.
HAALBAARHEID: hoog. Dit is pure data-analyse, het soort werk dat ik voor je kan draaien.

## Anker 2: emotionele traagheid en gamma (retentie, bijdrage 3)
MODELVOORSPELLING: gamma = P*F is retentie; hoge gamma betekent trage, voorspelbare emotieverlopen.
Dit is in de psychologie een gemeten grootheid: "emotional inertia" (autocorrelatie van affect in
experience-sampling data, Kuppens e.a.).
DATA: openbare experience-sampling datasets (ESM) op OSF; meerdere affect-tijdreeksen met
valentie/arousal-metingen per dag zijn publiek beschikbaar.
TOETS: (1) genereer modelentiteiten met uiteenlopende gamma en meet de autocorrelatie van hun
       collapse-reeksen; (2) vergelijk de verdeling van autocorrelaties met menselijke ESM-data;
      (3) sterkste vorm: het verband tussen inertie en welzijn uit de literatuur (hoge inertie
       correleert met depressieve klachten) naast het modelverband gamma vs zone-vastzitten leggen.
HAALBAARHEID: hoog, en inhoudelijk de mooiste: het raakt de Husserl-retentie-claim direct.

## Anker 3: collectieve emotie (subrealiteiten, bijdrage 7-herziening)
MODELVOORSPELLING: convergentie van collectieve emotie hangt af van de dispositiespreiding van de
populatie; gepolariseerde disposities geven permanente gescheiden emotionele werkelijkheden.
DATA: de dataset van de directe concurrent is PUBLIEK: greeny598/vk_social_network_sentiment op
Hugging Face (50k comments met sentiment). Elegant: hun data, jouw formalisme.
TOETS: clusters van gebruikers op emotionele dispositie (gemiddelde richting over comments) en meten
of emotionele convergentie binnen clusters en divergentie ertussen optreedt zoals het model voorspelt.
HAALBAARHEID: middel (data-schoonmaak, mapping sentiment->valentie/arousal), maar retorisch sterk:
directe vergelijking op de dataset van het naastgelegen paper.

## Wat dit oplevert voor het paper
Met anker 1 + 2 verschuift het paper van "theoretisch-computationeel zonder data" naar "formeel model
met twee kwantitatieve aansluitingen op menselijke data plus een toets op een openbare sociale dataset".
Dat is precies wat Journal of Mathematical Psychology verwacht.

## Rolverdeling
- Claude (in deze omgeving): datasets binnenhalen voor zover bereikbaar, analyses schrijven en draaien,
  fits en figuren maken, modelsimulaties voor de vergelijkingen genereren.
- Willem: OSF/HuggingFace-accounts en downloads waar een login nodig is, inhoudelijke keuzes
  (welke mapping, welke toetsen tellen), en de eerlijkheidsgrens bewaken (kalibraties benoemen).

## Volgorde
1. Anker 1 (snelste resultaat, direct T4).
2. Anker 2 (inhoudelijk zwaarst, raakt kern van het model).
3. Anker 3 (optioneel voor v1 van het paper; sterk voor de discussie-sectie).

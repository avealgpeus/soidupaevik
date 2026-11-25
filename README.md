**Projekti nimi:** Sõidupäevik – sõitude registreerimise tarkvara

<br>

**Eesmärk:** Projekti eesmärk on luua lihtne ja mugav tarkvara, mille abil saab kiiresti ja mugavalt registreerida autoga tehtud sõite, pidada digitaalset sõidupäevikut ning genereerida igakuiseid aruandeid.

Tarkvara aitab vähendada käsitsi täidetava sõidupäeviku koostamisele kuluvat aega ja muudab sõitude arvestuse lihtsamaks. Kasutaja ei pea enam sõite paberile kirjutama, vaid saab kogu vajaliku info sisestada ühte keskkonda.

<br>

**Sihtgrupp:** Inimesed, kellel on vaja pidada sõidupäevikut raamatupidamise või kulude arvestuse jaoks.

<br>

**Funktsionaalsus:**
- Sõidu lisamine – kasutaja saab sisestada sõidu kuupäeva, algus- ja lõpp-punkti, sõidu eesmärgi ning läbisõidu kilomeetrites.
- Sõitude vaatamine – kasutaja saab vaadata kõiki varasemalt sisestatud sõite kronoloogilises järjekorras.
- Sõidu muutmine – kasutaja saab vajadusel muuta juba salvestatud sõidu andmeid.
- Sõidu kustutamine – kasutaja saab eemaldada ekslikult sisestatud või enam mittevajalikud sõidud.
- Läbisõidu arvestus – tarkvara arvutab automaatselt sõitude põhjal läbitud kilomeetrite kogusumma.
- Sõidupäeviku eksportimine – kasutaja saab eksportida sõitude andmed Exceli või PDF-failina, et neid oleks lihtne edasi kasutada või esitada.

<br>

**Tehnoloogiad:**
- HTML – veebilehe struktuuri ja vormide loomiseks.
- CSS – veebilehe kujundamiseks ja kasutajasõbraliku välimuse loomiseks.
- JavaScript – sõitude lisamise, muutmise, kustutamise ja läbisõidu arvutamise funktsioonide loomiseks.
- LocalStorage – sisestatud sõitude salvestamiseks veebilehitsejasse.
- Git ja GitHub – projekti versioonihalduseks ja lähtekoodi säilitamiseks.

<br>

**Teostusplaan:**
- Planeerimine – projekti eesmärgi, funktsioonide ja kasutajavaate läbimõtlemine.
- Kujundamine – kasutajaliidese esialgse kujunduse loomine.
- Veebilehe struktuuri loomine – HTML-i ja CSS-i abil põhivaadete arendamine.
- Funktsionaalsuse programmeerimine – JavaScripti abil sõitude lisamise, muutmise, kustutamise ja arvutamise võimaluste loomine.
- Andmete salvestamise loomine – JavaScripti LocalStorage'i abil sõitude andmete salvestamine veebilehitsejasse, et sisestatud sõidud säiliksid ka pärast veebilehe sulgemist.
- Otsingu ja eksportimise lisamine – sõitude filtreerimise ning PDF- või Excel-failina eksportimise võimaluse loomine.
- Testimine – kõigi funktsioonide kontrollimine ja vigade parandamine.
- Lõplik viimistlus – kasutajaliidese parandamine ja projekti dokumenteerimine.

<br>

**Valmisoleku kriteeriumid:**

Projekt loetakse valmis, kui:
- Kasutaja saab sõidupäevikusse uusi sõite lisada.
- Lisatud sõidud salvestatakse kasutaja veebilehitseja LocalStorage’isse ning säilivad ka pärast lehe sulgemist ja uuesti avamist.
- Kasutaja saab olemasolevaid sõite vaadata, muuta ja kustutada.
- Läbitud kilomeetrite kogusumma arvutatakse automaatselt ja korrektselt.
- Kasutaja saab sõite kuupäeva järgi filtreerida.
- Sõitude andmeid saab eksportida PDF- või Excel-failina.
- Tarkvara töötab korrektselt ja seda on lihtne kasutada.

<br>

## **Valmisoleku seis:**
| Valmisoleku kriteerium | Seis |
|---|---|
| Kasutaja saab sõidupäevikusse uusi sõite lisada. | ✅ |
| Lisatud sõidud salvestatakse LocalStorage’isse. | ✅ |
| Kasutaja saab olemasolevaid sõite vaadata, muuta ja kustutada. | ✅ |
| Läbitud kilomeetrite kogusumma arvutatakse automaatselt ja korrektselt. | ✅ |
| Kasutaja saab sõite kuupäeva järgi filtreerida. | ✅ |
| Filtreeritud perioodi läbisõit arvutatakse automaatselt. | ✅ |
| Sõitude andmeid saab eksportida CSV- ja PDF-failina. | ✅ |
| Tarkvara töötab korrektselt ja seda on lihtne kasutada. | ✅ |

<br>


## Projekti käivitamine

1. Klooni projekt.

   ```bash
   git clone https://github.com/KASUTAJA/SOIDUPAEVIK.git
2. Ava projekti kaust.
   ```bash
   cd SOIDUPAEVIK
4. Ava kaust Visual Studio Code’is.
   ```bash
   code .
6. Ava fail `index.html>`.
7. Käivita projekt Visual Studio Code’i Live Serveri laiendusega või ava `index.html` otse veebibrauseris.

Nõuded - Projekti käivitamiseks on vaja ainult veebibrauserit. Rakendus ei vaja eraldi serverit ega andmebaasi, sest sõitude andmed salvestatakse brauseri LocalStorage’i.

## **Kasutamine**
   1. **Üldandmed** nupu kaudu saab sisestada üldandmed  (vajuta **Salvesta üldandmed**). Üldandmeid on võimalik muuta **Muuda** nupu kaudu. Kohustuslik on lisada ettevõte, kasutaja, amet, auto reg.nr., km. hind.
2. Lisa sõidu kuupäev, marsruut, eesmärk ning spidomeetri alg- ja lõppnäit. Rakendus arvutab läbisõidu automaatselt. Vajuta **Lisa sõit**.
3. **Eelseadistatud sõidu seadistamine** nupu kaudu on võimalik seadistada kasutaja jaoks tihti kasutuselolev marsruut. **Eelseadistatud sõidu lisamine** nupu kaudu saab selle lisada.
5. Sõitude tabelis saab kirjeid pliiatsiikooniga muuta ja prügikastiikooniga kustutada.
6. Kuupäevavahemiku abil saab tabelis sõite filtreerida.
7. Kasuta nuppe **Ekspordi CSV** või **Ekspordi PDF**, et andmeid eksportida.
8. **Kustuta kogu info** nupu kaudu on võimalik kustutada nii üldandmed kui ka sisestatud sõidud.

"use strict";

const SALVESTUSE_VÕTI = "sõidupäeviku-sõidud";
const ÜLDANDMETE_VÕTI = "sõidupäeviku-üldandmed";
const EELSEADISTUSE_VÕTI = "sõidupäeviku-eelseadistus";
const HÜVITISE_MAKSIMUMMÄÄR = 335;
const kuuNimed = [
  "jaanuaris",
  "veebruaris",
  "märtsis",
  "aprillis",
  "mais",
  "juunis",
  "juulis",
  "augustis",
  "septembris",
  "oktoobris",
  "novembris",
  "detsembris",
];

const sõiduVorm = document.getElementById("sõidu-vorm");
const üldandmeteVorm = document.getElementById("üldandmete-vorm");
const üldandmeteNupp = document.getElementById("üldandmete-nupp");
const üldandmeteTeade = document.getElementById("üldandmete-teade");
const üldandmeteAvaja = document.getElementById("üldandmete-avaja");
const üldandmeteSisu = document.getElementById("üldandmete-sisu");
const kuupäevaSisend = document.getElementById("kuupäev");
const marsruudiSisend = document.getElementById("marsruut");
const eesmärgiSisend = document.getElementById("eesmärk");
const algNäiduSisend = document.getElementById("algNäit");
const lõppNäiduSisend = document.getElementById("lõppNäit");
const eelseadistatudSõiduNupp = document.getElementById("eelseadistatud-sõidu-nupp");
const eelseadistuseAvaja = document.getElementById("eelseadistuse-avaja");
const eelseadistuseAken = document.getElementById("eelseadistuse-aken");
const eelseadistuseVorm = document.getElementById("eelseadistuse-vorm");
const eelseadistuseTeade = document.getElementById("eelseadistuse-teade");
const tühistaEelseadistusNupp = document.getElementById("tühista-eelseadistus");
const arvutatudLäbisõiduRida = document.querySelector(".arvutatud-läbisõit");
const arvutatudKilomeetrid = document.getElementById("arvutatud-kilomeetrid");
const vormiTeade = document.getElementById("vormi-teade");
const salvestaNupp = document.getElementById("salvesta-nupp");
const tühistaMuutmineNupp = document.getElementById("tühista-muutmine");
const sõitudeNimekiri = document.getElementById("sõitude-nimekiri");
const filtriKokkuvõte = document.getElementById("filtri-kokkuvõte");
const sõitudeFilter = document.getElementById("sõitude-filter");
const filtriAlguseSisend = document.getElementById("filtri-algus");
const filtriLõpuSisend = document.getElementById("filtri-lõpp");
const tühjendaFilterNupp = document.getElementById("tühjenda-filter");
const filtriTeade = document.getElementById("filtri-teade");
const kuupäevaKiirvalikud = document.getElementById("kuupäeva-kiirvalikud");
const praeguseKuuFiltriNupp = document.getElementById("praegune-kuu-filter");
const eelmiseKuuFiltriNupp = document.getElementById("eelmine-kuu-filter");
const csvEkspordiNupp = document.getElementById("ekspordi-csv");
const pdfEkspordiNupp = document.getElementById("ekspordi-pdf");
const kuuPealkiri = document.getElementById("kuu-pealkiri");
const kuuLäbisõit = document.getElementById("kuu-läbisõit");
const kuuSumma = document.getElementById("kuu-summa");
const maksimumiHoiatus = document.getElementById("maksimumi-hoiatus");
const kuuKalender = document.getElementById("kuu-kalender");
const kalendriPäevad = document.getElementById("kalendri-päevad");
const eelmineKuuNupp = document.getElementById("eelmine-kuu");
const järgmineKuuNupp = document.getElementById("järgmine-kuu");
const kustutaKoguInfoNupp = document.getElementById("kustuta-kogu-info");
const koguInfoKinnitus = document.getElementById("kogu-info-kinnitus");
const tühistaKustutamineNupp = document.getElementById("tühista-kustutamine");
const kinnitaKustutamineNupp = document.getElementById("kinnita-kustutamine");

let sõidud = loeSõidud();
let muudetavaSõiduId = null;
let üldandmeteMuutmisrežiim = true;
let valitudKuu = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
let filtriAlgus = "";
let filtriLõpp = "";
let eelseadistus = loeEelseadistus();
let kasutatakseEelseadistust = false;

kuupäevaSisend.value = tänaneKuupäev();
laadiÜldandmed();
kuvaSõidud();

sõiduVorm.addEventListener("submit", lisaSõit);
üldandmeteVorm.addEventListener("submit", töötleÜldandmed);
üldandmeteAvaja.addEventListener("click", lülitaÜldandmed);
algNäiduSisend.addEventListener("input", käsitleAlgNäiduMuutmist);
lõppNäiduSisend.addEventListener("input", kuvaArvutatudLäbisõit);
tühistaMuutmineNupp.addEventListener("click", lähtestaVorm);
tühjendaFilterNupp.addEventListener("click", tühjendaFilter);
sõitudeFilter.addEventListener("submit", rakendaFilter);
filtriAlguseSisend.addEventListener("focus", avaKuupäevaKiirvalikud);
filtriAlguseSisend.addEventListener("click", avaKuupäevaKiirvalikud);
praeguseKuuFiltriNupp.addEventListener("click", (sündmus) => {
  sündmus.preventDefault();
  määraKiirfilter(0);
});
eelmiseKuuFiltriNupp.addEventListener("click", (sündmus) => {
  sündmus.preventDefault();
  määraKiirfilter(-1);
});
document.addEventListener("click", sulgeKiirvalikudVäljaspoolKlikil);
csvEkspordiNupp.addEventListener("click", ekspordiCsv);
pdfEkspordiNupp.addEventListener("click", ekspordiPdf);
eelseadistatudSõiduNupp.addEventListener("click", lisaEelseadistatudSõit);
eelseadistuseAvaja.addEventListener("click", avaEelseadistuseAken);
eelseadistuseVorm.addEventListener("submit", salvestaEelseadistus);
tühistaEelseadistusNupp.addEventListener("click", () => eelseadistuseAken.close());
eelmineKuuNupp.addEventListener("click", () => muudaValitudKuud(-1));
järgmineKuuNupp.addEventListener("click", () => muudaValitudKuud(1));
kustutaKoguInfoNupp.addEventListener("click", () => koguInfoKinnitus.showModal());
tühistaKustutamineNupp.addEventListener("click", () => koguInfoKinnitus.close());
kinnitaKustutamineNupp.addEventListener("click", kustutaKoguInfo);

function lülitaÜldandmed() {
  const onAvatud = üldandmeteAvaja.getAttribute("aria-expanded") === "true";
  üldandmeteSisu.hidden = onAvatud;
  üldandmeteAvaja.setAttribute("aria-expanded", String(!onAvatud));
}

function muudaValitudKuud(kuudeArv) {
  valitudKuu = new Date(
    valitudKuu.getFullYear(),
    valitudKuu.getMonth() + kuudeArv,
    1,
  );
  kuvaKuuLäbisõit();
}

function kustutaKoguInfo() {
  localStorage.removeItem(SALVESTUSE_VÕTI);
  localStorage.removeItem(ÜLDANDMETE_VÕTI);
  localStorage.removeItem(EELSEADISTUSE_VÕTI);
  sõidud = [];
  eelseadistus = loeEelseadistus();
  filtriAlgus = "";
  filtriLõpp = "";
  üldandmeteVorm.reset();
  sõitudeFilter.reset();
  lähtestaVorm();
  määraÜldandmeteMuutmisrežiim(true);
  kuvaSõidud();
  koguInfoKinnitus.close();
}

function rakendaFilter(sündmus) {
  sündmus.preventDefault();

  if (
    filtriAlguseSisend.value &&
    filtriLõpuSisend.value &&
    filtriAlguseSisend.value > filtriLõpuSisend.value
  ) {
    filtriTeade.textContent =
      "Alguskuupäev peab olema lõppkuupäevast varasem.";
    return;
  }

  filtriAlgus = filtriAlguseSisend.value;
  filtriLõpp = filtriLõpuSisend.value;
  filtriTeade.textContent = "";
  kuvaSõidud();
}

function tühjendaFilter() {
  sõitudeFilter.reset();
  filtriAlgus = "";
  filtriLõpp = "";
  filtriTeade.textContent = "";
  kuvaSõidud();
}

function avaKuupäevaKiirvalikud() {
  kuupäevaKiirvalikud.hidden = false;
  filtriAlguseSisend.setAttribute("aria-expanded", "true");
}

function sulgeKuupäevaKiirvalikud() {
  kuupäevaKiirvalikud.hidden = true;
  filtriAlguseSisend.setAttribute("aria-expanded", "false");
}

function sulgeKiirvalikudVäljaspoolKlikil(sündmus) {
  if (!sündmus.target.closest(".filtri-kuupäev")) {
    sulgeKuupäevaKiirvalikud();
  }
}

function määraKiirfilter(kuuNihe) {
  const praegu = new Date();
  const algus = new Date(praegu.getFullYear(), praegu.getMonth() + kuuNihe, 1);
  const lõpp = new Date(praegu.getFullYear(), praegu.getMonth() + kuuNihe + 1, 0);

  filtriAlguseSisend.value = vormindaSisendiKuupäev(algus);
  filtriLõpuSisend.value = vormindaSisendiKuupäev(lõpp);
  filtriAlgus = filtriAlguseSisend.value;
  filtriLõpp = filtriLõpuSisend.value;
  filtriTeade.textContent = "";
  sulgeKuupäevaKiirvalikud();
  kuvaSõidud();
}

function töötleÜldandmed(sündmus) {
  sündmus.preventDefault();

  if (!üldandmeteMuutmisrežiim) {
    määraÜldandmeteMuutmisrežiim(true);
    return;
  }

  const onTäidetud = [...üldandmeteVorm.querySelectorAll("[required]")].every(
    (väli) => väli.value.trim() !== "",
  );

  if (!onTäidetud) {
    üldandmeteTeade.textContent = "Täida kõik lahtrid.";
    return;
  }

  const vormiAndmed = new FormData(üldandmeteVorm);
  const üldandmed = Object.fromEntries(vormiAndmed.entries());

  localStorage.setItem(ÜLDANDMETE_VÕTI, JSON.stringify(üldandmed));
  üldandmeteTeade.textContent = "";
  määraÜldandmeteMuutmisrežiim(false);
  kuvaKuuLäbisõit();
}

function laadiÜldandmed() {
  const salvestatudAndmed = localStorage.getItem(ÜLDANDMETE_VÕTI);

  if (!salvestatudAndmed) {
    return;
  }

  try {
    const üldandmed = JSON.parse(salvestatudAndmed);

    if (!üldandmed || typeof üldandmed !== "object") {
      return;
    }

    Object.entries(üldandmed).forEach(([nimi, väärtus]) => {
      const väli = üldandmeteVorm.elements.namedItem(nimi);

      if (väli && typeof väärtus === "string") {
        väli.value = väärtus;
      }
    });

    määraÜldandmeteMuutmisrežiim(false);
  } catch {
    return;
  }
}

function määraÜldandmeteMuutmisrežiim(onMuutmisrežiim) {
  üldandmeteMuutmisrežiim = onMuutmisrežiim;

  üldandmeteVorm
    .querySelectorAll("input, textarea")
    .forEach((väli) => (väli.readOnly = !onMuutmisrežiim));

  üldandmeteNupp.textContent = onMuutmisrežiim
    ? "Salvesta üldandmed"
    : "Muuda";

  if (onMuutmisrežiim) {
    üldandmeteTeade.textContent = "";
  }
}

function lisaSõit(sündmus) {
  sündmus.preventDefault();

  const onTäidetud = [...sõiduVorm.querySelectorAll("[required]")].every(
    (väli) => väli.value.trim() !== "",
  );

  if (!onTäidetud) {
    vormiTeade.textContent = "Täida kõik lahtrid.";
    return;
  }

  const vormiAndmed = new FormData(sõiduVorm);
  const algNäit = Number(vormiAndmed.get("algNäit"));
  const lõppNäit = Number(vormiAndmed.get("lõppNäit"));
  const kilomeetrid = lõppNäit - algNäit;

  if (!Number.isFinite(kilomeetrid) || kilomeetrid <= 0) {
    vormiTeade.textContent = "Palun kontrolli spidomeetri alg- ja lõppnäitu.";
    return;
  }

  const sõiduAndmed = {
    kuupäev: vormiAndmed.get("kuupäev"),
    marsruut: vormiAndmed.get("marsruut").trim(),
    eesmärk: vormiAndmed.get("eesmärk").trim(),
    algNäit,
    lõppNäit,
    kilomeetrid,
  };

  if (muudetavaSõiduId) {
    sõidud = sõidud.map((sõit) =>
      sõit.id === muudetavaSõiduId ? { ...sõit, ...sõiduAndmed } : sõit,
    );
  } else {
    sõidud.push({ id: crypto.randomUUID(), ...sõiduAndmed });
  }

  salvestaSõidud();
  lähtestaVorm();
  kuvaSõidud();
}

function lähtestaVorm() {
  sõiduVorm.reset();
  kuupäevaSisend.value = tänaneKuupäev();
  vormiTeade.textContent = "";
  muudetavaSõiduId = null;
  kasutatakseEelseadistust = false;
  salvestaNupp.textContent = "Lisa sõit";
  tühistaMuutmineNupp.hidden = true;
  kuvaArvutatudLäbisõit();
}

function viimaseKuupäevagaSõit() {
  return sõidud.reduce(
    (viimane, sõit) => (!viimane || sõit.kuupäev >= viimane.kuupäev ? sõit : viimane),
    null,
  );
}

function lisaEelseadistatudSõit() {
  if (!onEelseadistusTäidetud()) {
    return;
  }

  kasutatakseEelseadistust = true;
  marsruudiSisend.value = eelseadistus.marsruut;
  eesmärgiSisend.value = eelseadistus.eesmärk;

  if (eelseadistus.kasutaViimastLõppnäitu) {
    const sõit = viimaseKuupäevagaSõit();
    algNäiduSisend.value = sõit.lõppNäit;
  }

  uuendaEelseadistatudLõppnäitu();
  vormiTeade.textContent = "";
  kuvaArvutatudLäbisõit();
}

function uuendaEelseadistatudSõiduNuppu() {
  const vajabVarasematSõitu = eelseadistus.kasutaViimastLõppnäitu;
  eelseadistatudSõiduNupp.disabled =
    !onEelseadistusTäidetud() || (vajabVarasematSõitu && sõidud.length === 0);
}

function käsitleAlgNäiduMuutmist() {
  uuendaEelseadistatudLõppnäitu();
  kuvaArvutatudLäbisõit();
}

function uuendaEelseadistatudLõppnäitu() {
  const sõiduPikkus = Number(eelseadistus.sõiduPikkus);
  const algNäit = Number(algNäiduSisend.value);

  if (
    kasutatakseEelseadistust &&
    eelseadistus.sõiduPikkus !== "" &&
    algNäiduSisend.value !== "" &&
    Number.isFinite(sõiduPikkus) &&
    Number.isFinite(algNäit)
  ) {
    lõppNäiduSisend.value = algNäit + sõiduPikkus;
  }
}

function avaEelseadistuseAken() {
  eelseadistuseVorm.elements.marsruut.value = eelseadistus.marsruut;
  eelseadistuseVorm.elements.eesmärk.value = eelseadistus.eesmärk;
  eelseadistuseVorm.elements.kasutaViimastLõppnäitu.checked =
    eelseadistus.kasutaViimastLõppnäitu;
  eelseadistuseVorm.elements.sõiduPikkus.value = eelseadistus.sõiduPikkus;
  eelseadistuseTeade.textContent = "";
  eelseadistuseAken.showModal();
}

function salvestaEelseadistus(sündmus) {
  sündmus.preventDefault();
  const marsruut = eelseadistuseVorm.elements.marsruut.value.trim();
  const eesmärk = eelseadistuseVorm.elements.eesmärk.value.trim();

  if (!marsruut || !eesmärk) {
    eelseadistuseTeade.textContent = "Täida kõik kohustuslikud lahtrid.";
    return;
  }

  eelseadistus = {
    marsruut,
    eesmärk,
    kasutaViimastLõppnäitu:
      eelseadistuseVorm.elements.kasutaViimastLõppnäitu.checked,
    sõiduPikkus: eelseadistuseVorm.elements.sõiduPikkus.value,
  };
  localStorage.setItem(EELSEADISTUSE_VÕTI, JSON.stringify(eelseadistus));
  eelseadistuseAken.close();
  uuendaEelseadistatudSõiduNuppu();
}

function onEelseadistusTäidetud() {
  return Boolean(eelseadistus.marsruut && eelseadistus.eesmärk);
}

function kuvaArvutatudLäbisõit() {
  const algNäit = Number(algNäiduSisend.value);
  const lõppNäit = Number(lõppNäiduSisend.value);
  const kilomeetrid = lõppNäit - algNäit;
  const onNäidudSisestatud =
    algNäiduSisend.value !== "" && lõppNäiduSisend.value !== "";
  const onVigane =
    onNäidudSisestatud && Number.isFinite(kilomeetrid) && kilomeetrid <= 0;

  arvutatudKilomeetrid.textContent = onNäidudSisestatud && kilomeetrid < 0
    ? `-${vormindaKilomeetrid(Math.abs(kilomeetrid))}`
    : onNäidudSisestatud && Number.isFinite(kilomeetrid) && kilomeetrid > 0
      ? vormindaKilomeetrid(kilomeetrid)
      : "0";
  arvutatudLäbisõiduRida.classList.toggle(
    "arvutatud-läbisõit--vigane",
    onVigane,
  );
}

function kuvaSõidud() {
  sõitudeNimekiri.replaceChildren();
  filtriKokkuvõte.replaceChildren();
  const nähtavadSõidud = filtreeritudSõidud();

  if (nähtavadSõidud.length === 0) {
    const rida = document.createElement("tr");
    const lahter = document.createElement("td");

    lahter.colSpan = 7;
    lahter.textContent =
      sõidud.length === 0
        ? "Sõite ei ole veel lisatud."
        : "Valitud ajavahemikus sõite ei ole.";
    rida.append(lahter);
    sõitudeNimekiri.append(rida);
  } else {
    const järjestatudSõidud = [...nähtavadSõidud].sort((esimene, teine) =>
      teine.kuupäev.localeCompare(esimene.kuupäev),
    );

    järjestatudSõidud.forEach((sõit) => {
      const rida = document.createElement("tr");
      const väärtused = [
        vormindaKuupäev(sõit.kuupäev),
        sõit.marsruut,
        sõit.eesmärk,
        vormindaKilomeetrid(sõit.algNäit),
        vormindaKilomeetrid(sõit.lõppNäit),
        vormindaKilomeetrid(sõit.kilomeetrid),
      ];

      väärtused.forEach((väärtus) => {
        const lahter = document.createElement("td");
        lahter.textContent = väärtus;
        rida.append(lahter);
      });

      const tegevusteLahter = document.createElement("td");
      tegevusteLahter.className = "tegevuste-lahter";
      const muudaNupp = document.createElement("button");
      const kustutaNupp = document.createElement("button");

      muudaNupp.type = "button";
      muudaNupp.className = "tabeli-nupp";
      muudaNupp.textContent = "✎";
      muudaNupp.setAttribute("aria-label", "Muuda sõitu");
      muudaNupp.title = "Muuda";
      muudaNupp.addEventListener("click", () => alustaMuutmist(sõit.id));

      kustutaNupp.type = "button";
      kustutaNupp.className = "tabeli-nupp kustuta-nupp";
      kustutaNupp.textContent = "🗑";
      kustutaNupp.setAttribute("aria-label", "Kustuta sõit");
      kustutaNupp.title = "Kustuta";
      kustutaNupp.addEventListener("click", () => kustutaSõit(sõit.id));

      tegevusteLahter.append(muudaNupp, kustutaNupp);
      rida.append(tegevusteLahter);

      sõitudeNimekiri.append(rida);
    });
  }

  if (filtriAlgus || filtriLõpp) {
    kuvaFiltriKokkuvõte(nähtavadSõidud);
  }

  kuvaKuuLäbisõit();
  uuendaEelseadistatudSõiduNuppu();
}

function filtreeritudSõidud() {
  return sõidud.filter((sõit) => {
    const pärastAlgust = !filtriAlgus || sõit.kuupäev >= filtriAlgus;
    const enneLõppu = !filtriLõpp || sõit.kuupäev <= filtriLõpp;

    return pärastAlgust && enneLõppu;
  });
}

function kuvaFiltriKokkuvõte(nähtavadSõidud) {
  const koguläbisõit = nähtavadSõidud.reduce(
    (summa, sõit) => summa + sõit.kilomeetrid,
    0,
  );
  const rida = document.createElement("tr");
  const perioodiLahter = document.createElement("td");
  const tühiLahter = document.createElement("td");
  const kilomeetriteLahter = document.createElement("td");
  const tegevusteLahter = document.createElement("td");

  perioodiLahter.textContent = vormindaFiltriPeriood();
  tühiLahter.colSpan = 4;
  kilomeetriteLahter.textContent = `${vormindaKilomeetrid(koguläbisõit)} km`;
  rida.append(
    perioodiLahter,
    tühiLahter,
    kilomeetriteLahter,
    tegevusteLahter,
  );
  filtriKokkuvõte.append(rida);
}

function vormindaFiltriPeriood() {
  if (filtriAlgus && filtriLõpp) {
    return `${vormindaKuupäev(filtriAlgus)} – ${vormindaKuupäev(filtriLõpp)}`;
  }

  return filtriAlgus
    ? `Alates ${vormindaKuupäev(filtriAlgus)}`
    : `Kuni ${vormindaKuupäev(filtriLõpp)}`;
}

function ekspordiCsv() {
  const eksporditavadSõidud = järjestatudSõidud(filtreeritudSõidud());
  const read = [
    [
      "Kuupäev",
      "Marsruut",
      "Sõidu eesmärk",
      "Spidomeetri algnäit",
      "Spidomeetri lõppnäit",
      "KM",
    ],
    ...eksporditavadSõidud.map((sõit) => [
      vormindaKuupäev(sõit.kuupäev),
      sõit.marsruut,
      sõit.eesmärk,
      vormindaKilomeetrid(sõit.algNäit),
      vormindaKilomeetrid(sõit.lõppNäit),
      vormindaKilomeetrid(sõit.kilomeetrid),
    ]),
  ];
  const csvSisu = read.map((rida) => rida.map(vormindaCsvVäli).join(",")).join("\r\n");
  const fail = new Blob(["\uFEFF", csvSisu], { type: "text/csv;charset=utf-8" });

  laadiFailAlla(fail, csvFailiNimi());
}

function ekspordiPdf() {
  const eksporditavadSõidud = järjestatudSõidud(filtreeritudSõidud());
  const koguläbisõit = eksporditavadSõidud.reduce(
    (summa, sõit) => summa + sõit.kilomeetrid,
    0,
  );
  const kmHind = Number(document.getElementById("km-hind").value) || 0;
  const printimisAken = window.open("", "_blank");

  if (!printimisAken) {
    return;
  }

  const üldandmed = new FormData(üldandmeteVorm);
  const lisainfo = üldandmed.get("lisainfo");
  const üldandmeteRead = `
    <p><strong>Ettevõte:</strong> ${põgenaHtml(üldandmed.get("ettevõte") || "")}</p>
    <p><strong>Kasutaja:</strong> ${põgenaHtml(üldandmed.get("kasutaja") || "")}</p>
    <p><strong>Amet:</strong> ${põgenaHtml(üldandmed.get("amet") || "")}</p>
    <p><strong>Auto reg. nr.:</strong> ${põgenaHtml(üldandmed.get("autoRegNr") || "")}</p>
    ${lisainfo ? `<p>${põgenaHtml(lisainfo)}</p>` : ""}
    <p><strong>Km. hind:</strong> ${põgenaHtml(vormindaKmHind(kmHind))} €</p>`;
  const tabeliRead = eksporditavadSõidud
    .map(
      (sõit) => `
        <tr>
          <td>${põgenaHtml(vormindaKuupäev(sõit.kuupäev))}</td>
          <td>${põgenaHtml(sõit.marsruut)}</td>
          <td>${põgenaHtml(sõit.eesmärk)}</td>
          <td>${põgenaHtml(vormindaKilomeetrid(sõit.algNäit))}</td>
          <td>${põgenaHtml(vormindaKilomeetrid(sõit.lõppNäit))}</td>
          <td>${põgenaHtml(vormindaKilomeetrid(sõit.kilomeetrid))}</td>
        </tr>`,
    )
    .join("");

  printimisAken.document.write(`
    <!DOCTYPE html>
    <html lang="et">
      <head>
        <meta charset="UTF-8" />
        <title>Isikliku sõiduauto kasutamine - Sõidupäevik</title>
        <style>
          body { font-family: Arial, sans-serif; color: #1f2933; margin: 32px; }
          h1 { margin-bottom: 8px; font-size: 18px; }
          .periood { margin: 0 0 24px; }
          .üldandmed { margin-bottom: 24px; }
          .üldandmed p { margin: 4px 0; }
          table { width: 100%; border-collapse: collapse; font-size: 12px; }
          th, td { padding: 8px; border: 1px solid #9aa5b1; text-align: left; }
          th { background: #f0f4f8; }
          .pdf-kokkuvote { display: grid; grid-template-columns: 2fr 1fr; gap: 24px; margin-top: 20px; }
          .pdf-kokkuvote p { margin: 4px 0; }
          .pdf-summad td:last-child { text-align: right; }
          .pdf-summad .tühi-rida td { height: 20px; }
          .pdf-summad .maksimum td { vertical-align: bottom; }
        </style>
      </head>
      <body>
        <h1>Isikliku sõiduauto kasutamine - Sõidupäevik</h1>
        <p class="periood"><strong>Periood:</strong> ${põgenaHtml(ekspordiPeriood())}</p>
        <section class="üldandmed">${üldandmeteRead}</section>
        <table>
          <thead>
            <tr>
              <th>Kuupäev</th><th>Marsruut</th><th>Eesmärk</th>
              <th>Spidomeetri algnäit</th><th>Spidomeetri lõppnäit</th><th>KM</th>
            </tr>
          </thead>
          <tbody>${tabeliRead}</tbody>
        </table>
        <section class="pdf-kokkuvote">
          <div>
            <p><strong>Tööpäevi:</strong> ${põgenaHtml(tööpäevadeArv(eksporditavadSõidud))}</p>
            <p>Isikliku auto omanik: ${põgenaHtml(üldandmed.get("kasutaja") || "")}</p>
          </div>
          <table class="pdf-summad">
            <tbody>
              <tr><td>Km kokku:</td><td>${põgenaHtml(vormindaKilomeetrid(koguläbisõit))}</td></tr>
              <tr><td>Summa kokku:</td><td>${põgenaHtml(vormindaSumma(koguläbisõit * kmHind))} €</td></tr>
              <tr class="tühi-rida"><td></td><td></td></tr>
              <tr class="maksimum"><td>Hüvitise<br />maksimummäär<br />kuus:</td><td>335 €</td></tr>
            </tbody>
          </table>
        </section>
      </body>
    </html>`,
  );
  printimisAken.document.close();
  printimisAken.focus();
  printimisAken.print();
}

function järjestatudSõidud(sõidudJärjestamiseks) {
  return [...sõidudJärjestamiseks].sort((esimene, teine) =>
    teine.kuupäev.localeCompare(esimene.kuupäev),
  );
}

function vormindaCsvVäli(väärtus) {
  return `"${String(väärtus).replaceAll('"', '""')}"`;
}

function laadiFailAlla(fail, failiNimi) {
  const url = URL.createObjectURL(fail);
  const link = document.createElement("a");

  link.href = url;
  link.download = failiNimi;
  link.click();
  URL.revokeObjectURL(url);
}

function csvFailiNimi() {
  if (filtriAlgus || filtriLõpp) {
    return `Soidupaevik_${filtriAlgus || "algusest"}-${filtriLõpp || "tänaseni"}.csv`;
  }

  return "Soidupaevik_koik-soidud.csv";
}

function ekspordiPeriood() {
  if (filtriAlgus || filtriLõpp) {
    return vormindaFiltriPeriood();
  }

  const kuupäevad = sõidud.map((sõit) => sõit.kuupäev).sort();

  if (kuupäevad.length === 0) {
    return "Sõite pole";
  }

  return `${vormindaKuupäev(kuupäevad[0])} – ${vormindaKuupäev(kuupäevad.at(-1))}`;
}

function põgenaHtml(väärtus) {
  return String(väärtus)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function alustaMuutmist(sõiduId) {
  const sõit = sõidud.find((olemasolevSõit) => olemasolevSõit.id === sõiduId);

  if (!sõit) {
    return;
  }

  muudetavaSõiduId = sõiduId;
  kasutatakseEelseadistust = false;
  kuupäevaSisend.value = sõit.kuupäev;
  document.getElementById("marsruut").value = sõit.marsruut;
  document.getElementById("eesmärk").value = sõit.eesmärk;
  algNäiduSisend.value = sõit.algNäit;
  lõppNäiduSisend.value = sõit.lõppNäit;
  salvestaNupp.textContent = "Salvesta muudatused";
  tühistaMuutmineNupp.hidden = false;
  vormiTeade.textContent = "Muudad valitud sõitu.";
  kuvaArvutatudLäbisõit();
  document.getElementById("marsruut").focus();
}

function kustutaSõit(sõiduId) {
  const sõit = sõidud.find((olemasolevSõit) => olemasolevSõit.id === sõiduId);

  const kinnituseTekst = sõit
    ? `Kas oled kindel, et soovid kustutada ${vormindaKuupäev(sõit.kuupäev)} toimunud ${sõit.marsruut} sõidu?`
    : "";

  if (!sõit || !window.confirm(kinnituseTekst)) {
    return;
  }

  sõidud = sõidud.filter((olemasolevSõit) => olemasolevSõit.id !== sõiduId);
  salvestaSõidud();

  if (muudetavaSõiduId === sõiduId) {
    lähtestaVorm();
  }

  kuvaSõidud();
}

function kuvaKuuLäbisõit() {
  const praeguneAasta = valitudKuu.getFullYear();
  const praeguneKuu = valitudKuu.getMonth();
  const kuuAlgus = `${praeguneAasta}-${String(praeguneKuu + 1).padStart(2, "0")}`;
  const kuuKilomeetrid = sõidud
    .filter((sõit) => sõit.kuupäev.startsWith(kuuAlgus))
    .reduce((summa, sõit) => summa + sõit.kilomeetrid, 0);
  const kmHind = Number(document.getElementById("km-hind").value);
  const summa = kuuKilomeetrid * (Number.isFinite(kmHind) ? kmHind : 0);

  kuuPealkiri.textContent = `Läbisõit ${praeguneAasta}. aasta ${kuuNimed[praeguneKuu]}: `;
  kuuLäbisõit.textContent = `${vormindaKilomeetrid(kuuKilomeetrid)} km`;
  kuuSumma.textContent = vormindaRaha(summa);
  maksimumiHoiatus.hidden = summa <= HÜVITISE_MAKSIMUMMÄÄR;
  kuvaKuuKalender(praeguneAasta, praeguneKuu);
}

function kuvaKuuKalender(aasta, kuu) {
  const kuuAlgus = `${aasta}-${String(kuu + 1).padStart(2, "0")}`;
  const sõitudePäevad = new Set(
    sõidud
      .filter((sõit) => sõit.kuupäev.startsWith(kuuAlgus))
      .map((sõit) => Number(sõit.kuupäev.slice(8, 10))),
  );
  const esimesePäevaNädalapäev = (new Date(aasta, kuu, 1).getDay() + 6) % 7;
  const päeviKuus = new Date(aasta, kuu + 1, 0).getDate();

  kuuKalender.setAttribute("aria-label", `${kuuNimed[kuu]} kalender`);
  kalendriPäevad.replaceChildren();

  for (let indeks = 0; indeks < esimesePäevaNädalapäev; indeks += 1) {
    const tühiPäev = document.createElement("span");
    tühiPäev.className = "kalendri-tühi";
    tühiPäev.setAttribute("aria-hidden", "true");
    kalendriPäevad.append(tühiPäev);
  }

  for (let päev = 1; päev <= päeviKuus; päev += 1) {
    const kalendriPäev = document.createElement("span");
    const onSõit = sõitudePäevad.has(päev);

    kalendriPäev.className = onSõit
      ? "kalendri-päev kalendri-päev--sõiduga"
      : "kalendri-päev";
    kalendriPäev.textContent = päev;

    if (onSõit) {
      kalendriPäev.setAttribute("aria-label", `${päev}. kuupäeval on registreeritud sõit.`);
    }

    kalendriPäevad.append(kalendriPäev);
  }
}

function loeSõidud() {
  const salvestatudAndmed = localStorage.getItem(SALVESTUSE_VÕTI);

  if (!salvestatudAndmed) {
    return [];
  }

  try {
    const loetudSõidud = JSON.parse(salvestatudAndmed);
    return Array.isArray(loetudSõidud)
      ? loetudSõidud.map(ühtlustaSõiduAndmed)
      : [];
  } catch {
    return [];
  }
}

function loeEelseadistus() {
  const salvestatudEelseadistus = localStorage.getItem(EELSEADISTUSE_VÕTI);

  if (!salvestatudEelseadistus) {
    return {
      marsruut: "",
      eesmärk: "",
      kasutaViimastLõppnäitu: false,
      sõiduPikkus: "",
    };
  }

  try {
    const loetudEelseadistus = JSON.parse(salvestatudEelseadistus);
    return {
      marsruut: String(loetudEelseadistus.marsruut ?? ""),
      eesmärk: String(loetudEelseadistus.eesmärk ?? ""),
      kasutaViimastLõppnäitu: Boolean(loetudEelseadistus.kasutaViimastLõppnäitu),
      sõiduPikkus: String(loetudEelseadistus.sõiduPikkus ?? ""),
    };
  } catch {
    return {
      marsruut: "",
      eesmärk: "",
      kasutaViimastLõppnäitu: false,
      sõiduPikkus: "",
    };
  }
}

function ühtlustaSõiduAndmed(sõit) {
  if (sõit.marsruut) {
    return sõit;
  }

  return {
    ...sõit,
    marsruut: `${sõit.alguspunkt ?? ""} – ${sõit.lõppPunkt ?? ""}`,
    algNäit: 0,
    lõppNäit: sõit.kilomeetrid ?? 0,
  };
}

function salvestaSõidud() {
  localStorage.setItem(SALVESTUSE_VÕTI, JSON.stringify(sõidud));
}

function tänaneKuupäev() {
  return new Date().toLocaleDateString("en-CA");
}

function vormindaKuupäev(kuupäev) {
  const [aasta, kuu, päev] = kuupäev.split("-");
  return `${Number(päev)}.${kuu}.${aasta}`;
}

function vormindaSisendiKuupäev(kuupäev) {
  const aasta = kuupäev.getFullYear();
  const kuu = String(kuupäev.getMonth() + 1).padStart(2, "0");
  const päev = String(kuupäev.getDate()).padStart(2, "0");
  return `${aasta}-${kuu}-${päev}`;
}

function vormindaKilomeetrid(kilomeetrid) {
  return new Intl.NumberFormat("et-EE", {
    maximumFractionDigits: 1,
  }).format(kilomeetrid);
}

function vormindaRaha(summa) {
  return new Intl.NumberFormat("et-EE", {
    style: "currency",
    currency: "EUR",
  }).format(summa);
}

function vormindaSumma(summa) {
  return new Intl.NumberFormat("et-EE", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(summa);
}

function vormindaKmHind(kmHind) {
  return new Intl.NumberFormat("et-EE", {
    maximumFractionDigits: 2,
  }).format(kmHind);
}

function tööpäevadeArv(sõidudArvutamiseks) {
  return new Set(sõidudArvutamiseks.map((sõit) => sõit.kuupäev)).size;
}

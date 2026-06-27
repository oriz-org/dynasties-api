# dynasties-api

> Free, public, static JSON API of **Indian historical dynasties** — Maurya, Gupta, Chola, Mughal, Maratha, and 30+ more, with rulers, periods, capitals, and achievements.

Part of the [oriz](https://oriz.in) fleet.

**Documentation:** https://dynasties.oriz.in &middot; **API reference:** https://dynasties.oriz.in/docs &middot; **Live explorer:** https://dynasties.oriz.in/explorer

---

## What

A hand-curated dataset of major Indian dynasties from Magadha (6th c. BCE) through the British Raj (1947 CE), served as plain JSON files. No backend, no auth, no rate limits.

Each record carries:

- `slug`, `name`, `alt_names`
- `period` — `{ start, end, start_era, end_era }` with **negative years for BCE**, positive for CE, plus explicit `"BCE"` / `"CE"` strings for human readability
- `region` — geographic extent
- `capitals` — capital(s) over the dynasty's life
- `rulers` — chronological list of monarchs, each with `name`, `reign_start`, `reign_end`, `notes`
- `religion` — dominant / patronised religion(s)
- `predecessor` / `successor` — slugs of neighbouring dynasties
- `notable_achievements` — bullet-list highlights
- `notes` — free-text annotation

The repo also exposes:

- `/index.json` — flat array of slugs (autocomplete)
- `/all.json` — every full record
- `/timeline.json` — records sorted by `period.start` ascending (for timeline viz)
- `/eras.json` — records bucketed into eras: ancient, classical, medieval, sultanate, mughal, maratha-sikh, colonial

---

## Endpoints

### Via `dynasties.oriz.in` (Cloudflare Pages)

```
GET https://dynasties.oriz.in/dynasties/mauryan.json
GET https://dynasties.oriz.in/index.json
GET https://dynasties.oriz.in/all.json
GET https://dynasties.oriz.in/timeline.json
GET https://dynasties.oriz.in/eras.json
```

### Via jsDelivr (pinned to a git ref)

```
GET https://cdn.jsdelivr.net/gh/oriz-org/dynasties-api@main/dynasties/mauryan.json
GET https://cdn.jsdelivr.net/gh/oriz-org/dynasties-api@main/index.json
```

---

## Sample

`GET https://dynasties.oriz.in/dynasties/mauryan.json`

```json
{
  "slug": "mauryan",
  "name": "Mauryan Empire",
  "alt_names": ["Maurya Dynasty"],
  "period": { "start": -322, "end": -185, "start_era": "BCE", "end_era": "BCE" },
  "region": "South Asia (most of subcontinent)",
  "capitals": ["Pataliputra"],
  "rulers": [
    { "name": "Chandragupta Maurya", "reign_start": -322, "reign_end": -298, "notes": "Founder" },
    { "name": "Bindusara",           "reign_start": -297, "reign_end": -273, "notes": "" },
    { "name": "Ashoka the Great",    "reign_start": -268, "reign_end": -232, "notes": "Promoted Buddhism" }
  ],
  "religion": "Hinduism, Buddhism, Jainism (pluralistic)",
  "predecessor": "nanda",
  "successor": "shunga",
  "notable_achievements": ["Unified most of the Indian subcontinent", "Ashoka's dhamma edicts"],
  "notes": "First pan-Indian empire."
}
```

---

## BCE / CE convention

Years are integers. **Negative values are BCE**, positive are CE. The explicit `start_era` and `end_era` strings remove ambiguity:

```json
"period": { "start": -322, "end": -185, "start_era": "BCE", "end_era": "BCE" }
```

means "322 BCE to 185 BCE". This makes arithmetic (sorting, span) trivial without losing readability.

---

## Sources

- [Wikipedia: List of Indian monarchs](https://en.wikipedia.org/wiki/List_of_Indian_monarchs) — CC BY-SA 4.0
- [Wikipedia: List of Indian dynasties](https://en.wikipedia.org/wiki/List_of_Indian_dynasties) — CC BY-SA 4.0
- Per-dynasty Wikipedia articles (Maurya, Gupta, Chola, Mughal, Vijayanagara, etc.)
- Reference works (Romila Thapar, R.S. Sharma, Burton Stein, K.A. Nilakanta Sastri) consulted for date reconciliation

The build script (`scripts/generate.cjs`) holds the curated dataset inline so anyone can audit, fix, or extend it via PR. Run `npm run data` to regenerate.

**Scope:** 39 dynasties, 261 rulers. Required: Maurya, Shunga, Kanva, Satavahana, Kushan, Gupta, Vakataka, Pallava, Chalukya (Badami), Pala, Rashtrakuta, Chola, Hoysala, Kakatiya, Seuna, Delhi Sultanate (Mamluk + Khalji + Tughlaq + Sayyid + Lodi — five records), Bahmani, Vijayanagara, Mughal, Maratha, Sikh Empire, British Raj. Plus regional: Haryanka, Shishunaga, Nanda, Western Kshatrapa, Pushyabhuti, Sena, Gurjara-Pratihara, Western Chalukya, Pandyan, Sur, Mysore (Wadiyar + Tipu), Ahom, Travancore.

**Future work:** Sangam-era dynasties (early Cholas, early Pandyas, Cheras), Eastern Gangas, Chandellas, Paramaras, Solankis, Rajput Kachhwaha/Sisodia houses, Deccan Sultanate split (Adil Shahi, Qutb Shahi, Nizam Shahi, etc.), Manipur Meitei dynasty, Tripura royals. Issues and PRs welcome.

---

## License

- **Code** (`scripts/`, `src/`, build tooling): [MIT](./LICENSE)
- **Data** (`dynasties/`, `*.json`): [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) (inherited from Wikipedia)

Attribution: "Source: Wikipedia — List of Indian monarchs, List of Indian dynasties, and per-dynasty articles."

---

## Build / contribute

```bash
npm install            # install Astro + Tailwind
npm run data           # regenerate dynasties/*.json + aggregate JSONs via scripts/generate.cjs
npm run dev            # local dev server (http://localhost:4321)
npm run build          # production build to dist/
```

Open an issue or PR on https://github.com/oriz-org/dynasties-api if a date, ruler, or attribution is wrong.

# Hópaverkefni 2

Þetta verkefni er byggt á HTML, SASS/SCSS og JavaScript.

##  Skráarskipulag

* **`dist/css/`**: Þýdd **CSS** skrá (*main.css*) sem er notuð af vafranum. Þessi mappa er byggð af SASS.
* **`src/scss/`**: Inniheldur uppruna **SASS/SCSS** skrár. Aðalstíllinn er skilgreindur í **`src/scss/main.scss`**.
* **`sidur/`**: Mappa sem inniheldur html síður (*HTML skrár*) eða tengt efni fyrir verkefnið.
* **`index.html`**: Aðal **HTML** skrá verkefnisins (heimasíðan/forsíðan).
* **`package.json`**: Skilgreinir öll tól (*dependencies*) og skipanir til að keyra, þýða og yfirfara kóðann.
* **`.eslintrc.config.js`** og **`.stylelint.config.js`**: Stillingarskrár fyrir kóðaeftirlit.

## Uppsetning og Ræsingu

Til að byrja að vinna með verkefnið á tölvunni þinni þarftu að sækja geymsluna og setja upp öll tól.

### 1. Sækja og Setja upp

```
# 1. Afrita geymsluna
git clone [https://github.com/Olibreki/hopaverkefni2.git](https://github.com/Olibreki/hopaverkefni2.git)
cd hopaverkefni2

# 2. Setja upp öll nauðsynleg node.js tól (Dependencies)
npm install
```
### 2. þróun
```
npm run dev
```
### 3. build
 ```
npm run build:css
```
### 4. Linting
```
npm run lint:css	Athugar SASS/SCSS skrár fyrir stíl villum.
npm run lint:js	Athugar allar JavaScript skrár fyrir kóða villum.
npm run lint	Keyrir bæði CSS og JS eftirlit í röð.
```

### autofixing
```
npm run fix:css	Reynir að laga stíl villur í SCSS sjálfvirkt.
npm run fix:js	Reynir að laga kóða villur í JS sjálfvirkt.
npm run fix	Keyrir báðar lagfæringarnar í röð.
```
## Útfærð virkni
Útfærðum grunnvirkni en auk þess útfærðum við:
### Miklu fleiri spurningar:
Höfum yfir 100 spurningar
### Búa til form sem leyfir notanda að búa til spurningu með spurningu og svari.
Þegar formi er vistað skal vista spurningu í localStorage ásamt öðrum spurningum. Þegar spurningar eru birtar skal birta þessar spurningar ásamt þeim sem fyrir eru.
### Nánari gögn fyrir spurningu
Hver spurning hefur flokk og erfiðleikastig

| Nafn | HÍ Notendanafn | GitHub Notendanafn |
| :--- | :--- | :--- |
| **Einar Atli** | eag19 | einaratli |
| **Ólafur Breki** | obg6 | Olibreki |


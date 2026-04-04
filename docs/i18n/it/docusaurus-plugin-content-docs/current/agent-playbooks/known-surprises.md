# Sorprese conosciute

Questo file tiene traccia dei punti di confusione specifici del repository che hanno causato errori dell'agente.

## Criteri di ingresso

Aggiungi una voce solo se sono tutte vere:

- È specifico per questo repository (non un consiglio generico).
- È probabile che si ripeta per i futuri agenti.
- Ha una mitigazione concreta che può essere seguita.

In caso di dubbi, chiedi allo sviluppatore prima di aggiungere una voce.

## Modello di inserimento

```md
### [Short title]

- **Date:** YYYY-MM-DD
- **Observed by:** agent name or contributor
- **Context:** where/when it happened
- **What was surprising:** concrete unexpected behavior
- **Impact:** what went wrong or could go wrong
- **Mitigation:** exact step future agents should take
- **Status:** confirmed | superseded
```

## Voci

### Portless modifica l'URL canonico dell'app locale

- **Data:** 2026-03-18
- **Osservato da:** Codice
- **Contesto:** Verifica del browser e flussi di fumo
- **Ciò che è stato sorprendente:** L'URL locale predefinito non è la solita porta Vite. Il repository prevede `http://bitsocial.localhost:1355` tramite Portless, quindi il controllo di `localhost:3000` o `localhost:5173` può colpire l'app sbagliata o niente.
- **Impatto:** i controlli del browser possono fallire o convalidare la destinazione sbagliata anche quando il server di sviluppo è integro.
- **Mitigazione:** utilizzare prima `http://bitsocial.localhost:1355`. Evitalo solo con `PORTLESS=0 corepack yarn start` quando hai esplicitamente bisogno di una porta Vite diretta.
- **Stato:** confermato

### Gli hook di commit bloccano i commit non interattivi

- **Data:** 2026-03-18
- **Osservato da:** Codice
- **Contesto:** flussi di lavoro di commit gestiti da agenti
- **Ciò che è stato sorprendente:** `git commit` attiva Commitizen tramite Husky e attende l'input TTY interattivo, che blocca le shell dell'agente non interattivo.
- **Impatto:** gli agenti possono bloccarsi indefinitamente durante quello che dovrebbe essere un commit normale.
- **Mitigazione:** utilizza `git commit --no-verify -m "message"` per i commit creati dall'agente. Gli esseri umani possono ancora utilizzare `corepack yarn commit` o `corepack yarn exec cz`.
- **Stato:** confermato

### Corepack è necessario per evitare Yarn classic

- **Data:** 2026-03-19
- **Osservato da:** Codice
- **Contesto:** Migrazione del gestore pacchetti a Yarn 4
- **Ciò che è stato sorprendente:** La macchina ha ancora un'installazione classica di Yarn globale su `PATH`, quindi l'esecuzione del semplice `yarn` può risolversi nella v1 anziché nella versione Yarn 4 bloccata.
- **Impatto:** gli sviluppatori possono ignorare accidentalmente il blocco del gestore pacchetti del repository e ottenere un comportamento di installazione o un output del file di blocco diversi.
- **Mitigazione:** utilizzare `corepack yarn ...` per i comandi della shell oppure eseguire prima `corepack enable` in modo che `yarn` si risolva nella versione Yarn 4 bloccata.
- **Stato:** confermato

### Risolti i problemi con i nomi delle app Portless che si scontravano tra gli alberi di lavoro Web Bitsocial

- **Data:** 30-03-2026
- **Osservato da:** Codice
- **Contesto:** Avvio di `yarn start` in un albero di lavoro Web Bitsocial mentre un altro albero di lavoro era già disponibile tramite Portless
- **Ciò che è stato sorprendente:** L'utilizzo del nome letterale dell'app Portless `bitsocial` in ogni albero di lavoro fa sì che il percorso stesso entri in collisione, anche quando le porte di supporto sono diverse, quindi il secondo processo fallisce perché `bitsocial.localhost` è già registrato.
- **Impatto:** i rami Web paralleli di Bitsocial possono bloccarsi a vicenda anche se Portless è pensato per consentire loro di coesistere in sicurezza.
- **Mitigazione:** mantenere l'avvio Portless dietro `scripts/start-dev.mjs`, che ora utilizza una route ZXQPLACEholder1ZXQ con ambito ramo al di fuori del caso canonico e ritorna a una route con ambito ramo quando il nome `bitsocial.localhost` nudo è già occupato.
- **Stato:** confermato

### Anteprima dei documenti utilizzata per codificare la porta 3001

- **Data:** 30-03-2026
- **Osservato da:** Codice
- **Contesto:** esecuzione di `yarn start` insieme ad altri repository e agenti locali
- **Ciò che è stato sorprendente:** il comando root dev eseguiva l'area di lavoro docs con `docusaurus start --port 3001`, quindi l'intera sessione di sviluppo falliva ogni volta che un altro processo possedeva già `3001`, anche se l'app principale utilizzava già Portless.
- **Impatto:** `yarn start` potrebbe interrompere il processo Web immediatamente dopo l'avvio, interrompendo il lavoro locale non correlato a causa di una collisione della porta dei documenti.
- **Mitigazione:** mantieni l'avvio dei documenti dietro `yarn start:docs`, che ora utilizza Portless più `scripts/start-docs.mjs` per rispettare una porta libera inserita o ricorrere alla successiva porta disponibile quando viene eseguito direttamente.
- **Stato:** confermato

### Documenti risolti Il nome host Portless era hardcoded

- **Data:** 03-04-2026
- **Osservato da:** Codice
- **Contesto:** esecuzione di `yarn start` in un albero di lavoro Bitsocial Web secondario mentre un altro albero di lavoro stava già servendo documenti tramite Portless
- **Ciò che è stato sorprendente:** `start:docs` ha comunque registrato il nome host letterale `docs.bitsocial.localhost`, quindi `yarn start` potrebbe fallire anche se l'app about sapeva già come evitare collisioni di percorsi Portless per il proprio nome host.
- **Impatto:** gli alberi di lavoro paralleli non potevano utilizzare in modo affidabile il comando root dev perché il processo dei documenti è terminato per primo e `concurrently` ha poi interrotto il resto della sessione.
- **Mitigazione:** mantieni l'avvio dei documenti dietro `scripts/start-docs.mjs`, che ora deriva lo stesso nome host Portless con ambito ramo dell'app Informazioni e inserisce l'URL pubblico condiviso nella destinazione proxy di sviluppo `/docs`.
- **Stato:** confermato

### Le shell Worktree possono non avere la versione del nodo bloccato del repository

- **Data:** 03-04-2026
- **Osservato da:** Codice
- **Contesto:** esecuzione di `yarn start` in alberi di lavoro Git come `.claude/worktrees/*` o checkout di alberi di lavoro fratelli
- **Ciò che è stato sorprendente:** alcune shell dell'albero di lavoro hanno risolto `node` e ZXQPLACEholder1ZXQ nel nodo Homebrew ZXQPLACEholder2ZXQ anche se il repository aggiunge ZXQPLACEholder3ZXQ in ZXQPLACEholder4ZXQ, quindi ZXQPLACEholder5ZXQ poteva eseguire silenziosamente i launcher degli sviluppatori con il runtime sbagliato.
- **Impatto:** il comportamento del server di sviluppo può spostarsi tra il checkout principale e gli alberi di lavoro, rendendo difficile la riproduzione dei bug e violando la toolchain Nodo 22 prevista del repository.
- **Mitigazione:** mantieni i launcher di sviluppo dietro `scripts/start-dev.mjs` e `scripts/start-docs.mjs`, che ora vengono rieseguiti sotto il binario del nodo `.nvmrc` quando la shell corrente è sulla versione sbagliata. La configurazione della shell dovrebbe comunque preferire `nvm use`.
- **Stato:** confermato

### Gli avanzi di `docs-site/` possono nascondere l'origine dei documenti mancanti dopo il refactoring

- **Data:** 01-04-2026
- **Osservato da:** Codice
- **Contesto:** pulizia monorepo post-unione dopo lo spostamento del progetto Docusaurus da `docs-site/` a `docs/`
- **Ciò che è stato sorprendente:** La vecchia cartella `docs-site/` può rimanere sul disco con file obsoleti ma importanti come `i18n/`, anche dopo che il repository tracciato è stato spostato su `docs/`. Ciò fa sì che il refactoring sembri duplicato localmente e può nascondere il fatto che le traduzioni dei documenti tracciati non sono state effettivamente spostate in `docs/`.
- **Impatto:** gli agenti possono eliminare la vecchia cartella come "posta indesiderata" e perdere accidentalmente l'unica copia locale delle traduzioni dei documenti oppure continuare a modificare script che puntano ancora al percorso `docs-site/` morto.
- **Mitigazione:** tratta `docs/` come l'unico progetto di documenti canonico. Prima di eliminare eventuali residui di `docs-site/` locale, ripristina l'origine tracciata come `docs/i18n/` e aggiorna script e hook per interrompere il riferimento a `docs-site`.
- **Stato:** confermato

### L'anteprima dei documenti multilocale può aumentare la RAM durante la verifica

- **Data:** 01-04-2026
- **Osservato da:** Codice
- **Contesto:** Correzione dei documenti i18n, routing locale e comportamento di Pagefind con `yarn start:docs` plus Playwright
- **Ciò che è stato sorprendente:** la modalità di anteprima dei documenti predefinita ora esegue una creazione completa di documenti multilocale più l'indicizzazione di Pagefind prima della pubblicazione e mantenere attivo quel processo insieme a più sessioni di Playwright o Chrome può consumare molta più RAM di un normale ciclo di sviluppo Vite o Docusaurus a locale singola.
- **Impatto:** il computer può avere limiti di memoria, le sessioni del browser possono bloccarsi e le esecuzioni interrotte possono lasciare server di documenti obsoleti o browser headless che continuano a consumare memoria.
- **Mitigazione:** per i lavori sui documenti che non richiedono la verifica del percorso locale o della ricerca di pagine, preferisci `DOCS_START_MODE=live yarn start:docs`. Utilizza l'anteprima multilocale predefinita solo quando devi convalidare percorsi tradotti o Pagefind. Mantieni una singola sessione di Playwright, chiudi le vecchie sessioni del browser prima di aprirne di nuove e arresta il server dei documenti dopo la verifica se non ne hai più bisogno.
- **Stato:** confermato

---
layout: paper
title: "Darwin vs Kropotkin: Competition, Mutual Aid, and the Modern Science of Cooperation"
description: "A guided, cross-disciplinary tour (biology → sociology → philosophy → political ecology), plus a lab to compare models."
lang: en
permalink: /models/darwin-vs-kropotkin/
---

# Darwin vs Kropotkin: Competition, Mutual Aid, and the Modern Science of Cooperation

<div class="callout callout--key">
  <div class="callout-title">What this page is trying to do</div>
  <div>
    Stop treating “Darwin = ruthless competition” and “Kropotkin = kumbaya cooperation” as a boxing match with one winner.
    In modern evolutionary biology, <b>competition and cooperation are both real</b>, and the interesting question is:
    <i>under what conditions does each dominate, and what kinds of “cooperation” are we talking about?</i>
  </div>
</div>

<div class="callout callout--warn">
  <div class="callout-title">A necessary warning (because history is messy)</div>
  <div>
    The jump from “how evolution works” to “how society should work” has been used to justify everything from
    egalitarian mutual aid to brutal eugenics. Biology can inform our imagination, but it does not hand us a moral constitution.
  </div>
</div>

**Use the buttons in the sidebar** to open the three-voice debate and to jump into the lab.

---

## 1) Darwin, carefully read (not meme-Darwin)

Darwin absolutely did emphasize the **“struggle for existence”** as a driver of evolution. But he also wrote explicitly about **social instincts, sympathy, and the moral sense** as natural products of evolution—especially in *The Descent of Man* (1871). In his discussion of social animals, he describes sympathy and “services” among group members as part of what sociality *is*. <a href="#ref-darwin1871">Darwin 1871</a>

So the historically accurate claim is:

- Darwin: **selection happens via differential survival/reproduction** in a world of constraints and competition.
- Darwin (also): **social instincts and cooperation** can be selected for, because they can increase the success of individuals *and* groups.

If your only Darwin is “nature, red in tooth and claw,” you’re actually quoting **Tennyson** and reading Darwin through later ideological lenses.

---

## 2) Huxley’s “cosmic process” and the ideological afterlife

Thomas Henry Huxley (a major Darwin defender) argued in his 1888 essay that the natural world (“cosmic process”) is not moral and that ethics must be a human counterforce against it—while still framing nature as a brutal competitive arena. <a href="#ref-huxley1888">Huxley 1888</a>

Kropotkin’s *Mutual Aid* is, in part, a response to **that vibe**: a pushback against turning “struggle” into a one-note story that erases cooperation.

This matters because “Darwinism” in politics often became **Social Darwinism**: competition as virtue, hierarchy as destiny, and inequality as “natural.” That’s not a biological theorem; it’s an ideology wearing a lab coat.

---

## 3) Kropotkin’s claim: mutual aid is not a moral add-on—it’s an evolutionary factor

Kropotkin’s *Mutual Aid: A Factor of Evolution* (1902) argues that in many environments—especially harsh ones—animals and humans survive through cooperation, and that mutual aid can be a major driver of evolutionary success. <a href="#ref-kropotkin1902">Kropotkin 1902</a>

He does **not** deny struggle. He reframes it:

- Not only “organisms vs organisms” (competition),
- but also “organisms vs environment” (cold, famine, predators, pathogens),
- where cooperation can be the best “technology” evolution has.

Kropotkin uses natural history examples (ants, birds, mammals, human communities) to argue that **sociability** and **support** are widespread, and that selection can favor them.

---

## 4) Contemporary view: cooperation is a whole toolbox, not a single mechanism

Modern evolutionary theory doesn’t ask “competition or cooperation?” It asks:

> What mechanisms can make cooperation stable against free-riding?

A famous synthesis by Martin Nowak lists five mechanisms for the evolution of cooperation: **kin selection, direct reciprocity, indirect reciprocity, network reciprocity, and group selection**. <a href="#ref-nowak2006">Nowak 2006</a>

<figure>
  <img src="{{ '/models/darwin-vs-kropotkin/figures/fig_nowak_five_rules.svg' | relative_url }}" alt="Nowak five rules diagram">
  <figcaption>Five mechanisms that can stabilize cooperation (Nowak 2006). The lab implements network structure + optional institutions; the essay discusses the full set.</figcaption>
</figure>

The important contemporary nuance:

- “Cooperation” can mean **helping kin** (inclusive fitness), **trading favors**, **reputation and signaling**, **clustered networks**, **multi-level selection**, **institutions**, and more.
- These mechanisms can coexist and reinforce each other.

This is where the Darwin–Kropotkin “debate” becomes productive: it’s less about *whether* cooperation exists, more about **which ecological/social structures select for it**.

---

## 5) From biology to society: how to not commit category errors

A clean way to avoid confusion:

- **Evolutionary biology**: describes *how traits spread* under selection/drift in populations.
- **Social/political theory**: evaluates *how societies should be organized*, with ethical commitments, historical context, and power relations.

You can still build bridges, but you have to keep two dangers in mind:

1) **Naturalistic fallacy**: “X happens in nature → X is good.” (No.)
2) **Just-so politics**: “My politics is natural → therefore true.” (Also no.)

The responsible bridge is: use models as **intuition pumps**, then bring in institutions, ethics, and history.

---

## 6) Commons, institutions, and why “free-rider” is not destiny

Garrett Hardin’s famous “Tragedy of the Commons” essay popularized the idea that shared resources inevitably collapse under self-interest. <a href="#ref-hardin1968">Hardin 1968</a>

Elinor Ostrom’s work showed—empirically—that communities can and do govern commons sustainably through **institutions** (rules, monitoring, graduated sanctions, conflict resolution, and local legitimacy). <a href="#ref-ostrom1990">Ostrom 1990</a>

This is a nice “third voice” in our story:

- Darwin lens: free-riding is always a threat.
- Kropotkin lens: cooperation is a natural survival strategy.
- Contemporary lens: **institutions change the payoff landscape**.

In the lab’s Moran mode, the **Public Goods (commons)** game + “institution strength” parameter is a toy version of this idea.

<button class="btn btn--ghost" type="button" onclick="dvkLoadPreset('mor_pgg_noinst')">Try: commons, no institution</button>
<button class="btn btn--ghost" type="button" onclick="dvkLoadPreset('mor_pgg_inst')">Try: commons + institution</button>

---

## 7) Anarchism is not “no rules”; it’s a theory of rule-making without domination

Since you explicitly asked for Bakunin: Bakunin’s critique of authority (e.g., *God and the State*) targets **hierarchical domination** and argues for people governing themselves rather than being governed. <a href="#ref-bakunin1871">Bakunin 1871</a>

There’s a deep link here to Ostrom and to modern complex-systems thinking:

- “No state” does not mean “no institutions.”
- It can mean **polycentric**, bottom-up, federated rule systems (rules generated by participants, not imposed by distant power).



A closely related contemporary development is **social ecology** (Murray Bookchin), which argues that many ecological crises originate in social hierarchies and domination, so “fixing nature” requires rebuilding social relations—not just changing individual consumer behavior. <a href="#ref-bookchin1993">Bookchin 1993</a>

And “mutual aid” is not just a 19th‑century phrase. In contemporary movements, writers like Dean Spade emphasize mutual aid as **horizontal, reciprocal care and organizing** (as opposed to top‑down charity), explicitly in conversation with Kropotkin’s tradition. <a href="#ref-spade2020">Spade 2020</a>

You can read this as a design problem: how do we create coordination (and constrain cheating) without building a machine that becomes its own predator?

---

## 8) Political ecology: cooperation is also about power + environment, not just “preferences”

Political ecology studies how **power relations and economic structures drive environmental change**, and how access to resources is distributed (often unjustly). <a href="#ref-politicalecology2020">Roberts 2020</a>

This is crucial for Darwin vs Kropotkin because it adds a missing variable: **who controls the environment** that sets the payoffs.

If the “environment” is politically produced—via enclosure, extractive economies, colonial histories—then “cooperation” is not only a biological strategy, it is also a struggle over:

- property regimes,
- labor and risk distribution,
- who gets to decide what counts as “rational.”

<figure>
  <img src="{{ '/models/darwin-vs-kropotkin/figures/fig_layers_political_ecology.svg' | relative_url }}" alt="Layered view of cooperation">
  <figcaption>A layered view that keeps ecology real and power visible. Useful for not collapsing sociology into biology (or vice-versa).</figcaption>
</figure>

---

## 9) Philosophy of liberation and pedagogy: why the “third voice” refuses to be neutral

The Latin American **Philosophy of Liberation** tradition explicitly treats philosophy as practical and situated: thinking from the standpoint of dependency, oppression, and liberation. <a href="#ref-mendieta2016">Mendieta 2016</a>

Enrique Dussel frames liberation philosophy as beginning from historical/geo-political conditions rather than pretending to be view-from-nowhere. <a href="#ref-dussel1985">Dussel 1985</a>

Paulo Freire’s pedagogy emphasizes **conscientização** (critical consciousness) and praxis (reflection + action), arguing that liberation is a mutual process, not a gift. <a href="#ref-freire_iepx">Freire (IEP)</a>

Why is this relevant here?

Because the Darwin–Kropotkin debate isn’t only about *mechanisms*; it’s also about *what stories do*, and who benefits from which story.

A “third voice” can say:

- Biology teaches humility: cooperation is fragile; cheating is real.
- Sociology teaches sobriety: power shapes “environment” and incentives.
- Liberation thought teaches orientation: analysis should be accountable to those harmed by the system.

---

## 10) The Lab: compare two model families

<a id="dvk-lab-anchor"></a>

<div class="callout callout--model">
  <div class="callout-title">Two simulation modes</div>
  <div>
    <b>(A) Ecology mode</b>: generalized Lotka–Volterra (gLV) with a saturating mutual-aid term.<br/>
    <b>(B) Moran mode</b>: finite-population evolutionary game dynamics (drift + selection), with optional network structure and a toy “institution” knob.
  </div>
</div>

<figure>
  <img src="{{ '/models/darwin-vs-kropotkin/figures/fig_glv_terms.svg' | relative_url }}" alt="gLV terms">
  <figcaption>Ecology mode equation: logistic growth + competition − mutualism + noise.</figcaption>
</figure>

<figure>
  <img src="{{ '/models/darwin-vs-kropotkin/figures/fig_moran_process.svg' | relative_url }}" alt="Moran process">
  <figcaption>Moran mode: finite-population stochastic evolution (selection vs drift), optionally structured on a network.</figcaption>
</figure>

<div class="lab-embed">
  <div class="lab-embed__top">
    <div style="font-weight:800;">Interactive Lab (embedded)</div>
    <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
      <a class="btn btn--ghost" href="{{ '/models/darwin-vs-kropotkin/lab/?lang=en' | relative_url }}" target="_blank" rel="noopener">Open in new tab</a>
      <a class="btn btn--ghost" href="{{ '/models/darwin-vs-kropotkin/app/' | relative_url }}" target="_blank" rel="noopener">Legacy simulator (old UI)</a>
    </div>
  </div>
  <iframe class="lab-embed__frame" id="dvk-lab" src="{{ '/models/darwin-vs-kropotkin/lab/?lang=en' | relative_url }}" loading="lazy" title="Darwin vs Kropotkin Lab"></iframe>
</div>

### How to use it (recommended path)

1. Start in **Moran mode → Prisoner’s dilemma → well-mixed** (Darwin lens). Watch defection tend to dominate.
2. Switch to **network structure** (Kropotkin lens). Clustering can protect cooperators.
3. Try **Public goods (commons)** with and without “institution strength” (contemporary lens).

---

## 11) The three-voice debate (Darwin · Kropotkin · Contemporary)

<dialog id="dvk-debate">
  <div class="modal">
    <div class="modal-header">
      <div>
        <p class="modal-title">A staged debate: Darwin · Kropotkin · Contemporary</p>
        <p class="small" style="margin:0.3rem 0 0; color:var(--muted);">
          Not a historical reenactment. Think of this as “best arguments reconstructed,” with modern annotations.
        </p>
      </div>
      <button class="modal-close" type="button" data-close-debate>Close</button>
    </div>

    <div class="modal-body">
      <h3>Act I — What is the “struggle for existence”?</h3>

      <div class="voice">
        <div class="who">Darwin</div>
        <div>
          “Struggle” is not only tooth-and-claw fighting. It includes any constraint on survival and reproduction: food, climate, predators, disease,
          and competition with others. Selection is about differential success under these constraints.
        </div>
        <div class="meta">Anchor: Darwin’s broader view includes social instincts and sympathy. <a href="#ref-darwin1871">Darwin 1871</a></div>
        <div class="voice-actions">
          <button class="btn btn--ghost" type="button" onclick="dvkLoadPreset('eco_darwin_scramble')">Try in lab: competitive scramble</button>
        </div>
      </div>

      <div class="voice">
        <div class="who">Kropotkin</div>
        <div>
          Agreed: the environment is harsh. That is exactly why mutual aid matters.
          In many regions, the main struggle is against climate and scarcity; cooperation can be the best survival strategy.
        </div>
        <div class="meta">Kropotkin frames mutual aid as a “law of nature” alongside struggle. <a href="#ref-kropotkin1902">Kropotkin 1902</a></div>
        <div class="voice-actions">
          <button class="btn btn--ghost" type="button" onclick="dvkLoadPreset('eco_kropotkin_harsh')">Try in lab: mutual aid under harshness</button>
        </div>
      </div>

      <div class="voice">
        <div class="who">Contemporary</div>
        <div>
          The key is specifying mechanism. “Cooperation” can be kin-based, reciprocal, reputation-based, network-clustered, group-structured, or institutionally enforced.
          Different environments make different mechanisms feasible.
        </div>
        <div class="meta">Five mechanisms synthesis. <a href="#ref-nowak2006">Nowak 2006</a></div>
      </div>

      <h3>Act II — Free riders: do they doom cooperation?</h3>

      <div class="voice">
        <div class="who">Darwin</div>
        <div>
          Any cooperative system is vulnerable to cheaters. If defectors get benefits without paying costs, cooperation can unravel unless something counteracts it.
        </div>
        <div class="voice-actions">
          <button class="btn btn--ghost" type="button" onclick="dvkLoadPreset('mor_pd_wellmixed')">Try in lab: PD well-mixed</button>
        </div>
      </div>

      <div class="voice">
        <div class="who">Kropotkin</div>
        <div>
          Real groups are not well-mixed soup. Animals and humans live in structured networks with memory, repeated interaction, and social sanctions.
          Those structures reduce the space cheaters can exploit.
        </div>
        <div class="voice-actions">
          <button class="btn btn--ghost" type="button" onclick="dvkLoadPreset('mor_pd_network')">Try in lab: network reciprocity</button>
        </div>
      </div>

      <div class="voice">
        <div class="who">Contemporary</div>
        <div>
          Institutions matter. The “commons” is not a lawless field; it’s a governance challenge.
          Hardin made the dilemma famous; Ostrom showed real solutions: rules, monitoring, sanctions, legitimacy.
        </div>
        <div class="meta">Commons debate. <a href="#ref-hardin1968">Hardin 1968</a>; <a href="#ref-ostrom1990">Ostrom 1990</a></div>
        <div class="voice-actions">
          <button class="btn btn--ghost" type="button" onclick="dvkLoadPreset('mor_pgg_inst')">Try in lab: commons + institution</button>
        </div>
      </div>

      <h3>Act III — Can biology justify a politics?</h3>

      <div class="voice">
        <div class="who">Darwin</div>
        <div>
          Biology describes what selection can do. It does not decide what we ought to do.
          But understanding our evolved capacities and constraints can keep utopias from becoming fantasies.
        </div>
      </div>

      <div class="voice">
        <div class="who">Kropotkin</div>
        <div>
          The danger is when “competition” becomes a moral sermon for hierarchy.
          Mutual aid is not a fairy tale; it’s observable. Politics should cultivate it rather than treating cruelty as “natural.”
        </div>
      </div>

      <div class="voice">
        <div class="who">Contemporary</div>
        <div>
          Political ecology reminds us that “environment” is partially produced by power. Philosophy of liberation reminds us that neutrality can be complicity.
          The right move is: use models, but keep ethics and history in the room.
        </div>
        <div class="meta">
          Political ecology definition. <a href="#ref-politicalecology2020">Roberts 2020</a>.
          Philosophy of liberation overview. <a href="#ref-mendieta2016">Mendieta 2016</a>.
        </div>
      </div>

      <p class="small">
        End of debate. This is not closure; it’s an invitation to think with better tools.
      </p>
    </div>
  </div>
</dialog>

---

## References

<div class="refs">
  <ol>
    <li id="ref-darwin1871">
      Darwin, Charles. 1871. <i>The Descent of Man, and Selection in Relation to Sex</i>. Chapter IV (“The moral sense”), public-domain text.
      <br/><a href="https://en.wikisource.org/wiki/The_Descent_of_Man_(Darwin)/Chapter_IV" target="_blank" rel="noopener">Wikisource edition</a>.
    </li>

    <li id="ref-huxley1888">
      Huxley, T. H. 1888. “The Struggle for Existence in Human Society” (excerpt/selection from <i>Evolution and Ethics</i>), public-domain text.
      <br/><a href="https://sourcebooks.web.fordham.edu/mod/1888thhuxley-struggle.asp" target="_blank" rel="noopener">Fordham Sourcebook</a>.
    </li>

    <li id="ref-kropotkin1902">
      Kropotkin, Peter. 1902. <i>Mutual Aid: A Factor of Evolution</i>. Public-domain text.
      <br/><a href="https://www.marxists.org/reference/archive/kropotkin-peter/1902/mutual-aid/index.htm" target="_blank" rel="noopener">Marxists Internet Archive</a>.
    </li>

    <li id="ref-nowak2006">
      Nowak, Martin A. 2006. “Five Rules for the Evolution of Cooperation.” <i>Science</i> 314(5805): 1560–1563. DOI: 10.1126/science.1133755.
      <br/><a href="https://pubmed.ncbi.nlm.nih.gov/17158317/" target="_blank" rel="noopener">PubMed record</a>.
    </li>

    <li id="ref-hardin1968">
      Hardin, Garrett. 1968. “The Tragedy of the Commons.” <i>Science</i> 162(3859): 1243–1248.
      <br/><a href="https://math.uchicago.edu/~shmuel/Modeling/Hardin%2C%20Tragedy%20of%20the%20Commons.pdf" target="_blank" rel="noopener">PDF (University of Chicago mirror)</a>.
    </li>

    <li id="ref-ostrom1990">
      Ostrom, Elinor. 1990. <i>Governing the Commons: The Evolution of Institutions for Collective Action</i>. Cambridge University Press.
      <br/>See also: Ostrom’s Nobel Prize lecture (design principles summary):
      <a href="https://www.nobelprize.org/uploads/2018/06/ostrom_lecture.pdf" target="_blank" rel="noopener">PDF</a>.
    </li>

    <li id="ref-bakunin1871">
      Bakunin, Mikhail. <i>God and the State</i> (posthumous publication; commonly dated to the early 1870s).
      <br/><a href="https://www.marxists.org/reference/archive/bakunin/works/godstate/ch02.htm" target="_blank" rel="noopener">Marxists Internet Archive</a>
      · <a href="https://www.gutenberg.org/ebooks/36568" target="_blank" rel="noopener">Project Gutenberg</a>.
    </li>

    <li id="ref-politicalecology2020">
      Roberts, J. 2020. “Political ecology.” <i>Anthropology Encyclopedia</i> (overview/definition).
      <br/><a href="https://www.anthroencyclopedia.com/entry/political-ecology" target="_blank" rel="noopener">Online entry</a>.
    </li>

    <li id="ref-mendieta2016">
      Mendieta, Eduardo. 2016. “Philosophy of Liberation.” <i>Stanford Encyclopedia of Philosophy</i>.
      <br/><a href="https://plato.stanford.edu/entries/liberation/" target="_blank" rel="noopener">SEP entry</a>.
    </li>

    <li id="ref-dussel1985">
      Dussel, Enrique. <i>Philosophy of Liberation</i>. (Primary text; various archival PDFs circulate.)
      <br/>Bibliographic record: <a href="https://philpapers.org/rec/DUSPOL" target="_blank" rel="noopener">PhilPapers</a>.
    </li>

    <li id="ref-freire_iepx">
      “Paulo Freire (1921—1997).” Internet Encyclopedia of Philosophy (IEP). Overview of Freire’s life and <i>Pedagogy of the Oppressed</i>.
      <br/><a href="https://iep.utm.edu/freire/" target="_blank" rel="noopener">IEP entry</a>.
    </li>

    <li id="ref-bookchin1993">
      Bookchin, Murray. 1993/2007. “What is Social Ecology?” (essay; widely reprinted online).
      <br/><a href="https://theanarchistlibrary.org/library/murray-bookchin-what-is-social-ecology" target="_blank" rel="noopener">Anarchist Library</a>.
    </li>

    <li id="ref-spade2020">
      Spade, Dean. 2020. <i>Mutual Aid: Building Solidarity During This Crisis (and the Next)</i>. (Contemporary movement text.)
      <br/><a href="https://www.versobooks.com/products/2722-mutual-aid" target="_blank" rel="noopener">Verso description</a>.
    </li>
  </ol>
</div>

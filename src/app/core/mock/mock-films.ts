import { Film } from "../models";

export const MOCK_FILMS: Film [] = [
  {
    id: 1,
    title: 'Amater',
    description: 'Napeti špijunski triler u kojem glavne uloge tumače oskarovac Rami Malek i za oskara nominirani Laurence Fishburne, temeljen na istoimenom romanu Roberta Littella.\nCharlie Heller (Malek) je briljantan, ali duboko introvertirani cyber stručnjak koji radi za CIA-u, u podrumu sjedišta u Langleyju. Njegov je život okrenut naopačke kada mu žena pogine u terorističkom napadu u Londonu. Kada njegovi nadređeni odbijaju poduzeti akciju, on uzima stvari u svoje ruke, krećući na opasan put diljem svijeta kako bi pronašao odgovorne. Njegova inteligencija postaje najmoćnije oružje za izbjegavanje progonitelja i realiziranje osvete.',
    duration: 123, // in minutes
    genre: ['Action', 'Triler'],
    image: 'assets/images/AMATEUR_446x648_HR.jpg',
  },

  {
    id: 2,
    title: 'Balkanika: Tamna strana',
    description: 'Kriminal, akcija i humor vraćaju se jači nego ikad!\nStruja, Bakro i Brzi ponovno su u igri, ali ovaj put ulog je veći, a pravila gotovo ne postoje. "Balkanika: Tamna strana" donosi neočekivane obrate i adrenalinsku vožnju kroz mračnu stranu Balkana.',
    duration: 148, // in minutes
    genre: ['Action'],
    image: 'assets/images/BALKANIKA_712px446_BH.jpg',
  },
  {
    id: 3,
    title: 'Grešnici',
    description: 'Pokušavajući ostaviti svoje problematične živote iza sebe, blizanci se vraćaju u svoj rodni grad kako bi počeli iznova, samo da bi otkrili da ih čeka još veće zlo.\nPokušavajući ostaviti svoje problematične živote iza sebe, blizanci (Jordan u dvostrukoj ulozi) vraćaju se u svoj rodni grad kako bi počeli iznova, samo da bi otkrili da ih čeka još veće zlo.',
    duration: 138, // in minutes
    genre: ['Drama', 'Triler', 'Horor'],
    image: 'assets/images/SINNERS_ENSEMBLE_HR.jpg',
  }
,
  {
    id: 4,
    title: 'Igra straha',
    description: 'Prvi sastanci sami po sebi izazivaju nervozu.\n\nA šta bi tek bilo da ste na prvom sastanku dok nepoznata osoba troluje vaš telefon, pinguje vas i šalje vrlo lične mimove, koji eskaliraju od uznemiravajućih do smrtonosnih? Reditelj Christopher Landon, razigranim, intenzivnim, filmom koji nas navodi na nagađanje radnje, vraća se trileru kao žanru. Upravo takav stil, napeta atmosfera u kojij svako može biti osumnjičen ili žrtva doveo je do perfekcije u filmovima Sretan dan smrti. Sada nam predstavlja IGRU STRAHA koju su zajednički producirale blockbusterske kompanije Blumhouse i Platinum Dunes. Nominovana za Emi nagradu, Meghann Fahy, zvijezda serija Beli lotos i Savršen par, glumi Violet, udovicu koja ima dijete i koja poslije više godina izlazi na prvi sastanak. Dolazi u luksuzni restoran i otkriva da njen partner, Henri (Sa nama se završava, Brandon Sklenar) šarmantniji i zgodniji nego što je očekivala. Međutim, hemija među njima ubrzo jenjava jer Violet počinje da dobija uznemiravajuće i zastrašujuće poruke od anonimnog pošiljaoca. Naređeno joj je da nikome ne smije da kaže i da prati uputstva koja dobija, ili će čovjek sa kapuljačom kog vidi na sigurnosnim kamerama svoje kuće ubiti njenog malog sina i sestru koja ga čuva. Violet mora da uradi tačno onako kako joj je rečeno, ili će svi koje voli umrijeti. Konačna direktiva njenog nevidljivog mučitelja? Ubij Henrija.',
    duration: 120, // in minutes
    genre: ['Drama', 'Triler', 'Misterija'],
    image: 'assets/images/Drop 400x593.jpg',
  },
  {

    id: 5,
    title: 'Kralj nad kraljevima',
    description: 'Film Kralj nad kraljevima poziva nas da ponovo otkrijemo trajnu snagu nade, ljubavi i otkupljenja očima djeteta.\n\nOtac priča svom sinu najljepšu priču ikad ispričanu, a ono što započinje kao priča pred spavanje prerasta u životnu avanturu. Kroz živu maštu, dječak kroči uz Isusa, svjedočeći njegovim čudima, suočavajući se s njegovim kušnjama i razumijevajući njegovu konačnu žrtvu.',
    duration: 120, // in minutes
    genre: ['Animirani', 'Porodični'],
    image: 'assets/images/KING_OF_KINGS_712446_HR.jpg',
  },
  {
    id: 6,
    title: 'Kraljevi ljeta',
    description: 'Premijerno prikazan na festivalu u Cannesu u sekciji Izvjestan pogled! Četiri nominacije za prestižnu francusku nagradu Cesar!\n\nNakon tragične smrti oca, osamnaestogodišnji Totone neočekivano i iznenada mora odrasti kako bi se počeo brinuti za svoju mlađu sestru te njihovu pomalo umiruću obiteljsku farmu u Francuskoj. Mladi Totone još više odgovornosti na sebe preuzima u trenutku kada se prijavljuje za novčano natjecanje u izradi najboljeg sira zapadnog dijela francuskih Alpi. Film “Kraljevi ljeta” istovremeno je vrlo realističan pogled na težak život franucskih poljoprivrednika, ali i vrlo dirljiva ljubavna priča i, iznad svega, oda ljubavi prema siru…',
    duration: 120, // in minutes
    genre: ['Drama', 'Komedija'],
    image: 'assets/images/Kraljevi_ljeta_300x424.jpg',
  },
  {
    id: 7,
    title: 'Minecraft Film',
    description: 'Minecraft, najprodavanija videoigra svih vremena, kroz posljednjih 15 godina postala je globalni fenomen, inspirirajući generacije igrača i kreativaca.\n\nOvo je prvi put da se svijet igre prenosi na veliko platno, nudeći uzbudljivu novu perspektivu prepunu akcije, humora i nevjerojatne vizualne estetike. Film prati četvero autsajdera – Garretta The Garbage Man Garrisona (Momoa), Henryja (Hansen), Natalie (Myers) i Dawn (Brooks) – koji, dok se suočavaju s običnim problemima, bivaju uvučeni kroz tajanstveni portal u čudesan Overworld. Ovaj neobični, kubični svijet prepun mašte, donosi im neočekivane izazove – od učenja kako ovladati novim okruženjem do obrane od neprijatelja poput Piglina i Zombija. Na svom putu susreću rudara i graditelja Stevea (Black), i zajedno kreću na epsku avanturu koja će ih naučiti kako iskoristiti vlastitu kreativnost za prevladavanje svih prepreka, kako u svijetu Minecrafta, tako i u stvarnom životu.',
    duration: 120, // in minutes
    genre: ['Fantazija', 'Avantura', 'Porodični'],
    image: 'assets/images/MNCRFT_2764x4096.jpg',
  },
  {
    id: 8,
    title: 'Šaban Bajramović - Moje putovanje',
    description: 'Zaradio je milione i potrošio sve. slavu nije tražio, a postao je Legenda, Kralj i Car.\n\nNjega su kroz život vodili ljubav i sloboda. Pjevao je o životu kako mu je dato. Neponovljivi muzičar Šaban Bajramović!',
    duration: 60, // in minutes
    genre: ['Dokumentarni'],
    image: 'assets/images/Saban_Bajramovic_712x446.jpg',
  }
];

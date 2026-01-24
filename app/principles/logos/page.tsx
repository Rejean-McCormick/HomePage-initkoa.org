// app/principles/logos/page.tsx
import Link from 'next/link';
import { 
  Mic2, 
  Feather, 
  Scroll, 
  Repeat, 
  Zap,
  BookOpen
} from 'lucide-react';

export const metadata = {
  title: 'Logos & Mythos – The Metaphysics of Language',
  description:
    'Language as a spiritual, symbolic, and political tool for transmutation.',
};

export default function LogosMythosPage() {
  return (
    <main className="min-h-screen bg-slate-900 text-slate-100 selection:bg-primary selection:text-white pb-24">
      
      {/* HERO SECTION */}
      <section className="bg-slate-900 text-white pt-24 pb-16 px-6 border-b border-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 text-primary font-mono text-sm uppercase tracking-widest mb-6">
            <span className="w-2 h-2 rounded-full bg-primary"></span>
            Operational Metaphysics
          </div>
          <h1 className="text-5xl md:text-6xl font-serif font-medium mb-8">
            The Power of the Word
          </h1>
          <p className="text-xl opacity-90 leading-relaxed max-w-2xl mx-auto font-light text-slate-300">
            Language is not merely a tool for description; it is an instrument of creation. 
            From the vibration of the voice to the structure of political myths, we analyze 
            how the Word shapes reality.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 space-y-24 mt-20">

        {/* 1. THE VIBRATORY FORCE (SPEECH) */}
        <section>
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-blue-900/30 text-blue-400 rounded-lg border border-blue-900/50">
              <Mic2 className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-serif font-bold text-white">1. Vibration & The Act of Speech</h2>
          </div>
          
          <div className="prose prose-lg prose-invert text-slate-300">
            <p>
              Ancient traditions have long held that the universe is fundamentally sonic—<em>"Nada Brahma"</em> (The World is Sound). 
              Speech acts as a vibratory force that can either elevate or destroy.
            </p>
            
            <p>
              This is not purely mystical; it is observed in the dual nature of speech:
            </p>
            <ul className="list-disc pl-5 space-y-2 marker:text-slate-500">
              <li>
                <strong className="text-white">Blessing vs. Curse:</strong> Historically, words like <em>"abracadabra"</em> (Aramaic for "I create as I speak") embody the belief that to speak is to generate reality. Conversely, hate speech and curses have been viewed as "low vibrations" that corrupt the soul.
              </li>
              <li>
                <strong className="text-white">Psychic Impact:</strong> Modern neuroscience confirms that negative words release stress hormones, literally altering the listener's brain chemistry, while positive affirmations stimulate neural pathways for healing (Placebo effect).
              </li>
            </ul>
          </div>
        </section>

        {/* 2. THE LIVING SYMBOL (WRITING) */}
        <section>
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-purple-900/30 text-purple-400 rounded-lg border border-purple-900/50">
              <Feather className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-serif font-bold text-white">2. The Intelligence of the Letter</h2>
          </div>

          <div className="prose prose-lg prose-invert text-slate-300">
            <p>
              While modern linguistics argues that signs are arbitrary (Saussure), esoteric traditions view the alphabet as a collection of "living energies".
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 my-8 not-prose">
              <Card 
                title="Sacred Alphabets" 
                content="In Kabbalah, Hebrew letters are the 'bricks of Creation.' In Egypt, hieroglyphs were 'medou neter' (Divine Words). Writing was not just communication, but a way to etch the divine order onto earth."
              />
              <Card 
                title="Runes & Mysteries" 
                content="The Germanic 'Rune' means secret or mystery. Mythologically obtained by Odin through sacrifice, they represent the idea that knowledge is not invented, but 'received' or wrestled from the cosmos."
              />
            </div>
            <p>
              Even in a secular context, writing remains a form of magic: a text written centuries ago still possesses the power to ignite revolutions or transform consciousness today.
            </p>
          </div>
        </section>

        {/* 3. POLITICAL MYTHS & CYCLES (NARRATIVE) */}
        <section>
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-amber-900/30 text-amber-400 rounded-lg border border-amber-900/50">
              <Scroll className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-serif font-bold text-white">3. Myths as Strategic Manuals</h2>
          </div>

          <div className="prose prose-lg prose-invert text-slate-300">
            <p>
              History is not linear; it is cyclical. From the Hindu <em>Yugas</em> to Polybius’s <em>Anacyclus</em>, civilizations rise, concentrate power, corrupt, and collapse. Myths are often encoded manuals on how to navigate these cycles.
            </p>
            
            <ul className="list-disc pl-5 space-y-4 marker:text-slate-500">
              <li>
                <strong className="text-white">The Strategy of the Outsider:</strong> The story of <em>David vs. Goliath</em> is not just a religious tale; it is a strategic lesson. It teaches that agility, range (the sling), and refusing to play by the oppressor's rules (heavy armor) allow the weak to defeat the strong.
              </li>
              <li>
                <strong className="text-white">The Trap of Tyranny:</strong> The Greek myth of Cronos devouring his children teaches that a power obsessed with its own preservation inevitably creates the alliances (Zeus and the outcasts) that will destroy it.
              </li>
              <li>
                <strong className="text-white">Narrative Warfare:</strong> History is a battle of narratives. The fall of the "Divine Right of Kings" was preceded by the rise of a new myth: "Human Rights." To change the world, one must first change the story.
              </li>
            </ul>
          </div>
        </section>

        {/* 4. TRANSMUTATION (CONCLUSION) */}
        <section className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-slate-700 text-slate-300 rounded-lg">
              <Zap className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-white">The Transmutation of Reality</h2>
          </div>
          <p className="text-slate-300 leading-relaxed mb-6">
            We operate on a "Metaphysics of Language." Words are seeds (causes) that produce effects. 
            However, this power is a double-edged sword. As Orwell warned with <em>Newspeak</em>, language can be engineered to restrict thought and lock populations into submission.
          </p>
          
          <div className="flex items-start gap-4 p-4 bg-slate-800 rounded-lg border border-slate-700">
            <Repeat className="w-6 h-6 text-primary mt-1 shrink-0" />
            <p className="text-sm font-medium text-slate-200">
              <strong className="text-white">The kOA Directive:</strong> We must master "Naming." To name an object is to define its reality. 
              By purifying our speech, studying the "source code" of our myths, and crafting new narratives, we reclaim the power to shape the future.
            </p>
          </div>
        </section>

        {/* NAVIGATION */}
        <div className="flex justify-between pt-12 border-t border-slate-800">
          <Link href="/principles" className="flex items-center gap-2 text-slate-400 hover:text-white font-bold transition-colors">
            ← Back to Principles
          </Link>
          <Link href="/principles/civic-principles-ethics" className="flex items-center gap-2 text-primary hover:text-amber-400 font-bold transition-colors">
            Next: Civic Ethics →
          </Link>
        </div>

      </div>
    </main>
  );
}

// Simple Card Component for the grid
function Card({ title, content }: { title: string, content: string }) {
  return (
    <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 shadow-sm">
      <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
      <p className="text-sm text-slate-400 leading-relaxed">{content}</p>
    </div>
  );
}
import type { APIRoute } from 'astro';

export interface AnalogyResponse {
  analogy_text: string;
  example_items: { label: string; value: number }[];
  focus_line: string;
  checkin_question: string;
  checkin_options: string[];
  checkin_correct_index: number;
}

// In-memory cache for generated analogies per session
const analogyCache = new Map<string, AnalogyResponse>();

// Local Gold Standard Fallback Bank (used if API fails or no API key is provided)
const goldBank: Record<string, AnalogyResponse> = {
  'list-basics': {
    analogy_text:
      'Socho ek canteen ki line hai. Sabse pehle samosa, phir pizza aur maggi arrange karna hai. List bas wahi line hai jahan har item ka apna seat number (index) hota hai!',
    example_items: [
      { label: 'Chai', value: 10 },
      { label: 'Samosa', value: 15 },
      { label: 'Maggi', value: 45 },
      { label: 'Pizza', value: 250 },
    ],
    focus_line: 'List (Array) bas ek line hai jahan har item zero [0] se shuru hone wale index par baithta hai.',
    checkin_question: 'Computer mein kisi bhi list ka pehla item kis position (index) se shuru hota hai?',
    checkin_options: ['1 se', '0 (Zero) se', '10 se'],
    checkin_correct_index: 1,
  },
  comparison: {
    analogy_text:
      'Jab do doston ke PUBG score compare hote hain, tab dekha jata hai kisne zyada kills kiye. Bubble sort hamesha ek baar mein sirf 2 bagal wale items ko compare karta hai!',
    example_items: [
      { label: 'Gill', value: 91 },
      { label: 'Pant', value: 125 },
      { label: 'Dhoni', value: 148 },
      { label: 'Kohli', value: 183 },
    ],
    focus_line: 'Bubble sort pure array ko ek sath nahi, sirf adjacent (bagal waale) 2 items ko dekh kar comparison karta hai.',
    checkin_question: 'Bubble sort ek baar mein kitne items ko aapas mein compare karta hai?',
    checkin_options: ['Poore list ko ek sath', 'Sirf 2 adjacent (bagal waale) items ko', '5 items ko'],
    checkin_correct_index: 1,
  },
  swapping: {
    analogy_text:
      'Agar WhatsApp group mein tumhari favorite movie ki rating friend ke show se badi nikal aaye aur badi rating aage bhejni ho, toh jagah badal (swap) dete ho. Swap bas positions exchange karna hai!',
    example_items: [
      { label: 'Movie A', value: 95 },
      { label: 'Movie B', value: 30 },
      { label: 'Movie C', value: 75 },
    ],
    focus_line: 'Agar pehla element doosre se BADA hai, toh simply dono ki positions swap hoti hain.',
    checkin_question: 'Bubble Sort mein Swap kab karna padta hai?',
    checkin_options: ['Jab pehla element doosre se chhota ho', 'Jab pehla element doosre se BADA ho', 'Hamesha random swap karte hain'],
    checkin_correct_index: 1,
  },
  'one-pass': {
    analogy_text:
      'Ek baar jab shuru se end tak saare adjacent pairs check ho jate hain, toh sabse heavy (bada) item floating bubble ki tarah sabse last mein settle ho jata hai! Isko bolte hain ek Pass complete hona.',
    example_items: [
      { label: 'Level 1', value: 12 },
      { label: 'Level 2', value: 45 },
      { label: 'Level 3', value: 99 },
    ],
    focus_line: 'Har 1 Pass khatam hone par sabse BADA element array ke end mein permanently settle ho jata hai.',
    checkin_question: 'Pass 1 poora hone ke baad kya guaranteed hota hai?',
    checkin_options: ['Saara array pehle pass mein hi sort ho gaya', 'Sabse BADA element array ke end mein pahunch gaya', 'Kuch nahi badalta'],
    checkin_correct_index: 1,
  },
  'repeat-sorted': {
    analogy_text:
      'Jaise ek pass mein sabse bada item end par gaya, waise hi baaki bache items ke liye process repeat karte jao. Jab ek bhi swap ki zaroorat na pade, tab array 100% sorted ho jata hai!',
    example_items: [
      { label: 'Track 1', value: 10 },
      { label: 'Track 2', value: 20 },
      { label: 'Track 3', value: 30 },
      { label: 'Track 4', value: 40 },
    ],
    focus_line: 'Bubble sort tab complete hota hai jab ek poore pass mein KOI swap na karna pade.',
    checkin_question: 'Array sort hona kab finalize mana jata hai?',
    checkin_options: ['Jab teacher bol de', 'Jab ek poore pass mein 0 swaps hote hain', 'Fixed 10 passes ke baad'],
    checkin_correct_index: 1,
  },
  default: {
    analogy_text:
      'Bubble sort jaise roll number waali canteen line arrange karta hai — pehle do ko compare karo, bada wala aage swap karo, aur jab tak sab order mein na ho jayein tab tak repeat karo!',
    example_items: [
      { label: 'Roll A', value: 15 },
      { label: 'Roll B', value: 40 },
      { label: 'Roll C', value: 85 },
    ],
    focus_line: 'Bubble sort = Step by step comparison + swapping until sorted!',
    checkin_question: 'Bubble sort ka main idea kya hai?',
    checkin_options: ['Random elements pick karna', 'Adjacent comparison aur swapping karna', 'Directly answers search karna'],
    checkin_correct_index: 1,
  },
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { concept = 'list-basics', interests = [], studentName = 'Dost' } = body || {};

    // Generate Cache Key
    const cacheKey = `${concept}-${interests.sort().join(',')}`;
    if (analogyCache.has(cacheKey)) {
      return new Response(JSON.stringify(analogyCache.get(cacheKey)), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // TODO: Set GEMINI_API_KEY environment variable in your server configuration or .env file
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY || import.meta.env.GEMINI_API_KEY;

    // If Gemini API key is available, call Gemini 2.5 Flash model
    if (GEMINI_API_KEY) {
      try {
        const promptText = `Student's name: ${studentName}. Student's interests: ${interests.join(
          ', '
        )}. Concept to explain: ${concept}. Use at most ONE interest as a light flavor for this example — a brief nod, not the entire framework. It's fine, and often better, to draw the actual scenario from everyday Indian student life instead (tiffin box, WhatsApp group, exam roll numbers, canteen line, train seats). Never build the whole analogy out of niche vocabulary from one hobby. Write in Hinglish, casual and funny, under 60 words, no hard English words. Return ONLY valid JSON matching this shape, nothing else: { "analogy_text": string, "example_items": [{"label": string, "value": number}], "focus_line": string, "checkin_question": string, "checkin_options": string[], "checkin_correct_index": number }`;

        const geminiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

        const apiResponse = await fetch(geminiEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: promptText }] }],
            generationConfig: {
              responseMimeType: 'application/json',
            },
          }),
        });

        if (apiResponse.ok) {
          const apiData = await apiResponse.json();
          const rawText = apiData?.candidates?.[0]?.content?.parts?.[0]?.text;

          if (rawText) {
            const parsed = JSON.parse(rawText) as AnalogyResponse;
            if (
              parsed.analogy_text &&
              Array.isArray(parsed.example_items) &&
              parsed.focus_line &&
              parsed.checkin_question &&
              Array.isArray(parsed.checkin_options)
            ) {
              // Cache and return response
              analogyCache.set(cacheKey, parsed);
              return new Response(JSON.stringify(parsed), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
              });
            }
          }
        }
      } catch (err) {
        console.warn('Gemini API call failed, falling back to Gold Bank:', err);
      }
    }

    // Fallback to Gold Bank
    const fallback = goldBank[concept] || goldBank['default'];
    analogyCache.set(cacheKey, fallback);

    return new Response(JSON.stringify(fallback), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('API Handler Error:', error);
    const defaultFallback = goldBank['default'];
    return new Response(JSON.stringify(defaultFallback), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

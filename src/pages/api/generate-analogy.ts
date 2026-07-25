import type { APIRoute } from 'astro';

export interface AnalogyResponse {
  analogy_text: string;
  example_items: { label: string; value: number }[];
  focus_line: string;
  checkin_question: string;
  checkin_options: string[];
  checkin_correct_index: number;
}

const analogyCache = new Map<string, AnalogyResponse>();

// Unique Gold Bank entries for every single module concept
const goldBank: Record<string, AnalogyResponse> = {
  'list-basics': {
    analogy_text:
      'Computer mein kisi bhi data ko arrange karne se pehle use ek line (array) mein rakha jata hai. Har item ka seat number (index) hamesha 0 se shuru hota hai!',
    example_items: [
      { label: 'Chai', value: 10 },
      { label: 'Samosa', value: 15 },
      { label: 'Maggi', value: 45 },
      { label: 'Pizza', value: 250 },
    ],
    focus_line: 'List (Array) mein har item zero [0] se shuru hone wale index position par baithta hai.',
    checkin_question: 'Computer mein kisi bhi array ka pehla element kis index se shuru hota hai?',
    checkin_options: ['1 se shuru hota hai', '0 (Zero) se shuru hota hai', '10 se shuru hota hai'],
    checkin_correct_index: 1,
  },
  comparison: {
    analogy_text:
      'Bubble sort poore array ko ek sath nahi dekhta. Yeh ek time par sirf 2 adjacent (bagal waale) items ko aapas mein compare karta hai!',
    example_items: [
      { label: 'Gill', value: 91 },
      { label: 'Pant', value: 125 },
      { label: 'Dhoni', value: 148 },
      { label: 'Kohli', value: 183 },
    ],
    focus_line: 'Bubble sort hamesha adjacent (bagal waale) 2 items ko dekh kar comparison karta hai.',
    checkin_question: 'Bubble sort ek baar mein kitne items ko compare karta hai?',
    checkin_options: ['Poore list ko ek sath', 'Sirf 2 adjacent (bagal waale) items ko', '3 random items ko'],
    checkin_correct_index: 1,
  },
  swapping: {
    analogy_text:
      'Agar pehle element ki value doosre se badi nikal aaye (Left > Right), toh dono ki positions exchange (swap) kar di jaati hain taaki bada value aage jaaye!',
    example_items: [
      { label: 'Movie A', value: 95 },
      { label: 'Movie B', value: 30 },
      { label: 'Movie C', value: 75 },
      { label: 'Movie D', value: 50 },
    ],
    focus_line: 'Swap tabhi execute hota hai jab pehla element doosre se BADA (Left > Right) ho.',
    checkin_question: 'Bubble Sort mein Swap kab execute karna padta hai?',
    checkin_options: ['Jab pehla element doosre se chhota ho', 'Jab pehla element doosre se BADA ho (Left > Right)', 'Hamesha random swap karte hain'],
    checkin_correct_index: 1,
  },
  'one-pass': {
    analogy_text:
      'Shuru se end tak ek poora round check karne par sabse bada element bubble ki tarah aakhiri position par settle ho jata hai! Isko 1 Pass bolte hain.',
    example_items: [
      { label: 'Level 1', value: 12 },
      { label: 'Level 2', value: 45 },
      { label: 'Level 3', value: 99 },
      { label: 'Level 4', value: 150 },
    ],
    focus_line: 'Ek full Pass complete hone par sabse BADA element array ke end mein permanently settle ho jata hai.',
    checkin_question: 'Pass 1 poora hone ke baad kya guaranteed result milta hai?',
    checkin_options: ['Poora array pehle pass mein sort ho gaya', 'Sabse BADA element array ke end mein settle ho gaya', 'Kuch nahi badalta'],
    checkin_correct_index: 1,
  },
  'repeat-sorted': {
    analogy_text:
      'Passes tab tak repeat hote hain jab tak ek poore pass mein 0 swaps na hon. Jab kisi bhi element ko swap nahi karna padta, matlab array 100% sorted hai!',
    example_items: [
      { label: 'Track 1', value: 10 },
      { label: 'Track 2', value: 20 },
      { label: 'Track 3', value: 30 },
      { label: 'Track 4', value: 40 },
    ],
    focus_line: 'Bubble sort tab complete hota hai jab ek poore pass mein 0 swaps hote hain.',
    checkin_question: 'Bubble sort algorithm kab finalized stop hoti hai?',
    checkin_options: ['Fixed 10 passes ke baad', 'Jab ek poore pass mein 0 swaps hote hain', 'Jab screen close kar do'],
    checkin_correct_index: 1,
  },
  default: {
    analogy_text:
      'Bubble sort adjacent elements ko compare karta hai, bada element aage swap karta hai, aur jab tak sab order mein na ho jayein tab tak repeat karta hai!',
    example_items: [
      { label: 'Item A', value: 15 },
      { label: 'Item B', value: 40 },
      { label: 'Item C', value: 85 },
    ],
    focus_line: 'Bubble sort = Adjacent comparison + Swapping until sorted!',
    checkin_question: 'Bubble sort ka core mechanism kya hai?',
    checkin_options: ['Random elements pick karna', 'Adjacent comparison aur swapping karna', 'Directly values delete karna'],
    checkin_correct_index: 1,
  },
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { concept = 'list-basics', interests = [], studentName = 'Dost' } = body || {};

    const cacheKey = `${concept}-${interests.sort().join(',')}`;
    if (analogyCache.has(cacheKey)) {
      return new Response(JSON.stringify(analogyCache.get(cacheKey)), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // TODO: Set GEMINI_API_KEY environment variable in your server configuration or .env file
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY || import.meta.env.GEMINI_API_KEY;

    if (GEMINI_API_KEY) {
      try {
        const promptText = `Student's name: ${studentName}. Student's interests: ${interests.join(
          ', '
        )}. Concept to explain: ${concept}. Write a clear Hinglish explanation for the concept: ${concept}. Use at most ONE interest as a light flavor. Write in Hinglish, casual and funny, under 60 words. Return ONLY valid JSON matching this shape: { "analogy_text": string, "example_items": [{"label": string, "value": number}], "focus_line": string, "checkin_question": string, "checkin_options": string[], "checkin_correct_index": number }`;

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

import * as esbuild from 'esbuild';
import dotenv from 'dotenv';

// Priklausomai nuo aplinkos, kurią nurodėme, įkelkite atitinkamą aplinkos kintamųjų failą.
if (process.env.NODE_ENV === 'prod') {
  dotenv.config({ path: '.env.prod' });
} else {
  dotenv.config({ path: '.env.dev' });
}

// kompiliuojame serverio kodą naudojant esbuild su šiais nustatymais:
try {
  // esbuild.build() yra asinchroninė funkcija, todėl ją reikia palaukti, kol ji baigs vykdytis.
  //  be await neveiks, nes esbuild.build() grąžina Promise objektą.
  await esbuild.build({
    // Nurodome Entry tašką, kuris yra server.mjs failas.
    // Entry taškas yra pagrindinis failas, nuo kurio pradedamas kodas. Tai yra failas, kuris yra įkeltas pirmas ir iš kurio pradedamas vykdyti kodas.
    entryPoints: ['./server.mjs'],
    // Nurodome, kad norime sukurti vieną failą, kuriame bus visi reikalingi moduliai.
    // Jei šis parametras yra nurodytas, esbuild sujungs visus modulius į vieną failą.
    // Tai yra naudinga, kai norime sukurti vieną failą, kuris bus paleidžiamas.
    bundle: true,
    // Nurodome, kad norime sukurti sourcemap failą.
    // Sourcemap yra failas, kuriame yra saugomi duomenys apie originalų kodą ir sukompiliuotą kodą.
    // Sourcemap failas leidžia naršyklei atsekti originalų kodą, kai yra klaida.
    sourcemap: false,
    // Nurodome, kad norime minifikuoti sukompiliuotą kodą.
    // Minifikavimas yra procesas, kai kodas yra sutrumpinamas, kad būtų sumažintas failo dydis.
    minify: true,
    // Nurodome, kad norime sukurti kodą, kuris veiks Node.js aplinkoje.
    platform: 'node',
    // Nurodome, kad norime sukurti kodą, kuris veiks Node.js versijoje 16.
    target: 'node16',
    // Nurodome, kad norime išsaugoti išorinius modulius, kurie nėra įtraukti į bundle.
    // Tai yra naudinga, kai norime, kad tam tikri moduliai būtų įkelti iš išorės.
    // Pavyzdžiui, jei norime, kad moduliai būtų įkelti iš node_modules aplanko.
    packages: 'external',
    // define nustatymas leidžia nurodyti kintamąjį, kuris bus pakeistas kompiliuojant kodą.
    define: {
      'process.env.NODE_ENV': `'${process.env.NODE_ENV}'`,
    },
    // Nurodome, kad norime išsaugoti sukompiliuotą kodą į dist/server.js failą.
    outfile: './dist/server.js',
  });

  console.log('Server bundled successfully for production!');
} catch (error) {
  console.error('An error occurred during bundling:', error);
  process.exit(1);
}
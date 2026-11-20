import fs from 'node:fs';
import path from 'node:path';
const root = process.cwd();
// detection logic test, extracted from index.astro
const src = fs.readFileSync(path.join(root,'src/pages/index.astro'),'utf8');
const js = src.match(/<script>([\s\S]*?)<\/script>/)[1];
function run({stored,cookie,langs,tz}){
  let dest;
  const ctx = {
    localStorage:{getItem:()=>stored??null}, document:{cookie:cookie?`news-today-language=${cookie}`:''},
    navigator:{languages:langs,language:(langs||[])[0]}, Intl:{DateTimeFormat:()=>({resolvedOptions:()=>({timeZone:tz})})},
    location:{replace:(u)=>dest=u}
  };
  new Function(...Object.keys(ctx), js)(...Object.values(ctx));
  return dest;
}
const cases=[
 ['en-IN browser, India tz → en',{langs:['en-IN'],tz:'Asia/Kolkata'},'/en/'],
 ['hi-IN browser → hi',{langs:['hi-IN','en'],tz:'Asia/Kolkata'},'/hi/'],
 ['en-US,hi → en (first match)',{langs:['en-US','hi'],tz:'America/New_York'},'/en/'],
 ['mr-IN (unsupported), India tz → hi',{langs:['mr-IN'],tz:'Asia/Kolkata'},'/hi/'],
 ['fr, Paris → en',{langs:['fr-FR'],tz:'Europe/Paris'},'/en/'],
 ['stored hi beats en browser',{stored:'hi',langs:['en-US'],tz:'UTC'},'/hi/'],
 ['storage blocked, cookie hi',{cookie:'hi',langs:['en-US'],tz:'UTC'},'/hi/'],
 ['stored junk value ignored',{stored:'xx',langs:['hi'],tz:'UTC'},'/hi/'],
];
let bad=0; for(const [n,i,e] of cases){const g=run(i); const ok=g===e; if(!ok)bad++; console.log(ok?'PASS':'FAIL',n,g)}
process.exit(bad?1:0);

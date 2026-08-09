const songs = [
  {title:"Rise Above",tool:"Suno",url:"https://suno.com/s/gzzVBKmaqju4bqnO",desc:"A futuristic R&B and hip-hop anthem about balancing school, work, and ambitious dreams.",art:"radial-gradient(circle at 28% 30%,#ffdc7a 0 4%,transparent 5%),repeating-radial-gradient(circle at 36% 44%,#ff3d81 0 7px,#5a2d91 8px 18px,#10101a 19px 35px)"},
  {title:"Unbreakable",tool:"Suno",url:"https://suno.com/s/BXKMHmaklkFi881H",desc:"A powerful R&B track about overcoming difficult moments and refusing to give up.",art:"linear-gradient(125deg,#111 15%,transparent 15% 28%,#ff633d 28% 34%,transparent 34%),radial-gradient(circle at 70% 30%,#ffca5f,#8d183d 28%,#0b0b12 70%)"},
  {title:"Midnight Drive",tool:"Suno",url:"https://suno.com/s/wvJlmc3WuDhidPcE",desc:"A smooth late-night reflection on Atlanta, love, success, and the road ahead.",art:"linear-gradient(to top,#0a0a1a 0 25%,transparent 25%),linear-gradient(115deg,transparent 40%,#f7a3dc 41% 43%,transparent 44%),radial-gradient(circle at 65% 28%,#fb94e0,#34316c 25%,#080818 66%)"},
  {title:"Built for Greatness",tool:"Suno",url:"https://suno.com/s/IQjUYjpWxDyEA40M",desc:"A motivational hip-hop record powered by confidence, discipline, and determination.",art:"conic-gradient(from 210deg at 50% 65%,#ffb13b,#fe426c,#6d41e5,#12121c,#ffb13b)"},
  {title:"Feel the Change",tool:"Udio",url:"https://www.udio.com/songs/hzkMP1jQRDLUma9SeJtuQy",desc:"Soulful modern R&B about releasing the past and stepping into a new beginning.",art:"radial-gradient(ellipse at 50% 75%,#ffb76b 0 8%,#ef466f 9% 22%,transparent 23%),linear-gradient(145deg,#16102b,#5c225e 52%,#0c111b)"},
  {title:"Digital Dreams",tool:"Udio",url:"https://www.udio.com/songs/fJzKzVCw15XZN4Xxvmvg66",desc:"Electronic dance-pop inspired by artificial intelligence and a brighter technological future.",art:"repeating-linear-gradient(90deg,transparent 0 22px,#8c65ff55 23px 25px),repeating-linear-gradient(0deg,#11111b 0 22px,#ff3d8155 23px 25px)"},
  {title:"Digital Horizon",tool:"Udio",url:"https://www.udio.com/songs/iuWMo6SiA8bhAZERx4p9pZ",desc:"A second electronic vision of people and intelligent technology building the future together.",art:"radial-gradient(circle at 50% 45%,#83e8ff 0 4%,#4359e5 5% 18%,#8b3fbc 19% 32%,#111223 33% 70%)"},
  {title:"Future Frequency",tool:"Udio",url:"https://www.udio.com/songs/7nufvqw2XfcbBBUnfyb8hm",desc:"Bright synths and energetic rhythms turn tomorrow's possibilities into sound.",art:"repeating-radial-gradient(ellipse at 20% 80%,#ffcb66 0 4px,#ff4c89 5px 13px,#5e3bb8 14px 27px,#10101b 28px 42px)"},
  {title:"Victory March",tool:"Treblo",url:"https://treblo.com/song/7191076d-73d0-4957-866e-32c484153060",desc:"A cinematic championship entrance powered by heavy drums, bass, strings, and victorious energy.",art:"linear-gradient(150deg,transparent 0 38%,#ffd05d 39% 44%,transparent 45%),radial-gradient(circle at 25% 20%,#fc436f,#6d193e 28%,#100c18 68%)"},
  {title:"King of the Ring",tool:"Treblo",url:"https://treblo.com/song/f58793d7-fbfe-43dd-851c-fce34685282e",desc:"An epic electronic boxing anthem built for the final walk toward the championship ring.",art:"conic-gradient(from 180deg at 50% 50%,#f8d15a,#ff553d,#a51e55,#221240,#f8d15a)"}
];

const grid = document.getElementById("songGrid");
const search = document.getElementById("search");
const filters = document.getElementById("filters");
let activeTool = "All";

function renderFilters(){
  ["All",...new Set(songs.map(song=>song.tool))].forEach(tool=>{
    const button=document.createElement("button");
    button.className=`filter ${tool===activeTool?"active":""}`;
    button.textContent=tool;
    button.addEventListener("click",()=>{activeTool=tool;renderFilters();renderSongs();});
    filters.appendChild(button);
  });
}

function renderSongs(){
  const query=search.value.trim().toLowerCase();
  const visible=songs.filter(song=>(activeTool==="All"||song.tool===activeTool)&&(`${song.title} ${song.desc}`.toLowerCase().includes(query)));
  grid.innerHTML=visible.length?visible.map(song=>{
    const number=String(songs.indexOf(song)+1).padStart(2,"0");
    return `<article class="song"><span class="number">TRACK ${number}</span><img class="cover" src="${makeCover(songs.indexOf(song),song.title)}" alt="Abstract album artwork for ${song.title}"><div class="song-info"><span class="tool">MADE WITH ${song.tool.toUpperCase()}</span><h3>${song.title}</h3><p>${song.desc}</p><a class="listen" href="${song.url}" target="_blank" rel="noopener">▶ Listen to song</a></div></article>`;
  }).join(""):`<p class="empty">No songs match your search.</p>`;
}

function makeCover(index,title){
  const palettes=[["#ff3d81","#6c42d9"],["#ff7a3d","#4e123c"],["#78d8ff","#2e245f"],["#ffc447","#a12668"],["#ff7f73","#4c246d"],["#a27cff","#18214d"],["#72e6e1","#3d38a5"],["#ffcf5c","#782b9c"],["#ff5b58","#25133f"],["#f7d45c","#8f264d"]];
  const [a,b]=palettes[index];
  const safe=title.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;");
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="625" viewBox="0 0 1000 625"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="1000" height="625" fill="#090911"/><circle cx="${220+index*47%600}" cy="${180+index*83%290}" r="240" fill="url(#g)"/><circle cx="760" cy="130" r="95" fill="none" stroke="${a}" stroke-width="16" opacity=".65"/><path d="M0 ${480-index*19%170} Q260 250 500 430 T1000 260" fill="none" stroke="${a}" stroke-width="18" opacity=".55"/><text x="60" y="555" fill="white" font-family="Arial" font-size="58" font-weight="700">${safe}</text></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

search.addEventListener("input",renderSongs);
renderFilters();
renderSongs();

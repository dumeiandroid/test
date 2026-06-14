
// ============================================================
// KONFIGURASI PAKET — diambil dari query string ?p=nama-paket
// ============================================================
const _urlParams = new URLSearchParams(window.location.search);
const AUTO_PAKET = (_urlParams.get('p') || '').trim();

// Paket yang langsung aktif tanpa konfirmasi manual tester
const PAKET_AUTO_AKTIF = ['asmara','potensi','karakter','karir'];
const IS_AUTO_AKTIF = PAKET_AUTO_AKTIF.includes(AUTO_PAKET.toLowerCase());

const BASE='https://cipta.my.id/psikotest/simpel/';
const ALL_CONFIG=[
  {id:'apm0',  dataUrl:BASE+'apm0.txt',   type:'image_single',      saveField:'x_05'},
  {id:'apm1',  dataUrl:BASE+'apm1.txt',   type:'image_single',      saveField:'x_05'},
  {id:'apm1a', dataUrl:BASE+'apm1a.txt',  type:'image_single',      saveField:'x_05'},
  {id:'apm1b', dataUrl:BASE+'apm1b.txt',  type:'image_single',      saveField:'x_05'},
  {id:'apm2',  dataUrl:BASE+'apm2.txt',   type:'image_single',      saveField:'x_05'},
  {id:'apm2a', dataUrl:BASE+'apm2a.txt',  type:'image_single',      saveField:'x_05'},
  {id:'apm2b', dataUrl:BASE+'apm2b.txt',  type:'image_single',      saveField:'x_05'},
  {id:'apm14', dataUrl:BASE+'apm14.txt',  type:'image_single',      saveField:'x_05'},
  {id:'cfit0', dataUrl:BASE+'cfit0.txt',  type:'image_single',      saveField:'x_05'},
  {id:'cfit1', dataUrl:BASE+'cfit1.txt',  type:'image_single',      saveField:'x_05'},
  {id:'cfit2', dataUrl:BASE+'cfit2_a.txt',type:'image_multi',       saveField:'x_05'},
  {id:'cfit3', dataUrl:BASE+'cfit3.txt',  type:'image_single',      saveField:'x_05'},
  {id:'cfit4', dataUrl:BASE+'cfit4.txt',  type:'image_single',      saveField:'x_05'},
  {id:'epps',  dataUrl:BASE+'epps.txt',   type:'ab_choice',         saveField:'x_06'},
  {id:'ist0',  dataUrl:BASE+'ist0.txt',   type:'text_choice',       saveField:'x_05'},
  {id:'ist1',  dataUrl:BASE+'ist1.txt',   type:'text_choice',       saveField:'x_05'},
  {id:'ist2',  dataUrl:BASE+'ist2.txt',   type:'text_choice',       saveField:'x_05'},
  {id:'ist3',  dataUrl:BASE+'ist3.txt',   type:'text_choice',       saveField:'x_05'},
  {id:'ist4_a',dataUrl:BASE+'ist4_a.txt', type:'text_input_scored', saveField:'x_05'},
  {id:'ist5_a',dataUrl:BASE+'ist5_a.txt', type:'digit_check',       saveField:'x_05'},
  {id:'ist6_a',dataUrl:BASE+'ist6_a.txt', type:'digit_check',       saveField:'x_05'},
  {id:'ist7',  dataUrl:BASE+'ist7.txt',   type:'image_single',      saveField:'x_05'},
  {id:'ist8',  dataUrl:BASE+'ist8.txt',   type:'image_single',      saveField:'x_05'},
  {id:'ist9',  dataUrl:BASE+'ist9.txt',   type:'text_choice',       saveField:'x_05'},
  {id:'papi',  dataUrl:BASE+'papi.txt',   type:'ab_choice',         saveField:'x_06'},
  {id:'rmib',  dataUrl:BASE+'rmib.txt',   type:'ranking',           saveField:'x_06',kolom:1,totalKolom:8,showInstructionsOnce:true},
  {id:'tkd3',  dataUrl:BASE+'tkd3.txt',   type:'text_choice',       saveField:'x_05'},
  {id:'tkd6',  dataUrl:BASE+'tkd6_a.txt', type:'text_input',        saveField:'x_05'},
  {id:'kreplin',dataUrl:BASE+'kreplin.txt',type:'kreplin',           saveField:'x_06'}
];
const API_W='https://lidan-co-id.pages.dev/api/contacts_filter_dinamis6';
const API_R='https://lidan-co-id.pages.dev/api/contacts_filter_dinamis7';
const TBL='nilai1_json',TBL_P='alat_tes',TBL_K='admin_kontrol',AUTH='admin',WHO_B='https://cipta.my.id/who2/';
const CHARS='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

let cu=null,cfg=null,qs=[],qi=0,ua=[],sc=0,tl=0,ti=null;
let tStarted=false,fEnd=false,swEl=0,vCnt=0,rSel=[],uNum=[],skip=[],ans=[];
let AC=[],WTL=[],UT=[],pList=[],sPaket=null,vMap={};
let wBL=[],wBI=0,wQs=[],wQi=0,wUA=[],wSkip=[],wAns=[];

const $=id=>document.getElementById(id);
const sl=t=>{$('loaderText').innerText=t||'Memuat...';$('globalLoader').classList.remove('hidden')};
const hl=()=>$('globalLoader').classList.add('hidden');
const ss=id=>{
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  $(id).classList.add('active');
  // Tombol token hanya muncul di screenDaftar
  const btnTF=document.getElementById('btnTokenFloat');
  const popupTF=document.getElementById('popupToken');
  if(btnTF) btnTF.style.display=(id==='screenDaftar')?'block':'none';
  if(popupTF && id!=='screenDaftar') popupTF.style.display='none';
};
function sLoad(btn,on){btn.disabled=on;if(on){btn.dataset.t=btn.innerHTML;btn.innerHTML='<span class="spinner" style="width:18px;height:18px;border-width:3px;display:inline-block"></span>'}else btn.innerHTML=btn.dataset.t}
const esc=s=>String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const td=()=>{const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')};
const dbg=m=>console.log('[DBG]',m);
const rs=n=>{let r='';for(let i=0;i<n;i++)r+=CHARS[Math.floor(Math.random()*CHARS.length)];return r};
const aF=async(u,o={})=>(await fetch(u,o)).json();
const aG=id=>aF(`${API_R}?table=${TBL}&id_x=${id}`,{headers:{'X-Custom-Auth':AUTH}});
const aP=(id,b)=>fetch(`${API_W}?table=${TBL}&id_x=${id}`,{method:'PUT',headers:{'Content-Type':'application/json','X-Custom-Auth':AUTH},body:JSON.stringify(b)});
const gBio=f=>{try{const o=JSON.parse(cu.x_02||'{}');return o[f.replace(/^bio/,'').toLowerCase()]||''}catch{return''}};

function bukaPopupToken(){
  const popup=document.getElementById('popupToken');
  popup.style.display='block';
  setTimeout(()=>document.getElementById('inputToken').focus(),50);
}
function tutupPopupToken(){
  document.getElementById('popupToken').style.display='none';
  document.getElementById('inputToken').value='';
  document.getElementById('tokenErrBox').style.display='none';
}
function sembunyikanTokenBtn(){
  const btn=document.getElementById('btnTokenFloat');
  const popup=document.getElementById('popupToken');
  if(btn) btn.style.display='none';
  if(popup) popup.style.display='none';
}

async function loginDenganToken(){
  const input = document.getElementById('inputToken');
  const errBox = document.getElementById('tokenErrBox');
  const btn = document.getElementById('btnLoginToken');
  const tok = (input.value||'').trim();
  errBox.style.display = 'none';
  if(!tok){ errBox.textContent='⚠ Masukkan token terlebih dahulu.'; errBox.style.display='block'; return; }
  // Disable tombol
  btn.disabled=true; btn.textContent='⏳ Memeriksa...'; sl('Memeriksa token...');
  try{
    const d = await aF(`${API_W}?table=${TBL}&x_01_eq=${encodeURIComponent(tok)}`,{headers:{'X-Custom-Auth':AUTH}});
    if(!d.success || !d.data || (Array.isArray(d.data) && d.data.length===0)){
      errBox.textContent='❌ Token tidak ditemukan. Periksa kembali token Anda.';
      errBox.style.display='block'; hl(); return;
    }
    // Token ditemukan — ambil data peserta
    const row = Array.isArray(d.data) ? d.data[0] : d.data;
    // Ambil nama paket: prioritas dari URL (?p=), fallback dari prefix token
    let pnm = AUTO_PAKET || '';
    if(!pnm){
      // Token format: "namapaket-XXXXXXXXXXXX" — ambil bagian sebelum tanda hubung pertama
      const tokPrefix = tok.split('-')[0] || '';
      // Cocokkan ke pList
      const found = pList.find(p=>(p.x_01||'').trim().toLowerCase()===tokPrefix.toLowerCase());
      if(found) pnm = (found.x_01||'').trim();
    }
    localStorage.setItem('token', tok);
    localStorage.setItem('db_id', String(row.id_x));
    localStorage.setItem('_p', pnm);
    cu = row;
    tutupPopupToken();
    sl('Memuat tes...');
    await loadAC();
    let bioObj={};try{bioObj=JSON.parse(cu.x_02||'{}')}catch{}
    const status = bioObj.status||'nonaktif';
    hl();
    if(IS_AUTO_AKTIF){ startGlobalPolling(); await goNext2(); }
    else if(status==='aktif'){ startGlobalPolling(); await goNext2(); }
    else{ ss('screenTunggu'); showZoomTunggu(); startGlobalPolling(); }
  }catch(e){
    errBox.textContent='⚠ Gagal: '+e.message; errBox.style.display='block'; hl();
  }finally{
    btn.disabled=false; btn.textContent='🔑 Masuk';
  }
}

async function chkTok(t){try{const d=await aF(`${API_W}?table=${TBL}&x_01_eq=${encodeURIComponent(t)}`,{headers:{'X-Custom-Auth':AUTH}});return d.success&&d.count>0}catch{return false}}
async function genTok(pid){for(let i=0;i<10;i++){const t=pid+'-'+rs(i<8?12:14);if(!(await chkTok(t)))return t}return pid+'-'+rs(16)}

async function loadPaket(){
  try{
    const d=await aF(`${API_R}?table=${TBL_P}`,{headers:{'X-Custom-Auth':AUTH}});
    pList=(d.success&&d.data)||[];
    sPaket=pList.find(p=>(p.x_01||'').trim()===AUTO_PAKET)||null;
    if(!sPaket)console.warn('[loadPaket] Paket tidak ditemukan:',AUTO_PAKET);
  }catch(e){console.error('[loadPaket]',e)}
}

function showPaketNotFoundScreen(){
  hl();
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  let errScreen=$('screenPaketTidakAda');
  if(!errScreen){
    errScreen=document.createElement('div');
    errScreen.id='screenPaketTidakAda';
    errScreen.className='screen active';
    errScreen.innerHTML=`
      <div class="card" style="text-align:center;margin-top:40px">
        <div style="font-size:3em;margin-bottom:12px">🔍</div>
        <div style="font-size:1.25em;font-weight:700;color:var(--danger);margin-bottom:10px">Paket Tidak Ada</div>
        <p style="color:var(--muted);font-size:.9em;line-height:1.7">
          Paket <strong style="color:var(--text)">${AUTO_PAKET}</strong> tidak ditemukan.<br>
          Pastikan nama paket sudah benar atau hubungi administrator.
        </p>
      </div>`;
    document.body.appendChild(errScreen);
  }else{
    errScreen.classList.add('active');
  }
}
function renderPaket(){}

// ─── Fungsi biodata (dipakai oleh biodata-2, tersedia global) ───
function syncRadioStyle(){
  const y=$('bioKesediaanY'),n=$('bioKesediaanN');
  const ly=$('radioLabelBersedia'),ln=$('radioLabelTidak');
  if(!ly||!ln)return;
  ly.style.borderColor=(y&&y.checked)?'var(--primary)':'var(--border)';
  ly.style.background=(y&&y.checked)?'#eff6ff':'';
  ln.style.borderColor=(n&&n.checked)?'var(--primary)':'var(--border)';
  ln.style.background=(n&&n.checked)?'#eff6ff':'';
}

async function handleDaftar(){
  const eb=$('daftarErrBox');eb.classList.remove('show');
  for(const[id,lb]of[['bioNama','Nama'],['bioUsia','Usia'],['bioPend','Pendidikan'],['bioGender','Jenis Kelamin']]){
    const el=$(id);el.classList.remove('error');if(!el.value.trim()){el.classList.add('error');el.focus();eb.textContent='Mohon isi: '+lb;eb.classList.add('show');return}
  }
  const telpEl=$('bioTelp');telpEl.classList.remove('error');
  const telpVal=telpEl.value.trim().replace(/\s+/g,'');
  if(!telpVal){telpEl.classList.add('error');telpEl.focus();eb.textContent='Mohon isi: Nomor Telepon / WhatsApp';eb.classList.add('show');return}
  if(!/^(\+62|62|0)[0-9]{8,13}$/.test(telpVal)){telpEl.classList.add('error');telpEl.focus();eb.textContent='Format nomor telepon tidak valid. Contoh: 08123456789 atau +6281234567890';eb.classList.add('show');return}
  // Validasi kesediaan — hanya jika elemen ada (biodata-2)
  const kesediaanEl=document.querySelector('input[name="bioKesediaan"]:checked');
  const adaKesediaan=document.querySelector('input[name="bioKesediaan"]');
  if(adaKesediaan&&!kesediaanEl){
    eb.textContent='Mohon pilih kesediaan dihubungi perusahaan.';eb.classList.add('show');
    const ly=$('radioLabelBersedia'),ln=$('radioLabelTidak');
    if(ly)ly.style.borderColor='var(--danger)';if(ln)ln.style.borderColor='var(--danger)';
    return;
  }
  if(!sPaket){eb.textContent='⚠ Paket tes tidak ditemukan. Hubungi administrator.';eb.classList.add('show');return}
  const btn=$('btnDaftar');sLoad(btn,true);sl('Membuat token...');
  try{
    const pid=String(sPaket.id_x).trim(),pnm=(sPaket.x_01||'').trim();
    const tok=await genTok(pid);
    const bio=JSON.stringify({
      nama:$('bioNama').value.trim(),
      usia:$('bioUsia').value.trim(),
      pendidikan:$('bioPend').value.trim(),
      jenis_kelamin:$('bioGender').value.trim(),
      telepon:telpVal,
      kesediaan_dihubungi:kesediaanEl?kesediaanEl.value:'tidak_berlaku',
      tgl_tes:td(),
      status:IS_AUTO_AKTIF?'aktif':'nonaktif'
    });
    sl('Menyimpan data...');
    const res=await aF(`${API_W}?table=${TBL}`,{method:'POST',headers:{'Content-Type':'application/json','X-Custom-Auth':AUTH},body:JSON.stringify({x_01:tok,x_02:bio})});
    if(!res.success)throw new Error(res.message||'Gagal.');
    localStorage.setItem('token',tok);localStorage.setItem('db_id',String(res.id_x));localStorage.setItem('_p',pnm);
    cu={id_x:res.id_x,x_01:tok,x_02:bio};sl('Memuat tes...');await loadAC();
    if(IS_AUTO_AKTIF){hl();startGlobalPolling();await goNext2();}
    else{
      hl();ss('screenTunggu');showZoomTunggu();startGlobalPolling();
      // Tampilkan ID peserta
      const idBox=document.getElementById('tungguIdBox');
      const idNum=document.getElementById('tungguIdNum');
      if(idBox&&idNum){idNum.textContent=String(res.id_x);idBox.style.display='block';}
    }
  }catch(e){hl();eb.textContent='⚠ '+e.message;eb.classList.add('show');sLoad(btn,false)}
}

async function loadAC(){
  const p=localStorage.getItem('_p');
  function expand(list){const r=[];for(const c of list){if(c.type==='ranking'&&c.totalKolom){for(let k=1;k<=c.totalKolom;k++)r.push({type:'config',ref:{...c,id:c.id+'_k'+k,_baseId:c.id,kolom:k,_taskId:c.id+'_k'+k}})}else r.push({type:'config',ref:c})}return r}
  if(!p){AC=ALL_CONFIG;WTL=[];UT=expand(ALL_CONFIG);return}
  try{
    const d=await aF(`${API_R}?table=${TBL_P}&x_01_eq=${encodeURIComponent(p)}`,{headers:{'X-Custom-Auth':AUTH}});
    if(!d.success||!d.count){AC=ALL_CONFIG;WTL=[];UT=expand(ALL_CONFIG);return}
    const items=(d.data[0].x_02||'').split('|').map(s=>s.trim()).filter(Boolean);
    AC=[];WTL=[];UT=[];
    for(const item of items){
      if(item.startsWith('who:')){const k=item.slice(4).trim(),w={fileKey:k,dataUrl:WHO_B+k+'.txt',data:null,_taskId:'who_'+k};WTL.push(w);UT.push({type:'who',ref:w})}
      else if(item==='kreplin'){const c=ALL_CONFIG.find(c=>c.id==='kreplin');if(c){AC.push(c);UT.push({type:'kreplin',ref:{...c,_taskId:'kreplin'}})}}
      else{const k=item.replace(/\.txt$/i,''),c=ALL_CONFIG.find(c=>(c.dataUrl||'').split('/').pop().replace(/\.txt$/i,'')==k);
        if(c){AC.push(c);if(c.type==='ranking'&&c.totalKolom){for(let ki=1;ki<=c.totalKolom;ki++)UT.push({type:'config',ref:{...c,id:c.id+'_k'+ki,_baseId:c.id,kolom:ki,_taskId:c.id+'_k'+ki}})}else UT.push({type:'config',ref:c})}}
    }
    await Promise.all(WTL.map(async w=>{try{w.data=await(await fetch(w.dataUrl+'?v='+Date.now())).json()}catch(e){console.warn('[who]',w.fileKey,e)}}));
  }catch(e){console.error('[loadAC]',e);AC=ALL_CONFIG;WTL=[];UT=expand(ALL_CONFIG)}
}

async function goNext2(){
  // ── Cek status logout dari cu (data sudah ada di memori, 0 request) ──
  try{let bio={};try{bio=JSON.parse(cu?.x_02||'{}')}catch{}cekTombolLogout(bio.logout===true);}catch{}
  // ── Periksa dulu sebelum lanjut ke instruksi berikutnya ──
  const boleh=await cekSebelumInstruksi();
  if(!boleh)return;

  // ── RESTORE: kalau ada soal aktif saat refresh, langsung lanjutkan tanpa instruksi ──
  const activeTask=localStorage.getItem('_activeTask');
  if(activeTask){
    const stKey='_st_'+activeTask;
    const stData=localStorage.getItem(stKey);
    // Kreplin: state-nya disimpan dengan key berbeda (_kreplinState)
    if(activeTask==='kreplin'){
      const krepSaved=kreplinLoadState();
      if(krepSaved&&krepSaved.introShown){
        const krepRef=UT.find(u=>u.type==='kreplin');
        if(krepRef){hl();await kreplinStart(krepRef.ref);return;}
      }else{localStorage.removeItem('_activeTask');}
    }else if(stData){
      // State masih ada — coba temukan config-nya dan langsung startTest()
      const isSub=activeTask.includes('_k');
      let base,kol;
      if(isSub){const b=activeTask.replace(/_k\d+$/,'');kol=parseInt(activeTask.split('_k')[1]);base=AC.find(c=>c.id===b);if(base)cfg={...base,kolom:kol,_taskId:activeTask}}
      else{base=AC.find(c=>c.id===activeTask);if(base)cfg={...base,_taskId:activeTask}}
      if(base&&cfg){
        // Muat meta jika belum ada
        if(cfg.dataUrl&&!cfg.title){
          try{sl('Memuat...');const raw=await(await fetch(cfg.dataUrl+'?v='+Date.now())).json();
            if(raw&&!Array.isArray(raw)&&raw.meta&&raw.soal){for(const k of Object.keys(raw.meta)){if(cfg[k]==null||cfg[k]==='')cfg[k]=raw.meta[k]}cfg._cs=raw.soal}}catch(e){console.warn('[restore]',e)}
        }
        await startTest();return;
      }
      // Config tidak ditemukan — bersihkan saja dan lanjut normal
      localStorage.removeItem('_activeTask');
      localStorage.removeItem(stKey);
    }else{
      // State sudah hilang (soal sudah selesai sebelumnya) — bersihkan
      localStorage.removeItem('_activeTask');
    }
  }

  for(const ut of UT){
    if(ut.type==='who'){wBL=WTL;const i=wFindNext();if(i!==-1){wBI=i;wOpen(i);return}}
    else if(ut.type==='kreplin'){
      let done=false;try{const o=JSON.parse(cu.x_06||'{}');done=!!o.kreplin&&o.kreplin.dikerjakan!==''}catch{}
      if(!done){hl();await kreplinStart(ut.ref);return}
    }
    else{
      const t=ut.ref;
      if(t.type==='ranking'&&t.totalKolom&&!t.id.includes('_k')){
        let fu=null;try{const o=JSON.parse(cu[t.saveField]||'{}');for(let k=1;k<=t.totalKolom;k++){if(o[t.id+'_k'+k]==null||o[t.id+'_k'+k]===''){fu=t.id+'_k'+k;break}}}catch{}
        if(fu){await openById(fu);return}continue;
      }
      const AL={'tkd3':'tkd5','tkd6':'deret6'};let done=false;
      try{const o=JSON.parse(cu[t.saveField]||'{}');done=o[t.id]!=null&&o[t.id]!=='';if(!done&&AL[t.id]){const a=AL[t.id];done=o[a]!=null&&o[a]!==''}}catch{}
      if(!done){await openById(t.id);return}
    }
  }
  doneAll();
}

function doneAll(){stopGlobalPolling();stopPolling();hl();ss('screenUpgrade');tampilTopBarId();startLogoutPoll();}

// ── UPGRADE LAPORAN ──
let upPaketSel=null,upHargaSel=0;
function upShowDetail(id,nama,harga,desc,el){
  const box=document.getElementById('upDetailBox');
  const wasSelected=el.classList.contains('selected');
  document.querySelectorAll('.up-paket-card').forEach(c=>c.classList.remove('selected'));
  if(wasSelected){box.classList.remove('show');return}
  el.classList.add('selected');
  trackBtn('lap_'+id);
  document.getElementById('upDetailName').textContent=nama;
  document.getElementById('upDetailPrice').textContent='Rp '+harga.toLocaleString('id-ID');
  document.getElementById('upDetailDesc').textContent=desc;
  document.getElementById('upDetailBtn').onclick=()=>upSelectPaket(nama,harga,el);
  box.classList.add('show');
  box.scrollIntoView({behavior:'smooth',block:'nearest'});
}
function upConfirmDetail(){}
async function upSelectPaket(nama,harga,el){
  trackBtn('lap_pilih_'+nama.toLowerCase());
  upPaketSel=nama;upHargaSel=harga;
  document.querySelectorAll('.up-paket-card').forEach(c=>c.classList.remove('selected'));
  el.classList.add('selected');
  const pi=document.getElementById('upPaymentInfo');
  const nom=document.getElementById('upNominal');
  const btn=document.getElementById('upWaBtn');
  pi.classList.add('show');
  nom.textContent='Rp '+harga.toLocaleString('id-ID');
  const hariMap={'Dasar':'1 hari','Lengkap':'2 hari','Komprehensif':'3 hari'};
  const hariEl=document.getElementById('upHariEstimasi');
  if(hariEl)hariEl.textContent=hariMap[nama]||'3 hari';
  const id=localStorage.getItem('db_id')||'—';
  const tok=localStorage.getItem('token')||'—';
  const telp=gBio('biotelepon')||(() => {try{return JSON.parse((cu&&cu.x_02)||'{}').telepon||'—'}catch{return'—'}})();
  const msg=encodeURIComponent('Halo Lidan Psikologi, saya ingin memesan laporan hasil Tes IQ.\n\nPaket: '+nama+'\nHarga: Rp '+harga.toLocaleString('id-ID')+'\nID: '+id+'\nToken: '+tok+'\nNo. Telepon: '+telp+'\n\nMohon informasi selanjutnya. Terima kasih.');
  btn.href='https://wa.me/6285159601400?text='+msg;
  btn.onclick=()=>{trackBtn('lap_wa_'+nama.toLowerCase())};
  btn.style.display='flex';
  const dbId=localStorage.getItem('db_id');
  if(dbId){
    try{
      let bioObj={};try{bioObj=JSON.parse((cu&&cu.x_02)||localStorage.getItem('_bio_bak')||'{}')}catch{}
      bioObj.paket_laporan=nama;bioObj.harga_laporan='Rp '+harga.toLocaleString('id-ID');bioObj.tgl_pilih_laporan=td();
      const newBio=JSON.stringify(bioObj);await aP(dbId,{x_02:newBio});if(cu)cu.x_02=newBio;
    }catch(e){console.warn('[LAPORAN] Gagal update paket:',e)}
  }
}
function upSkip(){trackBtn('lap_lewati');$('doneIcon').innerText='🎉';$('doneTitle').innerText='Semua Tes Selesai!';$('doneDesc').innerText='Terima kasih sudah mengikuti tes. Hasil Anda telah tersimpan.';ss('screenDone');tampilTopBarId();startLogoutPoll();}

// ─── Pemeriksaan Ganda: Tes Global & Status Kolom ───────────────────────────
// Dipanggil sebelum setiap instruksi / soal ditampilkan.
// Mengembalikan true jika aman dilanjutkan, false jika dialihkan.
async function cekSebelumInstruksi(){
  // 1) Periksa apakah tes global masih aktif
  sl('Memeriksa status tes...');
  const kontrol=await cekKontrol();
  if(!kontrol.aktif){
    hl();showScreenTutup(kontrol);
    return false;
  }
  // 2) Periksa apakah status peserta masih aktif (kolom aktifkan)
  try{
    const id=localStorage.getItem('db_id');
    if(id){
      const res=await aF(`${API_R}?table=${TBL}&id_x=${id}`,{headers:{'X-Custom-Auth':AUTH}});
      if(res.success&&res.data){
        cu=res.data;
        let status='nonaktif';try{status=JSON.parse(cu.x_02||'{}').status||'nonaktif'}catch{}
        if(status!=='aktif'&&!IS_AUTO_AKTIF){
          hl();ss('screenTunggu');showZoomTunggu();startGlobalPolling();
          return false;
        }
      }
    }
  }catch(e){console.warn('[cekSebelumInstruksi] Gagal cek status peserta:',e)}
  return true;
}

async function openById(tid){
  // ── Periksa dulu sebelum lanjut ──
  const boleh=await cekSebelumInstruksi();
  if(!boleh)return;

  const isSub=tid.includes('_k');let base,kol;
  if(isSub){const b=tid.replace(/_k\d+$/,'');kol=parseInt(tid.split('_k')[1]);base=AC.find(c=>c.id===b);cfg={...base,kolom:kol,_taskId:tid}}
  else{base=AC.find(c=>c.id===tid);cfg={...base,_taskId:tid}}
  if(!base){console.error('[openById]',tid);hl();return}
  if(cfg.dataUrl&&!cfg.title){
    try{sl('Memuat...');const raw=await(await fetch(cfg.dataUrl+'?v='+Date.now())).json();
      if(raw&&!Array.isArray(raw)&&raw.meta&&raw.soal){for(const k of Object.keys(raw.meta)){if(cfg[k]==null||cfg[k]==='')cfg[k]=raw.meta[k]}cfg._cs=raw.soal}}catch(e){console.warn(e)}
  }
  if(cfg.showInstructionsOnce&&cfg.kolom>1){rSel=Array(12).fill(null);uNum=[];sl('Memuat soal...');setTimeout(()=>startTest(),100);return}
  $('startTitle').innerText=cfg.title||cfg.id;$('startInstructions').innerText=cfg.instructions||cfg.desc||'';$('exNote').innerText=cfg.exNote||'';
  const hi=cfg.exImgTop||cfg.exImgBottom,hn=cfg.exNote&&cfg.exNote.trim();
  $('exampleBlock').style.display=(hi||hn)?'':'none';
  const iw=document.querySelector('#exampleBlock .example-images');if(iw)iw.style.display=hi?'':'none';
  if(cfg.exImgTop)$('exImgTop').src=cfg.exImgTop;if(cfg.exImgBottom)$('exImgBottom').src=cfg.exImgBottom;
  if(cfg.timer>0){const m=Math.floor(cfg.timer/60),s=cfg.timer%60;$('timerNote').innerText='⏱ Batas waktu: '+(m>0?m+'m '+(s>0?s+'d':''):s+'d').trim();$('timerNote').style.display='none'}
  else $('timerNote').style.display='none';
  ss('screenStart');hl();tampilTopBarId();
}

async function startTest(){
  if(cfg&&cfg._isWho){await wStart();return}
  sl('Memuat soal...');
  // Tandai soal yang sedang aktif agar bisa di-restore saat refresh
  if(cfg&&cfg._taskId) localStorage.setItem('_activeTask', cfg._taskId);
  try{
    await loadQ();
    const sv=localStorage.getItem('_st_'+cfg._taskId);
    if(sv){const s=JSON.parse(sv),rr=s.rowSelections||Array(12).fill(null);
      if(rr.filter(n=>n!==null).length<12){qi=s.qIndex||0;ua=s.userAnswers||[];sc=s.correctScore||0;tl=s.timeLeft||cfg.timer;rSel=rr;uNum=s.usedNumbers||[];skip=s.skippedIndices||[];ans=s.answeredIndices||[]}
      else{localStorage.removeItem('_st_'+cfg._taskId);resetSt()}}
    else resetSt();
    $('testTitle').innerText=cfg.title;ss('screenTest');$('timerDisplay').classList.add('hidden');tStarted=false;tampilTopBarId();
    if(cfg.timer>0){updTimer();startTimer()}else startSW();
    vCnt=0;fEnd=false;renderQ();
  }catch(e){alert('Gagal: '+e.message);ss('screenDash')}finally{hl()}
}
function resetSt(){qi=0;ua=[];sc=0;tl=cfg.timer||0;rSel=Array(12).fill(null);uNum=[];skip=[];ans=[]}
async function loadQ(){
  let data;
  if(cfg._cs){data=cfg._cs;delete cfg._cs}
  else{const raw=await(await fetch(cfg.dataUrl+'?v='+Date.now())).json();
    if(raw&&!Array.isArray(raw)&&raw.meta&&raw.soal){for(const k of Object.keys(raw.meta)){if(cfg[k]==null||cfg[k]==='')cfg[k]=raw.meta[k]}data=raw.soal}else data=raw}
  if(cfg.type==='ranking'){const hg=data.some(d=>d.gender);let fd=data;
    if(hg){const g=gBio('bioGender')||'L';fd=data.filter(d=>d.gender===g)}
    const kd=fd.find(d=>d.kolom===cfg.kolom);if(!kd)throw new Error('Kolom '+cfg.kolom+' tdk ada');cfg._pem=kd.pembuka;qs=kd.soal.map((s,i)=>({text:s,id:i}))}
  else qs=data;
}

function startTimer(){
  if(tStarted)return;tStarted=true;if(!tl)tl=cfg.timer;
  ti=setInterval(()=>{tl--;updTimer();saveSt();if(tl<=0){clearInterval(ti);endTest(true)}},1000);
  // Hanya kirim ke DB saat pertama kali mulai (bukan resume setelah refresh).
  // Saat resume, x_04 di DB sudah ada dari START asli — admin tetap hitung mundur dari sana.
  const isResume = tl < cfg.timer;
  if(!isResume){
    syncT('START:'+cfg.title+':'+new Date().toISOString()+':'+cfg.timer);
  }
}
function startSW(){swEl=0;ti=setInterval(()=>{swEl++;saveSt()},1000)}
// chkFE (force end check) dihapus — tidak lagi polling tiap 3 detik
async function syncT(v){
  const id=localStorage.getItem('db_id');if(!id)return;
  try{await fetch(`${API_W}?table=${TBL}&id_x=${id}`,{method:'PUT',headers:{'Content-Type':'application/json','X-Custom-Auth':AUTH},body:JSON.stringify({x_04:v})})}catch{}
}
function updTimer(){
  const m=String(Math.floor(tl/60)).padStart(2,'0'),s=String(tl%60).padStart(2,'0');
  // Timer disembunyikan dari user — hanya tampil di DevTools console untuk developer
  const el=$('timerDisplay');
  if(el){el.innerText=m+':'+s;el.classList.add('hidden');}
  console.log('[TIMER]',(cfg&&cfg._taskId)||'',m+':'+s);
}
function saveSt(){localStorage.setItem('_st_'+cfg._taskId,JSON.stringify({qIndex:qi,userAnswers:ua,correctScore:sc,timeLeft:tl,rowSelections:rSel,usedNumbers:uNum,skippedIndices:skip,answeredIndices:ans}))}

const SB='<span style="background:#fef3c7;color:#92400e;font-size:.75em;padding:2px 8px;border-radius:99px;font-weight:600">⟳ Dilewati</span>';
const skB=()=>skip.includes(qi)?' '+SB:'';

function renderQ(){
  updProg();if(cfg.type==='ranking'){renderRank();return}dbg('renderQ');
  if(qi<0||qi>=qs.length){if(skip.length>0){qi=skip.shift();saveSt()}else{endTest(false);return}}
  const q=qs[qi];
  ({image_single:rImgS,image_multi:rImgM,text_choice:rTxtC,text_input:rTxtI,text_input_scored:rTIS,digit_check:rDC,ab_choice:rAB}[cfg.type]||(_=>{}))(q);
}
function updProg(){
  const tot=cfg.type==='ranking'?8:qs.length,cur=cfg.type==='ranking'?(cfg.kolom||1):qi+1;
  $('progressBar').style.width=(tot?Math.round(((cur-1)/tot)*100):0)+'%';
  let info=cfg.type==='ranking'?`Kolom ${cfg.kolom} / ${cfg.totalKolom||8}`:`Soal ${qi+1} / ${qs.length}`;
  if(skip.length>0&&cfg.type!=='ranking')info+=` · ⟳ ${skip.length} dilewati`;
  $('progressInfo').innerText=info;const bt=$('bbTitle'),bp=$('bbProgress');if(bt)bt.innerText=cfg.title||'';if(bp)bp.innerText=info;
}

function rImgS(q){
  const p=q.question.split(' ');
  $('questionContent').innerHTML=`<div class="q-label">Soal ${p[0]}${skB()}</div><img class="q-image" src="${p[1]}" alt="soal" oncontextmenu="return false" ondragstart="return false"><div class="options-img" id="optArea"></div>`;
  $('actionBar').innerHTML=`<button class="btn btn-outline btn-sm" onclick="skipQ()">Lewati</button>`;
  for(const k in q.options){if(!q.options[k])continue;const img=Object.assign(document.createElement('img'),{src:q.options[k],title:k});img.setAttribute('oncontextmenu','return false');img.setAttribute('ondragstart','return false');img.onclick=()=>{mAns(qi);ua.push(`${qi+1}${k}${k===q.answer?'v':'x'}`);if(k===q.answer)sc++;saveSt();goNx()};$('optArea').appendChild(img)}
}
function rImgM(q){
  $('questionContent').innerHTML=`<div class="q-label">Pilih 2 gambar yang BERBEDA dari lainnya</div><div class="options-img" id="optArea" style="gap:14px"></div>`;
  $('actionBar').innerHTML=`<button class="btn btn-success btn-sm" id="btnJ" onclick="subIM()" disabled>Jawab</button><button class="btn btn-outline btn-sm" onclick="skipQ()">Lewati</button>`;
  q.options.forEach((src,i)=>{const w=document.createElement('div');w.className='opt-check-wrap';w.innerHTML=`<input type="checkbox" id="mc${i}" value="${src}"><label for="mc${i}"><img src="${src}" oncontextmenu="return false" ondragstart="return false"></label>`;w.querySelector('input').addEventListener('change',()=>{$('btnJ').disabled=document.querySelectorAll('#optArea input:checked').length!==2});$('optArea').appendChild(w)});
}
function subIM(){const q=qs[qi],sel=[...document.querySelectorAll('#optArea input:checked')].map(c=>c.value),ok=sel.length===2&&sel.every(v=>q.correctAnswers.includes(v));mAns(qi);const opsiHuruf=['a','b','c','d','e','f'];const huruf=sel.map(v=>{const idx=q.options.indexOf(v);return idx>=0?opsiHuruf[idx]:'?';}).sort().join('').toUpperCase();ua.push(`${qi+1}${huruf}${ok?'v':'x'}`);if(ok)sc++;saveSt();goNx()}
function rTxtC(q){
  let opts='';for(const k in q.options){if(!q.options[k])continue;opts+=`<button class="opt-text" onclick="subTC('${k}','${q.answer}')"><strong>${k}.</strong> ${q.options[k]}</button>`}
  $('questionContent').innerHTML=`<div class="q-label">Soal No. ${qi+1}${skB()}</div><div class="q-text">${q.question}</div><div class="options-text">${opts}</div>`;
  $('actionBar').innerHTML=`<button class="btn btn-outline btn-sm" onclick="skipQ()">Lewati</button>`;
}
function subTC(k,ans){mAns(qi);ua.push(`${qi+1}${k}${k===ans?'v':'x'}`);if(k===ans)sc++;saveSt();goNx()}
function rTxtI(q){
  const iT=cfg.id==='tkd6';
  const isMobile=(('ontouchstart' in window)||navigator.maxTouchPoints>0)&&window.innerWidth<=768;
  const npHtml=iT&&isMobile?`<div class="numpad-wrap"><div class="numpad-row">${'12345'.split('').map(d=>`<button class="numpad-btn" onclick="np('${d}')">${d}</button>`).join('')}</div><div class="numpad-row">${'67890'.split('').map(d=>`<button class="numpad-btn" onclick="np('${d}')">${d}</button>`).join('')}</div><div class="numpad-row"><button class="numpad-btn btn-space" onclick="np(' ')">SPASI</button><button class="numpad-btn" onclick="np('/')">/</button><button class="numpad-btn" onclick="npc()">,</button><button class="numpad-btn btn-del" onclick="np('DEL')">⌫</button></div></div>`:'';
  const warnHtml=`<div id="tiWarn" style="display:none;color:var(--danger);font-size:.82em;font-weight:600;margin-top:6px;text-align:center">⚠ Masukkan 2 jawaban dipisah spasi. Contoh: <strong>48 50</strong></div>`;
  $('questionContent').innerHTML=`<div class="q-label">Soal No. ${qi+1}${skB()}</div><div class="q-text">${q.question}</div><div class="input-wrap"><input type="text" id="userAnswer" placeholder="${iT?'Contoh: 48 50':'Jawaban...'}" autocomplete="off" ${iT&&isMobile?'readonly':''} oninput="tiOninput(this)"/>${warnHtml}${npHtml}</div>`;
  $('actionBar').innerHTML=`<button class="btn btn-primary btn-sm" id="btnNx" onclick="tiTrySubmit()" disabled>Jawab</button><button class="btn btn-outline btn-sm" onclick="skipQ()">Lewati</button>`;
  const inp=$('userAnswer');
  if(!iT){inp.focus();inp.addEventListener('keyup',e=>{if(e.key==='Enter'&&inp.value.trim())subTI()})}
  else if(!isMobile){
    inp.focus();
    inp.addEventListener('keyup',e=>{if(e.key==='Enter')tiTrySubmit()});
  }
}
function tiOninput(inp){
  const iT=cfg.id==='tkd6';
  if(iT){
    const parts=inp.value.trim().split(/\s+/);
    const valid=parts.length>=2&&parts[0]!==''&&parts[1]!=='';
    $('btnNx').disabled=!valid;
    const w=$('tiWarn');if(w)w.style.display='none';
  }else{
    $('btnNx').disabled=inp.value.trim()==='';
  }
}
function tiTrySubmit(){
  const inp=$('userAnswer');if(!inp)return;
  const val=inp.value.trim();
  const parts=val.split(/\s+/);
  const w=$('tiWarn');
  if(cfg.id==='tkd6'&&(parts.length<2||parts[1]==='')){
    if(w){w.style.display='block';inp.focus();inp.style.borderColor='var(--danger)';setTimeout(()=>{inp.style.borderColor='';},1800)}
    return;
  }
  if(w)w.style.display='none';
  if(val)subTI();
}
function subTI(){const q=qs[qi],a=$('userAnswer').value.trim().replace(/,/g,' ');let ok=false;for(const ca of(q.correctAnswers||[])){if(a.toLowerCase()===ca.answer.replace(/,/g,' ').trim().toLowerCase()){ok=true;break}}mAns(qi);ua.push(`${qi+1}${a}${ok?'v':'x'}`);if(ok)sc++;saveSt();goNx()}
function np(v){const inp=$('userAnswer');if(!inp)return;if(v==='DEL'){inp.value=inp.value.slice(0,-1)}else if(v===' '){if(inp.value.trim()!==''&&!inp.value.includes(' '))inp.value+=v}else{const p=inp.value.split(' ');if(p.length===2&&p[1].length>=6)return;if(p.length===1&&p[0].length>=6)return;inp.value+=v}const btn=$('btnNx');if(btn){const p=inp.value.split(' ');btn.disabled=!(p.length>=2&&p[0].trim()!==''&&p.slice(1).join(' ').trim()!=='')}}
function npc(){np(',')}
function rTIS(q){
  const pair=q.question.split('|'),w1=pair[0]||'',w2=pair[1]||'';
  $('questionContent').innerHTML=`<div class="tis-pair"><span class="tis-word">${w1}</span><span class="tis-dash">–</span><span class="tis-word">${w2}</span></div><p class="tis-hint">Temukan kata penghubung yang tepat antara dua kata di atas.</p><div class="tis-input-wrap"><input id="tisAnswer" type="text" placeholder="Ketik kata penghubung..." autocomplete="off"></div>`;
  $('actionBar').innerHTML=`<button class="btn btn-primary btn-sm" onclick="subTIS()">Jawab</button><button class="btn btn-outline btn-sm" onclick="skipQ()">Lewati</button>`;
  const inp=$('tisAnswer');if(inp)setTimeout(()=>inp.focus(),80);
  if(inp)inp.addEventListener('keydown',e=>{if(e.key==='Enter')subTIS()});
}
function subTIS(){const inp=$('tisAnswer');if(!inp||!inp.value.trim())return;const q=qs[qi],v=inp.value.trim().toLowerCase();let skor=0;for(const ca of(q.correctAnswers||[])){if(v===ca.answer.replace(/,/g,' ').trim().toLowerCase()){skor=ca.score;break}}mAns(qi);ua.push(`${qi+1}|${v}|${skor>0?'v':'x'}|${skor}`);sc+=skor;saveSt();goNx()}
let dcCk=[];
function rDC(q){
  const btns=['1','2','3','4','5','6','7','8','9','0'].map(d=>`<button class="dc-digit-btn" id="dcb-${d}" onclick="dcT('${d}')">${d}</button>`).join('');
  dcCk=[];
  $('questionContent').innerHTML=`<div class="q-label">Soal No. ${qi+1}${skB()}</div><div class="dc-question">${q.question}</div><p class="dc-hint">Klik angka sesuai urutan (1–9 dulu, lalu 0)</p><div class="dc-preview" id="dcP"><span class="dc-preview-label">Jawaban:</span><span id="dcPD" style="color:var(--muted);font-style:italic">—</span></div><div class="dc-digits">${btns}</div>`;
  $('actionBar').innerHTML=`<button class="btn btn-primary btn-sm" id="btnDC" onclick="subDC()" disabled>Jawab</button><button class="btn btn-outline btn-sm" onclick="dcR()">↺ Reset</button><button class="btn btn-outline btn-sm" onclick="skipQ()">Lewati</button>`;
}
function dcT(d){const i=dcCk.indexOf(d);i!==-1?dcCk.splice(i):dcCk.push(d);dcUI()}
function dcR(){dcCk=[];dcUI()}
function dcUI(){
  ['1','2','3','4','5','6','7','8','9','0'].forEach(d=>{const b=$('dcb-'+d);if(!b)return;const p=dcCk.indexOf(d);b.classList.toggle('dc-checked',p!==-1);let o=b.querySelector('.dc-order');if(p!==-1){if(!o){o=document.createElement('span');o.className='dc-order';b.appendChild(o)}o.textContent=p+1}else if(o)o.remove()});
  const p=$('dcPD');if(p)p.innerHTML=dcCk.length?dcCk.map(d=>`<span class="dc-preview-digit">${d}</span>`).join(''):'<span style="color:var(--muted);font-style:italic">—</span>';
  $('btnDC').disabled=!dcCk.length;
}
function subDC(){const q=qs[qi],a=dcCk.join(''),ok=a===(q.correctAnswers||[]).join('');mAns(qi);ua.push(`${qi+1}|${a}|${ok?'v':'x'}`);if(ok)sc++;saveSt();goNx()}
function rAB(q){
  $('questionContent').innerHTML=`<div class="q-label">Pasangan Soal No. ${qi+1}</div><div class="options-ab"><button class="opt-ab" onclick="subAB('A')"><strong>A.</strong> ${q.A||(q.options&&q.options.A)||'-'}</button><button class="opt-ab" onclick="subAB('B')"><strong>B.</strong> ${q.B||(q.options&&q.options.B)||'-'}</button></div>`;
  $('actionBar').innerHTML='';
}
function subAB(c){ua.push(c);saveSt();goNx()}
function renderRank(){
  const rows=qs.map((q,r)=>`<tr><td class="col-no" style="width:36px">${r+1}</td><td>${q.text}</td><td><div class="btn-container">${[1,2,3,4,5,6,7,8,9,10,11,12].map(n=>`<button class="btn-rank" id="br-${r}-${n}" onclick="rSl(${r},${n})">${n}</button>`).join('')}</div></td></tr>`).join('');
  $('questionContent').innerHTML=`<div id="deskripsiBox">${cfg._pem||''}</div><div style="overflow-x:auto"><table class="ranking-table"><thead><tr><th class="col-no" style="width:36px">No</th><th>Pernyataan</th><th style="width:480px">Pilihan Ranking</th></tr></thead><tbody>${rows}</tbody></table></div>`;
  $('actionBar').innerHTML='';updRankUI();
}
function rSl(r,v){
  if(rSel[r]===v){rSel[r]=null;uNum=uNum.filter(n=>n!==v)}
  else{if(uNum.includes(v))return;if(rSel[r]!==null)uNum=uNum.filter(n=>n!==rSel[r]);rSel[r]=v;uNum.push(v)}
  updRankUI();saveSt();if(rSel.filter(n=>n!==null).length===12)saveRank(rSel.join(';'));
}
function updRankUI(){for(let r=0;r<12;r++){const s=rSel[r];for(let v=1;v<=12;v++){const b=$('br-'+r+'-'+v);if(!b)continue;b.classList.remove('sel','gone');if(s!==null){v===s?b.classList.add('sel'):b.classList.add('gone')}else if(uNum.includes(v))b.classList.add('gone')}}}
async function saveRank(ds){
  sl('Menyimpan...');const id=localStorage.getItem('db_id');
  try{let o={};try{o=JSON.parse(cu[cfg.saveField]||'{}')}catch{}o[cfg._taskId]=ds;const v=JSON.stringify(o);await aP(id,{[cfg.saveField]:v});cu[cfg.saveField]=v;localStorage.removeItem('_st_'+cfg._taskId);localStorage.removeItem('_activeTask');rSel=Array(12).fill(null);uNum=[];await goNext2()}
  catch(e){alert('Gagal: '+e.message)}finally{hl()}
}

function goNx(){
  dbg('goNext');let f=-1;for(let i=qi+1;i<qs.length;i++){if(!ans.includes(i)&&!skip.includes(i)){f=i;break}}
  if(f!==-1){qi=f;dbg('→'+qi)}else if(skip.length>0){qi=skip.shift();dbg('→skip '+qi)}else{dbg('→selesai');saveSt();endTest(false);return}
  saveSt();renderQ();
}
function skipQ(){
  dbg('skipQ');if(!skip.includes(qi)&&!ans.includes(qi)){skip.push(qi);ua.push(`${qi+1}SKIPx`)}
  let f=-1;for(let i=qi+1;i<qs.length;i++){if(!ans.includes(i)&&!skip.includes(i)){f=i;break}}
  if(f!==-1){qi=f}else if(skip.length>0){qi=skip.shift()}else{saveSt();endTest(false);return}
  saveSt();renderQ();
}
function mAns(idx){
  if(!ans.includes(idx))ans.push(idx);const p=skip.indexOf(idx);
  if(p!==-1){skip.splice(p,1);const u=ua.indexOf(`${idx+1}SKIPx`);if(u!==-1)ua.splice(u,1)}
}

async function endTest(to){
  clearInterval(ti);sl('Menyimpan hasil...');const id=localStorage.getItem('db_id');
  try{
    const cur=await aG(id),upd={},sf=cfg.saveField;let o={};try{o=JSON.parse(cur.data[sf]||'{}')}catch{}
    if(cfg.type==='ab_choice')o[cfg.id]=ua.join(';')+';';
    else if(cfg.type==='ranking')o[cfg.id]=ua.join(';');
    else o[cfg.id]=sc;
    upd[sf]=JSON.stringify(o);
    if(cfg.logField&&qs.length>0){let lo={};try{lo=JSON.parse(cur.data[cfg.logField]||'{}')}catch{}lo[cfg.id]=ua.map((a,i)=>{const q=qs[i];if(!q)return'';if(cfg.type==='text_input_scored'){return`${i+1}.${a}✗`}return`${i+1}.${a}${String(a).toLowerCase()===String(q.answer||q.correctAnswer||'').toLowerCase()?'✓':'✗'}`}).join(';');upd[cfg.logField]=JSON.stringify(lo)}
    if(cfg.timer>0)upd.x_04='';upd.x_12='';
    await aP(id,upd);
    localStorage.removeItem('_st_'+cfg._taskId);
    localStorage.removeItem('_activeTask');
    cu=cur.data;cu[sf]=upd[sf];if(cfg.logField)cu[cfg.logField]=upd[cfg.logField];
    hl();afterT();
  }catch(e){alert('Gagal: '+e.message);hl()}
}
function afterT(){
  try{
    vMap={};if(cu.x_09){try{const v=JSON.parse(cu.x_09);Object.entries(v).forEach(([k,vl])=>{if(k&&/^[a-zA-Z0-9_]+$/.test(k))vMap[k]=parseInt(vl)||0})}catch{}}
    goNext2();
  }catch(e){console.error('[afterT]',e);farC(localStorage.getItem('token'))}
}
async function farC(token){
  sl('Memeriksa...');
  try{
    const res=await aF(`${API_R}?table=${TBL}&x_01_eq=${token}`,{headers:{'X-Custom-Auth':AUTH}});
    if(!res.success||!res.count){localStorage.clear();hl();ss('screenDaftar');loadPaket();return}
    cu=res.data[0];localStorage.setItem('db_id',cu.id_x);
    vMap={};if(cu.x_09){try{const v=JSON.parse(cu.x_09);Object.entries(v).forEach(([k,vl])=>{if(k&&/^[a-zA-Z0-9_]+$/.test(k))vMap[k]=parseInt(vl)||0})}catch{}}
    await loadAC();await goNext2();
  }catch(e){console.error(e);hl();ss('screenDaftar');loadPaket()}
  finally{hl()}
}

// WHO Engine
const wFindNext=()=>{for(let i=0;i<wBL.length;i++){const b=wBL[i],d=b.data,sf=d?(d.saveField||'x_07'):'x_07';let done=false;try{const o=JSON.parse(cu[sf]||'{}');done=o[b._taskId]!=null&&o[b._taskId]!==''}catch{}if(!done)return i}return -1};
async function wOpen(idx){
  // ── Periksa dulu sebelum lanjut ──
  const boleh=await cekSebelumInstruksi();
  if(!boleh)return;

  sl('Memuat tes...');
  try{
    const b=wBL[idx];if(!b.data)b.data=await(await fetch(b.dataUrl+'?v='+Date.now())).json();
    const d=b.data;
    cfg={
      _taskId:b._taskId,title:d.title||'Tes',desc:d.desc||'',
      instructions:d.instructions||'',exImgTop:d.exImgTop||'',
      exImgBottom:d.exImgBottom||'',exNote:d.exNote||'',
      saveField:d.saveField||'x_07',logField:d.logField||null,
      dataUrl:b.dataUrl,_isWho:true,
      _whoDual:(d.type||'')==='who_dual'  // ← tandai mode dual
    };
    hl();$('startTitle').innerText=cfg.title;$('startInstructions').innerText=cfg.instructions||cfg.desc;$('exNote').innerText=cfg.exNote;
    const it=$('exImgTop'),ib=$('exImgBottom');it.style.display=cfg.exImgTop?'':'none';ib.style.display=cfg.exImgBottom?'':'none';
    if(cfg.exImgTop)it.src=cfg.exImgTop;if(cfg.exImgBottom)ib.src=cfg.exImgBottom;
    $('exampleBlock').style.display=(cfg.exImgTop||cfg.exImgBottom||cfg.exNote)?'':'none';ss('screenStart');
  }catch(e){alert('Gagal: '+e.message);hl();if(wBL.length>1)wDash()}
}
async function wDash(){
  sl('Memuat daftar...');
  for(let i=0;i<wBL.length;i++){if(!wBL[i].data){try{wBL[i].data=await(await fetch(wBL[i].dataUrl+'?v='+Date.now())).json()}catch{wBL[i].data={title:'Tes '+wBL[i].fileKey}}}}
  hl();$('welcomeName').innerText='Halo, '+(gBio('bioNama')||'Peserta')+'!';
  const g=$('taskGrid');g.innerHTML='';let fp=null;
  wBL.forEach((b,i)=>{
    const d=b.data||{},sf=d.saveField||'x_07';let done=false;try{const o=JSON.parse(cu[sf]||'{}');done=o[b._taskId]!=null&&o[b._taskId]!==''}catch{}
    if(!done&&fp===null)fp=i;const cur=!done&&fp===i;
    const div=document.createElement('div');div.className='task-item'+(done?' done':cur?' current':' locked');
    div.innerHTML=`<div class="task-num">${done?'✓':i+1}</div><div class="task-name">${d.title||('Tes '+b.fileKey)}</div><span class="task-badge ${done?'badge-done':cur?'badge-current':'badge-locked'}">${done?'Selesai':cur?'▶ Mulai':'Terkunci'}</span>`;
    if(cur)div.onclick=()=>{wBI=i;wOpen(i)};g.appendChild(div);
  });
  $('welcomeSub').innerText=fp===null?'🎉 Semua selesai!':'Klik tes bertanda ▶ Mulai.';ss('screenDash');
}
async function wStart(){
  sl('Memuat soal...');
  try{
    const d=wBL[wBI].data;wQs=d.questions||[];if(!wQs.length)throw new Error('Soal kosong.');
    const sv=localStorage.getItem('_st_'+cfg._taskId);
    if(sv){
      const s=JSON.parse(sv);
      wQi=s.qIndex||0;wUA=s.userAnswers||[];wSkip=s.skippedIndices||[];wAns=s.answeredIndices||[];
      wDualFirst=s.dualFirst||null;  // resume state dual
    }
    else{wQi=0;wUA=[];wSkip=[];wAns=[];wDualFirst=null;}
    $('testTitle').innerText=cfg.title;ss('screenTest');wRQ();
  }catch(e){alert('Gagal: '+e.message);if(wBL.length>1)wDash()}finally{hl()}
}

// ── State tambahan untuk mode dual ──
let wDualFirst=null; // menyimpan pilihan pertama (paling sesuai)

function wRQ(){
  wUP();
  if(wQi<0||wQi>=wQs.length){if(wSkip.length>0){wQi=wSkip.shift();wSS()}else{wEnd();return}}
  if(cfg._whoDual){wRQ_dual();return}  // ← arahkan ke render dual
  // ── Mode normal (1 klik) ──
  const q=wQs[wQi],opts=q.options||{};
  const wb=wSkip.includes(wQi)?' '+SB:'';let btns='';
  for(const k of Object.keys(opts)){if(!opts[k])continue;btns+=`<button class="opt-grid-btn" onclick="wSC('${k}')"><span class="opt-key">${k}</span>${esc(opts[k])}</button>`}
  $('questionContent').innerHTML=`<div class="q-label">Soal No. ${wQi+1}${wb}</div><div class="q-text">${esc(q.question)}</div><div class="options-grid">${btns}</div>`;
  $('actionBar').innerHTML='';
}

// ── Render mode dual ──
function wRQ_dual(){
  const q=wQs[wQi],opts=q.options||{};
  const wb=wSkip.includes(wQi)?' '+SB:'';
  const isStep2=wDualFirst!==null;
  const hintCls=isStep2?'step2':'step1';
  const hintTxt=isStep2
    ?`<b style="color:#92400e">Langkah 2 / 2</b> — Pilih yang <u>PALING TIDAK SESUAI</u> diri Anda`
    :`<b style="color:var(--primary)">Langkah 1 / 2</b> — Pilih yang <u>PALING SESUAI</u> diri Anda`;
  let btns='';
  for(const k of Object.keys(opts)){
    if(!opts[k])continue;
    const isFirst=k===wDualFirst;
    const cls=isFirst?'opt-grid-btn who-selected-first':'opt-grid-btn';
    const onclk=isFirst?'':`onclick="wSC_dual('${k}')"`;
    const tag=isFirst?` <span style="font-size:.7em;background:var(--primary);color:#fff;border-radius:99px;padding:2px 8px;margin-left:4px">✓ Dipilih</span>`:'';
    btns+=`<button class="${cls}" ${onclk}><span class="opt-key">${k}</span>${esc(opts[k])}${tag}</button>`;
  }
  $('questionContent').innerHTML=`
    <div class="q-label">Soal No. ${wQi+1}${wb}</div>
    <div class="q-text">${esc(q.question)}</div>
    <div class="who-dual-hint ${hintCls}">${hintTxt}</div>
    <div class="options-grid">${btns}</div>`;
  $('actionBar').innerHTML='';
}

// ── Handler klik mode dual ──
function wSC_dual(k){
  if(wDualFirst===null){
    // Klik pertama: simpan, render ulang dengan step 2
    wDualFirst=k;
    wSS();
    wRQ_dual();
  } else {
    // Klik kedua: gabung, simpan ke wUA, lanjut
    const combined=wDualFirst+'_'+k;
    wDualFirst=null;
    wMA(wQi);
    wUA.push(combined);
    wSS();
    wGN();
  }
}

function wSC(k){wMA(wQi);wUA.push(k);wSS();wGN()}
function wSS(){localStorage.setItem('_st_'+cfg._taskId,JSON.stringify({qIndex:wQi,userAnswers:wUA,skippedIndices:wSkip,answeredIndices:wAns,dualFirst:wDualFirst}))}
function wGN(){
  let f=-1;for(let i=wQi+1;i<wQs.length;i++){if(!wAns.includes(i)&&!wSkip.includes(i)){f=i;break}}
  if(f!==-1){wQi=f}else if(wSkip.length>0){wQi=wSkip.shift()}else{wSS();wEnd();return}
  wDualFirst=null;wSS();wRQ();
}
function wSK(){
  if(!wSkip.includes(wQi)&&!wAns.includes(wQi)){wSkip.push(wQi);wUA.push('SKIP')}
  wDualFirst=null;
  let f=-1;for(let i=wQi+1;i<wQs.length;i++){if(!wAns.includes(i)&&!wSkip.includes(i)){f=i;break}}
  if(f!==-1){wQi=f}else if(wSkip.length>0){wQi=wSkip.shift()}else{wSS();wEnd();return}
  wSS();wRQ();
}
function wMA(idx){if(!wAns.includes(idx))wAns.push(idx);const p=wSkip.indexOf(idx);if(p!==-1){wSkip.splice(p,1);const u=wUA.indexOf('SKIP');if(u!==-1)wUA.splice(u,1)}}
function wUP(){const t=wQs.length,d=wAns.length;$('progressBar').style.width=(t?Math.round((d/t)*100):0)+'%';let info=`Soal ${wQi+1} / ${t}`;if(wSkip.length>0)info+=` · ⟳ ${wSkip.length} dilewati`;$('progressInfo').innerText=info;const bt=$('bbTitle'),bp=$('bbProgress');if(bt)bt.innerText=cfg.title||'';if(bp)bp.innerText=info}
function wAfT(){const i=wFindNext();if(i!==-1){wBI=i;wOpen(i)}else goNext2()}
async function wEnd(){
  sl('Menyimpan...');const id=localStorage.getItem('db_id');
  try{const cur=await aG(id),sf=cfg.saveField;let o={};try{o=JSON.parse(cur.data[sf]||'{}')}catch{}o[cfg._taskId]=wUA.join(';')+';';const v=JSON.stringify(o);await aP(id,{[sf]:v});localStorage.removeItem('_st_'+cfg._taskId);wDualFirst=null;cu=cur.data;cu[sf]=v;hl();wAfT()}
  catch(e){alert('Gagal: '+e.message);hl()}
}

// Monitor
function visChg(){if(!document.hidden)return;if(!$('screenTest').classList.contains('active'))return;vCnt++;saveV()}
async function saveV(){const id=localStorage.getItem('db_id');if(!id||!cfg)return;try{const k=(cfg._taskId||cfg.id||'').trim();vMap[k]=(vMap[k]||0)+1;await fetch(`${API_W}?table=${TBL}&id_x=${id}`,{method:'PUT',headers:{'Content-Type':'application/json','X-Custom-Auth':AUTH},body:JSON.stringify({x_09:JSON.stringify(vMap)})})}catch{}}
async function trackBtn(key){const id=localStorage.getItem('db_id');if(!id)return;try{vMap[key]=(vMap[key]||0)+1;await fetch(`${API_W}?table=${TBL}&id_x=${id}`,{method:'PUT',headers:{'Content-Type':'application/json','X-Custom-Auth':AUTH},body:JSON.stringify({x_09:JSON.stringify(vMap)})})}catch{}}
document.addEventListener('visibilitychange',visChg);
document.addEventListener('contextmenu',e=>{if(e.target.tagName==='IMG'){e.preventDefault();return false}});
document.addEventListener('dragstart',e=>{if(e.target.tagName==='IMG'){e.preventDefault();return false}});
document.addEventListener('keydown',e=>{if(e.ctrlKey&&e.key==='s'){e.preventDefault();return false}});

// ═══════════════════════════════════════════
// POLLING TERPUSAT — hanya aktif di layar tunggu & tutup
// screenTunggu → 15 detik (tunggu peserta diaktifkan)
// screenTutup  → 20 detik (tunggu tes dibuka)
// layar lain   → berhenti (hemat query D1)
// ═══════════════════════════════════════════
let _globalPollInterval=null;
let _globalPollBusy=false;

function getActiveScreen(){
  const screens=['screenTutup','screenDaftar','screenTunggu','screenStart','screenTest','screenDash','screenDone','screenUpgrade'];
  for(const id of screens){const el=$(id);if(el&&el.classList.contains('active'))return id;}
  return null;
}

function startGlobalPolling(){
  stopGlobalPolling();

  async function pollTick(){
    if(_globalPollBusy)return;
    _globalPollBusy=true;
    try{
      const screen=getActiveScreen();

      // ── Layar TUTUP: tunggu tes global dibuka kembali ──
      if(screen==='screenTutup'){
        const kontrol=await cekKontrol();
        if(kontrol.aktif){
          stopGlobalPolling();
          if(_cdInterval){clearInterval(_cdInterval);_cdInterval=null;}
          const tok=localStorage.getItem('token'),dbId=localStorage.getItem('db_id');
          if(tok&&dbId){
            sl('Memeriksa sesi...');
            try{
              const res=await aF(`${API_R}?table=${TBL}&id_x=${dbId}`,{headers:{'X-Custom-Auth':AUTH}});
              if(res.success&&res.data){
                cu=res.data;await loadAC();
                let status='nonaktif';try{status=JSON.parse(cu.x_02||'{}').status||'nonaktif'}catch{}
                if(status==='aktif'){hl();startGlobalPolling();await goNext2();}
                else{hl();ss('screenTunggu');showZoomTunggu();startGlobalPolling();}
              }else{localStorage.clear();hl();ss('screenDaftar');loadPaket();}
            }catch{hl();ss('screenDaftar');loadPaket();}
          }else{hl();ss('screenDaftar');loadPaket();}
        }
        _globalPollBusy=false;return;
      }

      // ── Layar TUNGGU: tunggu peserta diaktifkan ──
      // Hemat D1: 1 request saja (GET peserta), hapus cekKontrol terpisah.
      if(screen==='screenTunggu'){
        const dbId=localStorage.getItem('db_id');
        if(!dbId){_globalPollBusy=false;return;}
        const res=await aF(`${API_R}?table=${TBL}&id_x=${dbId}`,{headers:{'X-Custom-Auth':AUTH}});
        if(!res.success||!res.data){_globalPollBusy=false;return;}
        cu=res.data;
        let bioObj={};try{bioObj=JSON.parse(cu.x_02||'{}')}catch{}
        const status=bioObj.status||'nonaktif';
        if(bioObj.logout===true){hl();ss('screenDaftar');loadPaket();_globalPollBusy=false;return;}
        if(status==='aktif'){
          stopGlobalPolling();
          const st=$('tungguStatus'),tx=$('tungguStatusTxt'),btn=$('btnMulaiTes');
          if(st)st.classList.add('aktif');if(tx)tx.textContent='Tes siap dimulai!';if(btn)btn.style.display='block';
          startGlobalPolling();await goNext2();
        }
        _globalPollBusy=false;return;
      }

      // ── Layar lain (soal, instruksi, selesai) → tidak perlu poll ──
      // Hemat query D1. Admin kontrol peserta lewat layar admin terpisah.
      _globalPollBusy=false;
    }catch(e){console.warn('[globalPoll]',e);_globalPollBusy=false;}
  }

  function scheduleNext(){
    const screen=getActiveScreen();
    // Hanya poll di layar tunggu & tutup — layar lain tidak dijadwalkan ulang
    if(screen!=='screenTunggu'&&screen!=='screenTutup'){return;}
    const delay=screen==='screenTunggu'?30000:40000; // hemat D1: 30s tunggu, 40s tutup
    _globalPollInterval=setTimeout(async()=>{await pollTick();scheduleNext();},delay);
  }
  scheduleNext();
}

function stopGlobalPolling(){
  if(_globalPollInterval){clearTimeout(_globalPollInterval);_globalPollInterval=null;}
  _globalPollBusy=false;
}

// Logout poll dihapus — cek dari cu langsung saat refresh/goNext2, 0 request ke DB
let _logoutPollInterval=null;
function startLogoutPoll(){}
function stopLogoutPoll(){
  if(_logoutPollInterval){clearInterval(_logoutPollInterval);_logoutPollInterval=null;}
}

// ── Logout: reset sesi peserta, kembali ke daftar ──
async function doLogout(dbId){
  try{
    // Reset flag logout di x_02
    let bioObj={};try{bioObj=JSON.parse(cu.x_02||'{}')}catch{}
    bioObj.logout=false;
    await fetch(`${API_W}?table=${TBL}&id_x=${dbId}`,{
      method:'PUT',
      headers:{'Content-Type':'application/json','X-Custom-Auth':AUTH},
      body:JSON.stringify({x_02:JSON.stringify(bioObj)})
    });
  }catch(e){console.warn('[logout] gagal reset flag:',e)}
  // Bersihkan sesi lokal
  localStorage.clear();
  stopGlobalPolling();
  stopLogoutPoll();
  hl();
  ss('screenDaftar');
  loadPaket();
  startGlobalPolling();
}

function tampilTopBarId(){
  const el=document.getElementById('topBarId');
  if(!el)return;
  const id=localStorage.getItem('db_id');
  if(id){el.textContent='ID: '+id;el.style.display='inline-block';}
  else{el.style.display='none';}
}

function cekTombolLogout(aktif){
  let btn=$('btnLogoutPeserta');
  if(!btn)return;
  btn.style.display=aktif?'inline-flex':'none';
}

// startPolling & startTutupPolling dihapus — digantikan startGlobalPolling()
function stopPolling(){}        // stub agar referensi lama tidak error
function stopTutupPolling(){}   // stub agar referensi lama tidak error
async function mulaiTes(){startGlobalPolling();await goNext2()}

let _cdInterval=null;
let _kontrolInfo={aktif:false,waktu_mulai:'',link:''};

async function cekKontrol(){
  try{
    const res=await aF(`${API_R}?table=${TBL_K}&id_x=1`,{headers:{'X-Custom-Auth':AUTH}});
    if(!res.success||!res.data)return{aktif:false,waktu_mulai:'',link:''};
    let raw={};try{raw=JSON.parse(res.data.x_01||'{}')}catch{}
    const paketArr=Array.isArray(raw.paket)?raw.paket:[];
    const entry=paketArr.find(p=>(p.nama||'').trim()===AUTO_PAKET);
    if(!entry)return{aktif:false,waktu_mulai:'',link:''};
    _kontrolInfo={aktif:(entry.status||'').trim()==='aktif',waktu_mulai:entry.waktu_mulai||'',link:entry.link||''};
    return _kontrolInfo;
  }catch{return{aktif:false,waktu_mulai:'',link:''}}
}

function showZoomTunggu(){
  // ── Tampilkan konten khusus IQ ──
  if(AUTO_PAKET.toLowerCase()==='iq'){
    const iqExtra=document.getElementById('tungguIqExtra');
    const subText=document.getElementById('tungguSubText');
    if(iqExtra)iqExtra.style.display='block';
    if(subText){
      subText.textContent='Tes ini akan diawasi tester secara langsung. Pastikan Anda mengerjakan dengan benar dan jujur.';
    }
    // Update WA link dengan data peserta jika sudah ada
    const btn=document.getElementById('btnWaLidan');
    if(btn){
      let nama='';let telp='';let idPeserta=localStorage.getItem('db_id')||'';
      if(cu){try{const bio=JSON.parse(cu.x_02||'{}');nama=bio.nama||'';telp=bio.telepon||'';}catch{}}
      const pretext='Halo Lidan Psikologi, saya '+(nama||'peserta')+' sudah mengisi biodata dan siap untuk memulai Tes IQ.'+(telp?' No. WhatsApp saya: '+telp+'.':'')+(idPeserta?' ID Peserta: '+idPeserta+'.':'')+' Mohon konfirmasi dari tester. Saya ingin tahu berapa biayanya?';
      btn.href='https://wa.me/6285159601400?text='+encodeURIComponent(pretext);
    }
  }
  // ── Tampilkan ID peserta ──
  const idBox=document.getElementById('tungguIdBox');
  const idNum=document.getElementById('tungguIdNum');
  const savedId=localStorage.getItem('db_id');
  if(idBox&&idNum&&savedId){idNum.textContent=savedId;idBox.style.display='block';}

  if(_kontrolInfo.link){
    const wrap=document.getElementById('tungguZoomWrap'),btn=document.getElementById('tungguLinkBtn');
    if(wrap)wrap.style.display='block';if(btn)btn.href=_kontrolInfo.link;
  }
}

function showScreenTutup(info){
  if(info.link){document.getElementById('tutupLinkBtn').href=info.link;document.getElementById('tutupLinkWrap').style.display='block';}
  if(info.waktu_mulai){
    const target=new Date(info.waktu_mulai);
    if(!isNaN(target)){
      document.getElementById('tutupCountdown').style.display='block';
      const fmt=target.toLocaleString('id-ID',{weekday:'long',day:'numeric',month:'long',year:'numeric',hour:'2-digit',minute:'2-digit'});
      document.getElementById('cdWaktuLabel').textContent='📅 '+fmt+' WIB';
      if(_cdInterval)clearInterval(_cdInterval);
      function tick(){
        const now=new Date(),diff=target-now;
        if(diff<=0){clearInterval(_cdInterval);['cdHari','cdJam','cdMenit','cdDetik'].forEach(id=>$(id).textContent='00');setTimeout(()=>location.reload(),3000);return}
        const h=Math.floor(diff/3600000);
        document.getElementById('cdHari').textContent=String(Math.floor(h/24)).padStart(2,'0');
        document.getElementById('cdJam').textContent=String(h%24).padStart(2,'0');
        document.getElementById('cdMenit').textContent=String(Math.floor((diff%3600000)/60000)).padStart(2,'0');
        document.getElementById('cdDetik').textContent=String(Math.floor((diff%60000)/1000)).padStart(2,'0');
      }
      tick();_cdInterval=setInterval(tick,1000);
    }
  }
  hl();ss('screenTutup');startGlobalPolling();
}

// ═══════════════════════════════════════════
// FETCH FRAGMENT — biodata & penutup
// ═══════════════════════════════════════════
async function loadFragment(url, containerId) {
  try {
    const res = await fetch(url + '?v=' + Date.now());
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const html = await res.text();
    document.getElementById(containerId).innerHTML = html;
  } catch (e) {
    console.error('[FRAGMENT] Gagal memuat', url, e);
    document.getElementById(containerId).innerHTML =
      '<p style="color:var(--danger);padding:16px;text-align:center">⚠ Gagal memuat konten. Coba muat ulang halaman.</p>';
  }
}

// ═══════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════
window.onload = async () => {
  // ── Cek ?p= lebih awal, sebelum apapun dijalankan ──
  if (!AUTO_PAKET) {
    hl();
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    let errScreen = $('screenNoPacket');
    if (!errScreen) {
      errScreen = document.createElement('div');
      errScreen.id = 'screenNoPacket';
      errScreen.className = 'screen active';
      errScreen.innerHTML = `
        <div class="card" style="text-align:center;margin-top:40px">
          <div style="font-size:3em;margin-bottom:12px">📦</div>
          <div style="font-size:1.25em;font-weight:700;color:var(--danger);margin-bottom:10px">Paket Belum Dimasukkan</div>
          <p style="color:var(--muted);font-size:.9em;line-height:1.7">
            Halaman ini memerlukan parameter paket pada URL.<br>
            Tambahkan <code style="background:#f1f5f9;padding:2px 6px;border-radius:4px;font-size:.9em">?p=nama-paket</code> di akhir URL Anda.<br><br>
            Contoh: <code style="background:#f1f5f9;padding:2px 6px;border-radius:4px;font-size:.9em">tes-template.html?p=tes-iq</code>
          </p>
        </div>`;
      document.body.appendChild(errScreen);
    } else {
      errScreen.classList.add('active');
    }
    return; // hentikan init
  }

  sl('Memeriksa paket...');

  // Cek paket di server SEBELUM apapun (termasuk sebelum cek token)
  await loadPaket();
  if (!sPaket) { showPaketNotFoundScreen(); return; }

  sl('Memuat halaman...');

  // Ambil URL fragment dari x_03 (JSON) jika tersedia, fallback ke hardcoded
  let _fragBiodata = FRAGMENT_BASE + BIODATA_FILE;
  let _fragPenutup = FRAGMENT_BASE + PENUTUP_FILE;
  try {
    const _x03 = JSON.parse(sPaket.x_03 || '{}');
    if (_x03.biodata) _fragBiodata = _x03.biodata;
    if (_x03.penutup) _fragPenutup = _x03.penutup;
  } catch(e) { console.warn('[FRAGMENT] Gagal parse x_03:', e); }

  // Muat kedua fragment secara paralel
  await Promise.all([
    loadFragment(_fragBiodata, 'biodataContainer'),
    loadFragment(_fragPenutup, 'penutupContainer'),
  ]);

  // Inisialisasi tombol WA di fragment penutup setelah DOM siap
  (function initPenutupWa() {
    const waIds = ['waAsmara','waKarakter','waKarier','waPotensi'];
    const btn = waIds.map(id => document.getElementById(id)).find(el => el);
    if (!btn) return; // tidak ada tombol penutup custom
    const namaMap = {
      waAsmara:   'Tes Asmara',
      waKarakter: 'Tes Karakter',
      waKarier:   'Tes Karier',
      waPotensi:  'Tes Potensi',
    };
    const namaBtn = waIds.find(id => document.getElementById(id) === btn);
    const namaTes = namaMap[namaBtn] || 'Tes';
    const id  = (cu && cu.id_x) ? String(cu.id_x) : (localStorage.getItem('db_id') || '');
    const text = 'Halo Admin Lidan, saya baru saja menyelesaikan ' + namaTes
      + ' dan ingin mendapatkan laporan hasil tes serta sertifikat eksklusif saya. Boleh saya tahu berapa biayanya?'
      + (id  ? '\n\nID: ' + id  : '');
    btn.href = 'https://wa.me/6285159601400?text=' + encodeURIComponent(text);
  })();

  sl('Memeriksa status tes...');
  const kontrol = await cekKontrol();
  if (!kontrol.aktif) { showScreenTutup(kontrol); return; }

  const tok = localStorage.getItem('token');
  if (tok) {
    const _pLama = localStorage.getItem('_p');
    // Catat apakah token ini berasal dari paket yang berbeda SEBELUM dioverwrite
    const _paketBeda = !!(_pLama && _pLama !== AUTO_PAKET);
    if (_paketBeda) {
      const _keysHapus = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith('_st_')) _keysHapus.push(k);
      }
      _keysHapus.forEach(k => localStorage.removeItem(k));
      localStorage.setItem('_p', AUTO_PAKET);
      // PERBAIKAN INTI: reset status di DB ke 'nonaktif' jika pindah ke paket non-auto.
      // Ini mencegah status 'aktif' dari paket sebelumnya (asmara dll) dipakai untuk
      // melewati screenTunggu pada paket IQ yang wajib konfirmasi admin.
      if (!IS_AUTO_AKTIF) {
        const _oldDbId = localStorage.getItem('db_id');
        if (_oldDbId) {
          try {
            const _oldData = await aF(`${API_R}?table=${TBL}&id_x=${_oldDbId}`, {headers:{'X-Custom-Auth':AUTH}});
            if (_oldData.success && _oldData.data) {
              let _oldBio = {}; try { _oldBio = JSON.parse(_oldData.data.x_02 || '{}'); } catch {}
              if (_oldBio.status === 'aktif') {
                _oldBio.status = 'nonaktif';
                await aP(_oldDbId, {x_02: JSON.stringify(_oldBio)});
                console.log('[INIT] Status record lama di-reset ke nonaktif untuk paket:', AUTO_PAKET);
              }
            }
          } catch(e) { console.warn('[INIT] Gagal reset status lama:', e); }
        }
      }
    }
    sl('Memeriksa sesi...');
    try {
      const res = await aF(`${API_R}?table=${TBL}&x_01_eq=${tok}`, { headers: { 'X-Custom-Auth': AUTH } });
      if (!res.success || !res.count) { localStorage.clear(); hl(); ss('screenDaftar'); return; }
      cu = res.data[0]; localStorage.setItem('db_id', cu.id_x);
      vMap = {}; if (cu.x_09) { try { const v = JSON.parse(cu.x_09); Object.entries(v).forEach(([k, vl]) => { if (k && /^[a-zA-Z0-9_]+$/.test(k)) vMap[k] = parseInt(vl) || 0; }); } catch {} }
      await loadAC();
      let status = 'nonaktif'; try { status = JSON.parse(cu.x_02 || '{}').status || 'nonaktif'; } catch {}
      // PERBAIKAN BUG: jika paket berbeda (misal sebelumnya asmara, sekarang iq),
      // status 'aktif' dari sesi lama TIDAK boleh dipakai untuk bypass screenTunggu.
      // Paket non-auto-aktif (iq) wajib tunggu konfirmasi admin meskipun punya token.
      if (IS_AUTO_AKTIF) {
        // Paket auto-aktif (asmara/karakter/potensi/karir): langsung mulai
        hl(); startGlobalPolling(); await goNext2();
      } else if (status === 'aktif' && !_paketBeda) {
        // Paket non-auto (iq): lanjut hanya jika token memang dari paket ini
        // DAN admin sudah mengaktifkan status peserta untuk paket ini
        hl(); startGlobalPolling(); await goNext2();
      } else {
        // Token dari paket lain, atau status belum diaktifkan admin → wajib tunggu
        hl(); ss('screenTunggu'); showZoomTunggu(); startGlobalPolling();
      }
    } catch (e) { localStorage.clear(); hl(); ss('screenDaftar'); }
    return;
  }
  hl(); ss('screenDaftar');
};

// ═══ KREPLIN ENGINE ═══
let _kCfg={},_kKolom=0,_kSoalIdx=0,_kBenar=0,_kSalah=0,_kTimer=null,_kTL=0,_kLog=[],_kA=0,_kB=0,_kDone=false;
const _kSK='_krep_state';

function kreplinSaveState(){
  localStorage.setItem(_kSK,JSON.stringify({
    kolom:_kKolom,soalIdx:_kSoalIdx,benar:_kBenar,salah:_kSalah,
    benarPrev:_kBenarPrev,salahPrev:_kSalahPrev,
    timeLeft:_kTL,log:_kLog,introShown:true
  }));
}

function kreplinLoadState(){
  try{return JSON.parse(localStorage.getItem(_kSK)||'null')}catch{return null}
}

function kreplinClearState(){localStorage.removeItem(_kSK)}

async function kreplinStart(ref){
  // Load config dari txt
  let meta={totalKolom:45,soalPerKolom:50,detikPerKolom:30,angkaMin:1,angkaMax:9};
  let title='Tes Kraepelin',instructions='',desc='',exNote='';
  if(ref&&ref.dataUrl){
    try{
      const raw=await(await fetch(ref.dataUrl+'?v='+Date.now())).json();
      if(raw&&raw.meta){
        const m=raw.meta;
        if(m.title)title=m.title;
        if(m.instructions)instructions=m.instructions;
        if(m.desc)desc=m.desc;
        if(m.exNote)exNote=m.exNote;
        if(m.kreplin)Object.assign(meta,m.kreplin);
      }
    }catch(e){console.warn('[kreplin] gagal load config:',e)}
  }
  _kCfg=meta;_kDone=false;

  // Cek apakah ada state tersimpan (resume setelah refresh)
  const saved=kreplinLoadState();
  if(saved&&saved.introShown&&saved.kolom&&saved.kolom<=meta.totalKolom){
    // Resume langsung tanpa intro
    _kKolom=saved.kolom;
    _kSoalIdx=saved.soalIdx||0;
    _kBenar=saved.benar||0;
    _kSalah=saved.salah||0;
    _kBenarPrev=saved.benarPrev||0;
    _kSalahPrev=saved.salahPrev||0;
    _kTL=saved.timeLeft||meta.detikPerKolom;
    _kLog=saved.log||[];
    ss('screenKreplin');hl();
    localStorage.setItem('_activeTask','kreplin');
    kreplinRenderKolom();
    kreplinSoalBaru();
    // Timer resume dari sisa waktu
    kreplinStartTimerResume(_kTL);
    return;
  }

  // Intro hanya ditampilkan pertama kali
  cfg={title,instructions,desc,exNote,exImgTop:'',exImgBottom:'',timer:0,_taskId:'kreplin'};
  $('startTitle').innerText=title;
  $('startInstructions').innerText=instructions||desc||'';
  $('exNote').innerText=exNote||'';
  $('exampleBlock').style.display=exNote?'':'none';
  const iw=document.querySelector('#exampleBlock .example-images');if(iw)iw.style.display='none';
  $('timerNote').style.display='none';
  $('btnStart').onclick=()=>kreplinRun();
  ss('screenStart');hl();tampilTopBarId();
}

function kreplinRun(){
  _kKolom=1;_kBenar=0;_kSalah=0;_kBenarPrev=0;_kSalahPrev=0;_kLog=[];_kDone=false;_kSoalIdx=0;
  _kTL=_kCfg.detikPerKolom||30;
  localStorage.setItem('_activeTask','kreplin');
  kreplinSaveState();
  ss('screenKreplin');
  kreplinRenderKolom();
  kreplinSoalBaru();
  kreplinStartTimer();
}

function kreplinRenderKolom(){
  $('krepTitle').innerText='Tes Kraepelin';
  $('krepProgress').innerText='Kolom '+_kKolom+' / '+(_kCfg.totalKolom||45);
  $('krepProgressBar').style.width=Math.round(((_kKolom-1)/(_kCfg.totalKolom||45))*100)+'%';
}

function kreplinNextKolom(){
  if(_kKolom>_kCfg.totalKolom){kreplinSelesai();return}
  _kSoalIdx=0;
  _kTL=_kCfg.detikPerKolom||30;
  kreplinRenderKolom();
  kreplinSoalBaru();
  kreplinSaveState();
  kreplinStartTimer();
}

function kreplinSoalBaru(){
  const min=_kCfg.angkaMin||1,max=_kCfg.angkaMax||9;
  _kA=Math.floor(Math.random()*(max-min+1))+min;
  _kB=Math.floor(Math.random()*(max-min+1))+min;
  $('krepSoalQ').innerText=_kA+' + '+_kB;
  const jawaban=(_kA+_kB)%10;
  const wrap=$('krepOpts');wrap.innerHTML='';
  [0,1,2,3,4,5,6,7,8,9].forEach(n=>{
    const btn=document.createElement('button');
    btn.className='btn btn-outline btn-sm';
    btn.style.cssText='width:56px;height:56px;font-size:1.4em;font-weight:800;border-radius:12px;padding:0';
    btn.innerText=n;
    btn.onclick=()=>kreplinJawab(n,jawaban);
    wrap.appendChild(btn);
  });
}

function kreplinBuatOpsi(jawaban){
  return [0,1,2,3,4,5,6,7,8,9];
}

function kreplinJawab(pilihan,jawaban){
  const benar=pilihan===jawaban;
  if(benar)_kBenar++;else _kSalah++;
  _kSoalIdx++;
  kreplinSaveState();
  if(_kSoalIdx>=(_kCfg.soalPerKolom||50)){
    kreplinCatatKolom();
    clearInterval(_kTimer);_kTimer=null;
    _kKolom++;kreplinNextKolom();
  } else {
    kreplinSoalBaru();
  }
}

function kreplinBuildPayload(){
  const total=_kCfg.totalKolom||45;
  const dikerjakan=Array(total).fill('');
  const benar=Array(total).fill('');
  const salah=Array(total).fill('');
  _kLog.forEach(k=>{
    const i=(k.kolom||1)-1;
    if(i>=0&&i<total){
      dikerjakan[i]=String(k.soal||0);
      benar[i]=String(k.benar||0);
      salah[i]=String(k.salah||0);
    }
  });
  return {
    dikerjakan:dikerjakan.join('|'),
    benar:benar.join('|'),
    salah:salah.join('|')
  };
}

let _kBenarPrev=0,_kSalahPrev=0;

function kreplinCatatKolom(){
  const benarKolom=_kBenar-_kBenarPrev;
  const salahKolom=_kSalah-_kSalahPrev;
  _kLog.push({kolom:_kKolom,soal:_kSoalIdx,benar:benarKolom,salah:salahKolom});
  _kBenarPrev=_kBenar;
  _kSalahPrev=_kSalah;
  // Simpan progress ke server setiap akhir kolom
  const dbId=localStorage.getItem('db_id');
  if(dbId){
    aG(dbId).then(cur=>{
      const sf='x_06';
      let o={};try{o=JSON.parse(cur.data[sf]||'{}')}catch{}
      o.kreplin=kreplinBuildPayload();
      const upd={};upd[sf]=JSON.stringify(o);
      return aP(dbId,upd).then(()=>{cu=cur.data;cu[sf]=upd[sf];});
    }).catch(e=>console.warn('[kreplin] gagal simpan kolom:',e));
  }
}

function kreplinStartTimer(){
  if(_kTimer)clearInterval(_kTimer);
  kreplinUpdTimer();
  _kTimer=setInterval(()=>{
    _kTL--;kreplinUpdTimer();kreplinSaveState();
    if(_kTL<=0){
      clearInterval(_kTimer);_kTimer=null;
      kreplinCatatKolom();
      _kKolom++;kreplinNextKolom();
    }
  },1000);
}

function kreplinStartTimerResume(sisaWaktu){
  if(_kTimer)clearInterval(_kTimer);
  _kTL=sisaWaktu;
  kreplinUpdTimer();
  _kTimer=setInterval(()=>{
    _kTL--;kreplinUpdTimer();kreplinSaveState();
    if(_kTL<=0){
      clearInterval(_kTimer);_kTimer=null;
      kreplinCatatKolom();
      _kKolom++;kreplinNextKolom();
    }
  },1000);
}

function kreplinUpdTimer(){
  const m=String(Math.floor(_kTL/60)).padStart(2,'0'),s=String(_kTL%60).padStart(2,'0');
  const el=$('krepTimerDisplay');if(!el)return;
  el.innerText=m+':'+s;
  el.style.color=_kTL<=10?'var(--danger)':'var(--text)';
}

async function kreplinSelesai(){
  if(_kDone)return;_kDone=true;
  if(_kTimer){clearInterval(_kTimer);_kTimer=null;}
  kreplinClearState();
  localStorage.removeItem('_activeTask');
  const dbId=localStorage.getItem('db_id');
  if(dbId){
    sl('Menyimpan hasil...');
    try{
      const cur=await aG(dbId);
      const sf='x_06';
      let o={};try{o=JSON.parse(cur.data[sf]||'{}')}catch{}
      o.kreplin=kreplinBuildPayload();
      const upd={};upd[sf]=JSON.stringify(o);
      await aP(dbId,upd);
      cu=cur.data;cu[sf]=upd[sf];
    }catch(e){console.warn('[kreplin] gagal simpan:',e)}
  }
  hl();
  $('doneIcon').innerText='✅';
  $('doneTitle').innerText='Tes Kraepelin Selesai!';
  $('doneDesc').innerText='Hasil telah tersimpan.';
  ss('screenDone');
  setTimeout(()=>{sl('Memuat tes berikutnya...');goNext2()},2000);
}

// ══ ANTI-REFRESH SYSTEM ══
function isTestActive(){
  const s = document.querySelector('.screen.active');
  return s && (s.id==='screenTest' || s.id==='screenKreplin');
}
function showRefWarn(){
  const ov=document.getElementById('refreshWarningOverlay');
  if(ov) ov.style.display='flex';
}

// 1) Keyboard: F5, Ctrl+R, Ctrl+Shift+R, Ctrl+W, Alt+F4
document.addEventListener('keydown', function(e){
  if(!isTestActive()) return;
  const k=e.key.toLowerCase();
  const ctrl=e.ctrlKey||e.metaKey;
  if(e.key==='F5' || (ctrl&&k==='r') || (ctrl&&e.shiftKey&&k==='r') || (ctrl&&k==='w') || (e.altKey&&e.key==='F4')){
    e.preventDefault(); e.stopPropagation(); showRefWarn(); return false;
  }
}, true);

// 2) Klik kanan disable (mencegah menu Reload)
document.addEventListener('contextmenu', function(e){
  if(!isTestActive()) return;
  e.preventDefault();
}, true);

// 3) Tombol Back browser / swipe back (history trick)
// Push state dummy agar tombol Back tidak langsung keluar
(function setupHistoryTrap(){
  if(history.state && history.state._testTrap) return;
  history.pushState({_testTrap:true}, '');
  window.addEventListener('popstate', function(e){
    if(!isTestActive()) return;
    // Push ulang agar tetap terjebak di halaman ini
    history.pushState({_testTrap:true}, '');
    showRefWarn();
  });
})();

// 4) Tombol refresh di browser bar — intersep via visibilitychange
// Saat tab menjadi tidak aktif (user Alt+Tab / minimize), catat waktu
// Ini tidak mencegah refresh tapi membantu deteksi
let _warnShownAt = 0;
document.addEventListener('visibilitychange', function(){
  if(!isTestActive()) return;
  if(document.visibilityState==='hidden'){
    _warnShownAt = Date.now();
  } else {
    // Tab kembali aktif setelah sembunyi — tampilkan pengingat kalau sudah > 2 detik
    if(_warnShownAt && Date.now()-_warnShownAt > 2000) showRefWarn();
    _warnShownAt = 0;
  }
});
